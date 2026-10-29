"""Independently compare rendered HTML paragraphs with python-docx source text."""
import argparse
import hashlib
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from docx import Document


class SourceParagraphs(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.records = []
        self.stack = []
        self.active = None

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        self.stack.append(tag)
        if 'data-source-p' in values:
            assert self.active is None
            self.active = {'index': int(values['data-source-p']), 'tag': tag, 'text': '', 'characters': [], 'depth': len(self.stack)}

    def handle_endtag(self, tag):
        if self.active and len(self.stack) == self.active['depth']:
            self.records.append(self.active)
            self.active = None
        if self.stack:
            # Void elements do not occur inside source paragraphs.
            if tag in self.stack:
                self.stack = self.stack[:len(self.stack) - self.stack[::-1].index(tag) - 1]

    def handle_startendtag(self, tag, attrs):
        pass

    def handle_data(self, text):
        if self.active:
            self.active['text'] += text
            flags = ('strong' in self.stack, 'em' in self.stack, 'u' in self.stack)
            self.active['characters'].extend((c, *flags) for c in text if not c.isspace())


def verify(source, html):
    doc = Document(source)
    parser = SourceParagraphs()
    parser.feed(Path(html).read_text())
    expected = [(i, p) for i, p in enumerate(doc.paragraphs) if p.text.strip()]
    assert len(expected) == len(parser.records), (len(expected), len(parser.records))
    chapters = lists = highlighted = 0
    for (index, para), record in zip(expected, parser.records):
        assert record['index'] == index, f'Paragraph order differs at {index}'
        normalize = lambda text: re.sub(r'\s+', ' ', text).strip()
        assert normalize(para.text) == normalize(record['text']), f'Text differs in paragraph {index}'
        is_list = para._p.find('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}pPr/{http://schemas.openxmlformats.org/wordprocessingml/2006/main}numPr') is not None
        assert is_list == (record['tag'] == 'li'), f'List structure differs at {index}'
        lists += is_list
        chapters += para.style.name == 'Heading 1'
        characters = []
        for run in para.runs:
            flags = (bool(run.bold if run.bold is not None else para.style.font.bold), bool(run.italic if run.italic is not None else para.style.font.italic), bool(run.underline))
            characters.extend((c, *flags) for c in run.text if not c.isspace())
        assert characters == record['characters'], f'Emphasis differs in paragraph {index}'
        highlighted += any(c[1] or c[2] or c[3] for c in characters)
    result = {'chapters': chapters, 'paragraphs': len(expected), 'listItems': lists, 'highlightedParagraphs': highlighted, 'textDifferences': 0, 'emphasisDifferences': 0, 'orderDifferences': 0, 'sourceSha256': hashlib.sha256(Path(source).read_bytes()).hexdigest()}
    assert chapters == 13 and len(expected) == 241 and lists == 55
    return result


if __name__ == '__main__':
    cli = argparse.ArgumentParser()
    cli.add_argument('source', type=Path)
    cli.add_argument('--html', type=Path, default=Path(__file__).with_name('index.html'))
    cli.add_argument('--report', type=Path)
    args = cli.parse_args()
    result = verify(args.source, args.html)
    output = json.dumps(result, ensure_ascii=False, indent=2)
    print(output)
    if args.report:
        args.report.write_text(output + '\n')
