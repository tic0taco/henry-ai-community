# Sicherheit und Vertraulichkeit

Vertrauliche Daten duerfen niemals in ein oeffentliches Repository. Nur frei erfundene Demo-Daten sind erlaubt. Das gilt fuer Quelltext, Tests, Dokumentation, Bilder, Issues, Logs, Archive und die gesamte Git-Historie.

Die Demo bindet fest an 127.0.0.1, stellt nur fuenf fest benannte Ressourcen bereit und akzeptiert nur GET/HEAD. Es gibt keine Datenbank, Uploads, externen Skripte, Telemetrie, Integrationen oder gespeicherten Nutzerdaten. Die Browser-Oberflaeche setzt Texte ueber textContent. Die Content Security Policy beschraenkt Ressourcen auf die lokale Herkunft. Kein Zugriff auf Produktivsysteme ist erforderlich.

Die Demo besitzt keine Anmeldung oder Mandantentrennung. Sie ist nur fuer lokale synthetische Vorfuehrungen bestimmt. Nicht im Netzwerk bereitstellen oder mit echten Daten erweitern, ohne das Sicherheitskonzept erneut zu pruefen.

Bei einem Verdacht keine vertraulichen Inhalte in oeffentliche Issues oder Kommentare schreiben. Die verantwortliche Person ueber einen bereits bekannten privaten Kanal informieren. Falls Zugangsdaten veroeffentlicht wurden, muessen diese widerrufen beziehungsweise rotiert werden; eine Dateiloeschung allein reicht nicht.
