import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.consultantsCoachesService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  industry: "Consultants & Coaches",
  heroTitle: "Transform Your Network Into Predictable Revenue",
  heroSubtitle:
    "Activate a partner network of LinkedIn thought leaders, agency partners, and past clients who consistently send you high-value retainer and advisory engagements.",
  primaryCta: { label: "Schedule a Call", href: calendlyUrl },
  industryBenefit:
    "Your reputation is your greatest asset. We help you formalize referral relationships that match your positioning, turning word-of-mouth into a scalable acquisition channel.",
  ctaTitle: "Ready to build your referral network?",
  ctaDescription:
    "Learn how Refer Labs can help you launch a referral program that attracts high-fit retainers and advisory engagements.",
};

export default function ConsultantsCoachesServicePage() {
  return <ServiceLandingPage content={content} />;
}
