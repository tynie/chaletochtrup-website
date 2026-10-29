/**
 * Laedt die Schriften der Startseite zur Laufzeit: eine klassische Serif
 * (Cormorant Garamond) fuer Ueberschriften und eine Schreibschrift
 * (Great Vibes) fuer den Schriftzug "Chalet Ochtrup", angelehnt an das
 * Logo (Medien/logo-text.png).
 *
 * Quelle ist das Fontsource-CDN auf jsDelivr (keine Google-Server). Fehlen
 * die Schriften, greifen die Fallbacks in styles.ts (Georgia bzw. cursive).
 */
import { injectStyles } from './injectStyles';

const FONTSOURCE_BASE_URL = 'https://cdn.jsdelivr.net/fontsource/fonts';

interface FontFile {
    family: string;
    slug: string;
    weight: number;
    style?: 'normal' | 'italic';
}

const FONT_FILES: FontFile[] = [
    { family: 'Cormorant Garamond', slug: 'cormorant-garamond', weight: 500 },
    { family: 'Cormorant Garamond', slug: 'cormorant-garamond', weight: 600 },
    { family: 'Cormorant Garamond', slug: 'cormorant-garamond', weight: 500, style: 'italic' },
    { family: 'Great Vibes', slug: 'great-vibes', weight: 400 },
];

function fontFace({ family, slug, weight, style = 'normal' }: FontFile): string {
    const base = `${FONTSOURCE_BASE_URL}/${slug}@5.2.5/latin-${weight}-${style}`;
    return `
@font-face {
    font-family: '${family}';
    font-style: ${style};
    font-weight: ${weight};
    font-display: swap;
    src: url('${base}.woff2') format('woff2'), url('${base}.woff') format('woff');
}`;
}

export function loadBrandFonts(): void {
    injectStyles('chalet-fonts', FONT_FILES.map(fontFace).join('\n'));
}
