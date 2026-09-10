/**
 * Registration pages for /register/[slug].
 * Sources: roman-ne-web/src/pages/hcyn.astro, hcyn-yerevan.astro
 *
 * Both entries marked past relative to scaffold date (Aug 2026).
 * Google Form URLs preserved as external links.
 */
export const registrations = [
  {
    slug: "zurich",
    title: "hardcore yoga nidra",
    sessions: [
      { date: "Sat 6/6", time: "11:00" },
      { date: "Sat 13/6", time: "11:00" },
      { date: "Sat 20/6", time: "11:00" },
    ],
    venue: "HCYN Studio",
    location: "Zypressenstrasse 60, Zurich",
    city: "Zurich",
    practicalInfo: [
      "60 min closed-eyes listening session",
      "lying down, no movement",
      "small-group session",
      "in English",
    ],
    price: "20 CHF",
    registrationUrl: "https://forms.gle/Y2U8zsY1VhuiqLAAA",
    registrationLabel: "→ registration form",
    status: "past",
    youtubeUrl: "https://youtu.be/eBnWYTcDTuw",
  },
  {
    slug: "yerevan",
    title: "hardcore yoga nidra",
    sessions: [
      { date: "Fri 29/5", time: "12:00" },
      { date: "Fri 29/5", time: "15:00" },
    ],
    venue: "Living Room",
    location: "Artas Foundation, Yerevan",
    city: "Yerevan",
    practicalInfo: [
      "60 min closed-eyes listening session",
      "lying down, no movement",
      "max 8 people per session",
      "in English",
      "free participation",
    ],
    registrationUrl: "https://forms.gle/fmERHyEHMGQzzXs39",
    registrationLabel: "→ register via form",
    status: "past",
    youtubeUrl: "https://youtu.be/eBnWYTcDTuw",
  },
];
