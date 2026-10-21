# Henry AI Community Edition

Eine kleine, eigenstaendige lokale Demo fuer Handwerksablaeufe: Rechnungsuebersicht, Auftragsstatus und Zeiterfassung. Alle Beispieldaten sind frei erfunden.

## Starten

Node.js ab Version 22 bereitstellen. Im Projektordner `npm start` ausfuehren und <http://127.0.0.1:4173> oeffnen. Mit Strg+C beenden. Keine Paketinstallation erforderlich.

`npm test` prueft Fachregeln und den lokalen HTTP-Server. `npm run check:release` prueft den vorbereiteten Dateiumfang und die neue Git-Historie.

## Ausprobieren

- Rechnungen: Eine Demo ist plausibel, eine hat eine Summenabweichung, einer fehlt der Demo-Nachweis. Ergebnisse sind keine steuerliche Pruefung oder Zahlungsfreigabe.
- Auftraege: Die Status-Schaltflaeche schaltet zwischen geplant, in Arbeit und erledigt.
- Arbeitszeit: Auftrag waehlen, starten, stoppen und fortsetzen. Ein Auftragswechsel setzt den Demo-Zaehler zurueck.
- Neuladen setzt alle Aenderungen zurueck. Es gibt keine Speicherung, Importe, freien Texteingaben oder externen Verbindungen.

Diese Ausgabe verwendet keine KI, OCR, Datenbank, produktiven Schnittstellen oder echten Dokumente. Henry AI ist der Projektname. Die Demo ist kein einsatzfertiges Betriebssystem und kein Notdienstsystem.

## Stand

Version 0.1.0. Der Quelltext wird zur Ansicht ohne Nutzungslizenz bereitgestellt. Diese Ausgabe ist damit derzeit kein Open-Source-Projekt. Es wird keine allgemeine Erlaubnis zur Nutzung, Bearbeitung oder Weiterverbreitung erteilt; gesetzliche Rechte und die GitHub-Plattformrechte bleiben unberuehrt. Siehe [Lizenzstatus](LICENSE-STATUS.md) und [Release-Regeln](docs/RELEASE.md).

Vertrauliche Daten duerfen niemals in das oeffentliche Repository gelangen. Siehe [Arbeitsregeln](AGENTS.md) und [Sicherheit](SECURITY.md).
