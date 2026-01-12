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
    ],
  },
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
  ],
  deliverables: [
    {
      title: "Analytics dashboards",
      items: [
        "Referral revenue overview",
        "Partner scorecards and ranking",
        "Conversion and velocity reporting",
      ],
    },
    {
      title: "Optimization insights",
      items: [
        "Monthly performance review",
        "Partner tier recommendations",
        "Quarterly executive report",
      ],
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
