/**
 * Injiziert CSS zur Laufzeit statt per `import './x.css'`, damit es
 * unabhaengig davon funktioniert, wie der Bundler der chayns.codes-IDE
 * CSS-Importe behandelt.
 */

const injectedIds = new Set<string>();

/**
 * Fuegt einmalig ein `<style id="...">` mit dem uebergebenen CSS in
 * document.head ein. Wiederholte Aufrufe mit derselben id sind ein No-Op.
 * SSR-sicher: ohne `document` passiert nichts.
 */
export function injectStyles(id: string, css: string): void {
    if (typeof document === 'undefined') return;
    if (injectedIds.has(id)) return;
    if (document.getElementById(id)) {
        injectedIds.add(id);
        return;
    }

    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
    injectedIds.add(id);
}
