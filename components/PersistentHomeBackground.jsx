"use client";

import { useEffect, useRef } from "react";
import { registerHomeSoundApplier } from "@/lib/homeSound";

const YOUTUBE_ID = "eBnWYTcDTuw";
const POSTER = "/images/hcyn3-high.jpg";
const IFRAME_ID = "hcyn-home-yt";

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
    } else if (window.YT?.Player) {
      resolve(window.YT);
    }
  });
}

const VOLUME_FADE_MS = 500;

function isMobileSound() {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent || "";
  const iOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 767px)").matches;
  return iOS || touch || narrow;
}

function postYtCommand(func, args = []) {
  const iframe = document.getElementById(IFRAME_ID);
  iframe?.contentWindow?.postMessage(
    JSON.stringify({ event: "command", func, args }),
    "*",
  );
}

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
 * Mute UI: HomeSoundToggle → applyHomeSoundMuted (same tap turn).
 */
export function PersistentHomeBackground() {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const mutedRef = useRef(true);
  const fadeCancelRef = useRef(null);

  function bindPlayer() {
    loadYouTubeAPI()
      .then((YT) => {
        if (!document.getElementById(IFRAME_ID)) return;
        if (playerRef.current?.mute) return;

        const player = new YT.Player(IFRAME_ID, {
          events: {
            onReady: (event) => {
              playerRef.current = event.target;
              try {
                // Mute only — never setVolume(0); iOS won't raise it later.
                event.target.mute();
                event.target.playVideo();
              } catch {
                /* ignore */
              }
            },
          },
        });
        playerRef.current = player;
      })
      .catch(() => {
        /* wallpaper still plays muted via embed params */
      });
  }

  function applyMuted(nextMuted) {
    mutedRef.current = nextMuted;
    fadeCancelRef.current?.();
    fadeCancelRef.current = null;

    const player = playerRef.current;
    const mobile = isMobileSound();

    // Always fire postMessage in this turn (helps when API wrapper is stale).
    postYtCommand("playVideo");
    if (nextMuted) {
      postYtCommand("mute");
    } else {
      postYtCommand("unMute");
      postYtCommand("setVolume", [100]);
    }

    if (!player || typeof player.mute !== "function") return;

    try {
      player.playVideo?.();

      if (nextMuted) {
        if (mobile) {
          player.mute();
          return;
        }
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
      } else if (mobile) {
        // No iframe reload — that restarts and iOS pauses unmuted autoplay.
        player.unMute();
        try {
          player.setVolume?.(100);
        } catch {
          /* ignore */
        }
        player.playVideo?.();
      } else {
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

  useEffect(() => {
    bindPlayer();
    const unregister = registerHomeSoundApplier(applyMuted);
    return () => {
      fadeCancelRef.current?.();
      unregister();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount once
  }, []);

  return (
    <div className="home-bg-slot" aria-hidden="true">
      <div className="home-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="home-bg__poster" src={POSTER} alt="" />
        <div className="home-bg__iframe-mount">
          <iframe
            ref={iframeRef}
            id={IFRAME_ID}
            className="home-bg__iframe"
            src={EMBED_SRC}
            title="Hardcore Yoga Nidra"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
          />
        </div>
      </div>
      <div className="home-bg-slot__veil" />
    </div>
  );
}
