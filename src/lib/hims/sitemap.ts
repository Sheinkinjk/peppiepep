import type { MetadataRoute } from "next";
import { HIMS_SLUG_LIST } from "@/content/hims/slugs";
import { SITE_URL } from "@/content/hims/config";
import { getHimsPage } from "@/content/hims";
import { himsPagesLive } from "./access";

/**
 * Spread into app/sitemap.ts. Returns nothing until HIMS_PAGES_LIVE=true.
 * lastModified comes from each page's own `modified` date, so the sitemap and the
 * page's WebPage/Article dateModified cannot disagree.
 */
export function himsSitemapEntries(): MetadataRoute.Sitemap {
  if (!himsPagesLive()) return [];
  return HIMS_SLUG_LIST.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: new Date(getHimsPage(slug)?.modified ?? "2026-10-01"),
    changeFrequency: "monthly" as const,
    priority: slug.startsWith("hims") ? 0.9 : 0.8,
  }));
}
