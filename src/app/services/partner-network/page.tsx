import { Handshake, Megaphone, Radar, Target } from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.partnerNetworkService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  heroKicker: "Partner Network Buildout",
  heroTitle: "Activate the referral partners",
  heroHighlight: "your clients already trust.",
  heroSummary:
    "We source, qualify, and engage high-fit partners so your firm builds a steady, reputable referral pipeline without scrambling for introductions.",
  heroBullets: [
    "Partner sourcing from adjacent industries and associations",
    "Qualification criteria that protect brand and compliance",
    "Warm outreach and onboarding flows designed for professionals",
    "Referral tracking inside Refer Labs from day one",
  ],
  primaryCta: { label: "Schedule a partner growth call", href: calendlyUrl },
  secondaryCta: { label: "See engagement details", href: "#schedule" },
  stats: [
    { value: "30-60 targets", label: "Partner shortlist" },
    { value: "2-week sprints", label: "Outreach cadence" },
    { value: "High trust", label: "Referral quality" },
  ],
  engagement: {
    title: "Partner sourcing + activation",
    description:
      "We identify the right partners, craft the outreach strategy, and onboard them into a structured, trackable referral experience.",
    items: [
      "Partner research and prioritization matrix",
      "Warm outreach sequences and talking points",
      "Partner onboarding and enablement assets",
      "Live dashboards to monitor partner activity",
    ],
  },
  audience: [
    {
      title: "Professional services firms",
      description: "Need predictable partner referrals in law, accounting, advisory, or consulting.",
    },
    {
      title: "Client experience leaders",
      description: "Want partners who protect client trust and deliver aligned value.",
    },
    {
      title: "BD teams",
      description: "Need structured partner outreach and a clear follow-up cadence.",
    },
    {
      title: "Managing directors",
      description: "Require measurable partner performance and accountability.",
    },
  ],
  outcomes: [
    {
      title: "Qualified partner pipeline",
      description: "A vetted list of partners who match your client profiles and service standards.",
    },
    {
      title: "Consistent partner activation",
      description: "Outreach and onboarding that turn introductions into steady referral volume.",
    },
    {
      title: "Visibility into partner performance",
      description: "Referral tracking and dashboards that show who delivers and who needs attention.",
    },
  ],
  pillars: [
    {
      title: "Partner sourcing",
      description: "Build a targeted list of firms and advisors with aligned audiences.",
      icon: Radar,
    },
    {
      title: "Qualification framework",
      description: "Score partners based on fit, reputation, and revenue impact.",
      icon: Target,
    },
    {
      title: "Activation playbooks",
      description: "Outreach, follow-up, and onboarding scripts your team can reuse.",
      icon: Megaphone,
    },
    {
      title: "Relationship management",
      description: "Track touchpoints and partner performance inside Refer Labs.",
      icon: Handshake,
    },
  ],
  process: [
    {
      step: "01",
      title: "Partner discovery",
      description: "Align on partner categories, ideal firm profiles, and revenue objectives.",
      deliverable: "Target map",
    },
    {
      step: "02",
      title: "Qualification + outreach",
      description: "Build lists, prioritize outreach, and launch personalized introductions.",
      deliverable: "Outreach sprint",
    },
    {
      step: "03",
      title: "Onboarding + enablement",
      description: "Provide partner resources, messaging, and referral submission steps.",
      deliverable: "Partner kit",
    },
    {
      step: "04",
      title: "Optimization + reporting",
      description: "Review partner conversion rates and refine the list monthly.",
      deliverable: "Performance review",
    },
  ],
  deliverables: [
    {
      title: "Partner activation assets",
      items: [
        "Target partner list with priority tiers",
        "Outreach scripts and email sequences",
        "Partner onboarding guide",
        "Referral intake checklist",
      ],
    },
    {
      title: "Operational visibility",
      items: [
        "Partner pipeline dashboard",
        "Referral tracking workflows",
        "Monthly partner performance report",
        "Next-best-action recommendations",
      ],
    },
  ],
  testimonials: [
    {
      quote:
        "We finally have a partner pipeline that is as organized as our sales pipeline. The outreach cadence and dashboards were immediate game changers.",
      name: "Head of Partnerships, Legal Advisory",
      role: "Legal Services",
    },
    {
      quote:
        "The Refer Labs team brought structure to partner outreach and helped us activate introductions quickly without losing the personal touch.",
      name: "Director of Growth, Accounting Firm",
      role: "Accounting and Tax",
    },
  ],
  faqs: [
    {
      question: "Do you handle outreach or just provide the list?",
      answer: "We can support outreach directly or equip your team with scripts, sequencing, and templates.",
    },
    {
      question: "How do you vet partner fit?",
      answer: "We assess overlapping client profiles, service quality, and compliance requirements before activation.",
    },
    {
      question: "Can this integrate with existing CRM workflows?",
      answer: "Yes. We map partner and referral workflows into your current CRM or tracking tools.",
    },
  ],
  cta: {
    title: "Build a partner network that keeps referrals flowing.",
    description: "Schedule a call to scope your partner pipeline buildout and activation sprint.",
    note: "White-glove partner activation",
  },
};

export default function PartnerNetworkServicePage() {
  return <ServiceLandingPage accent="gold" content={content} />;
}
