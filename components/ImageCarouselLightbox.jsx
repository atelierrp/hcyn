"use client";

import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const image = images[index];

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onNext, onPrev]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="image-carousel-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
    >
      <button
        type="button"
        className="image-carousel-lightbox__arrow image-carousel-lightbox__arrow--prev"
        aria-label="Previous image"
        onClick={(event) => {
          event.stopPropagation();
          onPrev();
        }}
      >
        ←
      </button>

      <figure
        className="image-carousel-lightbox__figure"
        onClick={(event) => event.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="image-carousel-lightbox__image"
          src={image.src}
          alt={image.alt}
          draggable={false}
          onDragStart={(event) => event.preventDefault()}
        />
      </figure>

      <button
        type="button"
        className="image-carousel-lightbox__arrow image-carousel-lightbox__arrow--next"
        aria-label="Next image"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
      >
        →
      </button>
    </div>,
    document.body,
  );
}

/**
 * Optional fullscreen image carousel with arrow navigation.
 * Control open state from the parent via index + onClose + onIndexChange.
 */
export function ImageCarouselLightboxControlled({
  images,
  index,
  onClose,
  onIndexChange,
}) {
  const goPrev = useCallback(() => {
    if (index === null) return;
    onIndexChange(index > 0 ? index - 1 : images.length - 1);
  }, [index, images.length, onIndexChange]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onIndexChange(index < images.length - 1 ? index + 1 : 0);
  }, [index, images.length, onIndexChange]);

  if (index === null) return null;

  return (
    <Lightbox
      images={images}
      index={index}
      onClose={onClose}
      onPrev={goPrev}
      onNext={goNext}
    />
  );
}
