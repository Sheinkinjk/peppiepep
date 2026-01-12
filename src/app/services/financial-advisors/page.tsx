import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.financialAdvisorsService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  heroKicker: "Financial Advisors & Planners",
  heroTitle: "Grow referrals that protect",
  heroHighlight: "trust, compliance, and AUM.",
  heroSummary:
    "A referral program aligned with fiduciary standards, clean handoffs, and leadership-ready reporting.",
  heroBullets: [
    "Partner workflows for CPAs, estate attorneys, and lenders",
    "Consent capture and audit trails built in",
    "Household-level attribution for AUM impact",
  ],
  primaryCta: { label: "Schedule a Call", href: calendlyUrl },
  whyTitle: "Why referral programs stall in advisory firms",
  whySummary:
    "Advisory referrals are high trust, but often untracked and inconsistent.",
  whyPoints: [
    "Inconsistent intake and follow-up by advisor.",
    "Compliance evidence buried in email threads.",
    "No clear view of partner impact on AUM.",
  ],
  outcomesTitle: "What a premium advisory referral program delivers",
  outcomes: [
    "Structured intake that protects trust and compliance.",
    "Partner updates that strengthen relationships.",
    "Attribution tied to pipeline and AUM.",
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
      description: "Build intake, routing, and partner updates.",
    },
    {
      step: "03",
      title: "Partner activation",
      description: "Deliver outreach scripts, onboarding assets, and reporting.",
    },
  ],
  deliverables: [
    {
      title: "Referral infrastructure",
      items: [
        "Partner intake and qualification forms",
        "Compliance-ready referral disclosures",
        "Advisor handoff playbooks",
      ],
    },
    {
      title: "Leadership reporting",
      items: [
        "Referral attribution dashboard",
        "Partner performance tracking",
        "Pipeline and revenue summaries",
      ],
    },
  ],
  cta: {
    title: "Ready to grow advisory referrals with confidence?",
    description: "Schedule a call to map your partner strategy and workflow.",
    note: "30-minute consultative call",
  },
};

export default function FinancialAdvisorsServicePage() {
  return <ServiceLandingPage accent="tide" content={content} />;
}
