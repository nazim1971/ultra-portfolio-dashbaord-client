import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow any hostname over HTTPS
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
