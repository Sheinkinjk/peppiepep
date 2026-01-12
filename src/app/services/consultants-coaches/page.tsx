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
  primaryCta: { label: "Schedule a Call", href: calendlyUrl },
  whyTitle: "Why referrals feel inconsistent for consultants",
  whySummary:
    "Most referral growth relies on personal relationships. Without a clear intake and follow-up flow, those relationships turn into unpredictable peaks and troughs.",
  whyPoints: [
    "Referrals arrive without the right context for qualification.",
    "Partners do not know what to expect after a referral.",
    "You cannot measure which partners drive the highest-value engagements.",
  ],
  outcomesTitle: "What a premium consulting referral program delivers",
  outcomes: [
    "A polished referral experience that matches your positioning.",
    "Faster qualification for retainers, workshops, and advisory work.",
    "Partner updates that keep relationships warm and active.",
    "Visibility into referral sources, conversion, and deal value.",
  ],
  process: [
    {
      step: "01",
      title: "Partner strategy",
      description: "Clarify who should refer and how to position your services.",
    },
    {
      step: "02",
      title: "Intake + qualification",
      description: "Build referral intake, routing, and qualification workflows.",
    },
    {
      step: "03",
      title: "Partner activation",
      description: "Deliver outreach assets and partner onboarding materials.",
    },
    {
      step: "04",
      title: "Launch + reporting",
      description: "Deliver assets, dashboards, and partner updates.",
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
