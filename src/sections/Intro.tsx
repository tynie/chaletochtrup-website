/**
 * Willkommenstext mit zwei Aktionen: zur Seite "Zimmer" der Site und zur
 * Online-Buchung (DIRS21, neuer Tab bzw. In-App-Browser).
 */
import { ActionButton } from '../components/ActionButton';
import { config } from '../config';
import { openExternalUrl, openSitePage, sitePageUrl } from '../utils/navigation';
import { SectionHead } from './SectionHead';

export function Intro() {
    const { intro, pages, bookingUrl } = config;

    return (
        <section className="co-section co-intro" aria-labelledby="co-intro-title">
            <SectionHead id="co-intro-title" eyebrow={intro.eyebrow} title={intro.headline} level={1} />
            <div className="co-intro__text">
                {intro.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="co-lead">
                        {paragraph}
                    </p>
                ))}
            </div>
            <div className="co-actions co-actions--center">
                <ActionButton
                    href={sitePageUrl(pages.rooms)}
                    label={intro.roomsLabel}
                    icon="fa fa-bed"
                    onActivate={() => openSitePage(pages.rooms)}
                />
                <ActionButton
                    href={bookingUrl}
                    label={intro.bookingLabel}
                    icon="fa fa-calendar-check"
                    variant="outline"
                    isExternal
                    onActivate={() => openExternalUrl(bookingUrl)}
                />
            </div>
        </section>
    );
}
