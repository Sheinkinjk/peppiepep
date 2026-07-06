import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Become a Refer Labs Affiliate, 30% Commission ($239.70/sale)",
  description: "Earn 30% commission on every Refer Labs Blueprint sale. $239.70 per conversion, 60-day cookie window, monthly payouts. Application required.",
  alternates: { canonical: `${SITE_URL}/become-an-affiliate` },
  openGraph: {
    title: "Become a Refer Labs Affiliate, 30% Commission",
    description: "Earn $239.70 per Blueprint sale. 60-day cookie window. Monthly payouts. Application required.",
    url: `${SITE_URL}/become-an-affiliate`,
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
