import { EventList } from "@/components/EventList";
import { ContentPage } from "@/components/ContentPage";
import { getLiveEventsByStatus } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("live");

export default function LivePage() {
  const upcoming = getLiveEventsByStatus("upcoming");
  const past = getLiveEventsByStatus("past");

  return (
    <ContentPage>
      <EventList upcoming={upcoming} past={past} />
    </ContentPage>
  );
}
