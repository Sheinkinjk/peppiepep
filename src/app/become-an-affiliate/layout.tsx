import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Become an Affiliate: Partner with Refer Labs",
  description:
    "Join Refer Labs as an affiliate or distribution partner. Promote vetted B2B and B2C programs across high-intent communities, with clear commercial terms and tracked performance.",
  url: `${SITE_URL}/become-an-affiliate`,
  keywords: ["become an affiliate", "affiliate partner australia", "refer labs affiliate", "distribution partner", "affiliate program partner"],
});

export default function BecomeAnAffiliateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
