# Presse & Medien

Die Presseseite ist unter `/presse/` erreichbar. Sie wird zunächst ausschließlich auf dem Branch `preview` bereitgestellt.

## Pflege

- `articles.json` ist die zentrale Quelle für die sieben Wahlkampfbeiträge und vier Beiträge zu Wissenschaft und Engagement, den Pressekontakt und neue Artikel.
- Felder: ID, Titel, Medium, ISO-Datum, Typen, URL, Beschreibung, Kategorie und optional Featured-Kennzeichnung. Porträts verwenden den Typ `Artikel` und `format: "Porträt"`.
- `template.html` und `presse.css` enthalten Seitenstruktur und Gestaltung.
- Nach Änderungen aus dem Repository-Verzeichnis ausführen:

```sh
node presse/build.mjs
node --check presse/build.mjs
node presse/build.mjs --check
```

Die generierte `index.html` zusammen mit der Datenquelle committen. Die Seite funktioniert ohne JavaScript. Es sind keine zusätzlichen Pakete erforderlich. Der Generator prüft die 11 angeforderten IDs, eindeutige IDs/URLs, gültige Daten, Kategorien, Typen und drei Featured-Beiträge. Listen werden automatisch absteigend nach Datum sortiert. Beiträge ohne bekanntes Veröffentlichungsdatum verwenden `date: null`, stehen am Ende ihrer Liste und werden als „Ohne Datumsangabe“ gekennzeichnet.

## Inhalt und Quellenprüfung – 11.10.2026

- Die sieben Wahlkampfbeiträge bleiben erhalten. Die sieben früheren politischen Archivbeiträge wurden auf Wunsch durch die vier neuen Originalquellen ersetzt. Diese sind unter „Wissenschaft & Engagement“ verlinkt. Alle vier neuen Quellen wurden geöffnet und gelesen. Bei LVZ sind einzelne Details nur in der öffentlichen Vorschau sichtbar; dort nicht sichtbare Datumsangaben stammen aus dem Auftrag. Paywalls werden unverändert über den Originalartikel erreicht.
- Der TAG24-Beitrag „Loyalität gilt keinem Parteiprogramm“ trägt im Original den 22.09.2026. Dieses Datum wurde vom Auftraggeber bestätigt und übernommen.
- Pressekontakt: `kontakt@getu-abraham.de`, vom Auftraggeber bestätigt; die abweichende Schreibweise im Auftrag wurde korrigiert.
- Universität Leipzig: Biomarker-Beitrag vom 22.03.2021. Universitätsklinikum Leipzig: Putenherzen-Beitrag vom 19.12.2017. Universität Leipzig / idw: Auszeichnung vom 07.02.2008.
- Das herzkampf-Porträt hat kein erkennbares Veröffentlichungsdatum. Die Beschreibung beschränkt sich auf den Lebensweg und das gesellschaftliche Engagement; historische Parteizugehörigkeiten werden nicht als aktuell dargestellt.
- In der Navigation steht auf Startseite, Presseseite, Programm und Impressum wieder „Prof. Dr. Getu Abraham“. Die mobile Kopfzeile erlaubt einen natürlichen Namensumbruch neben dem Spendenbutton.
- Die Beschreibungen sind kurze, sachliche Zusammenfassungen. Keine vollständigen Medienartikel oder fremden Pressefotos wurden übernommen.
- Die drei optionalen Archivquellen sind nicht aufgenommen.
- Das Featured-Porträt verwendet ausschließlich das vorhandene Kampagnenbild. Externe Audio-/Video-Inhalte werden nicht eingebettet. Bestehende gemeinsame Website-Funktionen bleiben verfügbar.

## Prüfung und Veröffentlichung

Lokal geprüft: Desktop 1440px, Tablet 768px, Smartphones 390px und 320px; keine horizontalen Textüberläufe. Auf sehr schmalen Displays werden die fünf Navigationslinks ausgewogen auf 3 + 2 verteilt. Alle 11 Beiträge sind genau einmal vorhanden, Listen chronologisch sortiert, externe Links mit `target="_blank"` und `rel="noopener noreferrer"`, beide Kontaktlinks mit korrektem `mailto:`. Ein externer Artikel wurde durch tatsächlichen Klick im neuen Tab geöffnet; die Presseseite blieb geöffnet. Tastaturfokus auf Skip-Link und Artikelkarten ist sichtbar.

Das Projekt besitzt keinen separaten Typecheck oder Linter. Der Node-Generator, Syntaxcheck und Abgleich der generierten HTML-Datei wurden erfolgreich ausgeführt.

Die Presseseite erhält in der Preview bewusst `noindex, follow`. Vor einer separat freigegebenen Veröffentlichung in Produktion das Robots-Meta in `template.html` anpassen und die Seite neu generieren. SEO-Titel, Beschreibung, Canonical und strukturierte Daten sind bereits vorhanden. Es wurde kein Produktionsdeployment ausgelöst.

## Anpassung vom 12.10.2026

Radio Leipzig („Darum will ER …“) und LVZ (CDU-Fraktionsaustritt) auf Wunsch entfernt. TAG24 („Loyalität gilt keinem Parteiprogramm“, 22.09.2026) übernimmt den hervorgehobenen Platz und erscheint genau einmal. Einheitlicher Spendenbutton und Kontakt-Footer mit Instagram, Facebook, E-Mail und Impressum.
