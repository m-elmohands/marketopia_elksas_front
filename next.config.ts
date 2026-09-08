import type { NextConfig } from "next";

const mediaUrl = new URL(process.env.NEXT_PUBLIC_MEDIA_URL ?? "http://localhost:8000");
const configuredMediaPattern = {
  protocol: mediaUrl.protocol.replace(":", "") as "http" | "https",
  hostname: mediaUrl.hostname,
  port: mediaUrl.port,
  pathname: "/storage/**",
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      configuredMediaPattern,
      { protocol: "http", hostname: "localhost", pathname: "/storage/**" },
      { protocol: "http", hostname: "localhost", port: "8000", pathname: "/storage/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "8000", pathname: "/storage/**" },
    ],
  },
};

export default nextConfig;
