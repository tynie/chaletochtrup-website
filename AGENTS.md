# Anleitung für Agenten (chayns.codes-IDE)

Dieses Repo enthält das Startseiten-Frontend des Chalet Hotel Ochtrup (chayns-Site `94109-14338`).
Es wird lokal entwickelt und in ein Frontend-Projekt der chayns.codes-IDE (create-chayns-app-Vorlage,
API v5) übernommen.

## Übernahme in das IDE-Projekt

1. Repo klonen (Branch `main`).
2. **`src/` komplett** in das IDE-Projekt übernehmen und gleichnamige Vorlagendateien überschreiben,
   insbesondere `src/index.tsx`, `src/index.html`, `src/components/App.tsx`,
   `src/components/AppWrapper.tsx`. Vorlagendateien, die es hier nicht gibt (z. B.
   `src/constants/serverUrls.ts`, `src/types/*.d.ts`), stehen lassen.
3. In der `package.json` des IDE-Projekts diese **Versionen exakt** setzen (übrige Einträge der Vorlage
   behalten):
   - dependencies: `@chayns-components/core 5.5.59`, `chayns-api 3.6.1`, `react 18.3.1`,
     `react-dom 18.3.1`, `styled-components ^6.1.0`, `motion ^12.4.1`, `@module-federation/enhanced ^2.4.0`
   - devDependencies: `@types/react ^18.3.0`, `@types/react-dom ^18.3.0`
4. **Nicht** übernehmen: `scripts/`, `media/`, `dist/`, `package-lock.json`, `tsconfig.json` (die Vorlage
   hat eine eigene; nur prüfen, dass `strict`, `jsx: react-jsx` und `moduleResolution: Bundler` gesetzt sind).
5. Bauen und prüfen, dass keine Typfehler auftreten.

## Wichtig

- `src/index.html` enthält absichtlich **keinen** `<script>`-Tag: Die IDE hängt `./index.js` beim Build
  selbst an. Keinen eigenen Script-Tag ergänzen (sonst wird die Seite doppelt gerendert).
- CSS steht als String in `src/styles.ts` und wird zur Laufzeit injiziert, es gibt keine `.css`-Dateien.
- Bilder werden aus `https://chayns.space/94109-14338/<Datei>` geladen. Die Dateien in `media/` werden
  von Hand in den chayns-Space hochgeladen und gehören nicht ins IDE-Projekt.
- Inhalte (Texte, Links, Bilder) nur in `src/config.ts` ändern.
