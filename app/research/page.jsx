import { ContentPage } from "@/components/ContentPage";
import { researchPage } from "@/content/research";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("research", {
  title: researchPage.title,
});

export default function ResearchPage() {
  return (
    <ContentPage>
      <div className="prose-body">
        {researchPage.sections.map((section, i) => (
          <section key={i} className="section-block">
            {section.heading ? (
              <h2 className="section-block__title">{section.heading}</h2>
            ) : null}
            {section.paragraphs.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </section>
        ))}
      </div>
    </ContentPage>
  );
}
