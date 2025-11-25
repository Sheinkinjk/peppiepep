import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Pepform - Referrals that compound",
  description: "Turn happy customers into your most powerful growth engine. Automated referral tracking, rewards, and ambassador management for service businesses.",
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: "Pepform - Referrals that compound",
    description: "Turn happy customers into your most powerful growth engine. Automated referral tracking, rewards, and ambassador management for service businesses.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pepform - Referrals that compound",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
