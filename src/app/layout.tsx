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
import { OrganizationSchema, WebsiteSchema } from "@/components/StructuredData";
import { GoogleAnalytics, GoogleTagManager, MetaPixel, LinkedInInsight } from "@/components/Analytics";
import { AffiliateClickTracker } from "@/components/AffiliateClickTracker";
import { ChromeGate } from "@/components/ChromeGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = generateSEOMetadata(seoConfig.home);

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
        <AffiliateClickTracker />
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
        <SupabaseSessionListener />
        <CookieConsent />
      </body>
    </html>
  );
}
