# Hardcore Yoga Nidra (HCYN)

Technical scaffold for an independently deployable Hardcore Yoga Nidra site. Content and assets are migrated from the Roman Ne project; visual design is intentionally deferred.

## Stack

- Next.js 16 (App Router)
- JavaScript
- React 19
- `next/image`, `next/link`
- Server Components by default
- Vercel-compatible static/server rendering

No CMS, database, auth, or design-system dependencies.

## Route tree

**Indexable**

| Route | Purpose |
| --- | --- |
| `/` | Homepage (background video stub) |
| `/live` | Upcoming / past live sessions |
| `/installations` | Installation index |
| `/installations/[slug]` | Installation detail |
| `/connect` | Email + links |

**Unlisted / noindex**

| Route | Purpose |
| --- | --- |
| `/project/[slug]` | Shareable project pages (e.g. black-square) |
| `/research` | Research / residencies seed |
| `/register/[slug]` | Registration detail (Zurich, Yerevan, future) |

Public nav (`SiteNav`): Live, Installations, Connect. Logo links to `/`.

## Content locations

| Area | File(s) |
| --- | --- |
| Live events | `content/live.js` |
| Installations | `content/installations.js` |
| Registrations | `content/registrations.js` |
| Projects | `content/projects/*.js` (export array via `projects`) |
| Research | `content/research.js` |
| Connect | `content/connect.js` |
| Accessors | `lib/content.js` |
| Metadata helpers | `lib/metadata.js` (`indexable`, `noindex`, `getSiteUrl`) |

See `MIGRATION_NOTES.md` for source → destination mapping and open questions.

## How to add content

### Live event

1. Add an entry to `content/live.js` with `status: "upcoming" | "past"`.
2. Optionally set `registrationRoute` or `installationRoute` for list links.
3. `/live` picks it up via `getLiveEventsByStatus`.

### Installation

1. Add an entry to `content/installations.js` (images under `public/images/`).
2. `/installations` and `/installations/[slug]` use `getInstallationSlugs` / `getInstallationBySlug`.
3. Indexable installations are included in `app/sitemap.js` automatically.

### Project page

1. Add a `ProjectPage` in `content/projects/` and include it in the exported `projects` array (see `black-square.js`).
2. Ensure `lib/content.js` can resolve it (currently imports from `projects/black-square`).
3. Page is served at `/project/[slug]` with `noindex`.

### Registration page

1. Add an entry to `content/registrations.js`.
2. `/register/[slug]` renders `RegistrationDetails` and is `noindex`.
3. Keep form URLs as external links (`registrationUrl`).

## Noindex behavior

- Per-route metadata: `indexable()` vs `noindex()` from `lib/metadata.js`.
- `app/robots.js` allows `/`, points to the sitemap, and disallows `/project/`, `/research`, `/register/`.
- `app/sitemap.js` lists only indexable URLs: `/`, `/live`, `/installations`, each installation slug, `/connect`.

## Homepage video

- Component: `components/HomeBackgroundVideo.jsx` (client).
- Mounted only on `app/page.jsx` — **not** in the root layout.
- Pass `poster` (currently `/images/hcyn3-high.jpg`). Add `src` (e.g. `/video/home.mp4`) when the asset exists under `public/video/`.
- Supports muted autoplay loop, `playsInline`, poster, and `prefers-reduced-motion` fallback.

## Future persistent audio

Do not implement yet. When adding site-wide audio that survives client navigations, wrap children with an `AudioProvider` (or similar) in `app/layout.jsx`. A comment in that file marks the intended location. Keep homepage video page-local.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Deploy (Vercel)

1. Connect this repository to Vercel (framework: Next.js).
2. Set `NEXT_PUBLIC_SITE_URL` to the production origin (e.g. `https://hardcoreyoganidra.com`) so `sitemap.js` / `robots.js` emit correct absolute URLs. Default fallback in code: `https://hardcoreyoganidra.com`.
3. Deploy; no special build command beyond `next build`.
