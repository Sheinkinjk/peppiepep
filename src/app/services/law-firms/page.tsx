import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.lawFirmsService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  heroKicker: "Law Firms",
  heroTitle: "Grow legal referrals with",
  heroHighlight: "audit-ready clarity.",
  heroSummary:
    "Referral workflows that protect ethics, transparency, and client trust.",
  heroBullets: [
    "Intake with conflict checks and practice routing",
    "Partner updates for matter visibility",
    "Matter-level attribution for fees and outcomes",
  ],
  primaryCta: { label: "Schedule a Call", href: calendlyUrl },
  whyTitle: "Why legal referral programs break down",
  whySummary:
    "Legal referrals demand trust, but missing structure creates risk and friction.",
  whyPoints: [
    "Intake varies by partner and practice.",
    "Partners lack matter status updates.",
    "Referral attribution is hard to defend.",
  ],
  outcomesTitle: "What a premium legal referral program delivers",
  outcomes: [
    "Intake workflows aligned to practice areas.",
    "Partner updates that protect relationships.",
    "Matter-level attribution tied to fees.",
  ],
  process: [
    {
      step: "01",
      title: "Partner strategy",
      description: "Identify referral partners and practice priorities.",
    },
    {
      step: "02",
      title: "Intake + routing",
      description: "Build intake forms, routing rules, and compliance checkpoints.",
    },
    {
      step: "03",
      title: "Partner activation",
      description: "Deliver partner assets and reporting dashboards.",
    },
  ],
  deliverables: [
    {
      title: "Legal referral workflows",
      items: [
        "Practice area intake forms",
        "Conflict check handoff steps",
        "Partner update cadence",
      ],
    },
    {
      title: "Leadership reporting",
      items: [
        "Referral matter dashboard",
        "Partner contribution tracking",
        "Fee and outcome reporting",
      ],
    },
  ],
  cta: {
    title: "Ready to professionalize legal referrals?",
    description: "Schedule a call to map your referral intake and workflow.",
    note: "30-minute consultative call",
  },
};

export default function LawFirmsServicePage() {
  return <ServiceLandingPage accent="slate" content={content} />;
}
