import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.recruitersStaffingService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  heroKicker: "Recruiters & Staffing Firms",
  heroTitle: "Track referrals from",
  heroHighlight: "clients, candidates, and partners.",
  heroSummary:
    "A recruiting referral program that tracks intake, placements, and revenue.",
  heroBullets: [
    "Referral intake for candidates, clients, and partner agencies",
    "Routing by role, industry, and geography",
    "Placement attribution from referral to fee",
  ],
  primaryCta: { label: "Schedule a Call", href: calendlyUrl },
  whyTitle: "Why recruiting referrals lose momentum",
  whySummary:
    "Recruiting referrals need fast routing and consistent partner updates.",
  whyPoints: [
    "Missing role and location context slows response.",
    "No clear view of partner placement quality.",
    "Updates are inconsistent across desks.",
  ],
  outcomesTitle: "What a premium recruiting referral program delivers",
  outcomes: [
    "Intake that captures the right role details.",
    "Routing rules that keep response times fast.",
    "Placement attribution tied to fees and sources.",
  ],
  process: [
    {
      step: "01",
      title: "Network strategy",
      description: "Identify the best referral sources across clients and candidates.",
    },
    {
      step: "02",
      title: "Intake + routing",
      description: "Configure intake forms and routing logic by desk and industry.",
    },
    {
      step: "03",
      title: "Partner activation",
      description: "Deliver partner assets, dashboards, and reporting.",
    },
  ],
  deliverables: [
    {
      title: "Recruiting workflows",
      items: [
        "Candidate referral intake",
        "Client lead referral intake",
        "Routing rules and ownership",
      ],
    },
    {
      title: "Revenue reporting",
      items: [
        "Placement attribution dashboard",
        "Partner performance reporting",
        "Referral to placement conversion tracking",
      ],
    },
  ],
  cta: {
    title: "Ready to scale recruiting referrals?",
    description: "Schedule a call to map referral sources and workflow.",
    note: "30-minute consultative call",
  },
};

export default function RecruitersStaffingServicePage() {
  return <ServiceLandingPage accent="sapphire" content={content} />;
}
