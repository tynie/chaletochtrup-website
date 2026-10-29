/**
 * Fotos vom Hotel als Mosaik: Querformate ueber zwei Spalten, Hochformate
 * ueber eine Spalte und zwei Reihen (Raster in styles.ts). Klick oeffnet den
 * chayns-Bild-Viewer mit allen Fotos ab dem angeklickten.
 */
import { config } from '../config';
import { openImageGallery } from '../utils/navigation';
import { SectionHead } from './SectionHead';

export function Gallery() {
    const images = config.images.gallery;

    return (
        <section className="co-section" aria-labelledby="co-gallery-title">
            <SectionHead
                id="co-gallery-title"
                eyebrow={config.gallery.eyebrow}
                title={config.gallery.headline}
                text={config.gallery.text}
            />
            <ul className="co-gallery">
                {images.map((image, index) => (
                    <li key={image.url} className={`co-gallery__cell co-gallery__cell--${image.orientation}`}>
                        <button
                            type="button"
                            className="co-gallery__item"
                            onClick={() => openImageGallery(images, index)}
                            aria-label={`${image.alt} – Bild vergrößern`}
                        >
                            <img src={image.url} alt={image.alt} loading="lazy" decoding="async" />
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}
