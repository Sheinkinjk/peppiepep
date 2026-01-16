import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.recruitersStaffingService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  industry: "Recruiters & Staffing Firms",
  heroTitle: "Build a Referral Network That Delivers Candidates and Clients",
  heroSubtitle:
    "Create partnerships with industry leaders, HR consultants, and satisfied clients who refer both candidates and hiring companies.",
  primaryCta: { label: "Schedule a Call", href: calendlyUrl },
  industryBenefit:
    "Recruiting success depends on reach. We help you build and track referral relationships across your network, attributing every placement back to its source.",
  ctaTitle: "Ready to build your referral network?",
  ctaDescription:
    "Learn how Refer Labs can help you launch a referral program that drives candidate flow and client acquisition.",
};

export default function RecruitersStaffingServicePage() {
  return <ServiceLandingPage content={content} />;
}
