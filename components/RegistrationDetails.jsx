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

function isExternalHref(href) {
  return /^(https?:|mailto:)/i.test(href);
}

function RegistrationCta({ registration }) {
  if (!registration.registrationUrl && !registration.registrationLabel) {
    return null;
  }
  const label = registration.registrationLabel ?? "→ registration form";
  if (!registration.registrationUrl) {
    return <p className="registration-details__cta">{label}</p>;
  }
  const external = isExternalHref(registration.registrationUrl);
  return (
    <p className="registration-details__cta registration-details__cta--primary">
      <a
        className={external ? "registration-details__external" : undefined}
        href={registration.registrationUrl}
        {...(external && !registration.registrationUrl.startsWith("mailto:")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {label}
      </a>
    </p>
  );
}

function RegistrationHero({ registration }) {
  if (!registration.heroImage) return null;
  return (
    <figure className="registration-details__media registration-details__media--hero">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={registration.heroImage}
        alt={registration.heroImageAlt ?? registration.title}
      />
    </figure>
  );
}

function RegistrationVideoBlock({ registration }) {
  if (!registration.youtubeUrl) return null;
  return (
    <section className="registration-details__video-block" aria-label="video">
      {registration.videoHeading ? (
        <h2 className="registration-details__video-heading">
          {registration.videoHeading}
        </h2>
      ) : null}
      <figure className="registration-details__media registration-details__video">
        <iframe
          src={youtubeEmbedUrl(registration.youtubeUrl)}
          title={registration.videoHeading ?? "Hardcore Yoga Nidra"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </figure>
    </section>
  );
}

function RegistrationVideo({ registration }) {
  if (!registration.youtubeUrl) return null;
  return (
    <figure className="registration-details__media registration-details__video">
      <iframe
        src={youtubeEmbedUrl(registration.youtubeUrl)}
        title="Hardcore Yoga Nidra"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </figure>
  );
}

/** Prose registration pages (e.g. Bangkok). */
function RegistrationProse({ registration }) {
  return (
    <article className="registration-details prose-body">
      <RegistrationHero registration={registration} />
      <h1 className="prose-heading project-page__title">{registration.title}</h1>
      {registration.paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      <RegistrationVideoBlock registration={registration} />
      {registration.afterVideoParagraphs?.map((paragraph, i) => (
        <p key={`after-${i}`}>{paragraph}</p>
      ))}
      {registration.practicalLine ? (
        <p className="registration-details__practical">
          {registration.practicalLine.split("\n").map((line, i, lines) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
      ) : null}
      {registration.details?.length ? (
        <section
          className="section-block registration-details__details"
          aria-label="session details"
        >
          <ul className="section-block__list">
            {registration.details.map((line, i) => (
              <li key={i}>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <RegistrationCta registration={registration} />
    </article>
  );
}

/** Session-list registration pages (Zurich, Yerevan). */
function RegistrationSessions({ registration }) {
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

      <RegistrationCta registration={registration} />

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

      <RegistrationVideo registration={registration} />
    </article>
  );
}

/**
 * Registration content under the global shell (no stacked title — logo owns that).
 */
export function RegistrationDetails({ registration }) {
  if (registration.paragraphs?.length) {
    return <RegistrationProse registration={registration} />;
  }
  return <RegistrationSessions registration={registration} />;
}
