import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP fallback. Next negotiates per-browser and caches
    // the encoded result, so large PNGs are never served as-is.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [400, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    // Import only the icons actually used instead of whole icon barrels.
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
};

export default nextConfig;
