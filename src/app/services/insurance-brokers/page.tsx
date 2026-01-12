import { BadgeCheck, LineChart, ShieldCheck, Users } from "lucide-react";
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
  primaryCta: { label: "Schedule a call", href: calendlyUrl },
  secondaryCta: { label: "See the rollout plan", href: "#schedule" },
  stats: [
    { value: "2-3 weeks", label: "Launch timeline" },
    { value: "Policy-level", label: "Attribution" },
    { value: "Partner ready", label: "Referral workflows" },
  ],
  engagement: {
    title: "Broker referral program buildout",
    description:
      "We design the intake, routing, and reporting so brokers can track referrals through binding and renewal.",
    items: [
      "Partner mapping and referral expectations",
      "Referral intake by line of business",
      "Attribution reporting for bound policies",
      "Leadership dashboards for premium volume and renewals",
    ],
  },
  pillars: [
    {
      title: "Partner trust",
      description: "Create a premium experience that protects your brand.",
      icon: Users,
    },
    {
      title: "Compliance workflows",
      description: "Track consent, disclosures, and policy handoffs.",
      icon: ShieldCheck,
    },
    {
      title: "Policy attribution",
      description: "Connect referrals to bound policies and renewals.",
      icon: BadgeCheck,
    },
    {
      title: "Revenue insight",
      description: "Report on premium volume and partner contribution.",
      icon: LineChart,
    },
  ],
  process: [
    {
      step: "01",
      title: "Partner strategy",
      description: "Identify referral partners across industries and lines.",
      deliverable: "Partner plan",
    },
    {
      step: "02",
      title: "Intake + routing",
      description: "Build referral intake and routing by line of business.",
      deliverable: "Workflow setup",
    },
    {
      step: "03",
      title: "Partner activation",
      description: "Deliver partner assets, referral instructions, and update cadence.",
      deliverable: "Activation kit",
    },
    {
      step: "04",
      title: "Launch + reporting",
      description: "Deliver partner assets and policy attribution dashboards.",
      deliverable: "Launch kit",
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
