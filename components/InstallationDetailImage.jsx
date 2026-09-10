"use client";

import { forwardRef, useCallback, useLayoutEffect, useState } from "react";

function fitImageSize(naturalWidth, naturalHeight) {
  const maxWidth = Math.min(window.innerWidth * 0.9, 1800);
  const maxHeight = window.innerHeight * 0.9;

  if (naturalWidth >= naturalHeight) {
    let width = maxWidth;
    let height = (naturalHeight / naturalWidth) * width;
    if (height > maxHeight) {
      height = maxHeight;
      width = (naturalWidth / naturalHeight) * height;
    }
    return { width, height };
  }

  let height = maxHeight;
  let width = (naturalWidth / naturalHeight) * height;
  if (width > maxWidth) {
    width = maxWidth;
    height = (naturalHeight / naturalWidth) * width;
  }
  return { width, height };
}

export const InstallationDetailImage = forwardRef(function InstallationDetailImage(
  { src, alt, loading = "lazy", onLoad },
  ref,
) {
  const [size, setSize] = useState(null);

  useLayoutEffect(() => {
    const img = ref && "current" in ref ? ref.current : null;
    if (!img) return;

    if (img.complete && img.naturalWidth > 0) {
      setSize(fitImageSize(img.naturalWidth, img.naturalHeight));
      return;
    }

    setSize(null);
  }, [src, ref]);

  const handleLoad = useCallback(
    (event) => {
      const { naturalWidth, naturalHeight } = event.currentTarget;
      setSize(fitImageSize(naturalWidth, naturalHeight));
      onLoad?.(event);
    },
    [onLoad],
  );

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      className="install-detail__image"
      loading={loading}
      decoding="async"
      draggable={false}
      onDragStart={(event) => event.preventDefault()}
      onLoad={handleLoad}
      width={size?.width}
      height={size?.height}
      style={
        size
          ? {
              width: `${size.width}px`,
              height: `${size.height}px`,
            }
          : undefined
      }
    />
  );
});
