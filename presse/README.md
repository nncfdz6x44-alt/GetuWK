# Presse & Medien

Die Presseseite ist unter `/presse/` erreichbar. Sie wird zunächst ausschließlich auf dem Branch `preview` bereitgestellt.

## Pflege

- `articles.json` ist die zentrale Quelle für alle 16 Kernbeiträge, den Pressekontakt und neue Artikel.
- Felder: ID, Titel, Medium, ISO-Datum, Typen, URL, Beschreibung, Kategorie und optional Featured-Kennzeichnung. Porträts verwenden den Typ `Artikel` und `format: "Porträt"`.
- `template.html` und `presse.css` enthalten Seitenstruktur und Gestaltung.
- Nach Änderungen aus dem Repository-Verzeichnis ausführen:

```sh
node presse/build.mjs
node --check presse/build.mjs
node presse/build.mjs --check
```

Die generierte `index.html` zusammen mit der Datenquelle committen. Die Seite funktioniert ohne JavaScript. Es sind keine zusätzlichen Pakete erforderlich. Der Generator prüft die 16 Kern-IDs, eindeutige IDs/URLs, gültige Daten, Kategorien, Typen und drei Featured-Beiträge. Listen werden automatisch absteigend nach Datum sortiert.

## Inhalt und Quellenprüfung – 11.10.2026

- Alle 16 Quellen aus dem Auftrag wurden geöffnet. Bei LVZ sind einzelne Details nur in der öffentlichen Vorschau sichtbar; dort nicht sichtbare Datumsangaben stammen aus dem Auftrag. Paywalls werden unverändert über den Originalartikel erreicht.
- Der TAG24-Beitrag „Loyalität gilt keinem Parteiprogramm“ trägt im Original den 22.09.2026. Dieses Datum wurde vom Auftraggeber bestätigt und übernommen.
- Pressekontakt: `kontakt@getu-abraham.de`, vom Auftraggeber bestätigt; die abweichende Schreibweise im Auftrag wurde korrigiert.
- Beim LZ-Artikel vom 09.11.2024 leitete `?lrm_logout=1` im Browser zur Startseite weiter. Der Logout-Zusatz wurde entfernt. Der identische Originalartikel ohne diesen Zusatz wurde mit Titel und Datum im Browser verifiziert.
- Die Beschreibungen sind kurze, sachliche Zusammenfassungen. Keine vollständigen Medienartikel oder fremden Pressefotos wurden übernommen.
- Die drei optionalen Archivquellen sind nicht aufgenommen.
- Das Featured-Porträt verwendet ausschließlich das vorhandene Kampagnenbild. Externe Audio-/Video-Inhalte werden nicht eingebettet. Bestehende gemeinsame Website-Funktionen bleiben verfügbar.

## Prüfung und Veröffentlichung

Lokal geprüft: Desktop 1440px, Tablet 768px, Smartphones 390px und 320px; keine horizontalen Textüberläufe. Auf sehr schmalen Displays werden die fünf Navigationslinks ausgewogen auf 3 + 2 verteilt. Alle 16 Beiträge sind genau einmal vorhanden, Listen chronologisch sortiert, externe Links mit `target="_blank"` und `rel="noopener noreferrer"`, beide Kontaktlinks mit korrektem `mailto:`. Ein externer Artikel wurde durch tatsächlichen Klick im neuen Tab geöffnet; die Presseseite blieb geöffnet. Tastaturfokus auf Skip-Link und Artikelkarten ist sichtbar.

Das Projekt besitzt keinen separaten Typecheck oder Linter. Der Node-Generator, Syntaxcheck und Abgleich der generierten HTML-Datei wurden erfolgreich ausgeführt.

Die Presseseite erhält in der Preview bewusst `noindex, follow`. Vor einer separat freigegebenen Veröffentlichung in Produktion das Robots-Meta in `template.html` anpassen und die Seite neu generieren. SEO-Titel, Beschreibung, Canonical und strukturierte Daten sind bereits vorhanden. Es wurde kein Produktionsdeployment ausgelöst.
