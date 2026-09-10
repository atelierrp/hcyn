"use client";

import { useCallback, useState } from "react";
import { ImageCarouselLightboxControlled } from "@/components/ImageCarouselLightbox";

/**
 * Optional thumbnail grid + lightbox carousel. Use where a clickable gallery is needed.
 */
export function InstallationGallery({ images }) {
  const [openIndex, setOpenIndex] = useState(null);

  const close = useCallback(() => setOpenIndex(null), []);

  if (images.length === 0) return null;

  return (
    <>
      <ul className="install-gallery-thumbs">
        {images.map((image, index) => (
          <li key={image.src} className="install-gallery-thumbs__item">
            <button
              type="button"
              className="install-gallery-thumbs__button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open image ${index + 1} of ${images.length}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="install-gallery-thumbs__image"
                src={image.src}
                alt={image.alt}
                loading="lazy"
              />
            </button>
          </li>
        ))}
      </ul>

      <ImageCarouselLightboxControlled
        images={images}
        index={openIndex}
        onClose={close}
        onIndexChange={setOpenIndex}
      />
    </>
  );
}
