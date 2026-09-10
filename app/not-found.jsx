import { ContentPage } from "@/components/ContentPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("notFound");

export default function NotFound() {
  return (
    <ContentPage>
      <p className="prose-body">page not found</p>
    </ContentPage>
  );
}
