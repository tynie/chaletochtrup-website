/**
 * Kontakt & Anfahrt im Bordeaux-Band: Adresse und E-Mail, Buttons "Route
 * planen" (Google Maps ueber openUrl, damit es auch in der chayns-App
 * korrekt oeffnet) und "E-Mail schreiben", daneben die Google-Maps-
 * Einbettung aus config.ts.
 */
import { Icon } from '@chayns-components/core';
import { ActionButton } from '../components/ActionButton';
import { config } from '../config';
import { openExternalUrl } from '../utils/navigation';
import { SectionHead } from './SectionHead';

const ICON_COLOR = '#e6deca';

export function Contact() {
    const { contact } = config;
    const address = `${contact.street}, ${contact.zip} ${contact.city}`;
    const mailHref = `mailto:${contact.email}`;

    return (
        <section className="co-section" aria-labelledby="co-contact-title">
            <SectionHead id="co-contact-title" eyebrow={contact.eyebrow} title={contact.headline} />
            <div className="co-contact">
                <div className="co-contact__card">
                    <h3>{contact.name}</h3>
                    <ul className="co-contact__list">
                        <li className="co-contact__item">
                            <span className="co-contact__icon" aria-hidden="true">
                                <Icon icons={['fa fa-location-dot']} size={15} color={ICON_COLOR} />
                            </span>
                            <address>
                                {contact.street}
                                <br />
                                {contact.zip} {contact.city}
                            </address>
                        </li>
                        <li className="co-contact__item">
                            <span className="co-contact__icon" aria-hidden="true">
                                <Icon icons={['fa fa-envelope']} size={15} color={ICON_COLOR} />
                            </span>
                            <a className="co-contact__link no-link-style" href={mailHref}>
                                {contact.email}
                            </a>
                        </li>
                    </ul>
                    <div className="co-actions">
                        <ActionButton
                            href={contact.mapsDirectionsUrl}
                            label="Route planen"
                            icon="fa fa-route"
                            variant="light"
                            isExternal
                            onActivate={() => openExternalUrl(contact.mapsDirectionsUrl)}
                        />
                        <ActionButton href={mailHref} label="E-Mail schreiben" icon="fa fa-envelope" variant="ghost" />
                    </div>
                </div>
                <div className="co-map">
                    <iframe
                        src={contact.mapsEmbedUrl}
                        title={`Karte: ${contact.name}, ${address}`}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                    />
                </div>
            </div>
        </section>
    );
}
