import { MessageSquare, Repeat2, TrendingUp, Users } from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.consultantsCoachesService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  heroKicker: "Consultants & Coaches",
  heroTitle: "Turn relationships into",
  heroHighlight: "a predictable referral channel.",
  heroSummary:
    "We help consultants and coaches build a premium referral system that strengthens partnerships and keeps new engagements flowing.",
  heroBullets: [
    "Partner referrals that feel personal, premium, and on-brand",
    "Intake and qualification for high-fit retainers and workshops",
    "Visibility into referral sources, conversion, and deal value",
    "Partner updates that keep relationships warm",
  ],
  primaryCta: { label: "Schedule a call", href: calendlyUrl },
  secondaryCta: { label: "See the delivery plan", href: "#schedule" },
  stats: [
    { value: "2-3 weeks", label: "Launch timeline" },
    { value: "High touch", label: "Partner experience" },
    { value: "Full visibility", label: "Referral reporting" },
  ],
  engagement: {
    title: "Consulting referral system buildout",
    description:
      "A streamlined engagement to build partner outreach, intake, and reporting that supports premium positioning.",
    items: [
      "Partner network mapping and outreach guidance",
      "Referral intake and qualification workflows",
      "Follow-up cadence and partner updates",
      "Leadership reporting on referral revenue",
    ],
  },
  pillars: [
    {
      title: "Partner positioning",
      description: "Define the referral narrative that elevates your expertise.",
      icon: Users,
    },
    {
      title: "Engagement intake",
      description: "Capture the right details for faster qualification.",
      icon: MessageSquare,
    },
    {
      title: "Consistent follow-up",
      description: "Keep referral partners engaged with clear updates.",
      icon: Repeat2,
    },
    {
      title: "Revenue insight",
      description: "Track referral sources, conversion, and deal value.",
      icon: TrendingUp,
    },
  ],
  process: [
    {
      step: "01",
      title: "Partner strategy",
      description: "Clarify who should refer and how to position your services.",
      deliverable: "Partner plan",
    },
    {
      step: "02",
      title: "Intake + qualification",
      description: "Build referral intake, routing, and qualification workflows.",
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
      title: "Launch + reporting",
      description: "Deliver assets, dashboards, and partner updates.",
      deliverable: "Launch kit",
    },
  ],
  deliverables: [
    {
      title: "Referral playbooks",
      items: [
        "Partner outreach templates",
        "Referral intake form",
        "Qualification criteria",
        "Follow-up cadence guide",
      ],
    },
    {
      title: "Performance reporting",
      items: [
        "Referral source dashboard",
        "Conversion tracking",
        "Engagement value reporting",
        "Quarterly optimization review",
      ],
    },
  ],
  cta: {
    title: "Ready to scale your consulting referrals?",
    description: "Schedule a call to map your referral strategy and launch plan.",
    note: "30-minute consultative call",
  },
};

export default function ConsultantsCoachesServicePage() {
  return <ServiceLandingPage accent="forest" content={content} />;
}
