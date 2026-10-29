/**
 * Hinweisleiste oberhalb der Seite im Mock-Modus (siehe mockMode.ts), damit
 * die lokale Vorschau nie mit der echten chayns-Seite verwechselt wird.
 */
import { ColorMode, useSite } from 'chayns-api';
import { injectStyles } from '../utils/injectStyles';

const MOCK_BANNER_CSS = `
.co-mock-banner {
    background: #b45309;
    color: #fff;
    font-size: 13px;
    text-align: center;
    padding: 4px 8px;
    font-family: sans-serif;
}
/* In chayns liefert die Site den Seitenhintergrund (cw-body-background);
   fuer die Vorschau hier wie auf chalet-ochtrup.de weiss nachgestellt, im Dunkelmodus
   (?colormode=1) dunkel. */
body.co-mock-light {
    background: #ffffff;
}
body.co-mock-dark {
    background: #1b1b1b;
}
`;

injectStyles('chalet-mock-banner-styles', MOCK_BANNER_CSS);

export function MockBanner() {
    const site = useSite();
    const isDark = site.colorMode === ColorMode.Dark;
    document.body.classList.toggle('co-mock-dark', isDark);
    document.body.classList.toggle('co-mock-light', !isDark);
    return (
        <div className="co-mock-banner">
            Mock-Modus – lokale Vorschau ohne chayns-Host{isDark ? ' (Dunkelmodus)' : ''}
        </div>
    );
}
