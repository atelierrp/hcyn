import { InstallationList } from "@/components/InstallationList";
import { ContentPage } from "@/components/ContentPage";
import { getInstallationsByStatus } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("installations");

export default function InstallationsPage() {
  const upcoming = getInstallationsByStatus("upcoming");
  const past = getInstallationsByStatus("past");

  return (
    <ContentPage>
      <InstallationList upcoming={upcoming} past={past} />
    </ContentPage>
  );
}
