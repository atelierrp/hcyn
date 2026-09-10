function youtubeEmbedUrl(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    const v = u.searchParams.get("v");
    if (v) return `https://www.youtube.com/embed/${v}`;
  } catch {
    /* fall through */
  }
  return url;
}

/**
 * Registration content under the global shell (no stacked title — logo owns that).
 */
export function RegistrationDetails({ registration }) {
  return (
    <article className="registration-details prose-body">
      <section className="section-block" aria-labelledby="sessions">
        <h2 className="section-block__title" id="sessions">
          sessions
        </h2>
        <ul className="section-block__list">
          {registration.sessions.map((s, i) => (
            <li key={i}>
              <span>
                {s.date} — {s.time}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <p className="registration-details__cta">
        <a
          href={registration.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {registration.registrationLabel}
        </a>
      </p>

      <section className="section-block" aria-label="session and venue">
        <ul className="section-block__list">
          {registration.practicalInfo.map((line, i) => (
            <li key={i}>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        {registration.price ? (
          <p className="registration-details__meta">
            <span>{registration.price}</span>
          </p>
        ) : null}
        <p className="registration-details__meta">
          <span>{registration.venue}</span>
        </p>
        <p className="registration-details__meta">
          <span>{registration.location}</span>
        </p>
      </section>

      {registration.youtubeUrl ? (
        <figure className="registration-details__media registration-details__video">
          <iframe
            src={youtubeEmbedUrl(registration.youtubeUrl)}
            title="Hardcore Yoga Nidra"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </figure>
      ) : null}
    </article>
  );
}
