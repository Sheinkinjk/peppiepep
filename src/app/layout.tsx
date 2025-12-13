import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StickyHeader } from "@/components/StickyHeader";
import Footer from "@/components/layout/Footer";
import { SupportChatbot } from "@/components/SupportChatbot";
import { Toaster } from "@/components/ui/toaster";

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

export const metadata: Metadata = {
  title: "Refer Labs - Referrals that compound",
  description: "Turn happy customers into your most powerful growth engine with automated referral tracking, rewards, and ambassador management.",
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: "Refer Labs - Referrals that compound",
    description: "Turn happy customers into your most powerful growth engine with automated referral tracking, rewards, and ambassador management.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Refer Labs - Referrals that compound",
    description: "Turn happy customers into your most powerful growth engine.",
  },
};

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
      </body>
    </html>
  );
}
