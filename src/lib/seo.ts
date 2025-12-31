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
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://referlabs.com.au";
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
    title: "Refer Labs - Referrals that compound",
    description:
      "Turn happy customers into your most powerful growth engine with automated referral tracking, rewards, and ambassador management. Referral software for modern businesses.",
    keywords: [
      "referral software",
      "referral program",
      "customer referrals",
      "ambassador program",
      "referral marketing",
      "word of mouth marketing",
      "customer acquisition",
      "referral tracking",
      "referral rewards",
      "growth marketing",
    ],
  },

  pricing: {
    title: "Pricing - Simple, transparent referral software",
    description:
      "Choose the perfect plan for your referral program. From $399/month with all features included. No hidden fees, cancel anytime. Start growing through referrals today.",
    keywords: [
      "referral software pricing",
      "referral program cost",
      "ambassador software pricing",
      "referral marketing pricing",
      "affordable referral platform",
    ],
  },

  howItWorks: {
    title: "How It Works - Turn customers into micro-influencers",
    description:
      "See how Refer Labs transforms your customer base into a powerful referral engine. Upload contacts, generate unique links, track rewards, and watch your growth compound.",
    keywords: [
      "referral program process",
      "how referral marketing works",
      "customer referral system",
      "referral tracking",
      "ambassador marketing",
    ],
  },

  caseStudies: {
    title: "Case Studies - Real results from referral programs",
    description:
      "See how businesses use Refer Labs to drive growth through customer referrals. Real case studies, metrics, and strategies from successful referral programs.",
    keywords: [
      "referral program case studies",
      "referral marketing results",
      "customer referral success stories",
      "referral ROI",
      "referral program examples",
    ],
  },

  about: {
    title: "About - Helping businesses grow through referrals",
    description:
      "Learn about Refer Labs and our mission to make referral marketing accessible, automated, and effective for businesses of all sizes.",
    keywords: [
      "about refer labs",
      "referral software company",
      "referral marketing platform",
    ],
  },

  contact: {
    title: "Contact Us - Get help with your referral program",
    description:
      "Have questions about Refer Labs? Get in touch with our team for support, sales inquiries, or partnership opportunities. We're here to help.",
    keywords: [
      "contact refer labs",
      "referral software support",
      "sales inquiry",
      "customer support",
    ],
  },

  faq: {
    title: "FAQ - Common questions about referral programs",
    description:
      "Find answers to frequently asked questions about Refer Labs, referral programs, pricing, integrations, and getting started.",
    keywords: [
      "referral program faq",
      "referral software questions",
      "referral marketing help",
      "refer labs support",
    ],
  },

  roiCalculator: {
    title: "ROI Calculator - Calculate your referral program returns",
    description:
      "Estimate the potential ROI of your referral program. See how much revenue you could generate by turning customers into brand ambassadors.",
    keywords: [
      "referral program ROI",
      "referral calculator",
      "referral program calculator",
      "marketing ROI calculator",
      "customer lifetime value",
    ],
  },

  security: {
    title: "Security - Enterprise-grade data protection",
    description:
      "Learn about our security practices, data protection, GDPR compliance, and how we keep your customer data safe and private.",
    keywords: [
      "referral software security",
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
    keywords: ["privacy policy", "data privacy", "GDPR", "data protection"],
  },

  terms: {
    title: "Terms of Service - Legal terms and conditions",
    description:
      "Read the terms of service for using Refer Labs, including user rights, responsibilities, and legal agreements.",
    keywords: ["terms of service", "legal terms", "user agreement"],
  },

  leadHacking: {
    title: "Lead Hacking - AI-powered lead generation tools",
    description:
      "Leverage AI to automate your lead generation and referral outreach. Create personalized campaigns that convert at scale.",
    keywords: [
      "lead generation",
      "AI lead generation",
      "lead hacking tools",
      "automated outreach",
      "sales automation",
    ],
  },

  partnerProgram: {
    title: "Partner Program - Become a Refer Labs partner",
    description:
      "Join the Refer Labs partner program and earn recurring revenue by referring businesses to our referral marketing platform.",
    keywords: [
      "partner program",
      "affiliate program",
      "referral partnership",
      "earn commission",
      "recurring revenue",
    ],
  },
  linkedinInfluencer: {
    title: "LinkedIn Influencer - Performance-based referral marketplace",
    description:
      "Connect trusted LinkedIn creators with SaaS and e-commerce companies to drive demos, sign-ups, and revenue without ads or SDRs.",
    keywords: [
      "LinkedIn influencers",
      "creator referrals",
      "performance marketing",
      "B2B creator partnerships",
      "SaaS growth",
      "e-commerce growth",
      "referral marketplace",
    ],
    url: `${SITE_URL}/linkedin-influencer`,
  },
  linkedinInfluencerCreator: {
    title: "Join LinkedIn Influencer - Creator Application",
    description:
      "Apply to join the LinkedIn Influencer marketplace. Drive demos and conversions with performance-based referral partnerships.",
    keywords: [
      "LinkedIn creator application",
      "influencer partnerships",
      "performance-based referrals",
      "creator revenue",
      "LinkedIn monetization",
    ],
    url: `${SITE_URL}/linkedin-influencer/influencer`,
  },
  linkedinInfluencerBusiness: {
    title: "Partner with LinkedIn Influencer - Business Application",
    description:
      "Partner with LinkedIn creators to drive demos, sign-ups, and revenue. Performance-based acquisition without ads or SDRs.",
    keywords: [
      "LinkedIn creator partnerships",
      "performance marketing",
      "B2B demand generation",
      "SaaS pipeline",
      "e-commerce growth",
    ],
    url: `${SITE_URL}/linkedin-influencer/business`,
  },

  dashboard: {
    title: "Dashboard",
    description: "Manage your referral program, track performance, and reward ambassadors.",
    noIndex: true, // Private pages should not be indexed
  },

  login: {
    title: "Login - Access your referral dashboard",
    description: "Log in to your Refer Labs account to manage your referral program and track growth.",
    noIndex: true,
  },
};
