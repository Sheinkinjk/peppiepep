"use client";

import { useEffect } from "react";

import { attributionContext, firstTouch, landingPage, newEventId } from "@/lib/attribution";

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
  "myjuniper.com": 50,
  "beehiiv.com": 40,
  "try.carrd.co": 6,
  "durableai.link": 20,
  "butternut.ai": 15,
  "swipepages.com": 25,
  // AI sales & automation (recurring programs weighted by expected LTV)
  "gohighlevel.com": 100,
  "partner.aisdr.com": 120,
  "get.reply.io": 40,
  "fullenrich.partnerlinks.io": 30,
  // HR & payroll
  "try.employmenthero.com": 80,
  // Email marketing / e-commerce / landing pages / affiliate software (PartnerStack)
  "get.brevo.com": 40,
  "get.alidrop.co": 30,
  "try.leadpages.com": 60,
  "ps.superfiliate.com": 100,
  // Commission Factory (physical goods, commission is a % of a one-off order
  // rather than a recurring SaaS payout, so the expected value is lower)
  "t.cfjump.com": 25,
};
const DEFAULT_VALUE = 10;

// Networks that support per-click sub-ID reporting via a query param appended
// to the outbound link at click time. PartnerStack (sid1) surfaces the value
// against referred customers in the partner dashboard, which upgrades
// "clicks per page" into "revenue per page" for these programs.
// Hosts NOT listed here are left untouched, notably Moshy, whose attribution
// mechanism is unverified; never decorate the biggest earner until the tracked
// link is confirmed in the affiliate dashboard.
const SUBID_PARAM: Record<string, string> = {
  "fullenrich.partnerlinks.io": "sid1", // PartnerStack
  "try.employmenthero.com": "sid1",     // PartnerStack
  "get.reply.io": "sid1",               // PartnerStack
  "partner.aisdr.com": "sid1",          // PartnerStack (verified: redirects with ps_partner_key)
  "get.brevo.com": "sid1",              // PartnerStack
  "get.alidrop.co": "sid1",             // PartnerStack
  "try.leadpages.com": "sid1",          // PartnerStack
  "ps.superfiliate.com": "sid1",        // PartnerStack
  "myjuniper.com": "utm_content",       // Juniper reads utm_content in its own analytics
  // Commission Factory. UniqueId is the parameter CF passes through to its own
  // reporting; confirm with the CF account manager that it appears against
  // transactions before trusting it.
  "t.cfjump.com": "UniqueId",

  // ── Moshy and Mosh: DELIBERATELY ABSENT, and this is the gap that matters ──
  //
  // These two are the largest earners on the site and the only two whose
  // conversions cannot be traced to a page, because no SubID reaches them.
  // Every page-level judgement about /moshy, /moshhair, /mosh-review and the
  // rest is inferred from impressions and CTR rather than from revenue.
  //
  // The change is one line each. It is not made yet because pushing an
  // unrecognised parameter onto a referral URL can break the referral, and
  // nobody has confirmed which parameter Moshy's dashboard passes through.
  //
  // TO ENABLE, in this order:
  //   1. Ask Moshy (and Mosh, same operator) which query parameter appears
  //      against a transaction in their partner reporting. Common answers are
  //      sub_id, subid, ref2, aff_sub, utm_content.
  //   2. Add the host and that parameter here:
  //        "www.getmoshy.com.au": "<param>",
  //        "www.getmosh.com.au":  "<param>",
  //   3. Click the live link once, complete nothing, and confirm the value
  //      appears in their dashboard against that click BEFORE trusting any
  //      report built on it. A parameter that is accepted but discarded looks
  //      identical from our side.
  //   4. Only then join it in scripts/reconcile-conversions.mjs.
  //
  // Do not guess the parameter name. A wrong one is silently dropped at best
  // and voids attribution at worst, and we would not be able to tell which.
};

/** Page path -> compact subid slug, e.g. "/polymarket/trading-bots" -> "polymarket-trading-bots". */
function pageSlug(pathname: string): string {
  const slug = pathname.replace(/^\/+|\/+$/g, "").replace(/\//g, "-");
  return (slug || "home").slice(0, 60);
}

export function AffiliateClickTracker() {
  useEffect(() => {
    // Record where this visit came from NOW, on the entry page, before any
    // internal navigation. Working it out lazily at click time would be wrong:
    // after a hard navigation between our own pages, document.referrer is our
    // own domain and the real source is gone, so a visitor from Instagram who
    // read two pages before clicking would be filed as direct.
    landingPage();
    firstTouch();
  }, []);

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
      const cid = newEventId();
      // source__page__clickid, e.g. "instagram__solar-and-energy__a1b2c3d4".
      // The channel goes first so the network's own transaction report answers
      // "did this sale come from search or from Instagram" without anyone
      // opening GA4, and the click id still joins it back to the exact event.
      const subid = `${firstTouch().source}__${pageSlug(window.location.pathname)}__${cid}`.slice(0, 120);
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
        // The sub-ID sent to networks that support it; also logged here so
        // GA4 and partner-dashboard reports join on the same key.
        subid,
        // Joins a network-reported sale back to this exact click.
        click_id: cid,
        // Where the visit came from, which page earned it, and which page the
        // click happened on. GA4 resolves session source itself, but not on the
        // event, so "which channel produces Moshy clicks" needed a cross-scope
        // join; now it is one row of a table.
        ...attributionContext(),
        // Estimated commission value so GA can rank pages by likely revenue.
        // This is a planning weight, NOT money received: read it as "expected
        // value per click", and never as revenue in a report shown to anyone.
        value: PARTNER_VALUE[destinationHost] ?? DEFAULT_VALUE,
        currency: "AUD",
        // GA4 recommended ecommerce-style fields for easier reporting
        event_category: "affiliate",
        event_label: destinationHost,
      };

      // transport_type beacon: a link that opens in the same tab can otherwise
      // navigate away before the request leaves, and the click is simply never
      // counted. Most of our CTAs are target=_blank, but not all of them.
      window.gtag?.("event", "affiliate_click", { ...payload, transport_type: "beacon" });
      // Also push to dataLayer for GTM consumers, if present.
      window.dataLayer?.push({ event: "affiliate_click", ...payload });
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
