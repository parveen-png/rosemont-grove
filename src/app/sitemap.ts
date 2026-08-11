import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-10");

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/sources"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/privacy-policy"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
