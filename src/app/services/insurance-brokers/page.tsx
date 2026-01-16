import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.insuranceBrokersService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  industry: "Insurance Brokers",
  heroTitle: "Grow Your Book Through Strategic Referral Partners",
  heroSubtitle:
    "Build a network of financial advisors, accountants, and industry partners who refer clients needing coverage.",
  primaryCta: { label: "Schedule a Call", href: calendlyUrl },
  industryBenefit:
    "Insurance is built on trust and relationships. We help you formalize referral partnerships that drive premium volume, tracking every referral from introduction to bound policy.",
  ctaTitle: "Ready to build your referral network?",
  ctaDescription:
    "Learn how Refer Labs can help you launch a referral program that delivers a steady flow of qualified insurance prospects.",
};

export default function InsuranceBrokersServicePage() {
  return <ServiceLandingPage content={content} />;
}
