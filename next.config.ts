import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 60, 75],
    // Few widths on purpose: every srcset entry is written twice in the page
    // (HTML + RSC payload), so long lists cost parse and hydration time.
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [128, 256, 384],
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
