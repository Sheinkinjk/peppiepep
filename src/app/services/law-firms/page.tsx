import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.lawFirmsService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  industry: "Law Firms",
  heroTitle: "Scale Your Practice Through Strategic Referral Partners",
  heroSubtitle:
    "Activate a partner network of accountants, financial advisors, and industry professionals who refer clients needing corporate, litigation, or estate services.",
  primaryCta: { label: "Schedule a Call", href: calendlyUrl },
  industryBenefit:
    "Legal referrals are high-trust and high-value. We help you build structured relationships with partners who serve your ideal clients, with full tracking from referral to matter close.",
  ctaTitle: "Ready to build your referral network?",
  ctaDescription:
    "Learn how Refer Labs can help you launch a referral program that delivers qualified clients through trusted partners.",
};

export default function LawFirmsServicePage() {
  return <ServiceLandingPage content={content} />;
}
