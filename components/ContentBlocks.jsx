import Image from "next/image";
import Link from "next/link";

function youtubeEmbedUrl(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (u.pathname.startsWith("/shorts/")) {
      return `https://www.youtube.com/embed/${u.pathname.split("/")[2]}`;
    }
    const v = u.searchParams.get("v");
    if (v) return `https://www.youtube.com/embed/${v}`;
  } catch {
    /* fall through */
  }
  return url;
}

export function ContentBlocks({ blocks }) {
  return (
    <div className="prose-body">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "text":
            return (
              <div key={i} className="prose-block">
                {block.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            );
          case "list":
            return (
              <ul key={i} className="prose-block">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "heading":
            return (
              <h2 key={i} className="prose-heading">
                {block.text}
              </h2>
            );
          case "image":
            return (
              <figure key={i} className="prose-media">
                <Image
                  src={block.src}
                  alt={block.alt}
                  width={1200}
                  height={800}
                  sizes="100vw"
                />
              </figure>
            );
          case "imageRow":
            return (
              <div key={i} className="prose-media-row">
                {block.images.map((img, j) => (
                  <figure key={j} className="prose-media">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={800}
                      height={1200}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </figure>
                ))}
              </div>
            );
          case "youtube":
            return (
              <figure key={i} className="prose-media prose-media--video">
                <iframe
                  src={youtubeEmbedUrl(block.youtubeUrl)}
                  title={block.alt ?? "Video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </figure>
            );
          case "link":
            return (
              <p key={i} className="prose-block">
                {block.preface ? `${block.preface} ` : null}
                {block.href.startsWith("http") ? (
                  <a
                    href={block.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {block.label}
                  </a>
                ) : (
                  <Link href={block.href}>{block.label}</Link>
                )}
              </p>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
