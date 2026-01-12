import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.accountantsService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  heroKicker: "Accountants & Tax Professionals",
  heroTitle: "Build a referral engine",
  heroHighlight: "that protects client trust.",
  heroSummary:
    "We help accounting firms track referrals across advisors, attorneys, and business owners with clarity, compliance, and measurable ROI.",
  heroBullets: [
    "Referral intake by service line: tax, audit, bookkeeping, CFO advisory",
    "Partner handoffs that keep CPAs, advisors, and attorneys aligned",
    "Client consent and engagement tracking for regulated work",
    "Revenue attribution tied to retained clients and fees",
  ],
  primaryCta: { label: "Schedule a Call", href: calendlyUrl },
  whyTitle: "Why accounting referrals get stuck in spreadsheets",
  whySummary:
    "Referrals happen informally between trusted professionals, but without structure they get lost, delayed, or never attributed to the partner who sent them.",
  whyPoints: [
    "No consistent intake for tax vs audit vs advisory leads.",
    "Partners are unsure what happens after they refer a client.",
    "Leadership cannot see which relationships drive retained revenue.",
  ],
  outcomesTitle: "What a premium accounting referral program delivers",
  outcomes: [
    "Service-line intake that routes referrals to the right team fast.",
    "Partner updates that keep advisors and attorneys informed.",
    "Revenue attribution tied to retained clients and fees.",
    "Compliance-ready records that stand up to scrutiny.",
  ],
  process: [
    {
      step: "01",
      title: "Partner strategy",
      description: "Identify partner sources and define referral expectations.",
    },
    {
      step: "02",
      title: "Intake + routing",
      description: "Configure referral intake flows and routing for teams.",
    },
    {
      step: "03",
      title: "Partner activation",
      description: "Deliver outreach assets and partner onboarding materials.",
    },
    {
      step: "04",
      title: "Reporting + launch",
      description: "Deliver dashboards and partner communications for rollout.",
    },
  ],
  deliverables: [
    {
      title: "Operational playbooks",
      items: [
        "Referral intake forms by service line",
        "Partner follow-up cadence",
        "Referral status definitions",
        "Partner communication templates",
      ],
    },
    {
      title: "Reporting suite",
      items: [
        "Referral revenue dashboard",
        "Partner performance tracking",
        "Service line conversion reporting",
        "Quarterly optimization summary",
      ],
    },
  ],
  cta: {
    title: "Ready to scale accounting referrals with confidence?",
    description: "Schedule a call to map your referral workflow and partner strategy.",
    note: "30-minute consultative call",
  },
};

export default function AccountantsServicePage() {
  return <ServiceLandingPage accent="gold" content={content} />;
}
