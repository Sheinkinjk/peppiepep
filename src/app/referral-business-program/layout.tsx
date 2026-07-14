import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Referral Business Program: Grow Through Distribution",
  description:
    "The Refer Labs referral business program: build a referral and distribution engine for your business with clear commercial terms, tracked performance and aligned incentives.",
  url: `${SITE_URL}/referral-business-program`,
  keywords: ["referral business program", "referral program for business", "b2b referral program", "distribution partnership", "refer labs business program"],
});

export default function ReferralBusinessProgramLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
