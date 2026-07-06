"use client";

import { useEffect } from "react";

/**
 * Site-wide affiliate outbound click tracking.
 *
 * Every affiliate CTA is marked rel="... sponsored". This attaches a single
 * delegated listener that fires a GA4 `affiliate_click` event whenever one is
 * clicked, capturing the destination, the page it happened on, and the link
 * text, so revenue can be attributed to specific pages and partners.
 *
 * No per-link wiring required; it works for the affiliate template, the
 * comparison roundups, and any future sponsored link.
 *
 * (window.gtag / window.dataLayer are declared globally in Analytics.tsx.)
 */

// Rough estimated commission value (AUD) per partner, keyed by destination host.
// This is a planning estimate so GA can weight clicks by likely revenue and
// surface "revenue per page", it is NOT actual commission. Refine as real
// payout data comes in. Unknown partners default to a nominal value.
const PARTNER_VALUE: Record<string, number> = {
  "getmoshy.com.au": 80,
  "getmosh.com.au": 70,
  "densehairexperts.myshopify.com": 25,
  "myjuniper.com.au": 0,
  "betterbeinghealth.com.au": 0,
  "beehiiv.com": 40,
  "try.carrd.co": 6,
  "durableai.link": 20,
  "butternut.ai": 15,
  "swipepages.com": 25,
  "incomelab.me": 20,
  "apollopeptidesciences.com": 30,
  "ascensionpeptides.com": 30,
  "biopeptitech.com": 30,
};
const DEFAULT_VALUE = 10;

export function AffiliateClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.("a[rel~='sponsored']") as HTMLAnchorElement | null;
      if (!link) return;

      let destinationHost = "";
      try {
        destinationHost = new URL(link.href).hostname.replace(/^www\./, "");
      } catch {
        destinationHost = link.href;
      }

      const payload = {
        destination_url: link.href,
        destination_host: destinationHost,
        link_text: (link.textContent || "").trim().slice(0, 80),
        // Placement of the CTA that was clicked (data-cta), e.g. "hero",
        // "verdict", "mobile-sticky", lets you see which positions convert.
        cta_location: link.getAttribute("data-cta") || "inline",
        page_path: window.location.pathname,
        // Estimated commission value so GA can rank pages by likely revenue.
        value: PARTNER_VALUE[destinationHost] ?? DEFAULT_VALUE,
        currency: "AUD",
        // GA4 recommended ecommerce-style fields for easier reporting
        event_category: "affiliate",
        event_label: destinationHost,
      };

      window.gtag?.("event", "affiliate_click", payload);
      // Also push to dataLayer for GTM consumers, if present.
      window.dataLayer?.push({ event: "affiliate_click", ...payload });
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
