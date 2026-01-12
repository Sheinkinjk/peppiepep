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
    "Referral intake for candidates, clients, and partner agencies",
    "Routing by role, industry, and geography",
    "Placement attribution from referral to fee",
    "Partner updates that keep high-value sources engaged",
  ],
  primaryCta: { label: "Schedule a Call", href: calendlyUrl },
  whyTitle: "Why recruiting referrals lose momentum",
  whySummary:
    "Recruiting referrals span candidates, hiring managers, and partner agencies. Without a consistent intake and routing flow, great referrals get delayed or lost.",
  whyPoints: [
    "Referrals arrive without clear role, seniority, or location context.",
    "Teams cannot see which partners consistently deliver placements.",
    "Partner updates are ad hoc, so relationships cool over time.",
  ],
  outcomesTitle: "What a premium recruiting referral program delivers",
  outcomes: [
    "Intake that captures the right details for roles and desks.",
    "Routing rules that keep response times fast.",
    "Placement attribution tied to fees and partner sources.",
    "Partner updates that keep the referral flywheel moving.",
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
      description: "Deliver partner outreach assets and referral instructions.",
    },
    {
      step: "04",
      title: "Launch + reporting",
      description: "Deliver dashboards for referral, placement, and revenue reporting.",
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
