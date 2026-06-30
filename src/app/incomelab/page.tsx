import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import { incomeLabConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.incomeLab);

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: incomeLabConfig.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "AI Side Hustle Ideas 2026", item: `${SITE_URL}/incomelab` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.incomeLab.title,
  description: seoConfig.incomeLab.description,
  url: seoConfig.incomeLab.url,
  inLanguage: "en-AU",
  datePublished: "2026-01-01",
  dateModified: "2026-03-16",
  about: [
    { "@type": "Thing", name: "AI side hustle 2026" },
    { "@type": "Thing", name: "make money with AI 2026" },
    { "@type": "Thing", name: "AI passive income" },
    { "@type": "Thing", name: "AI business ideas 2026" },
    { "@type": "Thing", name: "automate income with AI" },
    { "@type": "Thing", name: "AI side hustle Reddit 2026" },
    { "@type": "Thing", name: "Income Lab review" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Income Lab",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  description:
    "Platform and community for building real income streams using AI tools, automation, and modern online business methods. Covers AI side hustle frameworks, tool selection, offer building, and income automation.",
  offers: {
    "@type": "Offer",
    description: "Access Income Lab via referral link.",
    availability: "https://schema.org/InStock",
  },
  url: "https://incomelab.me",
  sameAs: ["https://incomelab.me"],
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@type": "SoftwareApplication",
    name: "Income Lab",
    url: "https://incomelab.me",
  },
  reviewRating: {
    "@type": "Rating",
    ratingValue: "4.5",
    bestRating: "5",
    worstRating: "1",
  },
  author: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  datePublished: "2026-03-11",
  reviewBody:
    "Income Lab is a structured platform for people who want to build real income using AI tools in 2026. Unlike scattered YouTube tutorials or Reddit threads, it provides a framework-first approach covering which AI tools to use, how to build an offer, and how to automate income streams over time. Best for people who want a structured path from AI curiosity to AI-assisted earnings.",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IncomeLabPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <PremiumAffiliateLanding config={incomeLabConfig} />
    </>
  );
}
