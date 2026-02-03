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
      locale: "en_US",
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

    // Verification tags (add your actual verification codes)
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      // yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      // bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
    },

    // App-specific metadata
    applicationName: SITE_NAME,

    // Referrer policy
    referrer: "origin-when-cross-origin",

    // Category
    category: "Technology",

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
    title: "Refer Labs - Affiliates that compound",
    description:
      "Turn partners, clients, creators, and advisors into your most powerful growth engine with automated affiliate tracking, rewards, and partner management. Affiliate software for modern businesses.",
    url: SITE_URL,
    keywords: [
      "affiliate software",
      "affiliate program",
      "customer affiliates",
      "ambassador program",
      "affiliate marketing",
      "word of mouth marketing",
      "customer acquisition",
      "affiliate tracking",
      "affiliate rewards",
      "growth marketing",
    ],
  },

  pricing: {
    title: "Pricing - Simple, transparent affiliate software",
    description:
      "Choose the perfect plan for your affiliate program. From $399/month with all features included. No hidden fees, cancel anytime. Start growing through affiliates today.",
    url: `${SITE_URL}/pricing`,
    keywords: [
      "affiliate software pricing",
      "affiliate program cost",
      "ambassador software pricing",
      "affiliate marketing pricing",
      "affordable affiliate platform",
    ],
  },

  howItWorks: {
    title: "How It Works - Turn your network into a affiliate channel",
    description:
      "See how Refer Labs transforms partners, clients, creators, and advisors into a powerful affiliate engine. Upload contacts, generate unique links, track rewards, and watch your growth compound.",
    url: `${SITE_URL}/how-it-works`,
    keywords: [
      "affiliate program process",
      "how affiliate marketing works",
      "customer affiliate system",
      "affiliate tracking",
      "ambassador marketing",
    ],
  },

  affiliatePartnerships: {
    title: "Affiliate Partnerships - Partner-driven growth infrastructure",
    description:
      "Activate LinkedIn influencers, creators, advisors, consultants, and strategic partners as fully tracked affiliate channels. Refer Labs facilitates structure, attribution, compliance guardrails, and ROI measurement (not a marketplace).",
    url: `${SITE_URL}/affiliate-partnerships`,
    keywords: [
      "affiliate partnerships",
      "partner marketing",
      "creator partnerships",
      "linkedin influencer partnerships",
      "advisor affiliates",
      "consultant affiliate program",
      "attribution tracking",
      "measure affiliate roi",
      "performance-based partnerships",
    ],
  },

  caseStudies: {
    title: "Case Studies - Real results from affiliate programs",
    description:
      "See how businesses use Refer Labs to drive growth through customer affiliates. Real case studies, metrics, and strategies from successful affiliate programs.",
    url: `${SITE_URL}/case-studies`,
    keywords: [
      "affiliate program case studies",
      "affiliate marketing results",
      "customer affiliate success stories",
      "affiliate ROI",
      "affiliate program examples",
    ],
  },

  about: {
    title: "About - Helping businesses grow through affiliates",
    description:
      "Learn about Refer Labs and our mission to make affiliate marketing accessible, automated, and effective for businesses of all sizes.",
    url: `${SITE_URL}/about`,
    keywords: [
      "about refer labs",
      "affiliate software company",
      "affiliate marketing platform",
    ],
  },

  contact: {
    title: "Contact Us - Get help with your affiliate program",
    description:
      "Have questions about Refer Labs? Get in touch with our team for support, sales inquiries, or partnership opportunities. We're here to help.",
    url: `${SITE_URL}/contact`,
    keywords: [
      "contact refer labs",
      "affiliate software support",
      "sales inquiry",
      "customer support",
    ],
  },

  faq: {
    title: "FAQ - Common questions about affiliate programs",
    description:
      "Find answers to frequently asked questions about Refer Labs, affiliate programs, pricing, integrations, and getting started.",
    url: `${SITE_URL}/faq`,
    keywords: [
      "affiliate program faq",
      "affiliate software questions",
      "affiliate marketing help",
      "refer labs support",
    ],
  },

  roiCalculator: {
    title: "ROI Calculator - Calculate your affiliate program returns",
    description:
      "Estimate the potential ROI of your affiliate program. See how much revenue you could generate by turning your network into affiliate partners.",
    url: `${SITE_URL}/roi-calculator`,
    keywords: [
      "affiliate program ROI",
      "affiliate calculator",
      "affiliate program calculator",
      "marketing ROI calculator",
      "customer lifetime value",
    ],
  },

  security: {
    title: "Security - Enterprise-grade data protection",
    description:
      "Learn about our security practices, data protection, GDPR compliance, and how we keep your customer data safe and private.",
    url: `${SITE_URL}/security`,
    keywords: [
      "affiliate software security",
      "data protection",
      "GDPR compliance",
      "SOC 2",
      "enterprise security",
    ],
  },

  privacy: {
    title: "Privacy Policy - How we protect your data",
    description:
      "Read our privacy policy to understand how Refer Labs collects, uses, and protects your personal information and customer data.",
    url: `${SITE_URL}/privacy`,
    keywords: ["privacy policy", "data privacy", "GDPR", "data protection"],
  },

  terms: {
    title: "Terms of Service - Legal terms and conditions",
    description:
      "Read the terms of service for using Refer Labs, including user rights, responsibilities, and legal agreements.",
    url: `${SITE_URL}/terms`,
    keywords: ["terms of service", "legal terms", "user agreement"],
  },

  leadHacking: {
    title: "Lead Hacking - Source & Activate Affiliate Partnerships",
    description:
      "Refer Labs designs affiliate programs and runs Lead Hacking to source, qualify, and activate partners—LinkedIn influencers, agencies, and advisors—with clear attribution.",
    url: `${SITE_URL}/lead-hacking`,
    keywords: [
      "affiliate partnerships",
      "partner sourcing",
      "lead hacking",
      "LinkedIn influencers",
      "agency partnerships",
      "consultant affiliates",
      "affiliate program",
      "partner marketing",
      "warm introductions",
      "attribution tracking",
    ],
  },

  partnerProgram: {
    title: "Partner Program - Become a Refer Labs partner",
    description:
      "Join the Refer Labs partner program and earn recurring revenue by referring businesses to our affiliate marketing platform.",
    url: `${SITE_URL}/our-affiliate-program`,
    keywords: [
      "partner program",
      "affiliate program",
      "affiliate partnership",
      "earn commission",
      "recurring revenue",
    ],
  },
  linkedinInfluencer: {
    title: "LinkedIn Influencer Marketplace - Performance-Based B2B Creator Partnerships",
    description:
      "Connect verified LinkedIn creators with SaaS & e-commerce brands. Drive qualified demos and revenue through performance-based affiliate partnerships. No SDRs, no ads - just authentic, trusted distribution.",
    keywords: [
      "LinkedIn influencer marketplace",
      "B2B creator partnerships",
      "performance marketing",
      "LinkedIn creator network",
      "SaaS influencer marketing",
      "B2B demand generation",
      "creator affiliate program",
      "LinkedIn lead generation",
      "performance-based partnerships",
      "influencer affiliate program",
      "LinkedIn B2B marketing",
      "creator economy",
    ],
    url: `${SITE_URL}/linkedin-growth`,
    image: `${SITE_URL}/og-linkedin-influencer.png`,
  },
  linkedinInfluencerCreator: {
    title: "Join as LinkedIn Creator - Earn 25% Recurring Revenue | Refer Labs",
    description:
      "Monetize your LinkedIn audience with performance-based partnerships. Earn 25% recurring revenue by promoting SaaS & e-commerce products you trust. Apply to join our curated creator marketplace.",
    keywords: [
      "LinkedIn creator monetization",
      "influencer revenue share",
      "LinkedIn affiliate program",
      "creator partnership program",
      "LinkedIn influencer income",
      "performance-based creator deals",
      "LinkedIn content monetization",
      "B2B influencer program",
      "recurring creator revenue",
      "LinkedIn ambassador program",
      "creator marketplace",
    ],
    url: `${SITE_URL}/linkedin-growth/influencer`,
    image: `${SITE_URL}/og-linkedin-creator.png`,
  },
  linkedinInfluencerBusiness: {
    title: "Partner with LinkedIn Creators - Replace SDRs with Trusted Distribution",
    description:
      "Scale your SaaS or e-commerce business with LinkedIn creator partnerships. Pay only for demos, sign-ups, and revenue. Get warm leads from engaged audiences - no cold outreach required.",
    keywords: [
      "LinkedIn influencer marketing",
      "B2B creator partnerships",
      "SaaS growth strategy",
      "performance marketing",
      "LinkedIn lead generation",
      "creator marketing platform",
      "B2B demand generation",
      "influencer partnership program",
      "LinkedIn advertising alternative",
      "warm lead generation",
      "SaaS customer acquisition",
    ],
    url: `${SITE_URL}/linkedin-growth/business`,
    image: `${SITE_URL}/og-linkedin-business.png`,
  },

  financialAdvisorsService: {
    title: "Affiliate Program for Financial Advisors & Planners",
    description:
      "Build a compliant affiliate program for financial advisors and planners. Track partners, manage intake, and report on revenue impact.",
    url: `${SITE_URL}/services/financial-advisors`,
    keywords: [
      "financial advisor affiliates",
      "wealth management affiliates",
      "advisor partner program",
      "fiduciary affiliate tracking",
      "affiliate compliance",
    ],
  },
  accountantsService: {
    title: "Affiliate Program for Accountants & Tax Professionals",
    description:
      "Create a affiliate system for accounting firms with partner tracking, compliant intake, and revenue attribution.",
    url: `${SITE_URL}/services/accountants`,
    keywords: [
      "accountant affiliates",
      "tax professional affiliates",
      "accounting partner program",
      "affiliate tracking",
      "affiliate attribution",
    ],
  },
  consultantsCoachesService: {
    title: "Affiliate Program for Consultants & Coaches",
    description:
      "Launch a premium affiliate program for consultants and coaches with intake, partner updates, and conversion reporting.",
    url: `${SITE_URL}/services/consultants-coaches`,
    keywords: [
      "consulting affiliates",
      "coaching affiliates",
      "partner affiliates",
      "affiliate workflow",
      "affiliate reporting",
    ],
  },
  recruitersStaffingService: {
    title: "Affiliate Program for Recruiters & Staffing Firms",
    description:
      "Track affiliates from clients, candidates, and partners with placement attribution and revenue reporting.",
    url: `${SITE_URL}/services/recruiters-staffing`,
    keywords: [
      "recruiting affiliates",
      "staffing affiliates",
      "placement attribution",
      "affiliate intake",
      "recruiter partner program",
    ],
  },
  insuranceBrokersService: {
    title: "Affiliate Program for Insurance Brokers",
    description:
      "Build affiliate workflows for insurance brokers with policy attribution and partner reporting.",
    url: `${SITE_URL}/services/insurance-brokers`,
    keywords: [
      "insurance broker affiliates",
      "policy attribution",
      "broker partner program",
      "affiliate tracking",
      "renewal affiliates",
    ],
  },

  dashboard: {
    title: "Dashboard",
    description: "Manage your affiliate program, track performance, and reward affiliate partners.",
    url: `${SITE_URL}/dashboard`,
    noIndex: true, // Private pages should not be indexed
  },

  login: {
    title: "Login - Access your affiliate dashboard",
    description: "Log in to your Refer Labs account to manage your affiliate program and track growth.",
    url: `${SITE_URL}/login`,
    noIndex: true,
  },
};
