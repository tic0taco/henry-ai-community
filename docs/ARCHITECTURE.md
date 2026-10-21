# Aufbau und Grenzen

Browser -> lokaler Node-HTTP-Server -> fest eingebaute synthetische JSON-Datei.

`server.mjs` verwendet ausschliesslich Node-Standardmodule. Nur die erlaubten HTML-, CSS-, JavaScript- und Demo-Ressourcen sind erreichbar. Quelltext ausserhalb von public, Dokumentation und Git-Metadaten sind nicht ueber HTTP erreichbar.

`public/domain.mjs` enthaelt reine Demo-Summenpruefung, Statuswechsel und Zeitfunktionen. Geldbetraege sind ganze Centwerte. Fehlende oder ungueltige Eingaben fuehren zur manuellen Pruefung. Das bedeutet keine gesetzliche Rechnungsvalidierung.

`public/app.mjs` zeigt die Beispiele und verwaltet Aenderungen nur im Browser-Arbeitsspeicher. Ein monotoner Timer summiert Laufzeiten ueber Pausen; ein Auftragswechsel setzt die Summe zurueck. Es gibt keine Service Worker oder Offline-Caches. Nach dem ersten lokalen Seitenaufruf wird kein Internetzugang benoetigt.

Es gibt keine KI-Modelle, Mail-, Telefonie-, DMS-, Buchhaltungs-, Fernwartungs- oder Automatisierungsadapter. Diese Ausgabe kann keine Rechnungen senden, Zahlungen freigeben oder operative Alarme uebernehmen.
