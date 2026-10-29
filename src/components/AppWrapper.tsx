/**
 * Wurzel-Wrapper (in der chayns.codes-IDE-Vorlage meist
 * src/components/AppWrapper.tsx). Aufbau wie die offizielle
 * create-chayns-app-Vorlage: ChaynsProvider stellt den chayns-api-Kontext
 * bereit, PageProvider kapselt den ColorSchemeProvider.
 *
 * Den chayns-Seitenrand (Standard-Padding 35px 43px 30px) setzt der Provider
 * hier bewusst NICHT (`shouldRemovePadding`): Header-Foto und Farbbaender
 * sollen oben und seitlich buendig sitzen; den Seitenrand bekommt
 * nur der innere Container der Baender (`.co-band__inner`, styles.ts).
 * In einer Pagemaker-Seite (Plugin-Umgebung) laesst der PageProvider das
 * Padding ohnehin weg.
 *
 * siteId/color/colorMode werden explizit uebergeben, damit der Provider die
 * Design-Einstellungen der Site (Schriftgroessen, Absatzfarben, Icon-Stil)
 * nachlaedt, falls useStyleSettings() vom Host nichts liefert (siehe
 * Chayns/chayns-storybook-doku/chayns-page-look-and-feel.md).
 *
 * Zusaetzlich: eigene CSS-Styles zur Laufzeit injizieren (utils/injectStyles.ts)
 * und das chayns-Site-Stylesheet (Site-Schrift, Font Awesome) nachladen
 * (utils/chaynsStylesheet.ts).
 *
 * Mock-Modus (nur localhost + ?mock=1, siehe dev/mockMode.ts): chayns-api wird
 * durch feste Beispielwerte ersetzt, damit die Seite ohne chayns-Host im
 * Browser angesehen werden kann.
 */
import { useEffect } from 'react';
import { ChaynsProvider, useSite } from 'chayns-api';
import { PageProvider } from '@chayns-components/core';
import { App } from '../App';
import { appStyles } from '../styles';
import { injectStyles } from '../utils/injectStyles';
import { loadBrandFonts } from '../utils/fonts';
import { ensureChaynsStylesheet } from '../utils/chaynsStylesheet';
import { isMockMode } from '../dev/mockMode';
import { useMockChayns } from '../dev/mockChayns';
import { MockBanner } from '../dev/MockBanner';

injectStyles('chalet-styles', appStyles);
loadBrandFonts();

// So frueh wie moeglich anhand vorhandener URL-Parameter laden; sobald
// useSite() echte Werte liefert, wird die href in ChaynsStylesheetLoader
// aktualisiert.
ensureChaynsStylesheet({});

/** Aktualisiert das Site-Stylesheet, sobald Site-Id/Farbe/Farbmodus bekannt sind. */
function ChaynsStylesheetLoader() {
    const site = useSite();

    useEffect(() => {
        ensureChaynsStylesheet({ siteId: site.id, color: site.color, colorMode: site.colorMode });
    }, [site.id, site.color, site.colorMode]);

    return null;
}

function Root() {
    const site = useSite();
    return (
        <PageProvider
            siteId={site.id || undefined}
            color={site.color}
            colorMode={site.colorMode}
            shouldRemovePadding
        >
            <ChaynsStylesheetLoader />
            <App />
        </PageProvider>
    );
}

/**
 * `isModule` ist zwingend, damit ChaynsProvider im Browser den
 * ModuleFederationWrapper mit den uebergebenen data/functions verwendet
 * (statt auf einen chayns-Host zu warten), siehe dev/mockChayns.ts.
 */
function MockRoot() {
    const { data, functions } = useMockChayns();
    return (
        <ChaynsProvider isModule data={data} functions={functions}>
            <MockBanner />
            <Root />
        </ChaynsProvider>
    );
}

export function AppWrapper() {
    if (isMockMode()) {
        return <MockRoot />;
    }
    return (
        <ChaynsProvider>
            <Root />
        </ChaynsProvider>
    );
}

export default AppWrapper;
