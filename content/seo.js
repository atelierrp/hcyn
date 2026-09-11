/**
 * SEO overview — single place to set titles, descriptions, and index flags.
 *
 * Flip `index: false` to noindex + keep out of sitemap / robots allow.
 * Dynamic pages still pull title/description from content when overridden
 * in generateMetadata; the `index` flag here always wins.
 */

export const seo = {
  home: {
    path: "/",
    index: true,
    title: "Hardcore Yoga Nidra",
    description: "Hardcore Yoga Nidra",
    changeFrequency: "weekly",
    priority: 1,
  },
  live: {
    path: "/live",
    index: true,
    title: "Live",
    description: "Upcoming and past Hardcore Yoga Nidra live sessions.",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  installations: {
    path: "/installations",
    index: true,
    title: "Installations",
    description: "Hardcore Yoga Nidra installation realizations.",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  connect: {
    path: "/connect",
    index: true,
    title: "Connect",
    description: "Contact and links for Hardcore Yoga Nidra.",
    changeFrequency: "monthly",
    priority: 0.5,
  },
  research: {
    path: "/research",
    index: false,
    title: "Research",
    description: "Research and residencies related to Hardcore Yoga Nidra.",
  },

  /** /installations/[slug] — title/description from installation content */
  installationDetail: {
    pathPrefix: "/installations/",
    index: true,
    changeFrequency: "monthly",
    priority: 0.7,
  },

  /** /project/[slug] — parked (no projects published; content kept in content/projects/) */
  project: {
    pathPrefix: "/project/",
    index: false,
  },

  /** /register/[slug] — only upcoming (Bangkok) is indexed; past pages are noindex */
  register: {
    pathPrefix: "/register/",
    index: true,
    changeFrequency: "weekly",
    priority: 0.8,
  },

  notFound: {
    index: false,
    title: "Page not found",
    description: "This page could not be found.",
  },
};
