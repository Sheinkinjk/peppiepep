import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StickyHeader } from "@/components/StickyHeader";
import Footer from "@/components/layout/Footer";
import { SupportChatbot } from "@/components/SupportChatbot";
import { Toaster } from "@/components/ui/toaster";
import { SupabaseSessionListener } from "@/components/SupabaseSessionListener";
import { CookieConsent } from "@/components/CookieConsent";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import { OrganizationSchema, WebsiteSchema } from "@/components/StructuredData";
import { GoogleAnalytics, GoogleTagManager } from "@/components/Analytics";

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

export const metadata: Metadata = generateSEOMetadata(seoConfig.home);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-full focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <GoogleAnalytics />
        <GoogleTagManager />
        <div className="flex min-h-screen flex-col">
          <StickyHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <div className="bg-white/88">
            <div className="mx-auto max-w-6xl px-6 pb-10 md:px-10 lg:px-16">
              <Footer />
            </div>
          </div>
        </div>
        <SupportChatbot />
        <Toaster />
        <SupabaseSessionListener />
        <CookieConsent />
      </body>
    </html>
  );
}
