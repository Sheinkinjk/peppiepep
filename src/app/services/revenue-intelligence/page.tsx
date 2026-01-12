import { BarChart3, Gauge, Sparkles, TrendingUp } from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.revenueIntelligenceService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const content = {
  heroKicker: "Revenue Intelligence",
  heroTitle: "Turn referral activity into",
  heroHighlight: "board-ready revenue insights.",
  heroSummary:
    "We build executive dashboards, partner performance reporting, and optimization insights so leadership can scale the referral channel with confidence.",
  heroBullets: [
    "Real-time referral revenue and pipeline dashboards",
    "Partner performance scoring and tiering insights",
    "Conversion and velocity reporting for leadership",
    "Quarterly optimization recommendations",
  ],
  primaryCta: { label: "Schedule a revenue insights call", href: calendlyUrl },
  secondaryCta: { label: "Explore the dashboard scope", href: "#schedule" },
  stats: [
    { value: "360-degree view", label: "Referral pipeline" },
    { value: "Monthly", label: "Performance reviews" },
    { value: "Executive-ready", label: "Reporting pack" },
  ],
  engagement: {
    title: "Referral revenue intelligence",
    description:
      "A focused engagement that upgrades your reporting, analytics, and partner scoring so leadership can scale referrals with data.",
    items: [
      "Revenue attribution dashboards",
      "Partner scoring and tiering insights",
      "Pipeline velocity and conversion reporting",
      "Executive summaries for leadership",
    ],
  },
  audience: [
    {
      title: "Leadership teams",
      description: "Need a board-ready view of referral revenue and partner performance.",
    },
    {
      title: "Revenue operations",
      description: "Want attribution and conversion insights to optimize referral channels.",
    },
    {
      title: "Partner managers",
      description: "Need clear metrics to prioritize partner time and incentives.",
    },
    {
      title: "Finance teams",
      description: "Require clean reporting tied to pipeline and closed revenue.",
    },
  ],
  outcomes: [
    {
      title: "Executive dashboards",
      description: "Live reporting on referral volume, conversion, and revenue contribution.",
    },
    {
      title: "Partner scorecards",
      description: "Clear ranking of partners based on quality, velocity, and revenue impact.",
    },
    {
      title: "Optimization cadence",
      description: "Monthly insights and recommendations to improve referral ROI.",
    },
  ],
  pillars: [
    {
      title: "Revenue attribution",
      description: "Connect referrals to revenue, pipeline, and retention metrics.",
      icon: BarChart3,
    },
    {
      title: "Partner performance",
      description: "Score partners based on conversion, volume, and strategic fit.",
      icon: TrendingUp,
    },
    {
      title: "Velocity insights",
      description: "Measure time-to-convert and identify bottlenecks.",
      icon: Gauge,
    },
    {
      title: "Optimization playbooks",
      description: "Translate data into actionable improvements for partner teams.",
      icon: Sparkles,
    },
  ],
  process: [
    {
      step: "01",
      title: "Reporting audit",
      description: "Assess your current referral data and reporting gaps.",
      deliverable: "Data map",
    },
    {
      step: "02",
      title: "Dashboard buildout",
      description: "Configure executive dashboards and partner scorecards.",
      deliverable: "Insight suite",
    },
    {
      step: "03",
      title: "Performance analysis",
      description: "Identify top partners, weak points, and growth leverage.",
      deliverable: "Performance report",
    },
    {
      step: "04",
      title: "Optimization cadence",
      description: "Deliver a recurring improvement plan with clear priorities.",
      deliverable: "Growth roadmap",
    },
  ],
  deliverables: [
    {
      title: "Analytics dashboards",
      items: [
        "Referral revenue overview",
        "Partner scorecards and ranking",
        "Conversion and velocity reporting",
        "Executive summary dashboard",
      ],
    },
    {
      title: "Optimization insights",
      items: [
        "Monthly performance review",
        "Partner tier recommendations",
        "Growth experiment backlog",
        "Quarterly executive report",
      ],
    },
  ],
  testimonials: [
    {
      quote:
        "The revenue dashboards changed the way we manage partner relationships. We can finally show the board where referrals are driving revenue.",
      name: "Managing Partner, Strategy Firm",
      role: "Executive Leadership",
    },
    {
      quote:
        "We stopped guessing which partners mattered most. The scorecards and velocity reporting gave our team immediate focus.",
      name: "Revenue Operations Lead, Advisory Group",
      role: "Revenue Operations",
    },
  ],
  faqs: [
    {
      question: "Do you integrate with our CRM data?",
      answer: "Yes. We connect referral activity to your CRM pipeline and closed revenue data.",
    },
    {
      question: "Can leadership access the dashboards directly?",
      answer: "Yes. We provide secure dashboards tailored for executives and partner leads.",
    },
    {
      question: "How often do you review performance?",
      answer: "We typically run monthly reviews with quarterly executive summaries.",
    },
  ],
  cta: {
    title: "Give leadership clarity on referral revenue.",
    description: "Schedule a call to build your referral intelligence suite.",
    note: "Executive-level reporting",
  },
};

export default function RevenueIntelligenceServicePage() {
  return <ServiceLandingPage accent="sapphire" content={content} />;
}
