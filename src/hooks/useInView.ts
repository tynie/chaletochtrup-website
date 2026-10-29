/**
 * Meldet einmalig, sobald ein Element sichtbar wird (z. B. fuer
 * Einblend-Animationen). Ohne `root` misst der IntersectionObserver gegen das
 * oberste Browserfenster; das funktioniert auch in einem chayns-iFrame, der
 * so hoch ist wie sein Inhalt (sonst waere dort alles sofort "sichtbar").
 * Ohne IntersectionObserver-Unterstuetzung gilt das Element sofort als sichtbar.
 */
import { useEffect, useRef, useState } from 'react';

export function useInView<T extends Element>(threshold = 0.35) {
    const ref = useRef<T>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        if (typeof IntersectionObserver === 'undefined') {
            setIsInView(true);
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold },
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isInView };
}
