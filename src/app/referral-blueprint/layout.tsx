import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata(seoConfig.referralBlueprint);

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Referral Growth Blueprint",
  description:
    "250+ curated affiliate and referral programs in a structured Excel database, a personalised strategy brief written for your goals, 10+ SEO page concepts, distribution playbooks per channel, a niche selection brief (3-5 matches), and a recommended tool stack. Delivered within 48 hours.",
  image: [
    `${SITE_URL}/og-image.png`,
  ],
  url: `${SITE_URL}/referral-blueprint`,
  brand: { "@type": "Brand", name: "Refer Labs" },
  category: "Digital Products > Business > Affiliate Marketing",
  offers: {
    "@type": "Offer",
    priceCurrency: "AUD",
    price: "799.00",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/referral-blueprint`,
    priceValidUntil: "2027-01-01",
    seller: {
      "@type": "Organization",
      name: "Refer Labs",
      url: SITE_URL,
    },
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "0",
        currency: "AUD",
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "AU",
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: 0,
          maxValue: 2,
          unitCode: "DAY",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: 0,
          maxValue: 0,
          unitCode: "DAY",
        },
        businessDays: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "https://schema.org/Monday",
            "https://schema.org/Tuesday",
            "https://schema.org/Wednesday",
            "https://schema.org/Thursday",
            "https://schema.org/Friday",
          ],
        },
      },
    },
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "AU",
      returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
      merchantReturnDays: 0,
    },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Referral Growth Blueprint", item: `${SITE_URL}/referral-blueprint` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is in the Referral Growth Blueprint?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Six deliverables: a 250+ affiliate and referral program Excel database, a personalised strategy brief written by Jarred Krowitz, 10+ SEO page concepts matched to your niche, distribution playbooks for your stated channels, a niche selection brief (3-5 matches), and a recommended tool stack. All delivered to your inbox within 48 hours.",
      },
    },
    {
      "@type": "Question",
      name: "How much does the Referral Growth Blueprint cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Referral Growth Blueprint is a one-time payment of $799 AUD. There is no subscription, no recurring fee, and no upsell after purchase.",
      },
    },
    {
      "@type": "Question",
      name: "How is the Referral Growth Blueprint personalised?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Before checkout you complete a short intake form covering your niche, primary goal, preferred marketing channels, and experience level. Jarred reads your answers and uses them to write the strategy brief, select niche recommendations, and tailor the distribution playbooks to your stated channels.",
      },
    },
    {
      "@type": "Question",
      name: "How long does delivery take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All six deliverables are delivered to your inbox within 48 hours of payment. You receive a confirmation email immediately after purchase.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need experience in affiliate marketing to use this?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The blueprint is designed for all experience levels, from complete beginners to experienced affiliate marketers who want a researched starting database. The tool stack and strategy brief are adapted to your stated experience level.",
      },
    },
    {
      "@type": "Question",
      name: "What affiliate programs are included in the database?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The database covers 250+ programs across five categories: AI tools (Jasper, Durable AI, Synthesia, Midjourney), SaaS platforms (beehiiv, Notion, Webflow, Zapier, Airtable), health and wellness (Moshy, Juniper, Better Being), startup tools (Carrd, Gumroad, Lemon Squeezy), and fintech (Wise, Revolut, Stake, Pearler). Every entry includes the direct program link, commission structure, and a suggested marketing angle.",
      },
    },
    {
      "@type": "Question",
      name: "Is this relevant for affiliate marketing in Australia specifically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The health and fintech categories are heavily weighted toward Australian programs - Moshy, Juniper, Mosh Hair, Stake, Pearler, and Hatch are all included with AU-specific commission structures. The SEO page concepts are written with the Australian search landscape in mind. AI tools, SaaS, and startup tools categories are global programs that work from any location.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best way to start affiliate marketing in Australia in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The highest-leverage starting point is picking one niche with genuine search demand and building 3-5 SEO-optimised review or comparison pages targeting programs with strong commissions. Health telehealth and SaaS recurring commissions are the two strongest categories in Australia right now. The Referral Growth Blueprint gives you the program database, niche selection brief, and SEO page concepts to execute this without months of upfront research.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the blueprint to build a comparison or deal directory site?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The database provides the program data (links, commissions, categories) and the SEO page concepts include comparison and directory page formats specifically. The niche selection brief flags which categories have the strongest search demand for comparison-style content.",
      },
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Referral Growth Blueprint - 250+ Affiliate Programs + Personalised Strategy | Refer Labs",
  description:
    "A structured Excel database of 250+ vetted affiliate and referral programs, a personalised strategy brief, SEO page concepts, distribution playbooks, and a niche selection brief. One-time $799 AUD. Delivered within 48 hours.",
  url: `${SITE_URL}/referral-blueprint`,
  inLanguage: "en-AU",
  datePublished: "2026-04-01",
  dateModified: "2026-04-26",
  about: [
    { "@type": "Thing", name: "affiliate marketing australia" },
    { "@type": "Thing", name: "affiliate program database" },
    { "@type": "Thing", name: "best affiliate programs australia 2026" },
    { "@type": "Thing", name: "how to start affiliate marketing australia" },
    { "@type": "Thing", name: "referral marketing strategy" },
    { "@type": "Thing", name: "affiliate income blueprint" },
    { "@type": "Thing", name: "passive income affiliate programs" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

export default function ReferralBlueprintLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      {children}
    </>
  );
}
