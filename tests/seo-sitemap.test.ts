import { describe, expect, it } from "vitest";

import sitemap from "../src/app/sitemap";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://referlabs.com.au";

const normalizeUrl = (url: string) => url.replace(/\/$/, "");

const REQUIRED_PATHS = [
  "/",
  "/pricing",
  "/how-it-works",
  "/case-studies",
  "/roi-calculator",
  "/lead-hacking",
  "/our-referral-program",
  "/integrations",
  "/api-guide",
  "/analytics",
  "/calendly",
  "/go-live",
  "/google-ads",
  "/gtm",
  "/hubspot",
  "/klaviyo",
  "/linkedin-growth",
  "/linkedin-growth/business",
  "/linkedin-growth/influencer",
  "/linkedin-influencer",
  "/linkedin-influencer/business",
  "/linkedin-influencer/influencer",
  "/mailchimp",
  "/make",
  "/meta-ads",
  "/referral",
  "/referred",
  "/servicem8",
  "/shopify",
  "/shopify/checkout-extensibility",
  "/square",
  "/squarespace",
  "/status",
  "/stripe",
  "/tiktok-ads",
  "/webflow",
  "/wix",
  "/wordpress",
  "/zapier",
  "/about",
  "/contact",
  "/faq",
  "/security",
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
