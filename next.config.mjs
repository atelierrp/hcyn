const nextConfig = {
  output: "export",
  trailingSlash: true, // out/live/index.html → /live/ works on Pages
  images: { unoptimized: true }, // required with next/image + static export
  // Phone / LAN testing — without this, Next blocks /_next/* JS on the device
  allowedDevOrigins: ["192.168.1.13", "192.168.*.*"],
};

export default nextConfig;
