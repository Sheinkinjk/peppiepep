import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.accountantsService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  heroKicker: "Accountants & Tax Professionals",
  heroTitle: "Build a referral engine",
  heroHighlight: "that protects client trust.",
  heroSummary:
    "A referral program for accounting firms that keeps partners aligned and revenue attributed.",
  heroBullets: [
    "Intake by service line: tax, audit, advisory",
    "Partner handoffs across CPAs, advisors, and attorneys",
    "Revenue attribution tied to retained clients",
  ],
  primaryCta: { label: "Schedule a Call", href: calendlyUrl },
  whyTitle: "Why accounting referrals get stuck in spreadsheets",
  whySummary:
    "Trusted referrals are high value, but informal tracking hides what converts.",
  whyPoints: [
    "Inconsistent intake across service lines.",
    "Partners lack visibility after they refer.",
    "Unclear attribution for retained revenue.",
  ],
  outcomesTitle: "What a premium accounting referral program delivers",
  outcomes: [
    "Service-line intake routed to the right team.",
    "Partner updates that keep advisors informed.",
    "Revenue attribution tied to retained clients.",
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
      description: "Deliver onboarding assets and reporting for launch.",
    },
  ],
  deliverables: [
    {
      title: "Operational playbooks",
      items: [
        "Referral intake forms by service line",
        "Partner follow-up cadence",
        "Partner communication templates",
      ],
    },
    {
      title: "Reporting suite",
      items: [
        "Referral revenue dashboard",
        "Partner performance tracking",
        "Service line conversion reporting",
      ],
    },
  ],
  cta: {
    title: "Ready to scale accounting referrals with confidence?",
    description: "Schedule a call to map your referral workflow.",
    note: "30-minute consultative call",
  },
};

export default function AccountantsServicePage() {
  return <ServiceLandingPage accent="gold" content={content} />;
}
