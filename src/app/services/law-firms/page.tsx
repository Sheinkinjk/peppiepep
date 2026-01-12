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
  primaryCta: { label: "Schedule a Call", href: calendlyUrl },
  whyTitle: "Why legal referral programs break down",
  whySummary:
    "Legal referrals are high trust and high risk. Without structure, firms struggle with conflict checks, partner transparency, and defensible attribution.",
  whyPoints: [
    "Referrals arrive in inboxes without a repeatable intake path.",
    "Partners are left guessing on matter status and outcomes.",
    "Leadership cannot reliably report on referral fees and impact.",
  ],
  outcomesTitle: "What a premium legal referral program delivers",
  outcomes: [
    "Intake workflows that align to practice areas and conflict checks.",
    "Partner updates that protect relationships and reputation.",
    "Matter-level attribution tied to fees and outcomes.",
    "Governance and reporting that withstand internal scrutiny.",
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
      description: "Deliver partner-facing assets and referral instructions.",
    },
    {
      step: "04",
      title: "Launch + reporting",
      description: "Deliver partner assets and referral reporting dashboards.",
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
