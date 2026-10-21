# Veroeffentlichung nur mit ausdruecklicher Freigabe

1. Ausschliesslich den Inhalt dieses eigenstaendigen Repositories pruefen. Niemals die private Quelle, die lokalen Pruefberichte, Arbeitsordner oder uebergeordnete Verzeichnisse hochladen.
2. `npm test` und `npm run check:release` erfolgreich ausfuehren. Jede Datei und den gesamten neuen Commit manuell auf vertrauliche Inhalte pruefen. Musterpruefungen allein reichen nicht.
3. Lizenzstatus mit dem Nutzer klaeren und wahrheitsgemaess dokumentieren. Die erste Ausgabe wird auf ausdruecklichen Nutzerwunsch ohne Nutzungslizenz bereitgestellt. Vor einer spaeteren Lizenzvergabe Rechteinhaberschaft und Lizenz gesondert klaeren, die Lizenzdatei und den Release-Check gezielt anpassen und erneut pruefen.
4. Exakten Commit, Dateiliste, Archiv-SHA256 und Testnachweis zur Freigabe vorlegen. Zielrepository, Sichtbarkeit und genauer Umfang muessen Teil der Freigabe sein.
5. Erst nach dieser ausdruecklichen Freigabe ein getrenntes oeffentliches Repository erstellen und ausschliesslich die freigegebene neue Historie uebertragen. Jede spaetere oeffentliche Veroeffentlichung braucht erneut ausdrueckliche Freigabe.

Die erste Ausgabe verwendet genau einen neuen Root-Commit. Fuer die Pruefung vor dem ersten Upload ist kein Remote eingerichtet. Es gibt keine Workflows, Deployments, Publish-Skripte oder privaten Submodule. Der Release-Check meldet immer `publicationApproved: false`; er kann eine menschliche Freigabe nicht feststellen, und ein technischer Erfolg ist keine Veroeffentlichungsfreigabe. Die erste oeffentliche Veroeffentlichung nach tic0taco/henry-ai-community wurde vom Nutzer am 21.10.2026 ausdruecklich beauftragt, zunaechst ohne Nutzungslizenz.

Der technische Dateifilter lehnt unbekannte Dateien, Symlinks, Binaerdateien, einige Geheimnismuster, externe Abhaengigkeiten und abweichende Git-Zustaende ab. Er ist eine Zusatzkontrolle und kein umfassender Secret-Scanner oder rechtlicher Nachweis. Die Dateiliste muss bei jeder Erweiterung bewusst geprueft werden.
