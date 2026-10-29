/**
 * Erkennung des lokalen Mock-Modus: Die chayns-api wird durch feste Werte
 * ersetzt (siehe mockChayns.ts), damit die Seite ohne chayns-Host im Browser
 * angesehen werden kann (npm run build && npm run serve).
 *
 * Aktiv AUSSCHLIESSLICH, wenn beide Bedingungen erfuellt sind:
 *   1. `window.location.hostname` ist "localhost" oder "127.0.0.1".
 *   2. Der Query-Parameter `mock=1` ist gesetzt.
 * In jeder anderen Umgebung (insbesondere in chayns) liefert isMockMode()
 * immer false.
 */
export function isMockMode(): boolean {
    if (typeof window === 'undefined') return false;
    const { hostname } = window.location;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') return false;
    try {
        return new URL(window.location.href).searchParams.get('mock') === '1';
    } catch {
        return false;
    }
}
