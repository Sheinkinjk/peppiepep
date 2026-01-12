import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.insuranceBrokersService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  heroKicker: "Insurance Brokers",
  heroTitle: "Build a referral channel",
  heroHighlight: "that protects renewals and trust.",
  heroSummary:
    "A broker referral program that tracks policies and protects partner trust.",
  heroBullets: [
    "Referral intake for commercial, personal, and specialty lines",
    "Partner updates that keep referral sources engaged",
    "Attribution from referral to bound policy and renewal",
  ],
  primaryCta: { label: "Schedule a Call", href: calendlyUrl },
  whyTitle: "Why broker referrals feel hard to scale",
  whySummary:
    "Broker referrals span many lines, but visibility is often missing.",
  whyPoints: [
    "Missing line-of-business detail slows intake.",
    "Partners lack updates on quotes and renewals.",
    "Attribution is unclear for premium volume.",
  ],
  outcomesTitle: "What a premium broker referral program delivers",
  outcomes: [
    "Referral intake by line of business with clean routing.",
    "Status tracking for quotes and renewals.",
    "Attribution tied to premium volume.",
  ],
  process: [
    {
      step: "01",
      title: "Partner strategy",
      description: "Identify referral partners across industries and lines.",
    },
    {
      step: "02",
      title: "Intake + routing",
      description: "Build referral intake and routing by line of business.",
    },
    {
      step: "03",
      title: "Partner activation",
      description: "Deliver partner assets and policy reporting.",
    },
  ],
  deliverables: [
    {
      title: "Broker workflows",
      items: [
        "Referral intake by line of business",
        "Routing and ownership rules",
        "Partner update cadence",
      ],
    },
    {
      title: "Performance reporting",
      items: [
        "Policy attribution dashboard",
        "Partner performance reporting",
        "Referral to bind conversion tracking",
      ],
    },
  ],
  cta: {
    title: "Ready to scale broker referrals?",
    description: "Schedule a call to map referral intake and reporting.",
    note: "30-minute consultative call",
  },
};

export default function InsuranceBrokersServicePage() {
  return <ServiceLandingPage accent="tide" content={content} />;
}
