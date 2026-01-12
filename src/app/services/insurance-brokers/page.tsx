import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.insuranceBrokersService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  heroKicker: "Insurance Brokers",
  heroTitle: "Build a referral channel",
  heroHighlight: "that protects renewals and trust.",
  heroSummary:
    "We help insurance brokers manage partner referrals, track policies, and attribute revenue with a premium client experience.",
  heroBullets: [
    "Referral intake for commercial, personal, and specialty lines",
    "Partner updates that keep referral sources engaged",
    "Attribution from referral to bound policy and renewal",
    "Status tracking for quotes, binding, and renewals",
  ],
  primaryCta: { label: "Schedule a Call", href: calendlyUrl },
  whyTitle: "Why broker referrals feel hard to scale",
  whySummary:
    "Broker referrals span multiple lines, products, and partner types. Without structured intake and updates, partners stop sending referrals and leadership cannot see what converts.",
  whyPoints: [
    "Referrals arrive without line-of-business detail or urgency.",
    "Partners rarely get status updates on quotes or renewals.",
    "Attribution is unclear, so high-value partners are hard to prioritize.",
  ],
  outcomesTitle: "What a premium broker referral program delivers",
  outcomes: [
    "Referral intake by line of business with clean routing.",
    "Status tracking across quotes, binding, and renewals.",
    "Attribution that ties referrals to premium volume and renewals.",
    "Partner updates that keep referral sources engaged.",
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
      description: "Deliver partner assets, referral instructions, and update cadence.",
    },
    {
      step: "04",
      title: "Launch + reporting",
      description: "Deliver partner assets and policy attribution dashboards.",
    },
  ],
  deliverables: [
    {
      title: "Broker workflows",
      items: [
        "Referral intake by line of business",
        "Routing and ownership rules",
        "Partner update cadence",
        "Referral status definitions",
      ],
    },
    {
      title: "Performance reporting",
      items: [
        "Policy attribution dashboard",
        "Partner performance reporting",
        "Referral to bind conversion tracking",
        "Quarterly optimization review",
      ],
    },
  ],
  cta: {
    title: "Ready to scale broker referrals?",
    description: "Schedule a call to map your referral intake and reporting strategy.",
    note: "30-minute consultative call",
  },
};

export default function InsuranceBrokersServicePage() {
  return <ServiceLandingPage accent="tide" content={content} />;
}
