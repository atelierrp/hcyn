import { ContentPage } from "@/components/ContentPage";
import { connectPage } from "@/content/connect";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("connect", {
  title: connectPage.title,
});

export default function ConnectPage() {
  return (
    <ContentPage>
      <div className="connect-list">
        {connectPage.email ? (
          <p>
            <a
              className="connect-list__external"
              href={`mailto:${connectPage.email}`}
            >
              email
            </a>
          </p>
        ) : null}
        {connectPage.links.map((link) => (
          <p key={link.href}>
            <a
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
            </a>
          </p>
        ))}
      </div>
    </ContentPage>
  );
}
