import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.recruitersStaffingService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

const content = {
  industry: "Recruiters & Staffing",
  heroTitle: "Double Your Placements. Cut Your Sourcing Time in Half.",
  heroSubtitle:
    "Your best candidates and clients came from affiliates. Refer Labs helps you systematically activate HR leaders, hiring managers, and placed candidates to send you qualified opportunities—on both sides of the desk.",
  primaryCta: { label: "Book Your Strategy Call", href: calendlyUrl },
  industryBenefit:
    "Recruiting is a relationship business. Referred candidates are higher quality, and referred clients have bigger budgets. We give you the system to track, reward, and scale those introductions—so you fill more roles, faster.",
  ctaTitle: "Ready to build a affiliate pipeline that delivers?",
  ctaDescription:
    "Book a free 30-minute call. We'll show you how to activate your network, set up tracking, and launch a affiliate program that drives both candidate flow and new client acquisition.",
};

export default function RecruitersStaffingServicePage() {
  return <ServiceLandingPage content={content} />;
}
