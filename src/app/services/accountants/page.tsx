import { ClipboardCheck, Handshake, LineChart, Scale } from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.accountantsService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  heroKicker: "Accountants & Tax Professionals",
  heroTitle: "Build a referral engine",
  heroHighlight: "that protects client trust.",
  heroSummary:
    "We help accounting firms track referrals across advisors, attorneys, and business owners with clarity, compliance, and measurable ROI.",
  heroBullets: [
    "Referral intake by service line: tax, audit, bookkeeping, CFO advisory",
    "Partner handoffs that keep CPAs, advisors, and attorneys aligned",
    "Client consent and engagement tracking for regulated work",
    "Revenue attribution tied to retained clients and fees",
  ],
  primaryCta: { label: "Schedule a call", href: calendlyUrl },
  secondaryCta: { label: "Review the approach", href: "#schedule" },
  stats: [
    { value: "2-3 weeks", label: "Implementation" },
    { value: "Full traceability", label: "Referral tracking" },
    { value: "Partner-ready", label: "Outreach assets" },
  ],
  engagement: {
    title: "Accounting referral program setup",
    description:
      "We design the partner workflow, intake, and reporting so your team knows exactly where referrals come from and how they convert.",
    items: [
      "Partner mapping across finance, legal, and advisory",
      "Referral intake for tax, audit, and advisory lines",
      "Status updates that keep partners informed",
      "Reporting by service line and partner tier",
    ],
  },
  pillars: [
    {
      title: "Partner segmentation",
      description: "Define the referral partners who send the right clients.",
      icon: Handshake,
    },
    {
      title: "Workflow governance",
      description: "Standardize referral intake, routing, and engagement stages.",
      icon: ClipboardCheck,
    },
    {
      title: "Compliance clarity",
      description: "Track consents, disclosures, and partner arrangements.",
      icon: Scale,
    },
    {
      title: "Revenue insight",
      description: "See referral value by service line, partner, and fee category.",
      icon: LineChart,
    },
  ],
  process: [
    {
      step: "01",
      title: "Partner strategy",
      description: "Identify partner sources and define referral expectations.",
      deliverable: "Partner plan",
    },
    {
      step: "02",
      title: "Intake + routing",
      description: "Configure referral intake flows and routing for teams.",
      deliverable: "Workflow setup",
    },
    {
      step: "03",
      title: "Partner activation",
      description: "Deliver outreach assets and partner onboarding materials.",
      deliverable: "Activation kit",
    },
    {
      step: "04",
      title: "Reporting + launch",
      description: "Deliver dashboards and partner communications for rollout.",
      deliverable: "Launch kit",
    },
  ],
  deliverables: [
    {
      title: "Operational playbooks",
      items: [
        "Referral intake forms by service line",
        "Partner follow-up cadence",
        "Referral status definitions",
        "Partner communication templates",
      ],
    },
    {
      title: "Reporting suite",
      items: [
        "Referral revenue dashboard",
        "Partner performance tracking",
        "Service line conversion reporting",
        "Quarterly optimization summary",
      ],
    },
  ],
  cta: {
    title: "Ready to scale accounting referrals with confidence?",
    description: "Schedule a call to map your referral workflow and partner strategy.",
    note: "30-minute consultative call",
  },
};

export default function AccountantsServicePage() {
  return <ServiceLandingPage accent="gold" content={content} />;
}
