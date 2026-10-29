/**
 * Einheitlicher Sektionskopf: kleine Ueberzeile in Versalien, Ueberschrift
 * in Cormorant Garamond (h1 nur einmal auf der Seite, sonst h2) und eine
 * kurze Zierlinie. Optional ein Einleitungstext.
 */
interface SectionHeadProps {
    id: string;
    eyebrow: string;
    title: string;
    level?: 1 | 2;
    text?: string;
}

export function SectionHead({ id, eyebrow, title, level = 2, text }: SectionHeadProps) {
    const Heading = level === 1 ? 'h1' : 'h2';
    return (
        <div className="co-section__head">
            <p className="co-eyebrow">{eyebrow}</p>
            <Heading id={id} className="co-title">
                {title}
            </Heading>
            <span className="co-ornament" aria-hidden="true" />
            {text ? <p className="co-lead">{text}</p> : null}
        </div>
    );
}
