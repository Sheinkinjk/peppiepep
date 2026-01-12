import { FileCheck, Stamp, Scale, ScanEye } from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.complianceAttributionService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  heroKicker: "Compliance + Attribution",
  heroTitle: "Protect your firm with",
  heroHighlight: "audit-ready referral compliance.",
  heroSummary:
    "We build the compliance, consent, and attribution infrastructure so every referral is trackable, defensible, and aligned with professional standards.",
  heroBullets: [
    "Audit trails and consent tracking for referrals",
    "Compliance-friendly incentive guidance",
    "Attribution reporting for partners and leadership",
    "Risk checks before offers and payouts",
  ],
  primaryCta: { label: "Schedule a compliance consult", href: calendlyUrl },
  secondaryCta: { label: "Review deliverables", href: "#schedule" },
  stats: [
    { value: "100% auditable", label: "Referral trails" },
    { value: "Clear rules", label: "Incentive structure" },
    { value: "No surprises", label: "Risk mitigation" },
  ],
  engagement: {
    title: "Compliance-first referral infrastructure",
    description:
      "We align referral workflows to regulatory requirements and build reporting so your leadership team can defend every referral.",
    items: [
      "Consent and disclosure capture",
      "Referral fee and incentive guardrails",
      "Attribution reporting and audit logs",
      "Policy documentation and partner guidance",
    ],
  },
  audience: [
    {
      title: "Regulated professional services",
      description: "Law, accounting, financial, and healthcare-aligned firms.",
    },
    {
      title: "Risk and compliance teams",
      description: "Need structured documentation for referral incentives and disclosures.",
    },
    {
      title: "Managing partners",
      description: "Want to grow referrals without compromising governance standards.",
    },
    {
      title: "Operations leaders",
      description: "Need audit-ready reporting and referral attribution.",
    },
  ],
  outcomes: [
    {
      title: "Clear compliance posture",
      description: "Policies and workflows that align with referral fee rules in your region.",
    },
    {
      title: "Complete attribution",
      description: "Every referral tied to the right partner, engagement, and outcome.",
    },
    {
      title: "Leadership-ready reporting",
      description: "Dashboards and summaries that stand up to audit and board review.",
    },
  ],
  pillars: [
    {
      title: "Consent + disclosure",
      description: "Capture approvals and acknowledgements at every referral handoff.",
      icon: FileCheck,
    },
    {
      title: "Incentive governance",
      description: "Define safe incentive structures based on professional standards.",
      icon: Scale,
    },
    {
      title: "Attribution reporting",
      description: "Prove the source, status, and outcomes of each referral.",
      icon: ScanEye,
    },
    {
      title: "Audit documentation",
      description: "Deliver audit trails and policy documents your team can reference.",
      icon: Stamp,
    },
  ],
  process: [
    {
      step: "01",
      title: "Compliance review",
      description: "Audit your existing referral processes against regulatory requirements.",
      deliverable: "Risk assessment",
    },
    {
      step: "02",
      title: "Policy alignment",
      description: "Define referral incentive rules, disclosures, and consent language.",
      deliverable: "Policy pack",
    },
    {
      step: "03",
      title: "System implementation",
      description: "Configure consent, attribution, and reporting inside Refer Labs.",
      deliverable: "Compliance setup",
    },
    {
      step: "04",
      title: "Leadership enablement",
      description: "Deliver documentation, reporting, and training for stakeholders.",
      deliverable: "Audit kit",
    },
  ],
  deliverables: [
    {
      title: "Compliance infrastructure",
      items: [
        "Consent and disclosure capture flows",
        "Incentive eligibility checklist",
        "Referral fee policy guidance",
        "Compliance-ready partner communications",
      ],
    },
    {
      title: "Attribution reporting",
      items: [
        "Referral audit log dashboard",
        "Partner attribution reporting",
        "Outcome tracking and proof of value",
        "Leadership summary pack",
      ],
    },
  ],
  testimonials: [
    {
      quote:
        "We needed a referral program that could survive compliance scrutiny. The Refer Labs team built guardrails and reporting that made leadership comfortable to scale.",
      name: "Managing Director, Financial Advisory",
      role: "Risk and Compliance",
    },
    {
      quote:
        "The audit trail and consent tracking removed uncertainty from our referral relationships. It now feels safe to grow.",
      name: "Operations Lead, Legal Firm",
      role: "Legal Services",
    },
  ],
  faqs: [
    {
      question: "Can you tailor to state or regional rules?",
      answer: "Yes. We align workflows to the requirements that apply to your jurisdiction.",
    },
    {
      question: "Do you provide templates for disclosures?",
      answer: "We deliver customizable disclosure language and consent scripts for your team.",
    },
    {
      question: "Will this slow down referrals?",
      answer: "No. We design compliance steps that feel seamless for partners and clients.",
    },
  ],
  cta: {
    title: "Protect your referral program while scaling it.",
    description: "Schedule a compliance consult to build audit-ready referral tracking.",
    note: "Compliance-first referral growth",
  },
};

export default function ComplianceAttributionServicePage() {
  return <ServiceLandingPage accent="forest" content={content} />;
}
