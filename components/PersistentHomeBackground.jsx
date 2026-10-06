const HOME_BG = "/images/home-bg-high.jpg";

/**
 * Full-viewport home wallpaper (static image). Mounted in root layout so it
 * stays put across route changes; veiled on content pages.
 */
export function PersistentHomeBackground() {
  return (
    <div className="home-bg-slot" aria-hidden="true">
      <div className="home-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="home-bg__poster" src={HOME_BG} alt="" />
      </div>
      <div className="home-bg-slot__veil" />
    </div>
  );
}
