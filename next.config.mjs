const nextConfig = {
  output: "export",
  trailingSlash: true, // out/live/index.html → /live/ works on Pages
  images: { unoptimized: true }, // required with next/image + static export
};

export default nextConfig;
