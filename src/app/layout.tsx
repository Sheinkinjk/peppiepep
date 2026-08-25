import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { StickyHeader } from "@/components/StickyHeader";
import Footer from "@/components/layout/Footer";
import { SupportChatbot } from "@/components/SupportChatbot";
import { Toaster } from "@/components/ui/toaster";
import { SupabaseSessionListener } from "@/components/SupabaseSessionListener";
import { CookieConsent } from "@/components/CookieConsent";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import { OrganizationSchema, WebsiteSchema, SiteNavigationSchema } from "@/components/StructuredData";
import { GoogleAnalytics, GoogleTagManager, MetaPixel, LinkedInInsight } from "@/components/Analytics";
import { AffiliateClickTracker } from "@/components/AffiliateClickTracker";
import { PageViewTracker } from "@/components/PageViewTracker";
import { AiReferralTracker } from "@/components/AiReferralTracker";
import { ChromeGate } from "@/components/ChromeGate";
// Cookieless, consent-independent pageview counting, so real traffic is visible
// even for visitors who decline analytics cookies (GA4 only counts consenters).
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  // "optional" keeps the metric-matched system fallback when the font is not
  // ready within the block window, so the LCP text is not repainted late on
  // slow connections. Cached / fast visitors still get Geist.
  display: "optional",
  preload: true,
});

// Not preloaded: mono is rarely on-screen and the display face is legacy-theme
// only. Preloading them competed with the primary Geist for the LCP text.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  ...generateSEOMetadata(seoConfig.home),
  // Site-ownership verification for the Commission Factory affiliate network.
  // Set on the root layout so it renders in <head> site-wide (child pages inherit
  // `other` metadata they do not override). Renders as
  // <meta name="commission-factory-verification" content="...">.
  other: {
    "commission-factory-verification": "eab684808435433bba93d1b03d530b6e",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <head>
        <OrganizationSchema />
        <SiteNavigationSchema />
        <WebsiteSchema />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-full focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <ChromeGate>
          <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden site-atmosphere" aria-hidden="true">
            <div className="site-atmosphere-orb site-atmosphere-orb--one" />
            <div className="site-atmosphere-orb site-atmosphere-orb--two" />
            <div className="site-atmosphere-orb site-atmosphere-orb--three" />
            <div className="site-atmosphere-grid" />
            <div className="site-atmosphere-grain" />
          </div>
        </ChromeGate>
        <GoogleAnalytics />
        <GoogleTagManager />
        <MetaPixel />
        <LinkedInInsight />
        <Analytics />
        <AffiliateClickTracker />
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        <AiReferralTracker />
        <div className="relative z-10 flex min-h-screen flex-col">
          <ChromeGate>
            <StickyHeader />
          </ChromeGate>
          <div className="flex-1">{children}</div>
          <ChromeGate>
            <div className="relative z-10">
              <Footer />
            </div>
          </ChromeGate>
        </div>
        <ChromeGate>
          <SupportChatbot />
        </ChromeGate>
        <Toaster />
        {/* Supabase auth only matters on the app/business chrome, not on the
            consumer/SEO pages, gating it keeps supabase-js off their main thread. */}
        <ChromeGate>
          <SupabaseSessionListener />
        </ChromeGate>
        <CookieConsent />
      </body>
    </html>
  );
}
