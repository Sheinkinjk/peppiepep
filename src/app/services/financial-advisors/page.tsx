import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.financialAdvisorsService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

const content = {
  industry: "Financial Advisors",
  heroTitle: "Stop Chasing Leads. Start Receiving Referrals.",
  heroSubtitle:
    "Your best clients came from introductions. Refer Labs helps you systematically activate CPAs, estate planners, and satisfied clients to send you pre-qualified, high-net-worth prospects-on autopilot.",
  primaryCta: { label: "Book Your Strategy Call", href: calendlyUrl },
  industryBenefit:
    "Financial advisory is built on trust. When a CPA or existing client vouches for you, that prospect arrives pre-sold. We give you the infrastructure to track, reward, and scale those introductions-turning word-of-mouth into your #1 growth channel.",
  ctaTitle: "Ready to fill your pipeline with warm affiliates?",
  ctaDescription:
    "Book a free 30-minute call. We'll map your ideal affiliate partners, recommend a reward structure, and show you exactly how to launch.",
};

export default function FinancialAdvisorsServicePage() {
  return <ServiceLandingPage content={content} />;
}
