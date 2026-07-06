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
      {
        // Canonicalise www -> non-www (both were serving 200, splitting SEO signals).
        source: '/:path*',
        has: [{ type: 'host', value: 'www.referlabs.com.au' }],
        destination: 'https://referlabs.com.au/:path*',
        permanent: true,
      },
      {
        // Consolidate the legacy affiliate blog post onto the strategic hub page
        // (both ranked for the same intent; the hub is the canonical asset).
        source: '/blog/best-affiliate-programs-australia-2026',
        destination: '/affiliate-programs-australia',
        permanent: true,
      },
      {
        // Consolidate the duplicate $799 Blueprint funnel onto the canonical page.
        source: '/referral-business-program',
        destination: '/referral-blueprint',
        permanent: true,
      },
      {
        source: '/linkedin-influencer',
        destination: '/linkedin-growth',
        permanent: true,
      },
      {
        source: '/linkedin-influencer/business',
        destination: '/linkedin-growth/business',
        permanent: true,
      },
      {
        source: '/linkedin-influencer/influencer',
        destination: '/linkedin-growth/influencer',
        permanent: true,
      },
      {
        source: '/affiliate-partnerships',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/services/influencer-activation',
        destination: '/services/partner-activation',
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
        source: '/r/incomelab',
        destination: 'https://incomelab.me/welcome',
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
      {
        source: '/r/apollopeptides',
        destination: 'https://apollopeptidesciences.com/?rfsn=9019392.2de9e6',
        permanent: false,
      },
      {
        source: '/r/ascensionpeptides',
        destination: 'https://ascensionpeptides.com/ref/referlabs/',
        permanent: false,
      },
      {
        source: '/r/biopeptitech',
        destination: 'https://biopeptitech.com?sca_ref=10803823.hKusHK7NAR',
        permanent: false,
      },
      // ── Legacy "Growth & Distribution Engine" pages → consolidate under /for-business ──
      { source: '/how-it-works', destination: '/for-business', permanent: false },
      { source: '/who-its-for', destination: '/for-business', permanent: false },
      { source: '/who-its-for/:path*', destination: '/for-business', permanent: false },
      { source: '/case-studies', destination: '/for-business', permanent: false },
      { source: '/playbooks', destination: '/guides', permanent: false },
      { source: '/roi-calculator', destination: '/for-business', permanent: false },
      { source: '/lead-hacking', destination: '/for-business', permanent: false },
      { source: '/linkedin-growth', destination: '/for-business', permanent: false },
      { source: '/linkedin-growth/:path*', destination: '/for-business', permanent: false },
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
