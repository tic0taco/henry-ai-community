# Wiederverwendungsentscheidung — 21.10.2026

Vorhandene Loesung: Der private Projektstand wurde einschliesslich erreichbarer Entwicklungsbranches, Manifestversionen, reiner Rechnungs-/Zeitregeln und Integrationsgrenzen geprueft. Die Hauptlinie enthaelt nur eine README; die Anwendung liegt auf Entwicklungsbranches.

Anpassungsaufwand: Ein Export der Anwendung wuerde interne Integrationen, betriebliche Dokumentation, persistente Datenmodelle und ungeklaerte Rechte in die Community Edition tragen. Eine Dateikopie mit anschliessendem Loeschen waere schwerer zu pruefen. Deshalb nur die allgemeine Idee der drei Demoablaeufe uebernehmen; keine privaten Quelldateien, Assets oder Historie kopieren.

Installierte Systeme: Fuer eine synthetische lokale Demo werden keine vorhandenen Betriebssysteme oder Dienste benoetigt oder angesprochen. Die vorhandene Oberflaechenidee mit Browser-JavaScript und Node bleibt ohne zusaetzliches Framework nutzbar.

Open Source: Node-Standardmodule decken den benoetigten HTTP-Server und die Tests ab. Ein zusaetzliches Framework, DMS, OCR-, Mail- oder Automatisierungspaket ist fuer den abgegrenzten Umfang nicht erforderlich. Drittanbieter-Assets werden nicht uebernommen.

Lizenz: Keine Projektlizenz fuer die private Anwendung nachgewiesen. Drittanbieterrechte werden durch Weglassen der Komponenten nicht zu pauschalen Rechten am Original. Diese Ausgabe bleibt bis zur Rechte- und Lizenzentscheidung UNLICENSED.

Eigenentwicklung notwendig: Ja, nur ein kleiner neuer Demokern fuer Oberflaeche, Summenbeispiel, Auftragsstatus und Timer. Keine Produktionsplattform neu entwickeln. Der genaue Umfang ist durch den Nutzerauftrag zur eigenstaendigen bereinigten Community Edition gedeckt.
