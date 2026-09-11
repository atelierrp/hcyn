/**
 * Live events for /live.
 *
 * Display format:
 *   Line 1 — dateLabel
 *   Line 2 — venue, city ↗
 *
 * Status notes (as of scaffold date Aug 2026):
 * - Zurich (Jun 2026) and Yerevan (May 2026) were listed as "upcoming" in the
 *   source but their dates are before Aug 2026. Recategorized as past
 *   here; see MIGRATION_NOTES.md.
 */
export const liveEvents = [
  {
    slug: "bangkok-tba",
    title: "Bangkok",
    dateLabel: "3 Oct 2026",
    city: "Bangkok",
    venue: "Begrüntes Haus",
    country: "Thailand",
    status: "upcoming",
    registrationRoute: "/register/bangkok",
  },
  {
    slug: "zurich-june-2026",
    title: "Zurich",
    dateLabel: "6 Jun 2026",
    city: "Zurich",
    venue: "HCYN Studio",
    date: "2026-06-06/2026-06-20",
    country: "Switzerland",
    status: "past",
    registrationRoute: "/register/zurich",
    note: "Source listed as upcoming; sessions were Sat 6/6, 13/6, 20/6 2026. Recategorized as past for HCYN scaffold (Aug 2026).",
  },
  {
    slug: "yerevan-may-2026",
    title: "Yerevan",
    dateLabel: "29 May 2026",
    city: "Yerevan",
    venue: "Artas Foundation LR",
    date: "2026-05-29",
    country: "Armenia",
    status: "past",
    registrationRoute: "/register/yerevan",
    note: "Source listed as upcoming; session date 29 May 2026. Recategorized as past for HCYN scaffold (Aug 2026).",
  },
  {
    slug: "chiang-mai-dec-2025",
    title: "Chiang Mai",
    dateLabel: "20 Dec 2025",
    city: "Chiang Mai",
    venue: "San Sai Warehouse",
    date: "2025-12-20",
    country: "Thailand",
    status: "past",
    installationRoute: "/installations/black-square-chiang-mai",
    note: "Linked to black-square-chiang-mai provisionally; confirm whether Dec 20 2025 maps to that realization.",
  },
  {
    slug: "laax-may-2025",
    title: "Laax",
    dateLabel: "16 May 2025",
    city: "Laax/CH",
    venue: "society sandbox",
    date: "2025-05-16",
    country: "Switzerland",
    status: "past",
    note: "Residency / session context. Not mapped to an installation route.",
  },
];
