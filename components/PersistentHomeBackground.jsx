"use client";

import { useEffect, useRef, useState } from "react";

const YOUTUBE_ID = "eBnWYTcDTuw";
const POSTER = "/images/hcyn3-high.jpg";
const IFRAME_ID = "hcyn-home-yt";

/** Stable embed URL (no window.origin) so SSR and client hydrate match. */
const EMBED_SRC = (() => {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    loop: "1",
    playlist: YOUTUBE_ID,
    playsinline: "1",
    modestbranding: "1",
    rel: "0",
    iv_load_policy: "3",
    disablekb: "1",
    fs: "0",
    enablejsapi: "1",
  });
  return `https://www.youtube.com/embed/${YOUTUBE_ID}?${params.toString()}`;
})();

function loadYouTubeAPI() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("no window"));
  }
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }
  return new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT);
    };
    if (
      !document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]',
      )
    ) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  });
}

const VOLUME_FADE_MS = 500;

function fadeYouTubeVolume(player, from, to, durationMs, onDone) {
  if (!player || typeof player.setVolume !== "function") {
    onDone?.();
    return () => {};
  }

  let cancelled = false;
  let frame = 0;
  const start = performance.now();

  const tick = (now) => {
    if (cancelled) return;
    const t = Math.min(1, (now - start) / durationMs);
    const value = Math.round(from + (to - from) * t);
    try {
      player.setVolume(value);
    } catch {
      /* ignore */
    }
    if (t < 1) {
      frame = requestAnimationFrame(tick);
    } else {
      onDone?.();
    }
  };

  frame = requestAnimationFrame(tick);
  return () => {
    cancelled = true;
    cancelAnimationFrame(frame);
  };
}

/**
 * Site wallpaper — stays mounted across navigations.
 * Iframe stays in the React tree (no detach) so iOS Safari can keep autoplay.
 */
export function PersistentHomeBackground() {
  const playerRef = useRef(null);
  const mutedRef = useRef(true);
  const fadeCancelRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    let cancelled = false;

    loadYouTubeAPI()
      .then((YT) => {
        if (cancelled || playerRef.current) return;

        const player = new YT.Player(IFRAME_ID, {
          events: {
            onReady: (event) => {
              if (cancelled) return;
              playerRef.current = event.target;
              event.target.mute();
              event.target.setVolume(0);
              event.target.playVideo();
            },
          },
        });
        playerRef.current = player;
      })
      .catch(() => {
        /* wallpaper still plays muted via embed params */
      });

    return () => {
      cancelled = true;
      fadeCancelRef.current?.();
    };
  }, []);

  function toggleSound(event) {
    event.stopPropagation();
    const player = playerRef.current;
    const nextMuted = !mutedRef.current;
    mutedRef.current = nextMuted;
    setMuted(nextMuted);

    fadeCancelRef.current?.();
    fadeCancelRef.current = null;

    if (!player) return;

    try {
      player.playVideo();

      if (nextMuted) {
        // Fade out, then mute
        let from = 100;
        try {
          from = player.getVolume?.() ?? 100;
        } catch {
          from = 100;
        }
        fadeCancelRef.current = fadeYouTubeVolume(
          player,
          from,
          0,
          VOLUME_FADE_MS,
          () => {
            try {
              player.mute();
            } catch {
              /* ignore */
            }
          },
        );
      } else {
        // Unmute at 0, then fade in
        try {
          player.setVolume(0);
          player.unMute();
        } catch {
          /* ignore */
        }
        fadeCancelRef.current = fadeYouTubeVolume(
          player,
          0,
          100,
          VOLUME_FADE_MS,
        );
      }
    } catch {
      /* player not ready yet */
    }
  }

  const soundOn = !muted;
  const label = muted ? "unmute" : "mute";

  return (
    <>
      <div className="home-bg-slot" aria-hidden="true">
        <div className="home-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="home-bg__poster" src={POSTER} alt="" />
          <iframe
            id={IFRAME_ID}
            className="home-bg__iframe"
            src={EMBED_SRC}
            title="Hardcore Yoga Nidra"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
          />
        </div>
        <div className="home-bg-slot__veil" />
      </div>
      <button
        type="button"
        className="home-sound-toggle"
        aria-pressed={soundOn}
        aria-label={muted ? "Unmute sound" : "Mute sound"}
        onClick={toggleSound}
      >
        {label}
      </button>
    </>
  );
}
