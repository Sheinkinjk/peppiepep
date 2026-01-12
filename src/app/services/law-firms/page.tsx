import { Gavel, ShieldCheck, Target, Users } from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.lawFirmsService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  heroKicker: "Law Firms",
  heroTitle: "Grow legal referrals with",
  heroHighlight: "audit-ready clarity.",
  heroSummary:
    "Refer Labs helps law firms manage referral relationships, intake, and attribution with governance, ethics, and client trust at the center.",
  heroBullets: [
    "Structured intake with conflict checks and practice routing",
    "Partner transparency with status updates and reporting",
    "Attribution for referred matters, fees, and outcomes",
    "Referral workflows aligned to local fee-sharing rules",
  ],
  primaryCta: { label: "Schedule a call", href: calendlyUrl },
  secondaryCta: { label: "See the rollout plan", href: "#schedule" },
  stats: [
    { value: "2-4 weeks", label: "Launch timeline" },
    { value: "Full traceability", label: "Matter tracking" },
    { value: "Partner ready", label: "Referral workflows" },
  ],
  engagement: {
    title: "Legal referral program setup",
    description:
      "We build the referral workflows, intake forms, and reporting that keep partner relationships compliant and transparent.",
    items: [
      "Referral intake with routing by practice area",
      "Conflict and compliance checkpoints",
      "Partner updates and attribution reporting",
      "Leadership visibility into referral volume and fees",
    ],
  },
  pillars: [
    {
      title: "Partner positioning",
      description: "Clarify the referral promise and the experience partners can expect.",
      icon: Users,
    },
    {
      title: "Intake governance",
      description: "Route matters with the right checks and client protections.",
      icon: ShieldCheck,
    },
    {
      title: "Practice alignment",
      description: "Ensure referrals land with the right teams and expertise.",
      icon: Target,
    },
    {
      title: "Matter attribution",
      description: "Track referred matters, fees, and partner impact.",
      icon: Gavel,
    },
  ],
  process: [
    {
      step: "01",
      title: "Partner strategy",
      description: "Identify referral partners and practice priorities.",
      deliverable: "Partner plan",
    },
    {
      step: "02",
      title: "Intake + routing",
      description: "Build intake forms, routing rules, and compliance checkpoints.",
      deliverable: "Workflow setup",
    },
    {
      step: "03",
      title: "Partner activation",
      description: "Deliver partner-facing assets and referral instructions.",
      deliverable: "Activation kit",
    },
    {
      step: "04",
      title: "Launch + reporting",
      description: "Deliver partner assets and referral reporting dashboards.",
      deliverable: "Launch kit",
    },
  ],
  deliverables: [
    {
      title: "Legal referral workflows",
      items: [
        "Practice area intake forms",
        "Conflict check handoff steps",
        "Partner update cadence",
        "Referral status definitions",
      ],
    },
    {
      title: "Leadership reporting",
      items: [
        "Referral matter dashboard",
        "Partner contribution tracking",
        "Fee and outcome reporting",
        "Quarterly optimization review",
      ],
    },
  ],
  cta: {
    title: "Ready to professionalize legal referrals?",
    description: "Schedule a call to map your referral intake and partner workflow.",
    note: "30-minute consultative call",
  },
};

export default function LawFirmsServicePage() {
  return <ServiceLandingPage accent="slate" content={content} />;
}
