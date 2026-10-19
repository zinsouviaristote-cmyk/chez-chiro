import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 60, 75],
    deviceSizes: [390, 640, 720, 828, 1080, 1280, 1600, 1920],
    imageSizes: [96, 140, 180, 260, 320, 420],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
