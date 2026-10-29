/**
 * Alle Inhalte und Stammdaten der Startseite an einer Stelle: Site-Kennungen,
 * Bild-URLs, Texte, Kontaktdaten, Link-Ziele. Aenderungen am Inhalt (neues
 * Foto, anderer Text, andere E-Mail) nur hier vornehmen.
 */
import { isMockMode } from './dev/mockMode';

/**
 * Bilder liegen direkt im chayns-Space der Site (Wurzel, kein Unterordner);
 * die fertig zugeschnittenen Dateien liegen im Projekt unter media/ (siehe
 * README.md). Die Adressen unter chalet-ochtrup.de/space/<datei> leiten
 * hierhin um; die direkte Adresse spart den Redirect. In der lokalen
 * Vorschau (Mock-Modus) werden sie aus dist/media/ geladen.
 */
const MEDIA_BASE_URL = 'https://chayns.space/94109-14338';

function media(fileName: string): string {
    if (isMockMode()) return `media/${encodeURIComponent(fileName)}`;
    return `${MEDIA_BASE_URL}/${encodeURIComponent(fileName)}`;
}

export interface SiteImage {
    url: string;
    /** Alternativtext (Barrierefreiheit, wird auch als Titel im Bild-Viewer verwendet). */
    alt: string;
    /** Bildformat fuer das Raster: quer (16:9) oder hoch (3:4). */
    orientation: 'landscape' | 'portrait';
}

export interface Feature {
    /** Font-Awesome-Klasse, z. B. 'fa fa-key' (kommt aus dem Site-Stylesheet). */
    icon: string;
    title: string;
    text: string;
}

/** Seite der eigenen chayns-Site (Id aus dem HTML von chalet-ochtrup.de, Stand 29.10.2026). */
export interface SitePageLink {
    id: number;
    path: string;
}

export const config = {
    /** chayns-Site des Chalet Hotel Ochtrup (chalet-ochtrup.de). */
    siteId: '94109-14338',
    locationId: 228493,
    siteUrl: 'https://chalet-ochtrup.de/',

    name: 'Chalet Hotel Ochtrup',

    pages: {
        /** Seite "Zimmer" (customUrl zimmer). */
        rooms: { id: 702132, path: 'zimmer' } as SitePageLink,
    },

    /** Online-Buchung ueber DIRS21 (Channel chaletochtrupde, Stand 29.10.2026 erreichbar). */
    bookingUrl: 'https://reservations.one.dirs21.de/chaletochtrupde',

    images: {
        /** Header: Fassade mit Eingang hinter dem Zaun (aus Medien/ChaletHeaderHeller.png). */
        hero: media('header.jpg'),
        /** Ovales Logo "Chalet Hotel" mit eigener beiger Flaeche, transparenter Rand. */
        logo: media('logo-chalet.png'),
        /**
         * Reihenfolge so gewaehlt, dass das Mosaik bei 4 Spalten drei volle
         * Reihen ergibt (quer = 2 Spalten, hoch = 1 Spalte). Bei neuen Fotos
         * auf 3 Quer- + 6 Hochformate (bzw. Vielfache) achten.
         */
        gallery: [
            { url: media('aussen-einfahrt.jpg'), alt: 'Das Chalet Hotel Ochtrup von der Einfahrt aus', orientation: 'landscape' },
            { url: media('zimmer-rot.jpg'), alt: 'Zimmer mit roter Wand und Messingbett', orientation: 'portrait' },
            { url: media('suite-badewanne.jpg'), alt: 'Suite mit freistehender Badewanne', orientation: 'portrait' },
            { url: media('bad.jpg'), alt: 'Bad mit Waschtisch im Landhausstil', orientation: 'portrait' },
            { url: media('zimmer-terrasse.jpg'), alt: 'Zimmer mit Zugang zur Terrasse', orientation: 'portrait' },
            { url: media('zimmer-zweibett.jpg'), alt: 'Zweibettzimmer mit Terrassentür', orientation: 'landscape' },
            { url: media('zimmer-einzel.jpg'), alt: 'Gemütliches Einzelzimmer', orientation: 'portrait' },
            { url: media('aussen-eingang.jpg'), alt: 'Eingang mit Säulen und Balkon', orientation: 'landscape' },
            { url: media('zimmer-ausstattung.jpg'), alt: 'Zimmer mit Kleiderschrank und TV', orientation: 'portrait' },
        ] as SiteImage[],
    },

    hero: {
        tagline: 'Einchecken, wohlfühlen, sparen.',
        scrollHint: 'Entdecken',
    },

    intro: {
        eyebrow: 'Herzlich willkommen',
        headline: 'Willkommen im Chalet Hotel Ochtrup',
        paragraphs: [
            'Das Chalet Hotel liegt am Rand der Ortschaft Ochtrup (Richtung Gronau), ca. 2 km vom Bahnhof entfernt. ' +
                'Eine mediterrane Atmosphäre und Einrichtung sind die Wahrzeichen des Hauses.',
            'Einchecken, wohlfühlen, sparen: Günstig übernachten mit allen Extras und ohne viel Schnickschnack! ' +
                'Stilvoll eingerichtete Zimmer und Suiten bieten einen komfortablen Aufenthalt.',
        ],
        roomsLabel: 'Unsere Zimmer',
        bookingLabel: 'Jetzt buchen',
    },

    stay: {
        eyebrow: 'Gut zu wissen',
        headline: 'So einfach ist Ihr Aufenthalt',
        text:
            'Der rezeptionslose Betrieb des Hotels ermöglicht es Ihnen, rund um die Uhr anzureisen. ' +
            'Den Zugang erledigen Sie bequem über einen automatischen Schlüsselkasten.',
        features: [
            {
                icon: 'fa fa-clock',
                title: 'Anreise 24/7',
                text: 'Dank rezeptionslosem Betrieb reisen Sie an, wann es Ihnen passt – rund um die Uhr.',
            },
            {
                icon: 'fa fa-key',
                title: 'Ihr Schlüsselcode',
                text: 'Am Anreisetag erhalten Sie einen Code, der Ihnen Zutritt zum Hotel und zu Ihrem Zimmer gewährt.',
            },
            {
                icon: 'fa fa-bed',
                title: 'Zimmer & Suiten',
                text: 'Stilvoll und mediterran eingerichtet für einen komfortablen Aufenthalt.',
            },
            {
                icon: 'fa fa-train',
                title: 'Gut erreichbar',
                text: 'Am Ortsrand Richtung Gronau, ca. 2 km vom Bahnhof Ochtrup entfernt.',
            },
        ] as Feature[],
        notice: {
            title: 'Bitte beachten',
            text: 'Unser Haus bietet keine Verpflegung, also auch kein Frühstück.',
        },
    },

    gallery: {
        eyebrow: 'Einblicke',
        headline: 'Ein Blick ins Chalet',
        text: 'Mediterranes Flair vom Eingang bis ins Zimmer – tippen Sie auf ein Foto für die Großansicht.',
    },

    contact: {
        eyebrow: 'Kontakt & Anfahrt',
        headline: 'Wir freuen uns auf Sie',
        name: 'Chalet Ochtrup',
        street: 'Gronauer Str. 113',
        zip: '48607',
        city: 'Ochtrup',
        email: 'ochtrup@dinkel-hotel.de',
        /** Google-Maps-Einbettung (Embed-Link zum Eintrag "Chalet Hotel Ochtrup", vom Kunden geliefert). */
        mapsEmbedUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2445.0271961461585!2d7.164881315680103!3d52.206553267163486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b839c951f241e1%3A0xec135f99fe475dc0!2sChalet%20Hotel%20Ochtrup!5e0!3m2!1sde!2sde!4v1672739091097!5m2!1sde!2sde',
        /** Routenplanung in Google Maps (oeffnet die Maps-App bzw. den Browser). */
        mapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Gronauer+Str.+113%2C+48607+Ochtrup',
    },
} as const;

export type Config = typeof config;
