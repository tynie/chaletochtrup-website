/**
 * "Gut zu wissen": rezeptionsloser Betrieb, Schluesselcode, Zimmer, Lage als
 * vier Kacheln (1 Spalte mobil, 2 ab 560 px, 4 in voller Breite) und
 * darunter der deutliche Hinweis, dass es keine Verpflegung gibt.
 */
import { Icon } from '@chayns-components/core';
import { config } from '../config';
import { SectionHead } from './SectionHead';

export function Stay() {
    const { stay } = config;

    return (
        <section className="co-section" aria-labelledby="co-stay-title">
            <SectionHead id="co-stay-title" eyebrow={stay.eyebrow} title={stay.headline} text={stay.text} />
            <ul className="co-features">
                {stay.features.map((feature) => (
                    <li key={feature.title} className="co-feature">
                        <span className="co-feature__icon" aria-hidden="true">
                            <Icon icons={[feature.icon]} size={18} color="#ffffff" />
                        </span>
                        <span className="co-feature__title">{feature.title}</span>
                        <span className="co-feature__text">{feature.text}</span>
                    </li>
                ))}
            </ul>
            <div className="co-notice" role="note">
                <span className="co-notice__icon" aria-hidden="true">
                    <Icon icons={['fa fa-circle-info']} size={18} color="#732a23" />
                </span>
                <p>
                    <strong>{stay.notice.title}:</strong> {stay.notice.text}
                </p>
            </div>
        </section>
    );
}
