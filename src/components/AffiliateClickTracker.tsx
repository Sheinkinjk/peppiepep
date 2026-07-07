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
  // AI sales & automation (recurring programs weighted by expected LTV)
  "gohighlevel.com": 100,
  "partner.aisdr.com": 120,
  "get.reply.io": 40,
  "fullenrich.partnerlinks.io": 30,
  // HR & payroll
  "try.employmenthero.com": 80,
  // Prediction markets (share of first-30-day trading fees)
  "polymarket.com": 15,
};
const DEFAULT_VALUE = 10;

// Networks that support per-click sub-ID reporting via a query param appended
// to the outbound link at click time. PartnerStack (sid1) surfaces the value
// against referred customers in the partner dashboard, which upgrades
// "clicks per page" into "revenue per page" for these programs.
// Hosts NOT listed here are left untouched — notably Moshy, whose attribution
// mechanism is unverified; never decorate the biggest earner until the tracked
// link is confirmed in the affiliate dashboard.
const SUBID_PARAM: Record<string, string> = {
  "fullenrich.partnerlinks.io": "sid1", // PartnerStack
  "try.employmenthero.com": "sid1",     // PartnerStack
  "get.reply.io": "sid1",               // PartnerStack
  "partner.aisdr.com": "sid1",          // PartnerStack (verified: redirects with ps_partner_key)
};

/** Page path -> compact subid slug, e.g. "/polymarket/trading-bots" -> "polymarket-trading-bots". */
function pageSlug(pathname: string): string {
  const slug = pathname.replace(/^\/+|\/+$/g, "").replace(/\//g, "-");
  return (slug || "home").slice(0, 60);
}

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

      // Per-page sub-ID decoration for networks that report it (runs before
      // navigation, so the outbound URL carries the source page).
      const subidParam = SUBID_PARAM[destinationHost];
      const subid = pageSlug(window.location.pathname);
      if (subidParam) {
        try {
          const url = new URL(link.href);
          if (!url.searchParams.has(subidParam)) {
            url.searchParams.set(subidParam, subid);
            link.href = url.toString();
          }
        } catch {
          // leave the link untouched if it cannot be parsed
        }
      }

      const payload = {
        destination_url: link.href,
        destination_host: destinationHost,
        link_text: (link.textContent || "").trim().slice(0, 80),
        // Placement of the CTA that was clicked (data-cta), e.g. "hero",
        // "verdict", "mobile-sticky", lets you see which positions convert.
        cta_location: link.getAttribute("data-cta") || "inline",
        page_path: window.location.pathname,
        // The sub-ID sent to networks that support it; also logged here so
        // GA4 and partner-dashboard reports join on the same key.
        subid,
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
