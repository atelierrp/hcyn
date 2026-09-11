import Image from "next/image";
import Link from "next/link";

function listTitleFor(installation) {
  return installation.listTitle ?? installation.workTitle;
}

function labelFor(installation) {
  return `${listTitleFor(installation)} ${installation.dateOrYear}`;
}

function coverSrc(installation) {
  return installation.coverImage ?? installation.images?.[0]?.src ?? null;
}

function coverAlt(installation) {
  return installation.images?.[0]?.alt ?? labelFor(installation);
}

function InstallationCard({ installation }) {
  const src = coverSrc(installation);
  const href = `/installations/${installation.slug}`;
  const title = listTitleFor(installation);

  return (
    <li className="install-grid__item">
      <Link href={href} className="install-grid__link">
        <div className="install-grid__frame">
          {src ? (
            <Image
              src={src}
              alt={coverAlt(installation)}
              width={800}
              height={1067}
              sizes="(max-width: 768px) 50vw, 20vw"
              className="install-grid__image"
            />
          ) : (
            <div className="install-grid__placeholder" aria-hidden="true" />
          )}
        </div>
        <span className="install-grid__caption">
          <span className="install-grid__caption-title">{title}</span>
          <span className="install-grid__caption-year">
            {installation.dateOrYear}
          </span>
        </span>
      </Link>
    </li>
  );
}

function InstallationSection({ id, title, items }) {
  return (
    <section className="install-section" aria-labelledby={id}>
      <h2 className="install-section__title" id={id}>
        {title}
      </h2>
      {items.length === 0 ? (
        <p className="install-section__empty">No {title} installations.</p>
      ) : (
        <ul className="install-grid">
          {items.map((installation) => (
            <InstallationCard
              key={installation.slug}
              installation={installation}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export function InstallationList({ upcoming, past }) {
  return (
    <div className="install-list">
      <InstallationSection
        id="installations-upcoming"
        title="upcoming"
        items={upcoming}
      />
      <InstallationSection
        id="installations-past"
        title="archive"
        items={past}
      />
    </div>
  );
}
