/**
 * Mock von `data`/`functions` fuer `<ChaynsProvider isModule>` im lokalen
 * Mock-Modus (siehe mockMode.ts). Uebernommen aus dem Doenerstation-Projekt
 * (Ahauser Doenerstation/code-website).
 *
 * Technischer Hintergrund (chayns-api@3.6.1, components/ChaynsProvider.js):
 *  - Ohne `isModule` waehlt ChaynsProvider im Browser immer AppWrapper oder
 *    FrameWrapper und wartet auf einen chayns-Host; `data`/`functions` werden
 *    dann ignoriert. Mit `isModule` verwendet er den ModuleFederationWrapper,
 *    der `data` als values und `functions` als functions uebernimmt.
 *  - ModuleFederationWrapper liest die Funktionen per Object.entries(); ein
 *    reiner Proxy ohne eigene Properties liefert dabei nichts. Deshalb ist die
 *    Zielstruktur ein konkretes Objekt mit allen bekannten Funktionsnamen
 *    (Standard: async () => undefined); der Proxy faengt nur unbekannte
 *    (zukuenftige) Namen ab.
 */
import { useMemo } from 'react';
import {
    AppFlavor,
    AppName,
    ColorMode,
    Environment,
    Font,
    Language,
    RuntimeEnvironment,
    ScreenSize,
    type ChaynsApiDevice,
    type ChaynsApiSite,
    type ChaynsReactFunctions,
    type ChaynsReactValues,
} from 'chayns-api';
import { config } from '../config';

/** Farbmodus der Site fuer die Vorschau per URL waehlen: ?colormode=1 (dunkel) bzw. 2 (hell). */
function readColorModeFromUrl(): ColorMode {
    try {
        const value = new URL(window.location.href).searchParams.get('colormode');
        if (value === '1') return ColorMode.Dark;
        if (value === '2') return ColorMode.Light;
    } catch {
        // kein window / ungueltige URL: Standard
    }
    return ColorMode.Classic;
}

/** Site-Farbe wie auf chalet-ochtrup.de (gemessen 29.10.2026), Farbmodus dort 2 (hell). */
const MOCK_SITE: ChaynsApiSite = {
    id: config.siteId,
    locationId: config.locationId,
    locationPersonId: '',
    color: '#452222',
    colorMode: readColorModeFromUrl(),
    dynamicFontSize: false,
    layoutDisposition: {
        barOnTop: true,
        barWide: false,
        contentWide: false,
        coverDetached: false,
        coverHidden: false,
        coverWide: false,
        docked: false,
    },
    domain: 'localhost',
    font: { id: Font.Roboto, dynamicFontSize: false, headlineFont: Font.Roboto },
    title: config.name,
    url: 'localhost',
    urlHash: 'mock',
    icon: '',
};

const MOCK_DEVICE: ChaynsApiDevice = {
    isTouch: false,
    screenSize: ScreenSize.LG,
    app: { name: AppName.Unknown, version: 1, appVersion: 1, callVersion: 5, flavor: AppFlavor.None },
};

function createMockValues(): ChaynsReactValues {
    return {
        site: MOCK_SITE,
        user: undefined,
        isAdminModeActive: false,
        pages: [],
        currentPage: { id: 1, siteId: config.siteId },
        device: MOCK_DEVICE,
        language: {
            site: Language.German,
            translation: null,
            device: Language.German,
            active: Language.German,
            user: undefined,
        },
        parameters: {},
        environment: { buildEnvironment: Environment.Development, runtimeEnvironment: RuntimeEnvironment.ChaynsWeb },
        customData: null,
        dialog: { dialogInput: undefined, isClosingRequested: false },
        chaynsApiId: 'mock',
    };
}

/** Alle von chayns-api@3.6.1 erwarteten Funktionsnamen (siehe IChaynsReact.d.ts), Standard: no-op. */
const FUNCTION_NAMES: (keyof ChaynsReactFunctions)[] = [
    'addGeoLocationListener',
    'addScrollListener',
    'addVisibilityChangeListener',
    'addToolbarChangeListener',
    'addWindowMetricsListener',
    'addAppleSafeAreaListener',
    'customCallbackFunction',
    'getAvailableSharingServices',
    'getAccessToken',
    'getCustomCookie',
    'getGeoLocation',
    'getUserInfo',
    'getScrollPosition',
    'getWindowMetrics',
    'getAppleSafeArea',
    'invokeCall',
    'invokePaymentCall',
    'invokeDialogCall',
    'isTrustedUrl',
    'login',
    'logout',
    'navigateBack',
    'openImage',
    'openUrl',
    'openVideo',
    'openMedia',
    'refreshData',
    'refreshAccessToken',
    'removeGeoLocationListener',
    'removeScrollListener',
    'removeVisibilityChangeListener',
    'removeToolbarChangeListener',
    'removeWindowMetricsListener',
    'removeAppleSafeAreaListener',
    'selectPage',
    'scrollToY',
    'sendMessageToGroup',
    'sendMessageToPage',
    'sendMessageToUser',
    'setAdminMode',
    'setCustomCookie',
    'setDisplayTimeout',
    'setFloatingButton',
    'setHeight',
    'setRefreshScrollEnabled',
    'setScanQrCode',
    'setTempDesignSettings',
    'setWaitCursor',
    'storageGetItem',
    'storageRemoveItem',
    'storageSetItem',
    'vibrate',
    'scrollByY',
    'setOverlay',
    'openDialog',
    'closeDialog',
    'setDialogResult',
    'dispatchEventToDialogClient',
    'addDialogClientEventListener',
    'removeDialogClientEventListener',
    'dispatchEventToDialogHost',
    'addDialogHostEventListener',
    'removeDialogHostEventListener',
    'addDialogCloseRequestListener',
    'removeDialogCloseRequestListener',
    'addAnonymousAccount',
    'addAccessTokenChangeListener',
    'removeAccessTokenChangeListener',
    'redirect',
];

const noop = async (): Promise<undefined> => undefined;

interface OpenUrlArgs {
    url?: string;
}

interface OpenImageArgs {
    items?: { url: string }[];
    startIndex?: number;
}

function createMockFunctions(): ChaynsReactFunctions {
    const base: Record<string, (...args: unknown[]) => Promise<unknown>> = {};
    for (const name of FUNCTION_NAMES) {
        base[name] = noop;
    }

    base.isTrustedUrl = async () => true;
    // PageProvider (useWindowMetrics in chayns-api) destrukturiert das Ergebnis
    // direkt; `undefined` fuehrt zu einem Laufzeitfehler, deshalb echte Werte.
    base.getWindowMetrics = async () => ({
        bottomBarHeight: 0,
        topBarHeight: 0,
        offsetTop: 0,
        windowHeight: window.innerHeight,
        pageHeight: document.documentElement.scrollHeight,
        pageWidth: window.innerWidth,
        pageSize: MOCK_DEVICE.screenSize,
    });
    // Externe Links und Bild-Viewer im Mock-Modus schlicht in einem neuen Tab oeffnen.
    base.openUrl = async (...args: unknown[]) => {
        const url = (args[0] as OpenUrlArgs | undefined)?.url;
        if (url) window.open(url, '_blank', 'noopener');
    };
    base.scrollToY = async (...args: unknown[]) => {
        window.scrollTo({ top: Number(args[0]) || 0, behavior: 'smooth' });
    };
    base.openImage = async (...args: unknown[]) => {
        const value = args[0] as OpenImageArgs | undefined;
        const url = value?.items?.[value.startIndex ?? 0]?.url;
        if (url) window.open(url, '_blank', 'noopener');
    };

    const proxy = new Proxy(base, {
        get(target, prop, receiver) {
            if (typeof prop === 'string' && !(prop in target)) {
                return noop;
            }
            return Reflect.get(target, prop, receiver);
        },
    });
    return proxy as unknown as ChaynsReactFunctions;
}

export interface MockChaynsResult {
    data: ChaynsReactValues;
    functions: ChaynsReactFunctions;
}

/** Liefert `data`/`functions` fuer `<ChaynsProvider isModule data={data} functions={functions}>`. */
export function useMockChayns(): MockChaynsResult {
    const data = useMemo(() => createMockValues(), []);
    const functions = useMemo(() => createMockFunctions(), []);
    return { data, functions };
}
