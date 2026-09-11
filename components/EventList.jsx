import Link from "next/link";

function EventBody({ event }) {
  const place = [event.venue, event.city].filter(Boolean).join(", ");

  return (
    <>
      <span className="event-item__date">{event.dateLabel}</span>
      {place ? <span className="event-item__place">{place}</span> : null}
    </>
  );
}

function EventItem({ event }) {
  const href = event.registrationRoute ?? event.installationRoute ?? null;

  return (
    <li className="event-item">
      {href ? (
        <Link href={href} className="event-item__link">
          <EventBody event={event} />
        </Link>
      ) : (
        <div className="event-item__text">
          <EventBody event={event} />
        </div>
      )}
    </li>
  );
}

export function EventList({ upcoming, past }) {
  return (
    <>
      <section className="section-block" aria-labelledby="live-upcoming">
        <h2 className="section-block__title" id="live-upcoming">
          upcoming
        </h2>
        {upcoming.length === 0 ? (
          <p style={{ color: "var(--color-gray)" }}>No upcoming events.</p>
        ) : (
          <ul className="section-block__list event-list">
            {upcoming.map((e) => (
              <EventItem key={e.slug} event={e} />
            ))}
          </ul>
        )}
      </section>
      <section className="section-block" aria-labelledby="live-past">
        <h2 className="section-block__title" id="live-past">
          past
        </h2>
        {past.length === 0 ? (
          <p style={{ color: "var(--color-gray)" }}>No past events.</p>
        ) : (
          <ul className="section-block__list event-list">
            {past.map((e) => (
              <EventItem key={e.slug} event={e} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
