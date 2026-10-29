/**
 * Farbband ueber die volle Breite des iFrames mit innerem Container
 * (Seitenrand, in voller Tapp-Breite zusaetzlich max. 1120 px, zentriert).
 * Die Abschnitte liegen abwechselnd auf Weiss ("plain"), Sandbeige
 * ("sand", #e6deca) und Bordeaux ("wine", #732a23); Rhythmus siehe App.tsx.
 */
import type { ReactNode } from 'react';

export type BandTone = 'plain' | 'sand' | 'wine';

interface BandProps {
    tone?: BandTone;
    id?: string;
    children: ReactNode;
}

export function Band({ tone = 'plain', id, children }: BandProps) {
    return (
        <div id={id} className={`co-band co-band--${tone}`}>
            <div className="co-band__inner">{children}</div>
        </div>
    );
}
