# Wahlprogramm auf Staging

Route: `/themen/`. Nur auf `preview` veröffentlichen. Ausgangsstand: Live-Commit `6d9fdc80601e29a4d202ca726c8abe312f5ee7b5`. Die sechs Kurzthemen auf der Startseite bleiben erhalten.

## Inhaltspflege

`content.json` wurde direkt aus dem Original-DOCX extrahiert. Keine redaktionelle Bearbeitung. `build.py --source DATEI.docx` übernimmt Word-Absätze und Hervorhebungen; ohne Argument wird aus `content.json` gebaut. `build.py --source DATEI.docx --check` prüft, ob die HTML-Datei noch exakt daraus erzeugt ist.

`verify.py DATEI.docx` vergleicht unabhängig mit python-docx alle Absätze, ihre Reihenfolge, Aufzählungen sowie Fett-, Kursiv- und Unterstreichungsmerkmale im HTML. Nur Leerraum und technische Zeilenumbrüche werden beim Wortlautvergleich normalisiert. Für den Prüfer wird Python mit python-docx benötigt.

## Verhalten

13 Kapitel, mehrere gleichzeitig geöffnet, Enter/Leertaste, Tab und sichtbarer Fokus. Direktlinks öffnen das betreffende Kapitel. Beim Schließen langer Kapitel wird die Position des Auslösers erhalten. Ohne JavaScript bleiben alle Texte lesbar. Bewegungsreduktion wird berücksichtigt. Schriftvergrößerung passt die Kopfzeile über rem-basierte Containerabfragen an. Druck zeigt alle Kapitel.

## Gestalterische Weiterentwicklung

Persönliche Einleitung und 13 nummerierte Themenlinks außerhalb der Originalinhalte. Die Navigationslabels sind Teil der Originalüberschriften; `build.py` prüft diese Herkunft. Themenlinks öffnen das Kapitel, führen zur Überschrift und setzen dort den Tastaturfokus. Mehrere Kapitel bleiben gleichzeitig geöffnet. Die originalen Fortschrittskriterien sind pro Kapitel in einer benannten Gruppe mit Linie und dezenter Fläche zusammengefasst. Der PDF-Link öffnet vorläufig den vom Auftraggeber angegebenen Google-Drive-Ordner in einem neuen Tab, keinen direkten Download.

Der Drive-Ordner „GETUWK“ war am 25.10.2026 ohne Anmeldung erreichbar, zeigte in dieser anonymen Ansicht jedoch keine Dateien. Keine Nutzerstudie mit unbeteiligten Lesern durchgeführt; die dokumentierte Auffindbarkeitsprüfung ist eine eigene Browserprüfung.

## Geprüft

13 Kapitel, 241 Absätze, 55 Listenelemente, 65 Absätze mit Hervorhebungen. Keine Abweichungen bei Text, Reihenfolge und Hervorhebungen. Browserprüfung bei 320, 390, 768 und 1440 Pixeln mit sämtlichen Kapiteln geöffnet, ohne Textüberläufe. Zusätzlich 200 Prozent Schriftgröße bei 320 und 390 Pixeln. Alle 13 Direktlinks, mehrere offene Kapitel und Tastaturbedienung geprüft.

Für die Weiterentwicklung wurden dieselben vier Breiten zusätzlich mit 200 Prozent Schriftgröße und allen Kapiteln geöffnet geprüft. Alle 13 Themenlinks, Kapitel-Direktlink nach Neuladen, Enter, Leertaste, Tab und sichtbarer Fokus geprüft. Beim Schließen eines langen Kapitels blieb dessen Auslöser mit weniger als 1 Pixel Abweichung an derselben Bildschirmposition. Prüfberichte und Screenshots liegen außerhalb der veröffentlichten Dateien unter `qa/`.
