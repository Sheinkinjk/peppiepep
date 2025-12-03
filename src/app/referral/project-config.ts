export type ReferralProjectConfig = {
  slug: string;
  name: string;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  gradient: string;
  accentGradient: string;
  badge?: string;
  stats: Array<{
    label: string;
    value: string;
    subtext: string;
  }>;
  perks: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  miniHighlights: Array<{
    title: string;
    copy: string;
  }>;
  autoRedirectMs?: number | null;
  ctaLabel: string;
  defaultReferralPath: string;
};

export const referralProjectConfigs: Record<string, ReferralProjectConfig> = {
  spa: {
    slug: "spa",
    name: "Glow Society",
    heroTagline: "Pepform Spa Capsule",
    heroTitle: "Concierge-only referral lounge",
    heroSubtitle:
      "Invite select guests into your private spa society. Track referrals, unlock VIP suites, and look like their personal plug.",
    gradient: "from-[#040717] via-[#0f172a] to-[#050b1a]",
    accentGradient: "from-rose-500 via-fuchsia-500 to-amber-400",
    badge: "Spa private beta",
    stats: [
      {
        label: "Average reward",
        value: "$220",
        subtext: "per fulfilled referral",
      },
      {
        label: "Guests upgraded",
        value: "32",
        subtext: "last 30 days",
      },
      {
        label: "Concierge SLA",
        value: "< 2h",
        subtext: "to confirm payouts",
      },
    ],
    perks: [
      "White-glove onboarding for you and your guests",
      "Real-time visibility into every booking, visit, and payout",
      "Concierge chat to manually log walk-ins or VIP overnights",
      "Quarterly luxury boxes + elevated spa suites",
    ],
    testimonial: {
      quote:
        "Every Glow Society guest feels like we rolled out a Tiffany-blue carpet just for them. Pepform keeps our staff and ambassadors totally in sync.",
      author: "Mara Ibarra",
      role: "Experiential Director, Maison du Spa",
    },
    miniHighlights: [
      {
        title: "Double-sided rewards",
        copy: "Friends receive luminous treatments while you earn matching credits and surprise upgrades.",
      },
      {
        title: "Luxury collateral",
        copy: "Branded emails, auto-personalized invite cards, and QR mirrors that feel custom built.",
      },
      {
        title: "Audit-ready tracking",
        copy: "Every click, visit, and redemption stamped with your ambassador code for compliance.",
      },
    ],
    autoRedirectMs: 7000,
    ctaLabel: "Unlock your private portal",
    defaultReferralPath: "/r/demo-referral",
  },
};

export function getReferralProjectConfig(slug?: string | null) {
  if (!slug) return null;
  return referralProjectConfigs[slug] ?? null;
}
