"use client";

import { memo, useMemo } from "react";

const DEFAULT_YOUTUBE_ID = "eBnWYTcDTuw";

function youtubeCoverSrc(videoId) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
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
  });
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

/**
 * Homepage wallpaper media (YouTube test or future mp4).
 * Mount via PersistentHomeBackground in root layout so playback survives navigation.
 * Memoized so route changes never recreate the iframe/video node.
 */
export const HomeBackgroundVideo = memo(function HomeBackgroundVideo({
  src,
  poster = "/images/hcyn3-high.jpg",
  youtubeId = DEFAULT_YOUTUBE_ID,
}) {
  const iframeSrc = useMemo(
    () => (youtubeId ? youtubeCoverSrc(youtubeId) : null),
    [youtubeId],
  );

  if (src) {
    return (
      <div className="home-bg" aria-hidden="true">
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="home-bg__poster" src={poster} alt="" />
        ) : null}
        <video
          className="home-bg__media"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
    );
  }

  if (iframeSrc) {
    return (
      <div className="home-bg" aria-hidden="true">
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="home-bg__poster" src={poster} alt="" />
        ) : null}
        <iframe
          className="home-bg__iframe"
          src={iframeSrc}
          title="Hardcore Yoga Nidra"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex={-1}
        />
      </div>
    );
  }

  return (
    <div className="home-bg" aria-hidden="true">
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="home-bg__poster" src={poster} alt="" />
      ) : null}
    </div>
  );
});
