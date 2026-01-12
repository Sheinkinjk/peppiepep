import { Briefcase, LineChart, ShieldCheck, Users } from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.financialAdvisorsService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  heroKicker: "Financial Advisors & Planners",
  heroTitle: "Grow referrals that respect",
  heroHighlight: "fiduciary standards and trust.",
  heroSummary:
    "Refer Labs helps advisory firms build a compliant, premium referral channel with partners who protect client outcomes, reputation, and recurring revenue.",
  heroBullets: [
    "Partner workflows designed for CPAs, estate attorneys, and mortgage brokers",
    "Consent capture and audit trails aligned to fiduciary standards",
    "Household-level attribution for AUM and retained revenue",
    "Advisor-ready handoff and follow-up workflows",
  ],
  primaryCta: { label: "Schedule a call", href: calendlyUrl },
  secondaryCta: { label: "See the rollout plan", href: "#schedule" },
  stats: [
    { value: "2-4 weeks", label: "Launch window" },
    { value: "Advisor-ready", label: "Partner experience" },
    { value: "Audit-ready", label: "Referral trails" },
  ],
  engagement: {
    title: "Advisory referral program buildout",
    description:
      "A focused engagement to structure partner relationships, referral intake, and reporting that leadership and compliance teams can trust.",
    items: [
      "Partner mapping across CPAs, estate attorneys, and lenders",
      "Compliant referral intake with consent capture",
      "Advisor handoff and follow-up workflows",
      "Leadership dashboards for referral revenue and retention",
    ],
  },
  pillars: [
    {
      title: "Trusted partner positioning",
      description: "Define the referral promise advisors make to partner firms and shared clients.",
      icon: Users,
    },
    {
      title: "Compliance safeguards",
      description: "Embed consent and disclosure checkpoints into every referral touchpoint.",
      icon: ShieldCheck,
    },
    {
      title: "Revenue attribution",
      description: "Track referred households, pipeline value, and AUM impact.",
      icon: LineChart,
    },
    {
      title: "Advisor enablement",
      description: "Equip the team with scripts, follow-up cadences, and partner updates.",
      icon: Briefcase,
    },
  ],
  process: [
    {
      step: "01",
      title: "Partner strategy",
      description: "Align on referral partners, value proposition, and compliance criteria.",
      deliverable: "Partner map",
    },
    {
      step: "02",
      title: "Workflow design",
      description: "Build referral intake, routing, and status updates for advisors.",
      deliverable: "Workflow plan",
    },
    {
      step: "03",
      title: "Partner activation",
      description: "Deliver partner-facing assets, referral instructions, and outreach scripts.",
      deliverable: "Activation kit",
    },
    {
      step: "04",
      title: "Reporting + optimization",
      description: "Deliver leadership dashboards and the first performance review.",
      deliverable: "Insight pack",
    },
  ],
  deliverables: [
    {
      title: "Referral infrastructure",
      items: [
        "Partner intake and qualification forms",
        "Compliance-ready referral disclosures",
        "Advisor handoff playbooks",
        "Partner status updates",
      ],
    },
    {
      title: "Leadership reporting",
      items: [
        "Referral attribution dashboard",
        "Partner performance tracking",
        "Pipeline and revenue summaries",
        "Quarterly optimization recommendations",
      ],
    },
  ],
  cta: {
    title: "Ready to grow advisory referrals with confidence?",
    description: "Schedule a call to map your partner strategy and compliance-ready workflow.",
    note: "30-minute consultative call",
  },
};

export default function FinancialAdvisorsServicePage() {
  return <ServiceLandingPage accent="tide" content={content} />;
}
