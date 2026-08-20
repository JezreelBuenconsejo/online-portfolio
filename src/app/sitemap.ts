import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      priority: 1.0,
      changeFrequency: "weekly",
      lastModified: new Date(),
    },
    // Phase 2: add /work/[slug] entries here once those routes exist.
    // Listing them before they ship would advertise 404s to crawlers.
  ];
}
