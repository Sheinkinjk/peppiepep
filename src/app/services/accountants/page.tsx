import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.accountantsService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  industry: "Accountants & Tax Professionals",
  heroTitle: "Turn Trusted Relationships Into a Referral Engine",
  heroSubtitle:
    "Activate a partner network of financial advisors, attorneys, and business consultants who refer clients needing tax, audit, and advisory services.",
  primaryCta: { label: "Schedule a Call", href: calendlyUrl },
  industryBenefit:
    "Accounting firms thrive on trust. We help you formalize referral relationships with partners who serve your ideal clients, tracking every referral from introduction to retained revenue.",
  ctaTitle: "Ready to build your referral network?",
  ctaDescription:
    "Learn how Refer Labs can help you launch a referral program that drives consistent, high-value client acquisition.",
};

export default function AccountantsServicePage() {
  return <ServiceLandingPage content={content} />;
}
