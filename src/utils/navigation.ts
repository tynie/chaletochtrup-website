/**
 * Navigation und Bildansicht ueber chayns-api. Muster aus den
 * Hamaland-Jazz-Club-Frontends (live im Pagemaker erprobt).
 */
import { openImage, openUrl, selectPage, type OpenImageItem } from 'chayns-api';
import { config, type SiteImage, type SitePageLink } from '../config';

/** Wartezeit, bevor die naechste Fallback-Stufe greift. */
const FALLBACK_DELAY_MS = 800;

/**
 * Prueft, ob diese Seite noch angezeigt wird. Hat der Seitenwechsel
 * geklappt, blendet die Host-Seite den iFrame aus oder entfernt ihn.
 */
function isStillVisible(): boolean {
    return document.documentElement.getBoundingClientRect().width > 0;
}

/** Leitet das oberste Fenster direkt auf die Adresse – letzte Stufe. */
function redirectTop(url: string): void {
    try {
        (window.top ?? window).location.href = url;
    } catch {
        window.location.href = url;
    }
}

export function sitePageUrl(link: SitePageLink): string {
    return `${config.siteUrl}${link.path}`;
}

/**
 * Wechselt zu einer Seite der eigenen chayns-Site:
 * 1. selectPage mit der Seiten-Id (ohne Neuladen, auch in der chayns-App).
 * 2. Ist die Seite danach noch sichtbar, openUrl im selben Fenster.
 * 3. Greift auch das nicht, wird das oberste Fenster direkt weitergeleitet.
 */
export function openSitePage(link: SitePageLink): void {
    const url = sitePageUrl(link);

    const stepThree = () => {
        if (isStillVisible()) redirectTop(url);
    };

    const stepTwo = () => {
        if (!isStillVisible()) return;
        openUrl({ url, sameWindow: true })
            .then(() => window.setTimeout(stepThree, FALLBACK_DELAY_MS))
            .catch(() => redirectTop(url));
    };

    selectPage({ id: link.id })
        .then(() => window.setTimeout(stepTwo, FALLBACK_DELAY_MS))
        .catch(stepTwo);
}

/** Oeffnet eine externe Adresse in einem neuen Tab bzw. im In-App-Browser der chayns-App. */
export function openExternalUrl(url: string): void {
    openUrl({ url, sameWindow: false }).catch(() => {
        window.open(url, '_blank', 'noopener');
    });
}

/** Zeigt die Fotos im chayns-Bild-Viewer, beginnend beim angeklickten. */
export function openImageGallery(images: readonly SiteImage[], startIndex = 0): void {
    // openImage verlangt mindestens ein Element (Tupel-Typ).
    const [first, ...rest] = images.map<OpenImageItem>(({ url, alt }) => ({ url, title: alt }));
    if (!first) return;
    openImage({ items: [first, ...rest], startIndex }).catch(() => {
        const image = images[startIndex] ?? images[0];
        if (image) window.open(image.url, '_blank', 'noopener');
    });
}
