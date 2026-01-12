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
    "Launch map with clear handoffs across marketing and BD",
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
  audience: [
    {
      title: "Managing partners",
      description: "Need a trusted referral program that reflects the caliber of your firm.",
    },
    {
      title: "Business development leaders",
      description: "Want clear partner tiers, outreach scripts, and an elegant pitch.",
    },
    {
      title: "Marketing teams",
      description: "Need messaging, positioning, and assets that feel premium and compliant.",
    },
    {
      title: "Operations teams",
      description: "Require structure so referrals are tracked, attributed, and reported cleanly.",
    },
  ],
  outcomes: [
    {
      title: "A defensible referral story",
      description: "Positioning that tells partners exactly why referring to you elevates their reputation.",
    },
    {
      title: "Offer architecture that converts",
      description: "A compliant incentive and engagement model that makes sense for professional services.",
    },
    {
      title: "Launch-ready messaging",
      description: "Outreach scripts, onboarding copy, and partner enablement tailored to your niche.",
    },
  ],
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
      title: "Offer + compliance architecture",
      description: "Design the referral offer, incentives, and safeguards for regulated industries.",
      deliverable: "Offer blueprint",
    },
    {
      step: "04",
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
        "Leadership-ready summary deck",
      ],
    },
  ],
  testimonials: [
    {
      quote:
        "The strategy work clarified exactly who we should ask for referrals, how to approach them, and how to keep it compliant. It made our outreach feel premium overnight.",
      name: "Managing Partner, Boutique Advisory Firm",
      role: "Professional Services",
    },
    {
      quote:
        "Refer Labs delivered a strategy that our BD and marketing teams could actually execute. The partner personas and messaging were immediately usable.",
      name: "Director of Growth, Consulting Group",
      role: "Management Consulting",
    },
  ],
  faqs: [
    {
      question: "Do you tailor this for regulated industries?",
      answer: "Yes. We shape the offer and messaging around your compliance requirements and referral fee rules.",
    },
    {
      question: "Will you align with our existing CRM and workflows?",
      answer: "We map your current systems and build handoffs so the strategy fits your existing tech stack.",
    },
    {
      question: "Can you help with execution after strategy?",
      answer: "Absolutely. We can move into partner network buildout or referral operations once the strategy is approved.",
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
