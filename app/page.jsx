import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("home");

export default function HomePage() {
  return (
    <div className="page-home">
      <h1 className="visually-hidden">Hardcore Yoga Nidra</h1>
      {/* Wallpaper video lives in root layout (PersistentHomeBackground) */}
    </div>
  );
}
