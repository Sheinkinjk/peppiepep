import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.insuranceBrokersService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  industry: "Insurance Brokers",
  heroTitle: "Stop Buying Leads. Start Receiving Warm Introductions.",
  heroSubtitle:
    "Your best policies came from trusted referrals. Refer Labs helps you systematically activate accountants, financial planners, and satisfied policyholders to send you qualified prospects—automatically.",
  primaryCta: { label: "Book Your Strategy Call", href: calendlyUrl },
  industryBenefit:
    "Insurance is sold on trust. A referral from a CPA or existing client closes faster and sticks longer than any cold lead. We give you the system to track, reward, and scale those introductions—so your pipeline fills itself.",
  ctaTitle: "Ready to grow your book with referrals that close?",
  ctaDescription:
    "Book a free 30-minute call. We'll map your ideal referral partners, recommend a reward structure, and show you how to launch a program that pays for itself.",
};

export default function InsuranceBrokersServicePage() {
  return <ServiceLandingPage content={content} />;
}
