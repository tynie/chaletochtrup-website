/**
 * Laedt das Site-Stylesheet von chayns (Schriftart der Site, Grundelemente,
 * Absatzformate, Font-Awesome-Import) zur Laufzeit nach.
 *
 * Hintergrund (siehe Chayns/chayns-storybook-doku/chayns-page-look-and-feel.md):
 * chayns-toolkit fuegt in die index.html ein Script ein, das
 * `https://style.tobit.cloud/css/v<cssVersion>?siteId=<siteId>` nachlaedt.
 * Ohne dieses CSS fehlen Site-Schrift und Font Awesome; die `Icon`-Komponente
 * von @chayns-components/core rendert dann nur leere `<i>`-Elemente. Frontends
 * aus der chayns.codes-IDE (ohne Toolkit-CSS-Tag) muessen das selbst tun.
 *
 * Reihenfolge der Quellen wie im Toolkit: URL-Parameter `stylesiteid`/`siteid`
 * haben Vorrang, sonst die uebergebene Site-Id aus useSite(). `colormode`/
 * `color` nur, wenn ein Wert ermittelt werden konnte.
 */

const STYLESHEET_ELEMENT_ID = 'chayns-site-stylesheet';
const STYLESHEET_BASE_URL = 'https://style.tobit.cloud/css/v5.0';
/** Klasse am <html>, solange das Stylesheet laedt (verhindert Schrift-Flackern). */
const LOADING_CLASS = 'chayns-css-loading';
const LOADING_TIMEOUT_MS = 4000;

export interface EnsureChaynsStylesheetParams {
    /** Site-Id, siehe `useSite().id`. Nur verwendet, wenn kein URL-Parameter vorhanden ist. */
    siteId?: string;
    /** Site-Farbe (Hex), siehe `useSite().color`. */
    color?: string;
    /** Site-Farbmodus, siehe `useSite().colorMode`. */
    colorMode?: number | string;
}

/** Wie im chayns-toolkit: die gesamte Query-String klein geschrieben parsen. */
function readLowercasedSearchParams(): URLSearchParams | null {
    if (typeof window === 'undefined' || !window.location) return null;
    try {
        return new URLSearchParams(window.location.search.toLowerCase());
    } catch {
        return null;
    }
}

/** Liefert null, wenn keine Site-Id bekannt ist (dann wird nichts geladen). */
function buildStylesheetUrl(params: EnsureChaynsStylesheetParams): string | null {
    const query = readLowercasedSearchParams();

    const siteId = query?.get('stylesiteid') || query?.get('siteid') || params.siteId || '';
    if (!siteId) return null;

    const url = new URL(STYLESHEET_BASE_URL);
    url.searchParams.set('siteId', siteId);

    const colorMode = query?.get('colormode') || (params.colorMode !== undefined ? String(params.colorMode) : '');
    if (colorMode) url.searchParams.set('colormode', colorMode);

    const color = query?.get('color') || params.color || '';
    if (color) url.searchParams.set('color', color);

    return url.toString();
}

function markLoading(): () => void {
    const root = document.documentElement;
    root.classList.add(LOADING_CLASS);
    let done = false;
    const finish = () => {
        if (done) return;
        done = true;
        root.classList.remove(LOADING_CLASS);
    };
    window.setTimeout(finish, LOADING_TIMEOUT_MS);
    return finish;
}

/**
 * Fuegt (idempotent, id = `chayns-site-stylesheet`) ein `<link rel="stylesheet">`
 * auf das Site-Stylesheet in document.head ein bzw. aktualisiert bei erneutem
 * Aufruf mit geaenderten Parametern dessen href. Ohne bekannte Site-Id
 * passiert nichts. SSR-sicher.
 */
export function ensureChaynsStylesheet(params: EnsureChaynsStylesheetParams = {}): void {
    if (typeof document === 'undefined') return;

    const href = buildStylesheetUrl(params);
    if (!href) return;

    const existing = document.getElementById(STYLESHEET_ELEMENT_ID);

    if (existing instanceof HTMLLinkElement) {
        if (existing.href !== href) {
            const finish = markLoading();
            existing.onload = finish;
            existing.onerror = finish;
            existing.href = href;
        }
        return;
    }

    const finish = markLoading();
    const link = document.createElement('link');
    link.id = STYLESHEET_ELEMENT_ID;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    link.onload = finish;
    link.onerror = finish;
    document.head.appendChild(link);
}
