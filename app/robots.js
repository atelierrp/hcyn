import { getRobotsDisallow, getSiteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export default function robots() {
  const base = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: getRobotsDisallow(),
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
