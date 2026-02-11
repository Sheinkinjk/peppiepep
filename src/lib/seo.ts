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
    title: "Refer Labs - Your Australian Sales & Partnerships Arm",
    description:
      "We help overseas companies enter Australia by sourcing customers, building strategic partnerships, and structuring distribution deals. Retainer + commission model.",
    url: SITE_URL,
    keywords: [
      "Australia GTM",
      "Australian sales rep",
      "market entry Australia",
      "partnerships arm Australia",
      "overseas expansion Australia",
      "Australian distribution partner",
      "partner distribution Australia",
      "B2B sales Australia",
      "Australia market entry",
      "local GTM Australia",
    ],
  },

  pricing: {
    title: "Pricing - Standard, Performance-Heavy & Enterprise Plans",
    description:
      "Choose the right engagement model for your Australia expansion. Retainer + commission pricing aligned to your growth stage. 90-day pilot structure.",
    url: `${SITE_URL}/pricing`,
    keywords: [
      "Australia sales rep pricing",
      "market entry pricing",
      "GTM services pricing",
      "Australia expansion cost",
      "partnership services pricing",
    ],
  },

  howItWorks: {
    title: "How It Works - Your 90-Day Australia Market Entry Pilot",
    description:
      "See how Refer Labs takes you from zero to Australian revenue. 90-day pilot with weekly reporting, partner sourcing, customer outreach, and closing support.",
    url: `${SITE_URL}/how-it-works`,
    keywords: [
      "Australia market entry process",
      "90 day pilot Australia",
      "how to enter Australian market",
      "Australia GTM process",
      "Australian sales process",
    ],
  },

  services: {
    title: "Services - Sales Representation, Partnerships & Distribution Deals",
    description:
      "Three core services: Sales Representation for client acquisition, Partnership Development for strategic alliances, and Distribution Deals for white-label and reseller agreements.",
    url: `${SITE_URL}/services`,
    keywords: [
      "Australia sales services",
      "Australian partnership services",
      "customer acquisition Australia",
      "distribution partnerships Australia",
      "channel partner management",
      "white-label distribution Australia",
    ],
  },

  whoItsFor: {
    title: "Who It's For - Overseas Companies Entering Australia",
    description:
      "Built for B2B SaaS, fintech, healthtech, creator economy, e-commerce tech, and professional services software companies expanding into Australia.",
    url: `${SITE_URL}/who-its-for`,
    keywords: [
      "SaaS Australia expansion",
      "fintech Australia market entry",
      "overseas companies Australia",
      "healthtech Australia expansion",
      "B2B market entry Australia",
    ],
  },

  caseStudies: {
    title: "Playbooks - Australia Market Entry Examples",
    description:
      "Example playbooks showing how we enter Australia for SaaS companies, build agency partner channels, and activate affiliate distribution.",
    url: `${SITE_URL}/case-studies`,
    keywords: [
      "Australia market entry examples",
      "SaaS expansion playbook",
      "partner channel playbook",
      "affiliate activation Australia",
    ],
  },

  about: {
    title: "About - Australian Sales & Partnerships for Overseas Companies",
    description:
      "Learn about Refer Labs and our mission to be the Australian sales and partnerships arm for overseas companies entering the market.",
    url: `${SITE_URL}/about`,
    keywords: [
      "about refer labs",
      "Australian GTM partner",
      "overseas expansion partner",
    ],
  },

  contact: {
    title: "Contact Us - Book a 15-min Australia Expansion Call",
    description:
      "Book a call to discuss your Australia market entry. Tell us about your company, what you sell, and your goals in Australia.",
    url: `${SITE_URL}/contact`,
    keywords: [
      "contact refer labs",
      "Australia expansion call",
      "market entry consultation",
      "Australian sales partner",
    ],
  },

  faq: {
    title: "FAQ - Australia Market Entry Questions Answered",
    description:
      "Find answers to common questions about our Australia GTM services, pricing, pilot structure, and how we help overseas companies enter the Australian market.",
    url: `${SITE_URL}/faq`,
    keywords: [
      "Australia market entry FAQ",
      "GTM services questions",
      "Australia expansion FAQ",
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

  // Legacy pages - kept for build compatibility
  roiCalculator: {
    title: "ROI Calculator",
    description: "Estimate the potential ROI of your partner program.",
    url: `${SITE_URL}/roi-calculator`,
  },

  leadHacking: {
    title: "Lead Hacking - Source & Activate Partnerships",
    description: "Source, qualify, and activate partners with clear attribution.",
    url: `${SITE_URL}/lead-hacking`,
  },

  partnerProgram: {
    title: "Partner Program - Become a Refer Labs partner",
    description: "Join the Refer Labs partner program and earn recurring revenue.",
    url: `${SITE_URL}/our-affiliate-program`,
  },

  linkedinInfluencer: {
    title: "LinkedIn Influencer - Performance-Based Creator Partnerships",
    description: "Connect LinkedIn creators with brands for performance-based partnerships.",
    url: `${SITE_URL}/linkedin-growth`,
  },

  linkedinInfluencerCreator: {
    title: "Join as LinkedIn Creator",
    description: "Monetize your LinkedIn audience with performance-based partnerships.",
    url: `${SITE_URL}/linkedin-growth/influencer`,
  },

  linkedinInfluencerBusiness: {
    title: "Partner with LinkedIn Creators",
    description: "Scale your business with LinkedIn creator partnerships.",
    url: `${SITE_URL}/linkedin-growth/business`,
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
