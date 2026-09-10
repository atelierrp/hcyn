/**
 * Fade wallpaper to black before paint on installation detail routes.
 */
export default function InstallationDetailLayout({ children }) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.dataset.scrollFaded="true"`,
        }}
      />
      {children}
    </>
  );
}
