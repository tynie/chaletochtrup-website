/**
 * Scrollt zu einem Element der Seite. In chayns ist die Seite ein iFrame mit
 * Inhaltshoehe (bzw. ein Plugin im Pagemaker); scrollen muss deshalb der
 * Host. `scrollToY` aus chayns-api erwartet die Position relativ zum Anfang
 * des iFrames. Schlaegt der Aufruf fehl, wird lokal per scrollIntoView
 * gescrollt.
 */
import { scrollToY } from 'chayns-api';

const OFFSET = 16;
const DURATION_MS = 450;

export function scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (!element) return;
    const position = Math.max(0, element.getBoundingClientRect().top + window.scrollY - OFFSET);
    scrollToY(position, DURATION_MS).catch(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}
