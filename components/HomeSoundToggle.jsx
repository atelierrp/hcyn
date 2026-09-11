"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { applyHomeSoundMuted } from "@/lib/homeSound";

const MOBILE_MQ = "(max-width: 767px)";

/**
 * Top-layer mute control. Calls the wallpaper applier in the same tap turn.
 * Phone: home always; other routes only while unmuted (so you can mute).
 * Desktop: always available — except register pages (hidden).
 */
export function HomeSoundToggle() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isRegister =
    pathname === "/register" || pathname.startsWith("/register/");
  const [muted, setMuted] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastTapRef = useRef(0);
  const mutedRef = useRef(true);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia(MOBILE_MQ);
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  function toggle(event) {
    event.preventDefault();
    event.stopPropagation();

    const now = Date.now();
    if (now - lastTapRef.current < 350) return;
    lastTapRef.current = now;

    const nextMuted = !mutedRef.current;
    mutedRef.current = nextMuted;
    setMuted(nextMuted);
    applyHomeSoundMuted(nextMuted);
  }

  // Register: always hide. Phone: home, or other routes while unmuted. Desktop: show.
  const visible =
    !isRegister && (!isMobile || isHome || !muted);

  const node = (
    <div
      className={
        visible ? "home-sound-layer" : "home-sound-layer home-sound-layer--hidden"
      }
    >
      {visible ? (
        <button
          type="button"
          className="home-sound-toggle"
          aria-pressed={!muted}
          aria-label={muted ? "Unmute sound" : "Mute sound"}
          onPointerUp={toggle}
          onClick={toggle}
        >
          {muted ? "unmute" : "mute"}
        </button>
      ) : null}
    </div>
  );

  if (!mounted) return null;
  return createPortal(node, document.body);
}
