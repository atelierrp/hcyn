import { notFound } from "next/navigation";
import { ContentBlocks } from "@/components/ContentBlocks";
import {
  ContentPage,
  ContentPageImage,
} from "@/components/ContentPage";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  const slugs = getProjectSlugs();
  // output: "export" requires ≥1 path; parked projects still 404 via notFound().
  if (slugs.length === 0) return [{ slug: "__parked__" }];
  return slugs.map((slug) => ({ slug }));
}

/** No fallback routes while projects are parked. */
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return pageMetadata("project", { title: "Project not found" });
  }
  return pageMetadata("project", {
    title: project.title,
    description: project.description,
  });
}

function takeHeroMedia(blocks) {
  const mediaSrc = "/images/installations/black-square/hcyn-bs-02.jpg";
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.type === "image") {
      return {
        mediaSrc: block.src,
        mediaAlt: block.alt,
        restBlocks: [...blocks.slice(0, i), ...blocks.slice(i + 1)],
      };
    }
  }
  return { mediaSrc, mediaAlt: null, restBlocks: blocks };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { mediaSrc, mediaAlt, restBlocks } = takeHeroMedia(project.blocks);

  return (
    <ContentPage
      media={
        <ContentPageImage
          src={mediaSrc}
          alt={mediaAlt ?? project.subtitle ?? project.title}
        />
      }
    >
      <div className="prose-body project-page">
        {project.subtitle ? (
          <h1 className="prose-heading project-page__title">
            {project.subtitle}
          </h1>
        ) : (
          <h1 className="prose-heading project-page__title">{project.title}</h1>
        )}
        <ContentBlocks blocks={restBlocks} />
      </div>
    </ContentPage>
  );
}
