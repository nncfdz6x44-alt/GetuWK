"""Build the staging programme from the original DOCX without editorial changes."""
import argparse
import hashlib
import html
import json
import re
from pathlib import Path
from xml.etree import ElementTree as ET
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parent
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
SLUGS = ['wirtschaft', 'verwaltung', 'finanzen', 'mobilitaet', 'bildung', 'wohnen', 'oeffentlicher-raum', 'internationalitaet', 'klima', 'kultur', 'sport', 'stadtteile', 'buergerbeteiligung']
LABELS = ['Wirtschaft und Wissen', 'Verwaltung', 'Finanzen', 'Mobilität', 'Schulen, Kitas und Familien', 'Wohnen', 'Öffentlicher Raum und Sicherheit', 'Internationalität und Weltoffenheit', 'Klima und Resilienz', 'Kultur', 'Sport', 'Stadtteile', 'Bürgerbeteiligung']


def extract(source):
    with ZipFile(source) as archive:
        document = ET.fromstring(archive.read('word/document.xml'))
        styles_xml = ET.fromstring(archive.read('word/styles.xml'))
        styles = {style.get(W + 'styleId'): style for style in styles_xml.findall(W + 'style')}
        default_style = next((key for key, value in styles.items() if value.get(W + 'type') == 'paragraph' and value.get(W + 'default') == '1'), 'Normal')

        def inherited_flags(style_id):
            style = styles.get(style_id)
            flags = {key: False for key in ['b', 'i', 'u']}
            if style is None:
                return flags
            base = style.find(W + 'basedOn')
            if base is not None:
                flags.update(inherited_flags(base.get(W + 'val')))
            for prop in flags:
                node = style.find('./' + W + 'rPr/' + W + prop)
                if node is not None:
                    flags[prop] = node.get(W + 'val', 'true') not in ['0', 'false', 'off', 'none']
            return flags

        assert not document.findall('.//' + W + 'ins') and not document.findall('.//' + W + 'del'), 'Unresolved tracked changes'
        paragraphs = []
        for index, para in enumerate(document.findall('./' + W + 'body/' + W + 'p')):
            style = para.find('./' + W + 'pPr/' + W + 'pStyle')
            style_id = style.get(W + 'val') if style is not None else default_style
            runs = []
            for run in para.findall('.//' + W + 'r'):
                text = ''.join(node.text or '' if node.tag == W + 't' else '\t' if node.tag == W + 'tab' else '\n' if node.tag in [W + 'br', W + 'cr'] else '' for node in run)
                if not text:
                    continue
                properties = run.find(W + 'rPr')
                flags = inherited_flags(style_id)
                for prop in ['b', 'i', 'u']:
                    value = properties.find(W + prop) if properties is not None else None
                    if value is not None:
                        flags[prop] = value.get(W + 'val', 'true') not in ['0', 'false', 'off', 'none']
                runs.append({'text': text, **flags})
            text = ''.join(run['text'] for run in runs)
            if not text.strip():
                continue
            num = para.find('./' + W + 'pPr/' + W + 'numPr')
            paragraphs.append({'index': index, 'text': text, 'style': style_id, 'list': num is not None, 'runs': runs})
    chapters = []
    for para in paragraphs:
        if para['style'] == 'berschrift1':
            number = len(chapters) + 1
            assert para['text'].startswith(str(number) + '. ')
            chapters.append({'id': SLUGS[number - 1], 'heading': para, 'paragraphs': []})
        else:
            assert chapters
            chapters[-1]['paragraphs'].append(para)
    assert len(chapters) == 13
    return {'sourceName': Path(source).name, 'sourceSha256': hashlib.sha256(Path(source).read_bytes()).hexdigest(), 'chapters': chapters}


def rich(para):
    fragments = []
    for run in para['runs']:
        value = html.escape(run['text'])
        for flag, tag in [('b', 'strong'), ('i', 'em'), ('u', 'u')]:
            if run[flag]:
                value = f'<{tag}>{value}</{tag}>'
        fragments.append(value)
    return ''.join(fragments)


def render(data):
    result = []
    links = []
    for number, chapter in enumerate(data['chapters'], 1):
        slug, heading = chapter['id'], chapter['heading']
        label = LABELS[number - 1]
        assert label in heading['text'], 'Navigation label must come from the original heading'
        links.append(f'<li><a href="#{slug}" data-topic-link><span class="programme-link-number" aria-hidden="true">{number:02d}</span><span>{html.escape(label)}</span></a></li>')
        panel = []
        in_list = False
        in_progress = False
        for para in chapter['paragraphs']:
            if para['text'] == 'Fortschritt wird daran erkennbar, dass':
                if in_list:
                    panel.append('</ul>')
                    in_list = False
                panel.append(f'<div class="programme-outlook" role="group" aria-labelledby="progress-{slug}">')
                in_progress = True
            if para['list'] and not in_list:
                panel.append('<ul class="programme-list">')
                in_list = True
            elif not para['list'] and in_list:
                panel.append('</ul>')
                in_list = False
            subheading = not para['list'] and para['style'] == 'Measure' and any(run['b'] for run in para['runs'])
            tag = 'li' if para['list'] else 'h3' if subheading else 'p'
            extra = f' class="programme-progress" id="progress-{slug}"' if para['text'] == 'Fortschritt wird daran erkennbar, dass' else ''
            panel.append(f'<{tag} data-source-p="{para["index"]}"{extra}>{rich(para)}</{tag}>')
        if in_list:
            panel.append('</ul>')
        assert in_progress, f'Missing progress criteria: {slug}'
        panel.append('</div>')
        result.append(f'''<section class="programme-topic" id="{slug}">
  <h2 class="programme-heading"><button type="button" id="toggle-{slug}" data-topic-toggle aria-expanded="true" aria-controls="panel-{slug}" disabled><span data-source-p="{heading['index']}">{rich(heading)}</span><span class="topic-indicator" aria-hidden="true"></span></button></h2>
  <div class="programme-panel" id="panel-{slug}" aria-labelledby="toggle-{slug}">
    <div class="programme-reading"><div class="programme-permalink"><a href="#{slug}" aria-label="Direktlink zu {html.escape(heading['text'], quote=True)}"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m10 13 4-4m-7 1-2 2a4 4 0 0 0 6 6l2-2m-2-8 2-2a4 4 0 0 1 6 6l-2 2"/></svg>Direktlink</a></div>
      {''.join(panel)}
    </div>
  </div>
</section>''')
    return (ROOT / 'template.html').read_text().replace('{{CHAPTERS}}', '\n'.join(result)).replace('{{TOPIC_LINKS}}', '\n'.join(links))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--source', type=Path)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    data = extract(args.source) if args.source else json.loads((ROOT / 'content.json').read_text())
    result = render(data)
    if args.check:
        assert (ROOT / 'index.html').read_text() == result, 'Generated page differs from the source'
    else:
        (ROOT / 'content.json').write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
        (ROOT / 'index.html').write_text(result)
    print(json.dumps({'chapters': len(data['chapters']), 'paragraphs': sum(1 + len(c['paragraphs']) for c in data['chapters']), 'sourceSha256': data['sourceSha256'], 'check': args.check}))


if __name__ == '__main__':
    main()
