/**
 * CSS der Seite als String (statt .css-Datei), zur Laufzeit per
 * injectStyles() eingefuegt (siehe utils/injectStyles.ts).
 *
 * Markenfarben: Sandbeige #e6deca und Bordeaux #732a23, Seitenhintergrund
 * Weiss (wie auf chalet-ochtrup.de). Eigene Variablen tragen das Praefix
 * `--co-`. Ueberschriften in Cormorant Garamond, der Schriftzug im Header
 * ist das Logo; Fliesstext in der Site-Schrift (Site-Stylesheet).
 * Seitenrand: Der PageProvider setzt sein Standard-Padding hier nicht
 * (`shouldRemovePadding` in components/AppWrapper.tsx), damit Header und
 * Farbbaender oben und seitlich buendig sitzen. Den chayns-ueblichen
 * Seitenrand (16px, ab 33.5em 43px) bekommt nur `.co-band__inner`.
 * Regeln fuer Elemente, die das Site-Stylesheet ebenfalls stylt (h1-h3, p,
 * a), tragen das Praefix `.co-page`, damit sie Vorrang haben.
 */
export const appStyles = String.raw`
.co-page,
.co-page *,
.co-page *::before,
.co-page *::after {
    box-sizing: border-box;
}

/* Solange das Site-Stylesheet (Schriftart) laedt, Inhalt ausblenden
   (Klasse setzt utils/chaynsStylesheet.ts, Timeout 4 s). */
html.chayns-css-loading {
    opacity: 0;
}

.tapp,
#root {
    padding: 0 !important;
}

.co-page {
    --co-sand: #e6deca;
    --co-sand-deep: #d8cdb2;
    --co-wine: #732a23;
    --co-wine-dark: #561f1a;
    --co-ink: #3b2a26;
    --co-serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
    --co-radius: 4px;
    color: var(--co-ink);
    background: #ffffff;
    line-height: 1.6;
    overflow: hidden;
}

/* ---------------------------------------------------------------------
   Baender
   --------------------------------------------------------------------- */

.co-band {
    padding: 56px 0;
}

.co-band--plain {
    background: #ffffff;
}

.co-band--sand {
    background: var(--co-sand);
}

.co-band--wine {
    background: var(--co-wine);
    color: #ffffff;
}

.co-band__inner {
    padding: 0 16px;
}

@media (min-width: 33.5em) {
    .co-band {
        padding: 72px 0;
    }

    .co-band__inner {
        padding: 0 43px;
    }
}

/* ---------------------------------------------------------------------
   Sektionskopf
   --------------------------------------------------------------------- */

.co-section__head {
    text-align: center;
    max-width: 720px;
    margin: 0 auto 36px;
}

.co-page .co-eyebrow {
    margin: 0 0 8px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--co-wine);
}

.co-page .co-title {
    margin: 0;
    font-family: var(--co-serif);
    font-weight: 600;
    font-size: 32px;
    line-height: 1.15;
    color: var(--co-wine);
}

.co-ornament {
    display: block;
    width: 56px;
    height: 1px;
    margin: 18px auto 0;
    background: currentColor;
    color: var(--co-wine);
    opacity: 0.6;
    position: relative;
}

.co-ornament::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 7px;
    height: 7px;
    background: var(--co-wine);
    transform: translate(-50%, -50%) rotate(45deg);
}

.co-page .co-lead {
    margin: 18px 0 0;
    font-size: 17px;
}

.co-band--wine .co-eyebrow,
.co-band--wine .co-title {
    color: var(--co-sand) !important;
}

.co-band--wine .co-ornament,
.co-band--wine .co-ornament::after {
    color: var(--co-sand);
    background: var(--co-sand);
}

@media (min-width: 700px) {
    .co-page .co-title {
        font-size: 42px;
    }

    .co-page h1.co-title {
        font-size: 48px;
    }
}

/* ---------------------------------------------------------------------
   Header
   --------------------------------------------------------------------- */

/* Mobil feste Hoehe, ab 900 px 16:9. Nicht aspect-ratio mit min-height
   kombinieren: Die Mindesthoehe wird sonst auf die Breite uebertragen und
   der Header wird breiter als der iFrame. */
.co-hero {
    position: relative;
    width: 100%;
    height: 460px;
    background: var(--co-wine-dark);
    overflow: hidden;
}

@media (min-width: 900px) {
    .co-hero {
        height: auto;
        aspect-ratio: 16 / 9;
    }
}

.co-hero__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 45%;
    transform: scale(1.04);
    animation: co-hero-zoom 9s ease-out forwards;
}

.co-hero__overlay {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(ellipse at 50% 45%, rgba(40, 18, 14, 0.15) 0%, rgba(40, 18, 14, 0.45) 75%),
        linear-gradient(180deg, rgba(40, 18, 14, 0.05) 40%, rgba(40, 18, 14, 0.7) 100%);
}

.co-hero__content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px 24px 72px;
    text-align: center;
}

.co-hero__logo {
    width: min(78%, 420px);
    height: auto;
    filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.35));
    animation: co-fade-up 0.9s ease-out both;
}

.co-page .co-hero__tagline {
    margin: 18px 0 0;
    font-family: var(--co-serif);
    font-style: italic;
    font-weight: 500;
    font-size: 24px;
    color: #ffffff;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.55);
    animation: co-fade-up 0.9s 0.25s ease-out both;
}

.co-hero__scroll {
    position: absolute;
    left: 50%;
    bottom: 18px;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border: 0;
    background: none;
    color: #ffffff;
    font: inherit;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    cursor: pointer;
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.6);
    animation: co-fade-in 0.8s 0.8s ease-out both;
}

.co-hero__chevron {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border: 1px solid rgba(255, 255, 255, 0.75);
    border-radius: 50%;
    animation: co-bounce 2.2s ease-in-out infinite;
}

.co-hero__scroll:hover .co-hero__chevron,
.co-hero__scroll:focus-visible .co-hero__chevron {
    background: rgba(255, 255, 255, 0.18);
}

.co-hero__scroll:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
}

@media (min-width: 700px) {
    .co-page .co-hero__tagline {
        font-size: 30px;
    }
}

@keyframes co-hero-zoom {
    to {
        transform: scale(1);
    }
}

@keyframes co-fade-up {
    from {
        opacity: 0;
        transform: translateY(14px);
    }
    to {
        opacity: 1;
        transform: none;
    }
}

@keyframes co-fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes co-bounce {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(7px);
    }
}

@media (prefers-reduced-motion: reduce) {
    .co-hero__image,
    .co-hero__logo,
    .co-page .co-hero__tagline,
    .co-hero__scroll,
    .co-hero__chevron {
        animation: none;
        transform: none;
    }

    .co-hero__scroll {
        transform: translateX(-50%);
    }
}

/* ---------------------------------------------------------------------
   Buttons
   --------------------------------------------------------------------- */

.co-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 28px;
}

.co-actions--center {
    justify-content: center;
}

.co-page .co-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-height: 46px;
    padding: 0 24px;
    border: 1px solid transparent;
    border-radius: var(--co-radius);
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-decoration: none;
    cursor: pointer;
    opacity: 1;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
}

.co-page .co-btn:hover {
    opacity: 1;
    transform: translateY(-1px);
}

.co-page .co-btn--primary {
    background: var(--co-wine);
    border-color: var(--co-wine);
    color: #ffffff;
}

.co-page .co-btn--primary:hover {
    background: var(--co-wine-dark);
    border-color: var(--co-wine-dark);
}

.co-page .co-btn--outline {
    background: transparent;
    border-color: var(--co-wine);
    color: var(--co-wine);
}

.co-page .co-btn--outline:hover {
    background: rgba(115, 42, 35, 0.07);
}

.co-page .co-btn--light {
    background: var(--co-sand);
    border-color: var(--co-sand);
    color: var(--co-wine);
}

.co-page .co-btn--light:hover {
    background: #ffffff;
    border-color: #ffffff;
}

.co-page .co-btn--ghost {
    background: transparent;
    border-color: rgba(255, 255, 255, 0.6);
    color: #ffffff;
}

.co-page .co-btn--ghost:hover {
    background: rgba(255, 255, 255, 0.1);
}

/* ---------------------------------------------------------------------
   Willkommen
   --------------------------------------------------------------------- */

.co-intro__text {
    max-width: 680px;
    margin: 0 auto;
    text-align: center;
}

.co-intro__text .co-lead:first-child {
    margin-top: 0;
}

/* ---------------------------------------------------------------------
   Gut zu wissen
   --------------------------------------------------------------------- */

.co-features {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
}

.co-feature {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 28px 20px 24px;
    background: #ffffff;
    border-radius: var(--co-radius);
    box-shadow: 0 1px 2px rgba(59, 42, 38, 0.06), 0 8px 24px rgba(59, 42, 38, 0.06);
}

.co-feature__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    margin-bottom: 14px;
    border-radius: 50%;
    background: var(--co-wine);
}

.co-feature__title {
    font-family: var(--co-serif);
    font-size: 23px;
    font-weight: 600;
    line-height: 1.2;
    color: var(--co-wine);
}

.co-feature__text {
    margin-top: 8px;
    font-size: 15px;
}

.co-notice {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    max-width: 720px;
    margin: 28px auto 0;
    padding: 16px 20px;
    border: 1px solid rgba(115, 42, 35, 0.35);
    border-left: 4px solid var(--co-wine);
    border-radius: var(--co-radius);
    background: rgba(255, 255, 255, 0.55);
}

.co-notice__icon {
    flex: none;
    margin-top: 2px;
}

.co-page .co-notice p {
    margin: 0;
    font-size: 16px;
}

.co-notice strong {
    color: var(--co-wine);
}

@media (min-width: 560px) {
    .co-features {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* ---------------------------------------------------------------------
   Fotos (Mosaik: quer = 2 Spalten, hoch = 1 Spalte; gleiche Zeilenhoehe
   ueber aspect-ratio, Bilder per object-fit zugeschnitten)
   --------------------------------------------------------------------- */

.co-gallery {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-flow: dense;
    gap: 8px;
}

.co-gallery__cell--landscape {
    grid-column: span 2;
    aspect-ratio: 16 / 9;
}

.co-gallery__cell--portrait {
    aspect-ratio: 3 / 4;
}

.co-gallery__item {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    border-radius: var(--co-radius);
    overflow: hidden;
    background: var(--co-sand);
    cursor: zoom-in;
}

.co-gallery__item img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.co-gallery__item:hover img,
.co-gallery__item:focus-visible img {
    transform: scale(1.04);
}

.co-gallery__item:focus-visible {
    outline: 2px solid var(--co-wine);
    outline-offset: 2px;
}

@media (min-width: 700px) {
    .co-gallery {
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
    }

    /* Bei 4 Spalten gleiche Zeilenhoehe fuer quer (2 Spalten) und hoch (1 Spalte). */
    .co-gallery__cell--landscape {
        aspect-ratio: 2 / 1.12;
    }

    .co-gallery__cell--portrait {
        aspect-ratio: 1 / 1.12;
    }
}

/* ---------------------------------------------------------------------
   Kontakt & Anfahrt
   --------------------------------------------------------------------- */

.co-contact {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
}

.co-page .co-contact__card h3 {
    margin: 0 0 18px;
    font-family: var(--co-serif);
    font-size: 28px;
    font-weight: 600;
    color: #ffffff;
}

.co-contact__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 14px;
}

.co-contact__item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    font-size: 17px;
}

.co-contact__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 34px;
    height: 34px;
    border: 1px solid rgba(230, 222, 202, 0.5);
    border-radius: 50%;
}

.co-contact__item address {
    font-style: normal;
    padding-top: 4px;
}

.co-page .co-contact__link {
    padding-top: 4px;
    color: #ffffff;
    text-decoration: none;
    word-break: break-word;
}

.co-page .co-contact__link:hover {
    text-decoration: underline;
    opacity: 1;
}

.co-map {
    min-height: 300px;
    border-radius: var(--co-radius);
    overflow: hidden;
    background: var(--co-wine-dark);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.co-map iframe {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 300px;
    border: 0;
}

@media (min-width: 760px) {
    .co-contact {
        grid-template-columns: minmax(260px, 1fr) 1.4fr;
        align-items: stretch;
        gap: 40px;
    }

    .co-map,
    .co-map iframe {
        min-height: 360px;
    }
}

/* ---------------------------------------------------------------------
   Dunkelmodus der Site (colorMode 1): Sand- und Weissflaechen gedimmt,
   Bordeaux bleibt. Die Site laeuft aktuell hell (colorMode 2).
   --------------------------------------------------------------------- */

.co-page--dark {
    --co-ink: #ece6da;
    background: #1b1b1b;
}

.co-page--dark .co-band--plain {
    background: #1b1b1b;
}

.co-page--dark .co-band--sand {
    background: #2a2420;
}

.co-page--dark .co-feature {
    background: #332c27;
    box-shadow: none;
}

.co-page--dark .co-eyebrow,
.co-page--dark .co-title,
.co-page--dark .co-feature__title,
.co-page--dark .co-notice strong {
    color: var(--co-sand) !important;
}

.co-page--dark .co-ornament,
.co-page--dark .co-ornament::after {
    color: var(--co-sand);
    background: var(--co-sand);
}

.co-page--dark .co-notice {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(230, 222, 202, 0.3);
    border-left-color: var(--co-sand);
}

.co-page--dark .co-btn--outline {
    border-color: var(--co-sand);
    color: var(--co-sand);
}

/* ---------------------------------------------------------------------
   Volle Breite (Tapp-Einstellung "volle Breite" in chayns)
   Der iFrame ist dann so breit wie das Fenster; die normale Inhaltsspalte
   einer chayns-Site ist schmaler als 1100 px. Der Header bekommt eine feste
   Hoehe (keine vh-Einheiten: die iFrame-Hoehe folgt dem Inhalt), der
   Inhalt der Baender laeuft zentriert mit Seitenrand.
   --------------------------------------------------------------------- */

@media (min-width: 1100px) {
    .co-hero {
        aspect-ratio: auto;
        height: 620px;
    }

    .co-band__inner {
        width: 100%;
        max-width: 1120px;
        margin: 0 auto;
        padding: 0 32px;
    }

    .co-features {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (min-width: 1600px) {
    .co-hero {
        height: 720px;
    }
}
`;
