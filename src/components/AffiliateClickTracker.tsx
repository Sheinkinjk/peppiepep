"use client";

import { useEffect } from "react";

/**
 * Site-wide affiliate outbound click tracking.
 *
 * Every affiliate CTA is marked rel="... sponsored". This attaches a single
 * delegated listener that fires a GA4 `affiliate_click` event whenever one is
 * clicked, capturing the destination, the page it happened on, and the link
 * text — so revenue can be attributed to specific pages and partners.
 *
 * No per-link wiring required; it works for the affiliate template, the
 * comparison roundups, and any future sponsored link.
 *
 * (window.gtag / window.dataLayer are declared globally in Analytics.tsx.)
 */
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
        page_path: window.location.pathname,
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
