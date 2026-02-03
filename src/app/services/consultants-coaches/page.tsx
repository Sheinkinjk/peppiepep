import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.consultantsCoachesService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

const content = {
  industry: "Consultants & Coaches",
  heroTitle: "Your Reputation Precedes You. Now Monetize It.",
  heroSubtitle:
    "Your best clients came from word-of-mouth. Refer Labs helps you turn informal introductions into a systematic affiliate engine—activating LinkedIn influencers, agency partners, and happy clients to send you high-value engagements.",
  primaryCta: { label: "Book Your Strategy Call", href: calendlyUrl },
  industryBenefit:
    "Consulting is sold on trust and reputation. When someone vouches for you, that prospect arrives ready to buy. We give you the infrastructure to track, reward, and scale those introductions—so you spend less time prospecting and more time delivering.",
  ctaTitle: "Ready to turn your network into a revenue machine?",
  ctaDescription:
    "Book a free 30-minute call. We'll show you how to activate your network, set up tracking, and launch a affiliate program that fills your calendar with qualified prospects.",
};

export default function ConsultantsCoachesServicePage() {
  return <ServiceLandingPage content={content} />;
}
