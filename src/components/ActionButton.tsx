/**
 * Link-Button der Seite (Zimmer, Buchen, Route, E-Mail). Rendert ein <a> mit
 * echtem href (Fallback ohne JavaScript bzw. ausserhalb von chayns); bei
 * `onActivate` uebernimmt chayns-api die Navigation.
 *
 * `no-link-style`: Das chayns-Site-Stylesheet setzt sonst
 * `a:not(.no-link-style) { border-bottom: ... }` und `a:hover { opacity: .75 }`.
 *
 * Varianten: "primary" (Bordeaux, fuer helle Flaechen), "outline" (Bordeaux-
 * Rahmen), "light" (Sandbeige, fuer das Bordeaux-Band) und "ghost" (heller
 * Rahmen, fuer das Bordeaux-Band).
 */
import type { MouseEvent } from 'react';
import { Icon } from '@chayns-components/core';

export type ActionButtonVariant = 'primary' | 'outline' | 'light' | 'ghost';

interface ActionButtonProps {
    href: string;
    label: string;
    icon: string;
    variant?: ActionButtonVariant;
    onActivate?: () => void;
    isExternal?: boolean;
}

const ICON_COLORS: Record<ActionButtonVariant, string> = {
    primary: '#ffffff',
    outline: '#732a23',
    light: '#732a23',
    ghost: '#ffffff',
};

export function ActionButton({ href, label, icon, variant = 'primary', onActivate, isExternal }: ActionButtonProps) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (!onActivate) return;
        event.preventDefault();
        onActivate();
    };

    return (
        <a
            className={`co-btn co-btn--${variant} no-link-style`}
            href={href}
            onClick={handleClick}
            target={isExternal ? '_blank' : '_top'}
            rel={isExternal ? 'noopener noreferrer' : undefined}
        >
            <Icon icons={[icon]} size={14} color={ICON_COLORS[variant]} />
            <span>{label}</span>
        </a>
    );
}
