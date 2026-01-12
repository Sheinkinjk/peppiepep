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
    "Refer Labs helps advisory firms build a compliant, premium referral channel with partners who protect client outcomes and revenue goals.",
  heroBullets: [
    "Partner referral workflows that align with compliance needs",
    "Attribution and audit trails for every referral",
    "Clear handoffs between advisors, accountants, and attorneys",
  ],
  primaryCta: { label: "Schedule a strategy call", href: calendlyUrl },
  secondaryCta: { label: "See the rollout plan", href: "#schedule" },
  stats: [
    { value: "2-4 weeks", label: "Launch window" },
    { value: "3x clarity", label: "Partner visibility" },
    { value: "Audit-ready", label: "Referral trails" },
  ],
  engagement: {
    title: "Advisory referral program buildout",
    description:
      "A focused engagement to structure partner relationships, referral intake, and reporting that leadership and compliance teams can trust.",
    items: [
      "Partner persona and channel mapping",
      "Compliant referral intake and consent capture",
      "Advisor handoff and follow-up workflows",
    ],
  },
  pillars: [
    {
      title: "Trusted partner positioning",
      description: "Define the referral promise advisors make to partner firms and clients.",
      icon: Users,
    },
    {
      title: "Compliance safeguards",
      description: "Embed consent and disclosure checkpoints into every referral touchpoint.",
      icon: ShieldCheck,
    },
    {
      title: "Revenue attribution",
      description: "Track referred households, pipeline value, and revenue impact.",
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
      title: "Launch + reporting",
      description: "Deliver partner assets, dashboards, and leadership reporting.",
      deliverable: "Launch kit",
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
