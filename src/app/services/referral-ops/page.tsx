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
    "Automated reminders and compliance checkpoints",
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
      "Alerts for stuck or high-priority referrals",
    ],
  },
  audience: [
    {
      title: "Operations leaders",
      description: "Need to remove manual handoffs and keep referral response times tight.",
    },
    {
      title: "Client service teams",
      description: "Want immediate visibility into referral status and accountability.",
    },
    {
      title: "Partner success teams",
      description: "Need consistent communication and referral updates for partners.",
    },
    {
      title: "Multi-location firms",
      description: "Require routing logic and compliance audit trails across locations.",
    },
  ],
  outcomes: [
    {
      title: "Faster referral response",
      description: "Automated routing and reminders to keep every referral moving quickly.",
    },
    {
      title: "Clean handoffs",
      description: "Clear workflows across marketing, BD, and client services.",
    },
    {
      title: "Operational reporting",
      description: "Dashboards that show volume, conversion, and response times.",
    },
  ],
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
    {
      step: "04",
      title: "Training + reporting",
      description: "Enable teams with playbooks and reporting cadence.",
      deliverable: "Ops handoff",
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
        "Weekly operational reporting template",
      ],
    },
  ],
  testimonials: [
    {
      quote:
        "Our referral intake used to be messy. Now partners know exactly what happens next, and our team never drops a lead.",
      name: "COO, Advisory Firm",
      role: "Operations Leadership",
    },
    {
      quote:
        "The routing logic and dashboards gave leadership the clarity we needed. We can finally see referral response times at a glance.",
      name: "Director of Client Services, Consulting Group",
      role: "Client Success",
    },
  ],
  faqs: [
    {
      question: "Can this work with multiple offices?",
      answer: "Yes. We configure routing rules based on location, practice area, or partner tier.",
    },
    {
      question: "Do you build the automation inside Refer Labs?",
      answer: "Yes. We implement the workflows and dashboards directly in Refer Labs.",
    },
    {
      question: "Will you train our team?",
      answer: "We deliver playbooks, training sessions, and a handoff guide for internal adoption.",
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
