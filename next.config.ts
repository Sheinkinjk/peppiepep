import type { NextConfig } from "next";

const deploymentOrigin =
  process.env.VERCEL_URL && process.env.VERCEL_URL.length > 0
    ? `https://${process.env.VERCEL_URL}`
    : null;

// Only allow localhost in development, not in production
const isProduction = process.env.NODE_ENV === 'production';

const allowedOrigins = Array.from(
  new Set(
    [
      // Only include localhost in development
      ...(!isProduction ? ["http://localhost:3000", "https://localhost:3000"] : []),
      // Respect configured site URL in non-prod (useful for local dev on non-3000 ports and automated tests).
      ...(!isProduction && process.env.NEXT_PUBLIC_SITE_URL ? [process.env.NEXT_PUBLIC_SITE_URL] : []),
      "https://referlabs.com.au",
      "https://peppiepep.vercel.app",
      deploymentOrigin,
    ].filter(Boolean),
  ),
) as string[];

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    serverActions: {
      allowedOrigins,
      bodySizeLimit: "8mb",
    },
  },
  async redirects() {
    return [
      // CloudTalk retired (24 August 2026): get.cloudtalk.io/9mxppdbxerja returns
      // 404, so the page's only CTA was broken while the page stayed live and
      // indexed. Same fault and same remedy as Instapage in July. 301 to
      // KrispCall, the same intent (cloud phone system) with a working link.
      // Remove this line if a CloudTalk link is ever restored.
      { source: '/cloudtalk', destination: '/krispcall', permanent: true },
      // Renamed Aug 2026: the page is a partner application, not an article
      // about comparison websites, and the old slug read as the latter.
      { source: '/comparison-website', destination: '/partner-with-refer-labs', permanent: true },
      // Retired Aug 2026: a second "apply to work with us" page competing with the
      // partner application for the same intent. One door, not two.
      { source: '/application', destination: '/partner-with-refer-labs', permanent: true },
      // Folded into /moshy, Aug 2026: 489 words and two inbound links, competing
      // with /moshy for the brand query while /moshy ranks 8.6 on it. Its one
      // distinct answer, that getmoshy.com.au is Moshy's own domain, moved to
      // /moshy as an h2 and a FAQ entry. /moshy is not itself redirected, so
      // this is a single hop.
      { source: '/getmoshy', destination: '/moshy', permanent: true },

      // ── Business lending: hidden, not retired (22 August 2026) ────────────
      // Withdrawn pending a review of the credit-licensing position, and because
      // the vertical never found traction. Deliberately TEMPORARY (307), which is
      // normally the wrong choice: it keeps the old URL in the index rather than
      // consolidating equity. Here that is the accurate signal, because the pages
      // are intended to come back and a 308 would tell Google they never will.
      //
      // The pages, components, lender data and admin tooling all still exist and
      // build. Restoring the vertical is: delete this block, put the sitemap block
      // back, and re-enable /api/lending-lead. Nothing else was deleted.
      //
      // /for-business is the closest live page by intent for a business audience.
      { source: '/business-loans', destination: '/for-business', permanent: false },
      { source: '/business-loan-calculator', destination: '/for-business', permanent: false },
      { source: '/what-a-business-loan-actually-costs', destination: '/for-business', permanent: false },
      { source: '/true-cost-of-business-loans-australia', destination: '/for-business', permanent: false },
      { source: '/equipment-finance-instant-asset-write-off', destination: '/for-business', permanent: false },
      { source: '/unsecured-business-loans-australia', destination: '/for-business', permanent: false },
      { source: '/business-loans-bad-credit-australia', destination: '/for-business', permanent: false },
      { source: '/fast-business-loans-australia', destination: '/for-business', permanent: false },
      { source: '/small-business-loans-australia', destination: '/for-business', permanent: false },
      { source: '/business-line-of-credit-australia', destination: '/for-business', permanent: false },
      { source: '/working-capital-loans-australia', destination: '/for-business', permanent: false },
      { source: '/low-doc-business-loans-australia', destination: '/for-business', permanent: false },
      { source: '/startup-business-loans-australia', destination: '/for-business', permanent: false },
      { source: '/business-loans-sole-traders-australia', destination: '/for-business', permanent: false },
      { source: '/business-loans-hospitality-australia', destination: '/for-business', permanent: false },
      { source: '/secured-vs-unsecured-business-loans', destination: '/for-business', permanent: false },
      { source: '/how-to-get-a-business-loan-australia', destination: '/for-business', permanent: false },
      { source: '/business-loan-eligibility-australia', destination: '/for-business', permanent: false },
      { source: '/business-loans/:path*', destination: '/for-business', permanent: false },
      { source: '/compare-business-lenders/:path*', destination: '/for-business', permanent: false },

      // ── Retired verticals (July 2026) ─────────────────────────────────────
      // Gusto/Melio: US-only, wrong jurisdiction. Income Lab: off-brand. 301 to the
      // closest live page so equity consolidates.
      //
      // Polymarket and the peptide cluster are NOT here on purpose: they have no
      // closest-live-page by intent, and a bulk 301 to '/' is read by Google as a
      // soft 404 (no equity passes, the URL lingers). They return 410 Gone from
      // src/proxy.ts instead, which is the unambiguous signal for content that is
      // permanently withdrawn with no replacement. next.config redirects run BEFORE
      // middleware, so these must stay out of this list for the 410 to be reached.
      // Instapage retired (23 July 2026): the affiliate link get.instapage.io no
      // longer resolves (DNS failure), so the page's only CTA was broken. 301 to
      // Swipe Pages, the same intent (landing page builder for paid ads) with a
      // working link. Remove this line if an Instapage link is ever restored.
      // /how-we-research merged into /about (23 July 2026): one trust page is easier
      // to keep literally true than two, and the standards belong next to who we are.
      // TGA compliance (June 2026 guidance): these slugs are Schedule 4 substance
      // names, which cannot appear in advertising. 301 to the compliant hub so the
      // ranking equity consolidates there rather than being stranded by a noindex.
      { source: '/finasteride-australia', destination: '/hair-loss', permanent: true },
      { source: '/minoxidil-australia', destination: '/hair-loss', permanent: true },
      { source: '/finasteride-vs-minoxidil-australia', destination: '/hair-loss', permanent: true },
      { source: '/how-long-does-finasteride-take-to-work-australia', destination: '/hair-loss', permanent: true },
      { source: '/how-we-research', destination: '/about', permanent: true },
      // Weight-loss pages retired on the same TGA ground (19 August 2026). Both existed
      // only to rank for terms that identify a Schedule 4 medicine (the GLP-1 class, and
      // "weight-loss injections" as an indirect reference), and both carried affiliate
      // CTAs, so neither could claim the editorial exemption. The term could not be
      // stripped from a page whose entire premise was the term. 301 to the service hub.
      { source: '/glp-1-weight-loss-australia', destination: '/weight-loss', permanent: true },
      { source: '/weight-loss-injections-australia', destination: '/weight-loss', permanent: true },

      // Apollo money page renamed to the exact brand match (26 July 2026).
      { source: '/apollo-energy', destination: '/apollo-energy-group', permanent: true },
      { source: '/instapage', destination: '/swipepages', permanent: true },
      { source: '/melio', destination: '/compare/payments', permanent: true },
      { source: '/incomelab', destination: '/affiliate-programs-australia', permanent: true },
      // Retired legacy B2B service pages (Aug 2026) — no longer offered as services;
      // 301 to the live /for-business door so equity consolidates, except the referral
      // program page which maps to the affiliate-programs hub by intent.
      { source: '/tiktok-ads', destination: '/for-business', permanent: true },
      { source: '/google-ads', destination: '/for-business', permanent: true },
      { source: '/integrations', destination: '/for-business', permanent: true },
      { source: '/our-referral-program', destination: '/affiliate-programs-australia', permanent: true },
      { source: '/industries', destination: '/for-business', permanent: true },
      // Pruned low-value B2B pages (July 2026) -> closest live hub, equity preserved
      { source: '/cometchat', destination: '/business-software', permanent: true },
      { source: '/databox', destination: '/business-software', permanent: true },
      { source: '/alohi', destination: '/business-software', permanent: true },
      { source: '/flocksy', destination: '/business-software', permanent: true },
      { source: '/zoominfo', destination: '/best-ai-sales-tools', permanent: true },
      { source: '/meetgeek', destination: '/compare/ai-tools', permanent: true },
      { source: '/logome', destination: '/compare/ai-tools', permanent: true },
      // Juniper alternatives retired (July 2026) ahead of onboarding Juniper as a partner;
      // a page steering away from a partner is untenable. 301 to the fair comparison roundup.
      { source: '/juniper-alternatives', destination: '/best-weight-loss-telehealth-australia', permanent: true },
      // /services (B2B growth-services cluster) retired July 2026 -> the /for-business door.
      // The :path* rule catches all 17 sub-pages, so they 301 rather than 404.
      { source: '/services', destination: '/for-business', permanent: true },
      { source: '/services/:path*', destination: '/for-business', permanent: true },
      // Apollo EOI merged into the main /apollo-energy-group page (data-capture-first).
      { source: '/apollo-energy-group-eoi', destination: '/apollo-energy-group', permanent: true },
      {
        // Canonicalise www -> non-www (both were serving 200, splitting SEO signals).
        source: '/:path*',
        has: [{ type: 'host', value: 'www.referlabs.com.au' }],
        destination: 'https://referlabs.com.au/:path*',
        permanent: true,
      },
      // Retire the legacy US B2B /blog cluster -> /affiliate-programs-australia (July 2026).
      // The catch-all covers every post; the specific rule below is kept for clarity
      // (same destination, so ordering is harmless).
      { source: '/blog', destination: '/affiliate-programs-australia', permanent: true },
      { source: '/blog/:path*', destination: '/affiliate-programs-australia', permanent: true },
      {
        // Consolidate the legacy affiliate blog post onto the strategic hub page
        // (both ranked for the same intent; the hub is the canonical asset).
        source: '/blog/best-affiliate-programs-australia-2026',
        destination: '/affiliate-programs-australia',
        permanent: true,
      },
      // ── Referral Blueprint retired (July 2026) ──────────────────────────────
      // The $799 Blueprint is no longer offered; the business is now pushing the
      // affiliate-programs content. Retiring the 6 marketing pages into the closest
      // live page by intent so their ranking equity consolidates instead of 404ing.
      // NOTE: exact sources only. /referral-blueprint/success and /blueprint-access
      // are deliberately NOT redirected: people who already paid still need delivery.
      {
        source: '/referral-blueprint',
        destination: '/affiliate-programs-australia',
        permanent: true,
      },
      { source: '/referral-blueprint-for-agencies',  destination: '/affiliate-programs-australia', permanent: true },
      { source: '/referral-blueprint-for-saas',      destination: '/affiliate-programs-australia', permanent: true },
      { source: '/referral-blueprint-for-ecommerce', destination: '/affiliate-programs-australia', permanent: true },
      { source: '/referral-blueprint-for-coaches',   destination: '/affiliate-programs-australia', permanent: true },
      { source: '/referral-blueprint-for-creators',  destination: '/affiliate-programs-australia', permanent: true },
      {
        // Existed only to recruit affiliates for the Blueprint ("$239.70 per Refer Labs
        // Blueprint sale" = 30% of $799). With the product retired it advertised
        // commission on something we no longer sell.
        source: '/become-an-affiliate',
        destination: '/affiliate-programs-australia',
        permanent: true,
      },
      {
        // "Partner Brief · Confidential": an internal pitch deck for the retired
        // Blueprint, quoting "$799 AUD per sale" and "~80% margin per sale". It was
        // noIndex but served 200 to anyone with the URL, so the margin data was not
        // actually confidential. Obsolete now the product is gone.
        source: '/partners',
        destination: '/for-business',
        permanent: true,
      },
      {
        source: '/referral-business-program',
        destination: '/affiliate-programs-australia',
        permanent: true,
      },
      {
        // Demo page for the retired referral platform. It rendered fabricated social
        // proof as if real: an invented company ("Glow Society"), an invented person
        // ("Mara Ibarra, Experiential Director, Maison du Spa") and made-up stats
        // ("$220 average reward", "32 guests upgraded last 30 days"). Fabricated
        // testimonials are prohibited under Australian Consumer Law s29(1)(e), and it
        // was publicly reachable at 200. Nothing outside the retired dashboard links here.
        source: '/referral',
        destination: '/',
        permanent: true,
      },
      // Point straight at the final destination. These used to hop via /linkedin-growth/*,
      // which itself redirects to /for-business: a 2-hop chain that leaks link equity.
      {
        source: '/linkedin-influencer',
        destination: '/for-business',
        permanent: true,
      },
      {
        source: '/linkedin-influencer/:path*',
        destination: '/for-business',
        permanent: true,
      },
      {
        // Was pointing at /services, which itself redirects to /for-business.
        // A -> B -> C leaks equity at every hop, so this goes straight there.
        source: '/affiliate-partnerships',
        destination: '/for-business',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/services/influencer-activation',
        destination: '/for-business',
        permanent: true,
      },
      {
        source: '/r/moshy',
        destination: 'https://www.getmoshy.com.au/start/eligibility-check-moshy',
        permanent: false,
      },
      {
        source: '/r/dense',
        destination: 'https://densehairexperts.myshopify.com?sca_ref=10755034.xwTupm6fuv&utm_source=affiliate-jarred-krowitz&utm_medium=affiliate-jarred-krowitz&utm_campaign=affiliate',
        permanent: false,
      },
      {
        source: '/r/moshhair',
        destination: 'https://www.getmosh.com.au/start/referlabs',
        permanent: false,
      },
      {
        source: '/r/carrd',
        destination: 'https://try.carrd.co/6ph4m1bj',
        permanent: false,
      },
      {
        source: '/r/durableai',
        destination: 'https://durableai.link/referlabs',
        permanent: false,
      },
      {
        source: '/r/beehiiv',
        destination: 'https://www.beehiiv.com/?via=14daytrial',
        permanent: false,
      },
      {
        source: '/r/butternut',
        destination: 'https://www.butternut.ai/?ref=jarred65',
        permanent: false,
      },
      {
        source: '/r/swipepages',
        destination: 'https://swipepages.com/?fpr=jarred74',
        permanent: false,
      },
      // ── Legacy "Growth & Distribution Engine" pages → consolidate under /for-business ──
      // permanent (308), not temporary: these were retired by the July 2026 consumer pivot
      // and are not coming back. A temporary redirect tells Google to keep the old URL
      // indexed and expect the original to return, so it never consolidates signals into
      // the destination and never drops the stale URL. (The /r/* affiliate redirects above
      // stay temporary on purpose: those destinations rotate.)
      { source: '/how-it-works', destination: '/for-business', permanent: true },
      { source: '/who-its-for', destination: '/for-business', permanent: true },
      { source: '/who-its-for/:path*', destination: '/for-business', permanent: true },
      { source: '/case-studies', destination: '/for-business', permanent: true },
      { source: '/playbooks', destination: '/guides', permanent: true },
      { source: '/roi-calculator', destination: '/for-business', permanent: true },
      { source: '/lead-hacking', destination: '/for-business', permanent: true },
      { source: '/linkedin-growth', destination: '/for-business', permanent: true },
      { source: '/linkedin-growth/:path*', destination: '/for-business', permanent: true },
    ];
  },
  async headers() {
    return [
      // Keep key marketing pages fresh across mobile browsers and intermediary caches.
      {
        source: "/",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/application",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/how-it-works",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/services/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/who-its-for/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/about",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/contact",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/faq",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/playbooks",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/roi-calculator",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      // Prevent caching of dashboard routes to avoid serving stale error pages
      {
        source: "/dashboard/:path*",
        headers: [
          { key: "Cache-Control", value: "private, no-cache, no-store, must-revalidate" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
      {
        source: "/pdfs/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/partners/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/referlabs-referral-integration.zip",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // SECURITY FIX: Add security headers to all routes
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
