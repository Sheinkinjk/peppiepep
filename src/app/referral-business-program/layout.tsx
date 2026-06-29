import type { Metadata } from "next";

const SITE_URL = "https://referlabs.com.au";
const PAGE_URL = `${SITE_URL}/referral-business-program`;

export const metadata: Metadata = {
  title: "Affiliate Marketing Business Blueprint — 250+ Programs, Strategy & SEO Plan | Refer Labs",
  description:
    "Start an affiliate marketing business with a curated database of 250+ programs, a personalised niche strategy, 10+ SEO page ideas, distribution playbooks, and a recommended tool stack. $799 one-time. Delivered in 48 hours.",
  keywords: [
    "affiliate marketing business",
    "how to start affiliate marketing business",
    "affiliate marketing blueprint",
    "affiliate programs database 2026",
    "best affiliate programs to promote",
    "affiliate marketing for beginners",
    "affiliate marketing strategy",
    "how to make money with affiliate marketing",
    "referral marketing business",
    "build affiliate website",
    "affiliate income strategy",
    "affiliate marketing niche selection",
    "affiliate marketing side hustle",
    "passive income affiliate marketing",
    "affiliate marketing australia",
    "high commission affiliate programs",
    "SaaS affiliate programs",
    "AI tools affiliate programs",
    "health affiliate programs australia",
  ].join(", "),
  openGraph: {
    title: "Affiliate Marketing Business Blueprint — 250+ Programs + Strategy | Refer Labs",
    description:
      "250+ curated affiliate programs, personalised niche strategy, 10+ SEO page concepts, distribution playbooks, and a recommended tool stack. $799 one-time. Delivered in 48 hours.",
    url: PAGE_URL,
    siteName: "Refer Labs",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Referral Growth Blueprint by Refer Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Affiliate Marketing Business Blueprint | Refer Labs",
    description:
      "250+ affiliate programs, personalised strategy, SEO page ideas, distribution playbooks. $799 one-time.",
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
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
  authors: [{ name: "Refer Labs" }],
  creator: "Refer Labs",
  publisher: "Refer Labs",
  category: "Business",
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Referral Growth Blueprint",
  description:
    "A curated database of 250+ affiliate and referral programs, a personalised niche strategy, 10+ SEO page ideas, distribution playbooks for email, SEO, and online communities, and a recommended tool stack — delivered as an Excel database plus written strategy brief.",
  brand: {
    "@type": "Brand",
    name: "Refer Labs",
  },
  offers: {
    "@type": "Offer",
    price: "799.00",
    priceCurrency: "AUD",
    availability: "https://schema.org/InStock",
    url: PAGE_URL,
    seller: {
      "@type": "Organization",
      name: "Refer Labs",
      url: SITE_URL,
    },
    priceValidUntil: "2026-12-31",
  },
  category: "Business Services",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is included in the Referral Growth Blueprint?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The blueprint includes: (1) A structured Excel database of 250+ affiliate and referral programs categorised by industry, with commission structures and marketing angles per entry. (2) A personalised niche selection recommendation based on your intake form. (3) 10+ SEO page concepts with keyword targets. (4) Distribution playbooks for email, SEO, and comparison directories. (5) A recommended tool stack for building and automating your referral business. (6) A one-page personalised strategy brief written for your goals and niche.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need an existing website or audience to use this blueprint?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The blueprint is designed for people starting from scratch. It includes SEO page ideas you can build from zero, distribution strategies that do not require an existing following, and a recommended tool stack for setting up your first affiliate website. If you do have an existing site or audience, the niche selection and distribution playbooks will help you monetise them faster.",
      },
    },
    {
      "@type": "Question",
      name: "What affiliate program niches are covered in the database?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The database covers five main categories: (1) AI Tools — 20–40% recurring commissions from tools like Jasper, Durable AI, Synthesia, and others. (2) SaaS Platforms — 15–30% recurring from beehiiv, Webflow, Zapier, Airtable, and others. (3) Health Programs — $50–$150 per sale from telehealth and wellness programs including Moshy, Juniper, and Mosh Hair. (4) Startup Tools — 25–50% one-time from Carrd, Swipe Pages, Lemon Squeezy, and others. (5) Fintech Offers — $30–$200 per referral from Wise, Revolut, Stake, Pearler, and similar. Each category includes 40–60 individual programs.",
      },
    },
    {
      "@type": "Question",
      name: "How is the blueprint personalised to me specifically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Before purchasing, you complete an intake form that tells us your niche of interest, primary goal (affiliate revenue, SaaS referrals, health offers, etc.), preferred marketing channels, and experience level. We use these answers to write your personalised strategy brief, select your niche recommendations, and tailor the distribution playbooks to the channels you told us you want to use. Generic advice is replaced with specific direction for your situation.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from a free affiliate marketing guide online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Free guides explain how affiliate marketing works. This blueprint tells you which programs to promote, how to position them, which SEO pages to build, and how to distribute across channels — with your niche and goals already factored in. The database alone covers research that typically takes 3–6 months to compile. You are not learning concepts — you are getting a specific plan and a ready-to-use program list.",
      },
    },
    {
      "@type": "Question",
      name: "What happens after I submit the form and pay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After submitting the intake form you are redirected to a secure Stripe checkout to complete your $799 AUD one-time payment. Once payment is confirmed, your intake answers are reviewed and your personalised blueprint is assembled and delivered to your email inbox within 48 hours.",
      },
    },
    {
      "@type": "Question",
      name: "What affiliate programs pay the highest commissions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The highest-paying programs in the database fall into three groups: (1) Recurring SaaS commissions — typically 20–40% of the customer's monthly subscription, compounding over time. beehiiv, for example, pays 30% recurring. (2) Health and telehealth programs — flat fees of $50–$150 per new customer sign-up, often with high conversion rates from targeted SEO placements. (3) Fintech referral bonuses — typically $30–$200 per verified referral. The full database includes commission structures for every entry.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Refer Labs",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: `${SITE_URL}/services`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Referral Growth Blueprint",
      item: PAGE_URL,
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Affiliate Marketing Business Blueprint — 250+ Programs, Strategy & SEO Plan",
  description:
    "Start an affiliate marketing business with 250+ curated programs, personalised niche strategy, SEO page ideas, and distribution playbooks.",
  url: PAGE_URL,
  datePublished: "2026-03-16",
  dateModified: "2026-03-16",
  inLanguage: "en-AU",
  isPartOf: {
    "@type": "WebSite",
    name: "Refer Labs",
    url: SITE_URL,
  },
  breadcrumb: breadcrumbSchema,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {children}
    </>
  );
}
