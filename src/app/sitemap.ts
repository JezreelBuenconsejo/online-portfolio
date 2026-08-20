import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: site.url,
      priority: 1.0,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      url: `${site.url}/about`,
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: now,
    },
    ...projects.map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
      lastModified: now,
    })),
  ];
}
