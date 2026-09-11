import localFont from "next/font/local";
import { HomeSoundToggle } from "@/components/HomeSoundToggle";
import { PersistentHomeBackground } from "@/components/PersistentHomeBackground";
import { SiteChrome } from "@/components/SiteChrome";
import { getSiteUrl, ogImage } from "@/lib/metadata";
import "./globals.css";

const greedRegular = localFont({
  src: "../public/greed/GreedStandard-Regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-greed-regular",
  display: "block",
});

const greedExtended = localFont({
  src: "../public/greed/GreedExtended-Regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-greed-extended",
  display: "block",
});

const greedWideBold = localFont({
  src: "../public/greed/GreedExtended-Bold.woff2",
  weight: "800",
  style: "normal",
  variable: "--font-greed-wide-bold",
  display: "block",
});

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Hardcore Yoga Nidra",
    template: "%s — Hardcore Yoga Nidra",
  },
  description: "Hardcore Yoga Nidra",
  openGraph: {
    title: "Hardcore Yoga Nidra",
    description: "Hardcore Yoga Nidra",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hardcore Yoga Nidra",
    description: "Hardcore Yoga Nidra",
    images: [ogImage.url],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * Root layout.
 * Wallpaper + fixed logo left; content routes use black right panel with gradient.
 * Future: AudioProvider can live here the same way.
 */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${greedRegular.variable} ${greedExtended.variable} ${greedWideBold.variable}`}
    >
      <body>
        <PersistentHomeBackground />
        <SiteChrome>{children}</SiteChrome>
        <HomeSoundToggle />
      </body>
    </html>
  );
}
