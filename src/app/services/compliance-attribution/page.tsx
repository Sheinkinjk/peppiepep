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
    ],
  },
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
      ],
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
