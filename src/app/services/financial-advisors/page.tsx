import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.financialAdvisorsService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  heroKicker: "Financial Advisors & Planners",
  heroTitle: "Grow referrals that protect",
  heroHighlight: "trust, compliance, and AUM.",
  heroSummary:
    "Refer Labs builds a referral program that feels aligned with fiduciary standards: clear consent, clean handoffs, and reporting that leadership can defend.",
  heroBullets: [
    "Partner workflows designed for CPAs, estate attorneys, and mortgage brokers",
    "Consent capture and audit trails aligned to fiduciary standards",
    "Household-level attribution for AUM and retained revenue",
    "Advisor-ready handoff and follow-up workflows",
  ],
  primaryCta: { label: "Schedule a Call", href: calendlyUrl },
  whyTitle: "Why referral programs stall in advisory firms",
  whySummary:
    "Most advisory referrals are relationship-driven and informal. That creates three problems: no consistent handoff, no audit trail, and no visibility into which partners actually grow AUM.",
  whyPoints: [
    "Partners send referrals without a repeatable intake, so follow-up quality varies by advisor.",
    "Compliance and disclosure live in email threads instead of a defensible record.",
    "Leadership cannot see which partners drive qualified households and revenue.",
  ],
  outcomesTitle: "What a premium advisory referral program delivers",
  outcomes: [
    "A structured intake flow that protects client trust and compliance.",
    "Clear partner expectations and update cadence that strengthens relationships.",
    "Household-level attribution tied to pipeline, AUM, and retention.",
    "Advisor-ready handoff workflows that reduce missed opportunities.",
  ],
  process: [
    {
      step: "01",
      title: "Partner strategy",
      description: "Align on referral partners, value proposition, and fiduciary guardrails.",
    },
    {
      step: "02",
      title: "Workflow design",
      description: "Build intake, routing, and partner updates across advisory teams.",
    },
    {
      step: "03",
      title: "Partner activation",
      description: "Deliver referral instructions, outreach scripts, and onboarding assets.",
    },
    {
      step: "04",
      title: "Reporting + optimization",
      description: "Deliver leadership dashboards and the first performance review.",
    },
  ],
  deliverables: [
    {
      title: "Referral infrastructure",
      items: [
        "Partner intake and qualification forms",
        "Compliance-ready referral disclosures",
        "Advisor handoff playbooks",
        "Partner status updates",
      ],
    },
    {
      title: "Leadership reporting",
      items: [
        "Referral attribution dashboard",
        "Partner performance tracking",
        "Pipeline and revenue summaries",
        "Quarterly optimization recommendations",
      ],
    },
  ],
  cta: {
    title: "Ready to grow advisory referrals with confidence?",
    description: "Schedule a call to map your partner strategy and compliance-ready workflow.",
    note: "30-minute consultative call",
  },
};

export default function FinancialAdvisorsServicePage() {
  return <ServiceLandingPage accent="tide" content={content} />;
}
