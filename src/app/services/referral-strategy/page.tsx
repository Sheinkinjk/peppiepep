import { BadgeCheck, Layers, MessageSquare, Target } from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.referralStrategyService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  heroKicker: "Referral Strategy",
  heroTitle: "Design a partner-led referral engine",
  heroHighlight: "for professional services.",
  heroSummary:
    "We build the positioning, partner personas, and offer architecture that make your referral program feel premium, compliant, and easy to champion.",
  heroBullets: [
    "Positioning and messaging aligned to high-trust referrals",
    "Offer structure designed for ethical, compliant incentives",
    "Partner personas and outreach playbooks your team can use",
  ],
  primaryCta: { label: "Schedule a strategy call", href: calendlyUrl },
  secondaryCta: { label: "View our process", href: "#schedule" },
  stats: [
    { value: "2-3 weeks", label: "Strategy sprint" },
    { value: "3-5 personas", label: "Partner segments" },
    { value: "100% aligned", label: "Compliance review" },
  ],
  engagement: {
    title: "Strategy sprint + launch roadmap",
    description:
      "A tightly scoped engagement that gives leadership and your partner team a complete referral strategy with assets ready for rollout.",
    items: [
      "Executive discovery and revenue goal alignment",
      "Persona and partner channel mapping",
      "Offer packaging with compliant incentive guidance",
      "Messaging framework for outreach and onboarding",
    ],
  },
  pillars: [
    {
      title: "Partner positioning",
      description: "Define what makes your firm the easiest, safest, and most profitable referral.",
      icon: Target,
    },
    {
      title: "Persona segmentation",
      description: "Map the advisor, consultant, and industry partners who influence your pipeline.",
      icon: Layers,
    },
    {
      title: "Offer packaging",
      description: "Craft incentives, co-marketing, and co-service options that meet compliance needs.",
      icon: BadgeCheck,
    },
    {
      title: "Messaging system",
      description: "Create outreach and follow-up copy that feels consultative, not transactional.",
      icon: MessageSquare,
    },
  ],
  process: [
    {
      step: "01",
      title: "Discovery + revenue goals",
      description: "Align on target industries, partner archetypes, and revenue outcomes.",
      deliverable: "Strategy brief",
    },
    {
      step: "02",
      title: "Partner persona mapping",
      description: "Define the highest-fit partner categories and how they prefer to engage.",
      deliverable: "Persona map",
    },
    {
      step: "03",
      title: "Launch assets + handoff",
      description: "Deliver scripts, decks, and onboarding guides for immediate rollout.",
      deliverable: "Launch kit",
    },
  ],
  deliverables: [
    {
      title: "Strategic playbooks",
      items: [
        "Referral positioning narrative",
        "Partner segmentation and tiering model",
        "Compliance-ready incentive guidance",
        "Partner messaging framework",
      ],
    },
    {
      title: "Activation assets",
      items: [
        "Outreach templates and follow-up sequences",
        "Partner onboarding checklist",
        "Internal launch checklist",
      ],
    },
  ],
  cta: {
    title: "Ready for a referral strategy your partners trust?",
    description: "Schedule a call and we will walk you through a tailored strategy sprint for your firm.",
    note: "30-minute consultative call",
  },
};

export default function ReferralStrategyServicePage() {
  return <ServiceLandingPage accent="tide" content={content} />;
}
