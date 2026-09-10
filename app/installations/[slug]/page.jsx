import { notFound } from "next/navigation";
import { InstallationDetailView } from "@/components/InstallationDetailView";
import {
  getInstallationBySlug,
  getInstallationSlugs,
} from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return getInstallationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const installation = getInstallationBySlug(slug);
  if (!installation) {
    return pageMetadata("installationDetail", {
      title: "Installation not found",
    });
  }
  return pageMetadata("installationDetail", {
    title: installation.workTitle,
    description:
      installation.description ??
      `${installation.workTitle} in ${[installation.venue, installation.location, installation.country].filter(Boolean).join(", ")}.`,
  });
}

export default async function InstallationDetailPage({ params }) {
  const { slug } = await params;
  const installation = getInstallationBySlug(slug);
  if (!installation) notFound();

  const images = installation.images ?? [];
  const place = [installation.venue, installation.location, installation.country]
    .filter(Boolean)
    .join(", ");

  const header = (
    <>
      <h1 className="install-detail__title">{installation.workTitle}</h1>
      {place ? <p className="install-detail__meta">{place}</p> : null}
      <p className="install-detail__meta">{installation.dateOrYear}</p>
      {installation.description ? (
        <p className="install-detail__description">
          {installation.description}
        </p>
      ) : null}

      {installation.video ? (
        <p className="install-detail__description">
          <a
            href={installation.video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {installation.video.label ?? "Watch video"}
          </a>
        </p>
      ) : null}

      {installation.credits ? (
        <p className="install-detail__description">{installation.credits}</p>
      ) : null}
    </>
  );

  return <InstallationDetailView header={header} images={images} />;
}
