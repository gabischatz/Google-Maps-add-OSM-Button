# Google Maps Add-OSM-Button

Diese Version ist für die Chrome-Erweiterung **User JavaScript and CSS** vorbereitet.

## Beschreibung

Dieses Skript erweitert das Rechtsklick-Menü in **Google Maps** um zwei zusätzliche Einträge direkt unterhalb der Koordinatenanzeige:

- **Google Maps (Koordinaten) öffnen**
- **OpenStreetMap öffnen**

Damit kannst du Koordinaten aus dem Kontextmenü sofort in **Google Maps** oder **OpenStreetMap** öffnen, ohne die Werte erst manuell kopieren zu müssen.
## Erweiterung

**Chrome Web Store:**  
[User JavaScript and CSS](https://chromewebstore.google.com/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld?pli=1)

## Programmansicht

![User JavaScript and CSS – Programmansicht](programmansicht-user-javascript-and-css.png)

## Beschreibung

Dieses Skript erweitert das Rechtsklick-Menü in **Google Maps** um zwei zusätzliche Einträge direkt unterhalb der Koordinatenanzeige:

- **Google Maps (Koordinaten) öffnen**
- **OpenStreetMap öffnen**

Damit kannst du Koordinaten aus dem Kontextmenü sofort in **Google Maps** oder **OpenStreetMap** öffnen, ohne die Werte erst manuell kopieren zu müssen.

## Funktionen

- erkennt Koordinaten im Google-Maps-Kontextmenü
- fügt direkt darunter eigene Menüeinträge ein
- öffnet die Koordinaten in **Google Maps**
- öffnet die Koordinaten in **OpenStreetMap**
- funktioniert auch bei dynamischen Änderungen, da Google Maps eine SPA ist

## Geeignet für

- Nutzer, die regelmäßig zwischen Google Maps und OpenStreetMap wechseln
- schneller Vergleich von Kartenansichten
- Prüfung von Positionen in beiden Kartensystemen
- Arbeiten mit Koordinaten ohne Umweg über Copy & Paste

## Einrichten in der Erweiterung

### 1. Neue Regel anlegen
In **User JavaScript and CSS** eine neue Regel erstellen.

### 2. URL pattern festlegen

```text
https://www.google.com/maps/*
```

### 3. JavaScript einfügen
Den Inhalt deiner JavaScript-Datei in das linke JavaScript-Feld einfügen.

### 4. Speichern
Auf **Save** klicken und Google Maps neu laden.

## Funktionsweise

Das Skript sucht im Kontextmenü von Google Maps nach einem Eintrag, der wie Koordinaten aufgebaut ist, zum Beispiel:

```text
50.99319, 10.98913
```

Wird so ein Eintrag gefunden, werden darunter automatisch zwei zusätzliche Zeilen eingefügt:

- **🔍 Google Maps (Koordinaten) öffnen**
- **🗺️ OpenStreetMap öffnen**

## Technische Hinweise

- Google Maps lädt Inhalte dynamisch nach
- deshalb verwendet das Skript zusätzlich:
  - `MutationObserver`
  - einen Fallback mit `setInterval`
- doppelte Einträge werden per `dataset` verhindert

## Beispiel

Bei einem Rechtsklick auf die Karte erscheint unter dem Koordinaten-Eintrag zum Beispiel:

```text
50.99319, 10.98913
🔍 Google Maps (Koordinaten) öffnen
🗺️ OpenStreetMap öffnen
```

## Hinweis

Da Google Maps seine HTML-Struktur jederzeit ändern kann, muss das Skript bei künftigen Layout-Änderungen eventuell angepasst werden.

## Lizenz

Private oder freie Nutzung nach Bedarf.
