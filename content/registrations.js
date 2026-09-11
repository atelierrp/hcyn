/**
 * Registration pages for /register/[slug].
 * Sources: roman-ne-web/src/pages/hcyn.astro, hcyn-yerevan.astro
 *
 * Zurich / Yerevan marked past relative to scaffold date (Aug 2026).
 * Google Form URLs preserved as external links where available.
 */
export const registrations = [
  {
    slug: "bangkok",
    title: "Black Square / Bangkok / October 3, 2026",
    city: "Bangkok",
    venue: "Begrüntes Haus",
    location: "Bangkok",
    status: "upcoming",
    heroImage: "/images/registrations/bangkok-begruentes.jpg",
    heroImageAlt: "Begrüntes Haus, Bangkok",
    paragraphs: [
      "HCYN moves across body, sound, silence and pressure.",
      "Rooted in Berlin’s club scene, withdrawal in Switzerland, and a laboratory in a village in northern Thailand, HCYN tests the limits between waking and sleep.",
      "In Bangkok, Black Square is presented as a live session for 12 bodies inside the concrete hall of Begrüntes Haus.",
    ],
    midImage: "/images/installations/black-square/hcyn-bs-07.jpg",
    midImageAlt: "Black Square",
    midImageCaption: "Black Square, San Sai Warehouse, Chiang Mai, 2025",
    afterVideoParagraphs: [
      "For this edition, HCYN works with the powerful local HeadSpace sound system. The physical pressure of low frequencies is placed against an almost motionless room: bodies lying down, eyes closed, listening.",
    ],
    practicalLine:
      "Oct 3 / Begrüntes Haus / ~40 min \ncapacity 12 / Mats provided",
    registrationUrl: "https://www.ticketmelon.com/sach/hardcoreyoganidra",
    registrationLabel: "Register — 400 THB",
  },
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
    registrationLabel: "registration form",
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
    registrationLabel: "register via form",
    status: "past",
    youtubeUrl: "https://youtu.be/eBnWYTcDTuw",
  },
];
