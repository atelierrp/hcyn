import { seo } from "@/content/seo";
import { getInstallationSlugs, getRegistrationSlugs } from "@/lib/content";
import {
  getIndexableStaticRoutes,
  getSiteUrl,
  installationDetailsIndexable,
  registrationsIndexable,
} from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap() {
  const base = getSiteUrl();

  const staticRoutes = getIndexableStaticRoutes().map((entry) => ({
    url: `${base}${entry.path === "/" ? "/" : entry.path}`,
    changeFrequency: entry.changeFrequency ?? "monthly",
    priority: entry.priority ?? 0.5,
  }));

  const detail = seo.installationDetail;
  const installationRoutes = installationDetailsIndexable()
    ? getInstallationSlugs().map((slug) => ({
        url: `${base}/installations/${slug}`,
        changeFrequency: detail.changeFrequency ?? "monthly",
        priority: detail.priority ?? 0.7,
      }))
    : [];

  const register = seo.register;
  const registrationRoutes = registrationsIndexable()
    ? getRegistrationSlugs().map((slug) => ({
        url: `${base}/register/${slug}`,
        changeFrequency: register.changeFrequency ?? "weekly",
        priority: register.priority ?? 0.8,
      }))
    : [];

  return [...staticRoutes, ...installationRoutes, ...registrationRoutes];
}
