import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StickyHeader } from "@/components/StickyHeader";
import Footer from "@/components/layout/Footer";
import { SupportChatbot } from "@/components/SupportChatbot";
import { Toaster } from "@/components/ui/toaster";
import { SupabaseSessionListener } from "@/components/SupabaseSessionListener";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <div className="flex min-h-screen flex-col">
          <StickyHeader />
          <div className="flex-1" role="presentation">
            {children}
          </div>
          <div className="bg-white/90">
            <div className="mx-auto max-w-6xl px-6 pb-10 md:px-10 lg:px-16">
              <Footer />
            </div>
          </div>
        </div>
        <SupportChatbot />
        <Toaster />
        <SupabaseSessionListener />
      </body>
    </html>
  );
}
