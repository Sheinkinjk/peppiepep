import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.consultantsCoachesService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  heroKicker: "Consultants & Coaches",
  heroTitle: "Turn relationships into",
  heroHighlight: "a predictable referral channel.",
  heroSummary:
    "A premium referral system that keeps the right engagements flowing.",
  heroBullets: [
    "Partner referrals that feel personal and on-brand",
    "Intake for high-fit retainers and workshops",
    "Visibility into sources and deal value",
  ],
  primaryCta: { label: "Schedule a Call", href: calendlyUrl },
  whyTitle: "Why referrals feel inconsistent for consultants",
  whySummary:
    "Great relationships still need a clear intake and follow-up flow.",
  whyPoints: [
    "Referrals arrive without qualification context.",
    "Partners do not know what happens next.",
    "High-value partners are hard to prioritize.",
  ],
  outcomesTitle: "What a premium consulting referral program delivers",
  outcomes: [
    "A polished referral experience that matches your positioning.",
    "Faster qualification for retainers and advisory work.",
    "Visibility into sources and deal value.",
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
      description: "Deliver outreach assets, dashboards, and partner updates.",
    },
  ],
  deliverables: [
    {
      title: "Referral playbooks",
      items: [
        "Partner outreach templates",
        "Referral intake form",
        "Follow-up cadence guide",
      ],
    },
    {
      title: "Performance reporting",
      items: [
        "Referral source dashboard",
        "Conversion tracking",
        "Engagement value reporting",
      ],
    },
  ],
  cta: {
    title: "Ready to scale your consulting referrals?",
    description: "Schedule a call to map your referral strategy.",
    note: "30-minute consultative call",
  },
};

export default function ConsultantsCoachesServicePage() {
  return <ServiceLandingPage accent="forest" content={content} />;
}
