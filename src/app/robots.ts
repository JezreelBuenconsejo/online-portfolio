import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://www.jezreelbuenconsejo.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api", "/admin", "/draft"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
