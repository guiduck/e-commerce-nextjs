import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.escuelajs.co",
        pathname: "/api/v1/files/**",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "placeimg.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
