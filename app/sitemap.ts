import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.totallyfakeplumbing.example",
      lastModified: new Date("2026-07-03"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
