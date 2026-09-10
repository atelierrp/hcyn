"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { InstallationDetailImage } from "@/components/InstallationDetailImage";

const SCROLL_GAP_PX = 48;
const PREVIEW_EXTRA_OFFSET_PX = 40;
const GALLERY_TRANSITION_MS = 750;

const GALLERY_HTML_CLASS = "install-detail-gallery-active";
const MOBILE_MQ = "(max-width: 767px)";

function setGalleryScrollLock(locked) {
  document.documentElement.classList.toggle(GALLERY_HTML_CLASS, locked);
  document.body.style.overflow = locked ? "hidden" : "";
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);

  useLayoutEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isMobile;
}

/** Phone: plain full-width scrolling column. */
function InstallationDetailSimple({ header, images }) {
  return (
    <div className="install-detail install-detail--simple">
      <div className="install-detail__header">{header}</div>
      {images.length > 0 ? (
        <ul className="install-detail__stack">
          {images.map((image, index) => (
            <li key={image.src} className="install-detail__stack-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="install-detail__stack-image"
                src={image.src}
                alt={image.alt}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                onDragStart={(event) => event.preventDefault()}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** Desktop: fixed header + scroll-to-open gallery stage. */
function InstallationDetailDesktop({ header, images }) {
  const rootRef = useRef(null);
  const headerRef = useRef(null);
  const stagePanelRef = useRef(null);
  const stageImageRef = useRef(null);
  const galleryOpenRef = useRef(false);
  const galleryClosingRef = useRef(false);
  const activeIndexRef = useRef(0);

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryClosing, setGalleryClosing] = useState(false);
  const [stageAnimating, setStageAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  activeIndexRef.current = activeIndex;

  const openGallery = useCallback(
    (index) => {
      if (
        galleryOpenRef.current ||
        galleryClosingRef.current ||
        images.length === 0
      ) {
        return;
      }

      const nextIndex =
        typeof index === "number" ? index : activeIndexRef.current;

      galleryOpenRef.current = true;
      setActiveIndex(nextIndex);
      setGalleryScrollLock(true);
      setStageAnimating(true);
      setGalleryOpen(true);

      window.setTimeout(() => {
        setStageAnimating(false);
      }, GALLERY_TRANSITION_MS);
    },
    [images.length],
  );

  const closeGallery = useCallback(() => {
    if (!galleryOpenRef.current || galleryClosingRef.current) return;

    galleryClosingRef.current = true;
    setStageAnimating(true);
    setGalleryClosing(true);

    window.setTimeout(() => {
      setGalleryScrollLock(false);
      galleryOpenRef.current = false;
      galleryClosingRef.current = false;
      setGalleryOpen(false);
      setGalleryClosing(false);
      setStageAnimating(false);
    }, GALLERY_TRANSITION_MS);
  }, []);

  const goNext = useCallback(
    (event) => {
      event.stopPropagation();
      setActiveIndex((current) =>
        current < images.length - 1 ? current + 1 : 0,
      );
    },
    [images.length],
  );

  useLayoutEffect(() => {
    const measure = () => {
      const root = rootRef.current;
      const headerEl = headerRef.current;
      const imageEl = stageImageRef.current;
      if (!root || !headerEl) return;

      const stageTop =
        headerEl.getBoundingClientRect().bottom +
        SCROLL_GAP_PX +
        PREVIEW_EXTRA_OFFSET_PX;
      root.style.setProperty("--install-detail-stage-top", `${stageTop}px`);

      if (imageEl) {
        const imageHeight = imageEl.getBoundingClientRect().height;
        const openTranslate = Math.max(
          0,
          window.innerHeight / 2 - imageHeight / 2,
        );
        root.style.setProperty(
          "--install-detail-open-translate",
          `${openTranslate}px`,
        );
      }
    };

    measure();

    const headerEl = headerRef.current;
    const imageEl = stageImageRef.current;
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;

    if (headerEl) resizeObserver?.observe(headerEl);
    if (imageEl) resizeObserver?.observe(imageEl);

    window.addEventListener("resize", measure);
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [header, images, activeIndex, galleryOpen]);

  useEffect(() => {
    return () => {
      setGalleryScrollLock(false);
    };
  }, []);

  useEffect(() => {
    if (galleryOpen || images.length === 0) return;

    const onWheel = (event) => {
      if (
        galleryOpenRef.current ||
        galleryClosingRef.current ||
        event.deltaY <= 0
      ) {
        return;
      }
      event.preventDefault();
      openGallery();
    };

    const onKeyDown = (event) => {
      if (galleryOpenRef.current || galleryClosingRef.current) {
        return;
      }
      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {
        event.preventDefault();
        openGallery();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [galleryOpen, images.length, openGallery]);

  useEffect(() => {
    if (!galleryOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeGallery();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [galleryOpen, closeGallery]);

  const activeImage = images[activeIndex];
  const galleryVisible = galleryOpen && !galleryClosing;

  const stageClassName = [
    "install-detail__stage",
    galleryVisible && "install-detail__stage--open",
    galleryClosing && "install-detail__stage--closing",
    stageAnimating && "install-detail__stage--animating",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="install-detail install-detail--desktop" ref={rootRef}>
      <div className="install-detail__header" ref={headerRef}>
        {header}
      </div>

      {activeImage ? (
        <>
          <div className="install-detail__stage-gradient" aria-hidden="true" />
          <div className="install-detail__chrome">
            <button
              type="button"
              className="install-detail__count"
              onClick={(event) => {
                event.stopPropagation();
                goNext(event);
              }}
              aria-label={`Next image (${activeIndex + 1} of ${images.length})`}
            >
              {activeIndex + 1}/{images.length}
            </button>
            {galleryOpen ? (
              <button
                type="button"
                className="install-detail__close"
                onClick={(event) => {
                  event.stopPropagation();
                  closeGallery();
                }}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="install-detail__close"
                onClick={(event) => {
                  event.stopPropagation();
                  openGallery();
                }}
                >
                  Images
                </button>
              )}
            </div>
            <section
              className={stageClassName}
              aria-label="Installation gallery"
            role={galleryVisible ? "dialog" : undefined}
            aria-modal={galleryVisible ? "true" : undefined}
          >
            <div
              className="install-detail__stage-panel"
              ref={stagePanelRef}
              onClick={galleryVisible ? closeGallery : undefined}
            >
              <button
                type="button"
                className="install-detail__stage-image"
                draggable={false}
                onDragStart={(event) => event.preventDefault()}
                onClick={(event) => {
                  event.stopPropagation();
                  if (galleryVisible) {
                    goNext(event);
                    return;
                  }
                  openGallery();
                }}
                aria-label={
                  galleryVisible
                    ? `Next image (${activeIndex + 1} of ${images.length})`
                    : "Open installation gallery"
                }
              >
                <InstallationDetailImage
                  ref={stageImageRef}
                  src={activeImage.src}
                  alt={activeImage.alt}
                  loading="eager"
                />
              </button>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}

export function InstallationDetailView({ header, images }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <InstallationDetailSimple header={header} images={images} />;
  }

  return <InstallationDetailDesktop header={header} images={images} />;
}
