import { ClipboardCheck, LineChart, ListChecks, Workflow } from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.referralOpsService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  heroKicker: "Referral Operations",
  heroTitle: "Build the workflows that keep",
  heroHighlight: "referrals moving without friction.",
  heroSummary:
    "We set up the intake, routing, and tracking operations so referrals land with the right team, get actioned fast, and are fully attributable.",
  heroBullets: [
    "Structured referral intake forms and qualification",
    "Routing rules that protect response times",
    "Partner and client dashboards with live status",
  ],
  primaryCta: { label: "Schedule an ops walkthrough", href: calendlyUrl },
  secondaryCta: { label: "See delivery scope", href: "#schedule" },
  stats: [
    { value: "24-48 hrs", label: "Response SLA" },
    { value: "100% tracked", label: "Referral visibility" },
    { value: "Zero chaos", label: "Operational clarity" },
  ],
  engagement: {
    title: "Referral operations buildout",
    description:
      "A structured engagement that standardizes how referrals are captured, routed, updated, and reported across teams.",
    items: [
      "Referral intake forms with qualification logic",
      "Routing rules for partners, teams, and locations",
      "Operational dashboards and status updates",
    ],
  },
  pillars: [
    {
      title: "Intake design",
      description: "Capture the right data upfront so referrals are actionable immediately.",
      icon: ClipboardCheck,
    },
    {
      title: "Routing automation",
      description: "Ensure every referral reaches the right owner without manual triage.",
      icon: Workflow,
    },
    {
      title: "Status visibility",
      description: "Keep partners and teams aligned with live status updates.",
      icon: LineChart,
    },
    {
      title: "Operational governance",
      description: "Set policies, SLAs, and reporting for leadership clarity.",
      icon: ListChecks,
    },
  ],
  process: [
    {
      step: "01",
      title: "Workflow discovery",
      description: "Map your current referral intake, handoffs, and bottlenecks.",
      deliverable: "Workflow map",
    },
    {
      step: "02",
      title: "Operational design",
      description: "Define intake forms, routing rules, and status stages.",
      deliverable: "Ops blueprint",
    },
    {
      step: "03",
      title: "Automation buildout",
      description: "Implement alerts, reminders, and partner notifications in Refer Labs.",
      deliverable: "Automation suite",
    },
  ],
  deliverables: [
    {
      title: "Operational tooling",
      items: [
        "Referral intake forms and qualification logic",
        "Routing flows and team assignments",
        "Partner and client status dashboards",
        "Notification and reminder rules",
      ],
    },
    {
      title: "Governance system",
      items: [
        "Referral status definitions",
        "Response time SLAs",
        "Team playbooks and training notes",
      ],
    },
  ],
  cta: {
    title: "Ready to operationalize your referral flow?",
    description: "Schedule a call to map your referral operations and design a clean, automated workflow.",
    note: "Operations-ready in weeks",
  },
};

export default function ReferralOpsServicePage() {
  return <ServiceLandingPage accent="slate" content={content} />;
}
