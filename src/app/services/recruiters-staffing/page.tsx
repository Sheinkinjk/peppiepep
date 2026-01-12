import { Briefcase, LineChart, Target, Users } from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.recruitersStaffingService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  heroKicker: "Recruiters & Staffing Firms",
  heroTitle: "Track referrals from",
  heroHighlight: "clients, candidates, and partners.",
  heroSummary:
    "Refer Labs helps recruiting teams capture referrals, track placements, and attribute revenue across client and candidate networks.",
  heroBullets: [
    "Referral intake for candidates, clients, and partners",
    "Clear routing by role, industry, or geography",
    "Attribution reporting from referral to placement",
  ],
  primaryCta: { label: "Schedule a strategy call", href: calendlyUrl },
  secondaryCta: { label: "See the rollout plan", href: "#schedule" },
  stats: [
    { value: "2-3 weeks", label: "Launch timeline" },
    { value: "Full attribution", label: "Placement tracking" },
    { value: "Partner ready", label: "Referral workflows" },
  ],
  engagement: {
    title: "Recruiting referral system setup",
    description:
      "We create intake workflows, routing, and reporting so you know which referrals drive placements and revenue.",
    items: [
      "Referral intake for candidates and client leads",
      "Routing rules by desk, industry, and geography",
      "Placement and revenue attribution reporting",
    ],
  },
  pillars: [
    {
      title: "Referral intake",
      description: "Capture candidate and client referrals with the right details.",
      icon: Users,
    },
    {
      title: "Routing precision",
      description: "Send referrals to the right recruiter fast.",
      icon: Target,
    },
    {
      title: "Placement attribution",
      description: "Track referrals through placements and fees.",
      icon: Briefcase,
    },
    {
      title: "Performance insight",
      description: "See which partners and candidates deliver revenue.",
      icon: LineChart,
    },
  ],
  process: [
    {
      step: "01",
      title: "Network strategy",
      description: "Identify the best referral sources across clients and candidates.",
      deliverable: "Partner plan",
    },
    {
      step: "02",
      title: "Intake + routing",
      description: "Configure intake forms and routing logic by desk and industry.",
      deliverable: "Workflow setup",
    },
    {
      step: "03",
      title: "Launch + reporting",
      description: "Deliver dashboards for referral, placement, and revenue reporting.",
      deliverable: "Launch kit",
    },
  ],
  deliverables: [
    {
      title: "Recruiting workflows",
      items: [
        "Candidate referral intake",
        "Client lead referral intake",
        "Routing rules and ownership",
        "Partner update cadence",
      ],
    },
    {
      title: "Revenue reporting",
      items: [
        "Placement attribution dashboard",
        "Partner performance reporting",
        "Referral to placement conversion tracking",
        "Quarterly optimization review",
      ],
    },
  ],
  cta: {
    title: "Ready to scale recruiting referrals?",
    description: "Schedule a call to map referral sources and the placement workflow.",
    note: "30-minute consultative call",
  },
};

export default function RecruitersStaffingServicePage() {
  return <ServiceLandingPage accent="sapphire" content={content} />;
}
