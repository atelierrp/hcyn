# Migration notes — Roman Ne → Hardcore Yoga Nidra (HCYN)

Scaffold date: August 2026. Source of truth: local `roman-ne-web` repository (not live site).

## Source → destination map

| Source (roman-ne-web) | Destination (hcyn) | Notes |
| --- | --- | --- |
| `src/data/homeEventsPage.js` (HCYN lines) | `/live` via `content/live.ts` | Upcoming / past split; see status notes below |
| `src/pages/hcyn-proposal.astro` + `src/data/hcynProposalPage.js` (+ YouTube from `current.js`) | `/project/black-square` via `content/projects/black-square.ts` | Unlisted, noindex |
| `src/pages/hcyn.astro` | `/register/zurich` via `content/registrations.ts` | Unlisted, noindex; Google Form kept external |
| `src/pages/hcyn-yerevan.astro` | `/register/yerevan` via `content/registrations.ts` | Unlisted, noindex; QR asset copied |
| `src/data/hardcoreyoganidraPage.js` (+ proposal presentations, home events) | `/installations/*` via `content/installations.ts` | Per-slug table below |
| Residencies block in `hardcoreyoganidraPage.js` | `/research` via `content/research.ts` | Seed only; unlisted, noindex |
| `src/pages/contact.astro` + IG on registration pages | `/connect` via `content/connect.ts` | Email uncertainty noted below |
| Proposal “For presentation inquiries” → `/contact` | Remapped to `/connect` | Internal link only on HCYN site |
| Homepage / HCYN imagery | `/` poster + installation/project assets under `public/images/` | No homepage video file yet |

### Installations

| Slug | Identified source | Status |
| --- | --- | --- |
| `black-square-chiang-mai` | Studio 88 / Black Square, Chiang Mai 2025 (`hardcoreyoganidraPage.js`, proposal images) | Past; related project `black-square` |
| `cmdw-haan-hall` | HAAN Hall, Chiang Mai Design Week 2025 | Past; related project `black-square` |
| `braty-bangkok` | **No installation body in Roman Ne repo** | Upcoming scaffold from sitemap intent + homepage line “TBA — Bangkok”. Venue name “Braty” comes from the planned route slug only — confirm before publishing |

## Historical / status notes

- **Zurich (Jun 2026)** and **Yerevan (29 May 2026)** were listed as upcoming in Roman Ne source. Relative to scaffold date (Aug 2026), both session dates are in the past. Recategorized as `past` in `content/live.ts` and `content/registrations.ts`, with notes on each entry.
- **Bangkok** remains upcoming (date/venue TBA).
- **Chiang Mai 20 Dec 2025** live line is provisionally linked to `/installations/black-square-chiang-mai` — confirm whether that date maps to that realization.
- Registration Google Forms may still accept submissions; pages are noindex and marked past so the site does not present them as current.

## Missing / uncertain

- **`braty-bangkok`:** route required by HCYN sitemap; no body content, images, or confirmed venue in source beyond “TBA — Bangkok”.
- **Connect email:** only `contact@roman-ne.com` found in `contact.astro`. Confirm whether HCYN needs a dedicated address.
- **Registration:** forms are external (`forms.gle/...`); there was no embedded form logic to migrate.
- **Laax (16 May 2025):** live past entry only; not mapped to an installation route.

## Assets copied

From `roman-ne-web/public/images/` → `hcyn/public/images/`:

- `hcyn1.jpg`, `hcyn2.jpg`, `hcyn3.jpg`, `hcyn3-high.jpg`, `hcyn4.jpg`
- `HCYN-haan1.jpg`, `HCYN-haan2.jpg`, `HCYN-haan4.jpg`
- `hcyn-yerevan-qr.png`
- `proposal/hcyn-*.jpg`, `proposal/haan/*.jpg`

`public/video/` exists (`.gitkeep`) for a future homepage video; no video asset migrated.

## Not migrated

- Roman Ne visual design (styles, typography, spacing, grids)
- Font assets / font loading from the source site
- Modal / lightbox video UX
- SiteNav structure and non-HCYN routes (bio, works, CV, etc.)
- Non-HCYN images (`atn.jpg`, `og.jpg`, `roman-ne.jpg`, `igja*`, etc.)
- Runtime dependency on `roman-ne-web` (content and assets are copied into this repo)

## Manual review checklist

- [ ] Confirm or replace `braty-bangkok` venue/content before public launch
- [ ] Confirm HCYN-specific contact email for `/connect`
- [ ] Confirm Chiang Mai Dec 20 2025 ↔ black-square-chiang-mai mapping
- [ ] Decide whether past registration form links should remain active
- [ ] Add homepage video under `public/video/` and pass `src` to `HomeBackgroundVideo`
