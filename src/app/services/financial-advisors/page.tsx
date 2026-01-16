import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.financialAdvisorsService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  industry: "Financial Advisors & Planners",
  heroTitle: "Grow Your Advisory Practice Through Referral Partners",
  heroSubtitle:
    "Build a network of CPAs, attorneys, and industry influencers who send you pre-qualified prospects ready to invest.",
  primaryCta: { label: "Schedule a Call", href: calendlyUrl },
  industryBenefit:
    "Financial advisors who build structured referral networks see dramatically higher AUM growth. We help you connect with the right partners and track every referral to revenue.",
  ctaTitle: "Ready to build your referral network?",
  ctaDescription:
    "Learn how Refer Labs can help you launch a referral program that attracts high-net-worth clients through trusted partners.",
};

export default function FinancialAdvisorsServicePage() {
  return <ServiceLandingPage content={content} />;
}
