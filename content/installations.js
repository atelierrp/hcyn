/**
 * Installation realizations for /installations and /installations/[slug].
 * Sources: hardcoreyoganidraPage.js, hcynProposalPage.js, homeEventsPage.js
 */
export const installations = [
  {
    slug: "paradise-bangkok",
    workTitle: "Paradise",
    venue: "Braty",
    location: "Bangkok",
    country: "Thailand",
    dateOrYear: "2026",
    status: "upcoming",
    coverImage: "/images/installations/braty-bangkok-thumb.jpg",
    images: [
      {
        src: "/images/installations/braty-bangkok-thumb.jpg",
        alt: "Braty, Bangkok",
      },
    ],
    description: "Details TBA",
    note: "No installation body content found in source. Scaffolded from sitemap route + homepage line “TBA — Bangkok”. Venue name “Braty” comes from the planned route slug only — confirm before publishing.",
  },
  {
    slug: "black-square-chiang-mai",
    workTitle: "Black Square",
    location: "San Sai Warehouse, Chiang Mai",
    country: "Thailand",
    dateOrYear: "2025",
    status: "past",
    coverImage: "/images/installations/black-square/hcyn-bs-01.jpg",
    images: [
      {
        src: "/images/installations/black-square/hcyn-bs-05.jpg",
        alt: "Hardcore Yoga Nidra — Chiang Mai",
      },
      {
        src: "/images/installations/black-square/hcyn-bs-04.jpg",
        alt: "Hardcore Yoga Nidra — Chiang Mai",
      },
      // {
      //   src: "/images/installations/black-square/hcyn-bs-06.jpg",
      //   alt: "Studio detail",
      // },
      {
        src: "/images/installations/black-square/hcyn-bs-07.jpg",
        alt: "Hardcore Yoga Nidra presentation, Chiang Mai 2025",
      },
      {
        src: "/images/installations/black-square/hcyn-bs-01.jpg",
        alt: "Black Square, Chiang Mai 2025",
      },

      // {
      //   src: "/images/installations/black-square/hcyn-bs-03.jpg",
      //   alt: "Hardcore Yoga Nidra presentation, Chiang Mai 2025",
      // },
    ],
    description:
      "Black Square sequence presented as a spatial closed-eyes installation for 16 bodies, in English and Thai.",
    video: {
      youtubeUrl: "https://youtu.be/eBnWYTcDTuw",
      label: "View Video",
    },
    relatedProjectSlug: "black-square",
  },
  {
    slug: "haan-hall-cmdw",
    workTitle: "HAAN Hall",
    listTitle: "HAAN Hall",
    venue: "",
    location: "Chiang Mai Design Week",
    country: "Thailand",
    dateOrYear: "2025",
    status: "past",
    coverImage: "/images/installations/haan-hall/hcyn-haan-2-01-b.jpg",
    images: [
      {
        src: "/images/installations/haan-hall/hcyn-haan-2-03.jpg",
        alt: "HAAN Hall installation, Chiang Mai Design Week 2025",
      },
      {
        src: "/images/installations/haan-hall/hcyn-haan-01.jpg",
        alt: "HAAN Hall installation, Chiang Mai Design Week 2025",
      },
      {
        src: "/images/installations/haan-hall/hcyn-haan-02.jpg",
        alt: "HAAN Hall installation detail",
      },
      {
        src: "/images/installations/haan-hall/hcyn-haan-2-02.jpg",
        alt: "HAAN Hall installation detail",
      },
      // {
      //   src: "/images/installations/haan-hall/hcyn-haan-04.jpg",
      //   alt: "HAAN Hall documentation",
      // },
      // {
      //   src: "/images/installations/haan-hall/hcyn-haan-05.jpg",
      //   alt: "HAAN Hall documentation",
      // },
      // {
      //   src: "/images/installations/haan-hall/hcyn-haan-06.jpg",
      //   alt: "HAAN Hall documentation",
      // },
    ],
    description: "Body scan as a multichannel installation.",
    relatedProjectSlug: "black-square",
  },
];
