# ArkTribeBot
Bei diesem Bot handelt es ich um ein kleines Fan-Projekt.

Grundsätzlich sollte mit dem Bot eine kleine Übersicht in ARK-Clustern geschaffen werden.  
Also wo Tribes Ihre Basen haben, wer in welchem Tribe ist, wieviele Tibes es gibt etc.

Natürlich ist hier jeder selbst gefragt, seine Daten zu pflegen.

# Eine Liste der verfügbaren Commands:

## Admin

| Command   | Parameter/s           | Parameter-Description  |
|-----------|:----------------------|:-----------------------|
| **`/create-map`**<br>_Erstellt eine Map_ | `map-name`<br>&nbsp; | Der Name den die Map hat. Zb The Island, The Center....<br>&nbsp; |
| **`/create-server`**<br>_Erstellt einen Server_ | `server-name`<br>`map-name` | Names des Servers zb ASA 1, ASA 2, etc.<br>Auswahl an erstellen Maps |
| **`/delete-map`**<br>_Löscht eine erstellte Map_ | `map-name`<br>&nbsp; | Auswahl an erstellen Maps<br>&nbsp; |
| **`/delete-server`**<br>_Löscht einen erstellten Server_ | `server-name`<br>&nbsp; | Auswahl an erstellen Servern<br>&nbsp; |
| **`/delete-tribe`**<br>_Löscht einen erstellten Tribe*_ | `tribe-name`<br>&nbsp; | Auswahl an erstellen Tribes<br>&nbsp; |

*Um den Missbruach dieser Funktion zu verhindern, ist das löschen von Tribes nur Admins vorbehalten.
## User

| Command   | Parameter/s           | Parameter-Description  |
|-----------|:----------------------|:-----------------------|
| **`/create-tribe`**<br>_Erstellt einen Tribe_ | `tribe-name`<br>&nbsp; | Name des zu erstellenden Tribes<br>&nbsp; |
| **`/join-tribe`**<br>_Einem Tribe beitreten_ | `tribe-name`<br>&nbsp; | Auswahl an erstellen Tribes<br>&nbsp; |
| **`/leave-tribe`**<br>_Einen Tribe verlassen_ | `tribe-name`<br>&nbsp; | Auswahl an erstellen Tribes<br>&nbsp; |
| **`/update-tribe-coords`**<br>_Koordinaten der MainBase aktualisieren_ | `lat`<br>`lon` | Lat Wert (mit Komma)<br>Lon Wert (mit Komma) |
| **`/update-tribe-server`**<br>_Server der MainBase aktualisieren_ | `server-name`<br>&nbsp; | Auswahl an erstellen Servern<br>&nbsp; |