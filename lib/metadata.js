import { seo } from "@/content/seo";

/** Site-wide Open Graph / Twitter share image (1200×630). */
export const ogImage = {
  url: "/images/og.jpg",
  width: 1200,
  height: 630,
  alt: "Hardcore Yoga Nidra",
};

function withShareMeta(title, description, robots) {
  return {
    title,
    description,
    robots,
    openGraph: {
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

export function indexable(title, description) {
  return withShareMeta(title, description, { index: true, follow: true });
}

export function noindex(title, description) {
  return withShareMeta(title, description, { index: false, follow: false });
}

/**
 * Resolve metadata from content/seo.js.
 * Pass title/description overrides for dynamic pages.
 */
export function pageMetadata(key, overrides = {}) {
  const entry = seo[key];
  if (!entry) {
    throw new Error(`Unknown SEO page key: ${key}`);
  }
  const title = overrides.title ?? entry.title ?? "Hardcore Yoga Nidra";
  const description = overrides.description ?? entry.description;
  const shouldIndex =
    typeof overrides.index === "boolean" ? overrides.index : entry.index;
  return shouldIndex
    ? indexable(title, description)
    : noindex(title, description);
}

/** Static routes that should appear in the sitemap. */
export function getIndexableStaticRoutes() {
  return Object.values(seo).filter(
    (entry) => entry.index && entry.path && !entry.pathPrefix,
  );
}

/** Whether installation detail pages are indexable. */
export function installationDetailsIndexable() {
  return Boolean(seo.installationDetail?.index);
}

/** Whether registration pages are indexable (section flag). */
export function registrationsIndexable() {
  return Boolean(seo.register?.index);
}

/** Slugs for registration pages that should appear in the sitemap. */
export function getIndexableRegistrationSlugs(registrations) {
  if (!registrationsIndexable()) return [];
  return registrations
    .filter((r) => r.index !== false && r.status === "upcoming")
    .map((r) => r.slug);
}

/** Paths to disallow in robots.txt (noindex sections). */
export function getRobotsDisallow() {
  const disallow = [];
  for (const entry of Object.values(seo)) {
    if (entry.index) continue;
    if (entry.pathPrefix) {
      disallow.push(entry.pathPrefix);
    } else if (entry.path && entry.path !== "/") {
      disallow.push(entry.path);
    }
  }
  return disallow;
}

/** Site origin for sitemap/robots. Override via NEXT_PUBLIC_SITE_URL when deploying. */
export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://hardcoreyoganidra.com";
}
