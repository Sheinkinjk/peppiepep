import { describe, expect, it } from "vitest";

import sitemap from "../src/app/sitemap";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://referlabs.com.au";

const normalizeUrl = (url: string) => url.replace(/\/$/, "");

const REQUIRED_PATHS = [
  // These are the paths the sitemap must carry for the CURRENT business: the
  // consumer comparison verticals, the money pages and the trust pages.
  //
  // This list previously asserted the retired Pepform SaaS sitemap: /pricing,
  // /roi-calculator, /case-studies, the integration pages (/shopify, /stripe,
  // /zapier, /hubspot ...) and the LinkedIn growth cluster. Those pages were
  // deliberately pruned from the sitemap when the platform was retired in July
  // 2026, so the test had been failing ever since and asserting a business that
  // no longer exists. A red test nobody can act on trains people to ignore the
  // suite, which is worse than not having it.
  "/",
  "/weight-loss",
  "/hair-loss",
  "/pet-insurance",
  "/business-software",
  "/deals",
  "/guides",
  "/moshy",
  "/moshhair",
  "/juniper",
  "/apollo-energy-group",
  "/knose",
  "/petsonme",
  "/superfiliate",
  "/about",
  "/how-we-make-money",
  "/contact",
  "/faq",
  "/privacy",
  "/terms",
];

describe("SEO sitemap", () => {
  it("includes required marketing and integration URLs", () => {
    const entries = sitemap();
    const urls = new Set(entries.map((entry) => normalizeUrl(entry.url)));

    REQUIRED_PATHS.forEach((path) => {
      expect(urls.has(normalizeUrl(`${BASE_URL}${path}`))).toBe(true);
    });
  });

  it("has unique URLs and valid base URLs", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => normalizeUrl(entry.url));

    expect(new Set(urls).size).toBe(urls.length);

    urls.forEach((url) => {
      expect(url.startsWith(BASE_URL)).toBe(true);
    });
  });
});
