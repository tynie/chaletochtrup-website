/**
 * Entry-Point (in der chayns.codes-IDE-Vorlage meist src/index.tsx).
 * Sucht ein DOM-Element mit id="root" oder id="app", legt sonst selbst ein
 * div#root an und rendert <AppWrapper />.
 *
 * Schutz gegen doppelte Ausfuehrung: Wird das Bundle zweimal eingebunden
 * (z. B. eigener Script-Tag in index.html plus der von der IDE erzeugte),
 * wuerde die Seite zweimal gerendert. Der Container wird deshalb markiert und
 * beim zweiten Durchlauf uebersprungen.
 */
import { createRoot } from 'react-dom/client';
import { AppWrapper } from './components/AppWrapper';

const MOUNTED_ATTRIBUTE = 'data-co-mounted';

function resolveContainer(): HTMLElement {
    const existing = document.getElementById('root') ?? document.getElementById('app');
    if (existing) return existing;
    const created = document.createElement('div');
    created.id = 'root';
    document.body.appendChild(created);
    return created;
}

const container = resolveContainer();

if (container.hasAttribute(MOUNTED_ATTRIBUTE)) {
    console.warn('[chalet] Bundle wurde mehrfach eingebunden – zweiter Durchlauf uebersprungen.');
} else {
    container.setAttribute(MOUNTED_ATTRIBUTE, '1');
    createRoot(container).render(<AppWrapper />);
}
