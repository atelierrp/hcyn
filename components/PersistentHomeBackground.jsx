"use client";

import { useEffect, useMemo, useRef } from "react";

const YOUTUBE_ID = "eBnWYTcDTuw";
const POSTER = "/images/hcyn3-high.jpg";

function youtubeCoverSrc(videoId, origin) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    muted: "1",
    controls: "0",
    loop: "1",
    playlist: videoId,
    playsinline: "1",
    modestbranding: "1",
    rel: "0",
    showinfo: "0",
    iv_load_policy: "3",
    cc_load_policy: "0",
    disablekb: "1",
    fs: "0",
    enablejsapi: "1",
  });
  if (origin) params.set("origin", origin);
  // youtube.com (not nocookie) — more reliable autoplay on iOS Safari
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function nudgeYouTubePlay(iframe) {
  if (!iframe?.contentWindow) return;
  const win = iframe.contentWindow;
  win.postMessage(
    JSON.stringify({ event: "command", func: "mute", args: [] }),
    "*",
  );
  win.postMessage(
    JSON.stringify({ event: "command", func: "playVideo", args: [] }),
    "*",
  );
}

/**
 * Site wallpaper — stays mounted across navigations.
 * Iframe stays in the React tree (no detach) so iOS Safari can keep autoplay.
 */
export function PersistentHomeBackground() {
  const iframeRef = useRef(null);

  const src = useMemo(() => {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://hardcoreyoganidra.com";
    return youtubeCoverSrc(YOUTUBE_ID, origin);
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return undefined;

    const play = () => nudgeYouTubePlay(iframe);

    const onLoad = () => {
      play();
      window.setTimeout(play, 400);
      window.setTimeout(play, 1200);
    };

    iframe.addEventListener("load", onLoad);

    const onInteract = () => {
      play();
    };
    window.addEventListener("touchstart", onInteract, {
      passive: true,
      once: true,
    });
    window.addEventListener("click", onInteract, { once: true });

    return () => {
      iframe.removeEventListener("load", onLoad);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("click", onInteract);
    };
  }, []);

  return (
    <div className="home-bg-slot" aria-hidden="true">
      <div className="home-bg" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="home-bg__poster" src={POSTER} alt="" />
        <iframe
          ref={iframeRef}
          className="home-bg__iframe"
          src={src}
          title="Hardcore Yoga Nidra"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex={-1}
        />
      </div>
      <div className="home-bg-slot__veil" />
    </div>
  );
}
