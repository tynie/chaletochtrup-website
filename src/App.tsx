/**
 * Startseite des Chalet Hotel Ochtrup: Header-Foto mit Scroll-Hinweis,
 * Willkommenstext, "Gut zu wissen" (Anreise 24/7, Schluesselcode, keine
 * Verpflegung), Fotos vom Hotel, Kontakt & Anfahrt mit Karte. Inhalte aus
 * config.ts, Styles aus styles.ts.
 *
 * Layout: Abschnitte in Farbbaendern ueber die volle Breite
 * (components/Band.tsx) – Weiss, Sandbeige, Weiss, Bordeaux als Abschluss.
 * Platz fuer eine spaetere Zimmer-Vorschau (Slider aus dem Zimmer-Frontend):
 * zwischen "Gut zu wissen" und den Fotos, auf Weiss.
 */
import { ColorMode, useSite } from 'chayns-api';
import { Band } from './components/Band';
import { Hero, INTRO_ANCHOR_ID } from './sections/Hero';
import { Intro } from './sections/Intro';
import { Stay } from './sections/Stay';
import { Gallery } from './sections/Gallery';
import { Contact } from './sections/Contact';

export function App() {
    const site = useSite();
    const isDark = site.colorMode === ColorMode.Dark;

    return (
        <main className={`co-page${isDark ? ' co-page--dark' : ''}`}>
            <Hero />
            <Band id={INTRO_ANCHOR_ID}>
                <Intro />
            </Band>
            <Band tone="sand">
                <Stay />
            </Band>
            <Band>
                <Gallery />
            </Band>
            <Band tone="wine">
                <Contact />
            </Band>
        </main>
    );
}

export default App;
