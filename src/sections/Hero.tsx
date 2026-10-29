/**
 * Header: Foto der Fassade (buendig oben und seitlich) mit weichem Verlauf,
 * mittig das ovale Logo und der Leitsatz, am unteren Rand der Scroll-Hinweis
 * (Text + wippender Pfeil), der zur Einleitung scrollt.
 *
 * Die Hoehe folgt dem Seitenverhaeltnis (styles.ts), nicht `vh`: Der chayns-
 * iFrame ist so hoch wie sein Inhalt, `vh` wuerde eine Rueckkopplung erzeugen.
 */
import { Icon } from '@chayns-components/core';
import { config } from '../config';
import { scrollToElement } from '../utils/scroll';

export const INTRO_ANCHOR_ID = 'co-willkommen';

export function Hero() {
    return (
        <header className="co-hero">
            <img
                className="co-hero__image"
                src={config.images.hero}
                alt="Das Chalet Hotel Ochtrup an der Gronauer Straße"
                fetchPriority="high"
            />
            <div className="co-hero__overlay" aria-hidden="true" />
            <div className="co-hero__content">
                <img className="co-hero__logo" src={config.images.logo} alt={config.name} />
                <p className="co-hero__tagline">{config.hero.tagline}</p>
            </div>
            <button
                type="button"
                className="co-hero__scroll"
                onClick={() => scrollToElement(INTRO_ANCHOR_ID)}
                aria-label="Zum Willkommenstext scrollen"
            >
                <span>{config.hero.scrollHint}</span>
                <span className="co-hero__chevron" aria-hidden="true">
                    <Icon icons={['fa fa-chevron-down']} size={16} color="#ffffff" />
                </span>
            </button>
        </header>
    );
}
