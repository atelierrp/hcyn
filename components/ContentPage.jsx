import Image from "next/image";

/**
 * Shared content layout: text under fixed header, full-width media below.
 */
export function ContentPage({ children, media }) {
  return (
    <div className="content-page">
      <div className="content-page__text">{children}</div>
      {media ? <div className="content-page__media">{media}</div> : null}
    </div>
  );
}

export function ContentPageImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1600}
      height={900}
      sizes="100vw"
      priority={false}
    />
  );
}
