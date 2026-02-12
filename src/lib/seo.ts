import { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

const SITE_NAME = "Refer Labs";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://referlabs.com.au";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
const TWITTER_HANDLE = "@referlabs";

/**
 * Generate comprehensive metadata for SEO, Open Graph, and Twitter Cards
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = DEFAULT_IMAGE,
    url,
    type = "website",
    noIndex = false,
  } = config;

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = url || SITE_URL;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(", ") : undefined,

    // Robots
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },

    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_AU",
      type,
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
    },

    // Additional meta tags
    alternates: {
      canonical: canonicalUrl,
    },

    // Verification tags
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },

    // App-specific metadata
    applicationName: SITE_NAME,

    // Referrer policy
    referrer: "origin-when-cross-origin",

    // Category
    category: "Business Services",

    // Authors
    authors: [{ name: SITE_NAME }],

    // Creator
    creator: SITE_NAME,

    // Publisher
    publisher: SITE_NAME,

    // Format detection
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    // Icons
    icons: {
      icon: "/logo.svg",
      apple: "/logo.svg",
    },

    // Manifest
    manifest: "/manifest.json",
  };
}

/**
 * Pre-configured SEO configs for common pages
 */
export const seoConfig = {
  home: {
    title: "Refer Labs - Your APAC & EMEA Expansion Partner",
    description:
      "We help global B2B companies enter APAC and EMEA by outsourcing sales, partnerships, compliance, and operational setup. Retainer + commission model.",
    url: SITE_URL,
    keywords: [
      "APAC EMEA market entry",
      "in-region sales rep",
      "market entry services",
      "partnerships arm",
      "international expansion",
      "distribution partner",
      "B2B market entry",
      "outsourced sales team",
      "APAC GTM",
      "EMEA GTM",
    ],
  },

  pricing: {
    title: "Pricing - Market Entry Engagement Models",
    description:
      "Choose the right engagement model for your APAC or EMEA expansion. Retainer + commission pricing aligned to your growth stage. 90-day pilot structure.",
    url: `${SITE_URL}/pricing`,
    keywords: [
      "market entry pricing",
      "GTM services pricing",
      "expansion engagement cost",
      "partnership services pricing",
      "outsourced sales pricing",
    ],
  },

  howItWorks: {
    title: "How It Works - Your 90-Day Market Entry Pilot",
    description:
      "See how Refer Labs takes you from zero to in-market revenue. 90-day pilot with weekly reporting, partner sourcing, customer outreach, and closing support.",
    url: `${SITE_URL}/how-it-works`,
    keywords: [
      "market entry process",
      "90 day expansion pilot",
      "how to enter new markets",
      "GTM pilot process",
      "international sales process",
    ],
  },

  services: {
    title: "Services - Sales, Partnerships, Compliance, Operations & Team Building",
    description:
      "Five core services: Sales Representation, Partnership Development, Compliance & Market Setup, Operations Management, and Team Formation & Recruitment.",
    url: `${SITE_URL}/services`,
    keywords: [
      "outsourced sales services",
      "partnership development services",
      "market entry compliance",
      "distribution partnerships",
      "channel partner management",
      "in-region team recruitment",
    ],
  },

  whoItsFor: {
    title: "Who It's For - Global B2B Companies Entering New Markets",
    description:
      "Built for B2B SaaS, fintech, healthtech, creator economy, e-commerce tech, and professional services software companies expanding into APAC and EMEA.",
    url: `${SITE_URL}/who-its-for`,
    keywords: [
      "SaaS international expansion",
      "fintech market entry",
      "B2B APAC expansion",
      "healthtech EMEA expansion",
      "B2B market entry services",
    ],
  },

  caseStudies: {
    title: "Playbooks - Market Entry Examples",
    description:
      "Example playbooks showing how we enter new markets for B2B companies, build agency partner channels, and activate distribution channels.",
    url: `${SITE_URL}/case-studies`,
    keywords: [
      "market entry examples",
      "SaaS expansion playbook",
      "partner channel playbook",
      "distribution activation",
    ],
  },

  about: {
    title: "About - Your On-the-Ground Commercial Arm for APAC & EMEA",
    description:
      "Learn about Refer Labs and our mission to be the on-the-ground commercial arm for global B2B companies entering APAC and EMEA markets.",
    url: `${SITE_URL}/about`,
    keywords: [
      "about refer labs",
      "APAC EMEA GTM partner",
      "international expansion partner",
    ],
  },

  contact: {
    title: "Contact Us - Book a 15-min Market Expansion Call",
    description:
      "Book a call to discuss your market expansion. Tell us about your company, what you sell, and your goals in APAC or EMEA.",
    url: `${SITE_URL}/contact`,
    keywords: [
      "contact refer labs",
      "market expansion call",
      "market entry consultation",
      "APAC EMEA sales partner",
    ],
  },

  faq: {
    title: "FAQ - Market Entry Questions Answered",
    description:
      "Find answers to common questions about our APAC and EMEA market entry services, pricing, pilot structure, and how we help global B2B companies expand.",
    url: `${SITE_URL}/faq`,
    keywords: [
      "market entry FAQ",
      "GTM services questions",
      "APAC expansion FAQ",
      "partnership services FAQ",
    ],
  },

  security: {
    title: "Security - Enterprise-grade data protection",
    description:
      "Learn about our security practices, data protection, and how we keep your business data safe and private.",
    url: `${SITE_URL}/security`,
    keywords: [
      "data security",
      "data protection",
      "enterprise security",
    ],
  },

  privacy: {
    title: "Privacy Policy - How we protect your data",
    description:
      "Read our privacy policy to understand how Refer Labs collects, uses, and protects your personal information.",
    url: `${SITE_URL}/privacy`,
    keywords: ["privacy policy", "data privacy", "data protection"],
  },

  terms: {
    title: "Terms of Service - Legal terms and conditions",
    description:
      "Read the terms of service for using Refer Labs, including user rights, responsibilities, and legal agreements.",
    url: `${SITE_URL}/terms`,
    keywords: ["terms of service", "legal terms", "user agreement"],
  },

  // Secondary pages
  roiCalculator: {
    title: "Australia Expansion Estimator - ROI Calculator",
    description: "Estimate the ROI of entering Australia with Refer Labs. Model your 90-day pilot returns by industry, deal size, and engagement scope.",
    url: `${SITE_URL}/roi-calculator`,
    keywords: [
      "Australia expansion ROI",
      "market entry calculator",
      "Australia GTM ROI",
      "expansion cost estimator",
    ],
  },

  leadHacking: {
    title: "Partner Sourcing & Activation for Australia",
    description: "We systematically source, qualify, and activate Australian partners - agencies, LinkedIn creators, and advisors - to build your distribution channel.",
    url: `${SITE_URL}/lead-hacking`,
    keywords: [
      "Australia partner sourcing",
      "Australian agency partners",
      "partner activation Australia",
      "distribution partner sourcing",
    ],
  },

  partnerProgram: {
    title: "Partner Program - Become a Refer Labs partner",
    description: "Join the Refer Labs partner program and earn recurring revenue.",
    url: `${SITE_URL}/our-affiliate-program`,
  },

  linkedinInfluencer: {
    title: "LinkedIn Creator Partnerships for Australia Market Entry",
    description: "Partner with verified Australian LinkedIn creators to build credibility, generate leads, and accelerate your market entry. Full-service partnership management.",
    url: `${SITE_URL}/linkedin-growth`,
    keywords: [
      "LinkedIn creator partnerships Australia",
      "Australian LinkedIn influencers",
      "B2B creator marketing Australia",
      "LinkedIn market entry Australia",
    ],
  },

  linkedinInfluencerCreator: {
    title: "Join as an Australian LinkedIn Creator",
    description: "Help overseas companies enter Australia and earn performance-based commissions. Join our curated pool of Australian LinkedIn creators.",
    url: `${SITE_URL}/linkedin-growth/influencer`,
    keywords: [
      "LinkedIn creator program Australia",
      "Australian creator partnerships",
      "earn from LinkedIn Australia",
    ],
  },

  linkedinInfluencerBusiness: {
    title: "Launch Australian Creator Campaigns for Market Entry",
    description: "Launch performance-based LinkedIn creator campaigns to build awareness and generate leads in the Australian market.",
    url: `${SITE_URL}/linkedin-growth/business`,
    keywords: [
      "Australian creator campaigns",
      "LinkedIn marketing Australia",
      "creator partnerships market entry",
    ],
  },

  financialAdvisorsService: {
    title: "Services for Financial Advisors",
    description: "Partner programs for financial advisors and planners.",
    url: `${SITE_URL}/services/financial-advisors`,
  },

  accountantsService: {
    title: "Services for Accountants",
    description: "Partner programs for accounting firms.",
    url: `${SITE_URL}/services/accountants`,
  },

  consultantsCoachesService: {
    title: "Services for Consultants & Coaches",
    description: "Partner programs for consultants and coaches.",
    url: `${SITE_URL}/services/consultants-coaches`,
  },

  recruitersStaffingService: {
    title: "Services for Recruiters & Staffing",
    description: "Partner programs for recruiters and staffing firms.",
    url: `${SITE_URL}/services/recruiters-staffing`,
  },

  insuranceBrokersService: {
    title: "Services for Insurance Brokers",
    description: "Partner programs for insurance brokers.",
    url: `${SITE_URL}/services/insurance-brokers`,
  },

  referralPartnerships: {
    title: "Referral & Affiliate Partnerships - Build Your Australian Partner Channel",
    description:
      "We source, activate, and manage referral and affiliate partners across Australia. Agencies, consultants, creators, and strategic allies - all tracked and managed end-to-end.",
    url: `${SITE_URL}/referral-partnerships`,
    keywords: [
      "referral partnerships Australia",
      "affiliate channel Australia",
      "partner program management",
      "Australian referral partners",
      "distribution activation Australia",
    ],
  },

  affiliatePartnerships: {
    title: "Services - Sales Representation, Partnerships & Distribution Deals",
    description:
      "Three core services: Sales Representation, Partnership Development, and Distribution Deals for overseas companies entering Australia.",
    url: `${SITE_URL}/services`,
    keywords: [
      "Australia sales services",
      "Australian partnership services",
    ],
  },

  dashboard: {
    title: "Dashboard",
    description: "Manage your program, track performance, and view reporting.",
    url: `${SITE_URL}/dashboard`,
    noIndex: true,
  },

  login: {
    title: "Login - Access your dashboard",
    description: "Log in to your Refer Labs account to manage your program and track progress.",
    url: `${SITE_URL}/login`,
    noIndex: true,
  },
};
