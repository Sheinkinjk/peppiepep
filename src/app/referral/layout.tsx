import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";

// page.tsx is a client component and cannot export metadata, so it lives here.
// This is an internal ambassador handoff page reached from the dashboard, not
// consumer content: noIndex keeps it from inheriting the homepage title and
// competing with it in search. Siblings /referred and /r/ are excluded too.
export const metadata: Metadata = generateSEOMetadata({
  noIndex: true,
  title: "Referral | Refer Labs",
  description: "Referral landing page for Refer Labs ambassadors.",
  url: `${SITE_URL}/referral`,
});

export default function ReferralLayout({ children }: { children: React.ReactNode }) {
  return children;
}
