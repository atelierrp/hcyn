import { notFound } from "next/navigation";
import { ContentPage } from "@/components/ContentPage";
import { RegistrationDetails } from "@/components/RegistrationDetails";
import {
  getRegistrationBySlug,
  getRegistrationSlugs,
} from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return getRegistrationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const registration = getRegistrationBySlug(slug);
  if (!registration) {
    return pageMetadata("register", { title: "Registration not found" });
  }
  return pageMetadata("register", {
    title: registration.title,
    description: `Registration — ${registration.city}`,
    // Only upcoming sessions (e.g. Bangkok) are indexed; past forms stay noindex.
    index: registration.status === "upcoming",
  });
}

export default async function RegisterPage({ params }) {
  const { slug } = await params;
  const registration = getRegistrationBySlug(slug);
  if (!registration) notFound();

  return (
    <ContentPage>
      <RegistrationDetails registration={registration} />
    </ContentPage>
  );
}
