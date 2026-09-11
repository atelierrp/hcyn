"use client";

import { useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteNav } from "@/components/SiteNav";

const FADE_AFTER_PX = 1;
const MOBILE_MQ = "(max-width: 767px)";

function isInstallationDetailPath(pathname) {
  return /^\/installations\/[^/]+/.test(pathname);
}

function isRegisterPath(pathname) {
  return pathname === "/register" || pathname.startsWith("/register/");
}

function isProjectPath(pathname) {
  return pathname === "/project" || pathname.startsWith("/project/");
}

/**
 * Desktop: logo top-left; nav top-left (fades on scroll); content under black panel.
 * Mobile: SVG logo + nav fixed bottom (60/40), vertically matched; no page-top logo.
 * Installation detail, register, and project pages start fully black (wallpaper faded).
 */
export function SiteChrome({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isInstallationDetail = isInstallationDetailPath(pathname);
  const isRegister = isRegisterPath(pathname);
  const isProject = isProjectPath(pathname);
  const forceBlack = isInstallationDetail || isRegister || isProject;
  const [navFaded, setNavFaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const media = window.matchMedia(MOBILE_MQ);
    const syncMobile = () => setIsMobile(media.matches);
    syncMobile();
    media.addEventListener("change", syncMobile);
    return () => media.removeEventListener("change", syncMobile);
  }, []);

  useLayoutEffect(() => {
    const sync = () => {
      // Home: no scroll, no veil / mute / nav fade.
      if (isHome) {
        if (window.scrollY !== 0) window.scrollTo(0, 0);
        setNavFaded(false);
        document.documentElement.dataset.scrollFaded = "false";
        document.documentElement.dataset.soundFaded = "false";
        return;
      }

      const scrolled = window.scrollY > FADE_AFTER_PX;
      // Mobile: bottom chrome stays put — never fade.
      // Installation detail + register keep nav visible (full-black pages).
      setNavFaded(
        isMobile || isInstallationDetail || isRegister ? false : scrolled,
      );
      document.documentElement.dataset.scrollFaded =
        forceBlack || scrolled ? "true" : "false";
      // Mute never fades on install/register/project (same as nav on those pages).
      document.documentElement.dataset.soundFaded =
        isInstallationDetail || isRegister || isProject
          ? "false"
          : scrolled
            ? "true"
            : "false";
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => {
      window.removeEventListener("scroll", sync);
      // Keep veil state during route swaps — clearing it remounts/flashes media.
    };
  }, [
    forceBlack,
    isInstallationDetail,
    isRegister,
    isProject,
    isMobile,
    isHome,
  ]);

  return (
    <>
      <div className="site-bottom-chrome">
        <div className="site-logo-fixed">
          <SiteHeader compact={false} />
        </div>

        <div
          className={
            navFaded ? "site-nav-fixed site-nav-fixed--faded" : "site-nav-fixed"
          }
        >
          <SiteNav />
        </div>
      </div>

      <div className="site-nav-bottom-gradient" aria-hidden="true" />

      {isHome ? (
        children
      ) : (
        <>
          <div className="site-panel__backdrop" aria-hidden="true" />
          <div className="site-panel__gradient" aria-hidden="true" />
          <div className="site-panel">
            <div className="site-panel__inner">
              <div className="site-panel__nav-spacer" aria-hidden="true" />
              <div className="site-panel__content">{children}</div>
              <div className="site-panel__scroll-end" aria-hidden="true" />
            </div>
          </div>
        </>
      )}
    </>
  );
}
