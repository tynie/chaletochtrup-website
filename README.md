# Chalet Hotel Ochtrup – Startseiten-Frontend (chayns.codes-Frontend)

React-Frontend für die chayns-Site des Chalet Hotel Ochtrup (Site `94109-14338`, LocationId `228493`,
Domain chalet-ochtrup.de). Aufbau nach dem Muster der Projekte Marktwirtschaft Telgte / Café Bloom
(`Chayns/chayns-storybook-doku/chayns-page-look-and-feel.md`).

## Aufbau der Seite

| Abschnitt | Datei | Inhalt |
| --- | --- | --- |
| Header | `src/sections/Hero.tsx` | Fassadenfoto bündig, ovales Logo, Leitsatz, Scroll-Hinweis „Entdecken“ (scrollt per `scrollToY` zum Willkommenstext) |
| Willkommen | `src/sections/Intro.tsx` | Willkommenstext, Buttons „Unsere Zimmer“ (Seite `zimmer`, Id 702132) und „Jetzt buchen“ (DIRS21) |
| Gut zu wissen | `src/sections/Stay.tsx` | Sandbeiges Band: Anreise 24/7, Schlüsselcode, Zimmer & Suiten, Lage; Hinweis „keine Verpflegung“ |
| Fotos | `src/sections/Gallery.tsx` | Mosaik (quer = 2 Spalten, hoch = 1), Klick öffnet den chayns-Bild-Viewer |
| Kontakt & Anfahrt | `src/sections/Contact.tsx` | Bordeaux-Band: Adresse, E-Mail, „Route planen“, Google-Maps-Einbettung |

- **Inhalte/Texte/Links**: `src/config.ts`
- **CSS**: `src/styles.ts` (Präfix `co-`; Sandbeige `#e6deca`, Bordeaux `#732a23`, Hintergrund Weiß)
- **Schriften**: Cormorant Garamond + Great Vibes über das Fontsource-CDN (`src/utils/fonts.ts`)
- **Navigation**: `src/utils/navigation.ts` (selectPage → openUrl → window.top)
- **Platz für die Zimmer-Vorschau** (Slider aus dem geplanten Zimmer-Frontend): in `src/App.tsx`
  zwischen „Gut zu wissen“ und den Fotos.

## Bilder hochladen (einmalig, wichtig!)

Die Seite lädt die Bilder aus der **Wurzel des chayns-Space** der Site:
`https://chayns.space/94109-14338/<Datei>`. Alle Dateien aus `media/` mit **exakt diesen Namen**
hochladen:

| Datei | Quelle (`Medien/…`) |
| --- | --- |
| `header.jpg` | `ChaletHeaderHeller.png` |
| `logo-chalet.png` | `chalet_logo_new.png` (zugeschnitten) |
| `aussen-einfahrt.jpg` | `Bilder/ChaletHead.jpg` |
| `aussen-eingang.jpg` | `Bilder/WIN_20191107_13_24_40_Pro.jpg` |
| `zimmer-rot.jpg` | `Bilder/IMG_20221206_140848.jpg` |
| `suite-badewanne.jpg` | `Bilder/IMG_20221206_141112.jpg` |
| `bad.jpg` | `Bilder/IMG_20221206_141143.jpg` |
| `zimmer-terrasse.jpg` | `Bilder/IMG_20221206_140939.jpg` |
| `zimmer-zweibett.jpg` | `Unbenannt-6.jpg` |
| `zimmer-einzel.jpg` | `Bilder/IMG_20221206_140952.jpg` |
| `zimmer-ausstattung.jpg` | `Bilder/IMG_20221206_141004.jpg` |

Wird ein Unterordner verwendet, `MEDIA_BASE_URL` in `src/config.ts` anpassen.

## Lokal bauen und ansehen

```powershell
npm install
npm run typecheck
npm run build          # esbuild -> dist/ (inkl. media/)
npm run serve          # http://localhost:5173/?mock=1
```

`?mock=1` (nur localhost) ersetzt chayns-api durch feste Werte; Bilder kommen dann aus `dist/media/`.
Dunkelmodus testen mit `?mock=1&colormode=1`.

## Übernahme in die chayns.codes-IDE

1. Frontend-Projekt (create-chayns-app-Vorlage, API v5) anlegen, **`src/**` komplett** übernehmen und die
   Vorlagendateien überschreiben (`src/index.tsx`, `src/components/App.tsx`, `src/components/AppWrapper.tsx`).
   `src/index.html` enthält bewusst keinen Script-Tag (die IDE hängt ihn selbst an).
2. `dependencies`/`devDependencies` aus `package.json` übernehmen (`@chayns-components/core 5.5.59`,
   `chayns-api 3.6.1`, React 18.3.1).
3. Als Tapp/Seite mit **API v5** einbinden. Für einen wirklich bündigen Header besser direkt als Tapp
   (volle Breite) statt als Pagemaker-Plugin (der Host setzt dort `margin-top: 35px`).

## Hinweise

- Header-Höhe: mobil 460 px, ab 900 px 16:9, ab 1100 px (volle Breite) 620 px, ab 1600 px 720 px.
  Keine `vh`-Einheiten (iFrame-Höhe folgt dem Inhalt) und kein `aspect-ratio` zusammen mit `min-height`
  (macht den Header breiter als den iFrame).
- Mosaik: Reihenfolge in `config.images.gallery` so, dass bei 4 Spalten volle Reihen entstehen
  (3 Quer- + 6 Hochformate).
- Die Google-Maps-Einbettung lädt Ressourcen von Google (Datenschutz); ggf. Zwei-Klick-Lösung.
