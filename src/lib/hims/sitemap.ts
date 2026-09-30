import type { MetadataRoute } from "next";
import { HIMS_SLUG_LIST } from "@/content/hims/slugs";
import { SITE_URL } from "@/content/hims/config";
import { himsPagesLive } from "./access";

/** Spread into app/sitemap.ts. Returns nothing until HIMS_PAGES_LIVE=true. */
export function himsSitemapEntries(): MetadataRoute.Sitemap {
  if (!himsPagesLive()) return [];
  return HIMS_SLUG_LIST.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: new Date("2026-09-30"),
    changeFrequency: "monthly" as const,
    priority: slug.startsWith("hims") ? 0.9 : 0.8,
  }));
}
