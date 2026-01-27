import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.accountantsService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  industry: "Accountants & Tax Professionals",
  heroTitle: "Your Clients Trust You. Now Turn That Into Growth.",
  heroSubtitle:
    "Happy clients, financial advisors, and business consultants are already talking about you. Refer Labs gives you the system to capture those referrals, reward your partners, and track every new client back to its source.",
  primaryCta: { label: "Book Your Strategy Call", href: calendlyUrl },
  industryBenefit:
    "Accounting is a trust-based business—and referrals convert faster than any other channel. We help you formalize those informal introductions into a predictable growth engine with full attribution from handshake to signed engagement.",
  ctaTitle: "Ready to turn referrals into your #1 growth channel?",
  ctaDescription:
    "Book a free 30-minute call. We'll show you how to activate your network, set up tracking, and launch a referral program that pays for itself in the first month.",
};

export default function AccountantsServicePage() {
  return <ServiceLandingPage content={content} />;
}
