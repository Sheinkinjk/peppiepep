import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import MoshyLanding from "./MoshyLanding";
import { moshyConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.moshy);

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: moshyConfig.faqs.map((faq) => ({
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
    { "@type": "ListItem", position: 3, name: "Moshy Discount Code Australia", item: `${SITE_URL}/moshy` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.moshy.title,
  description: seoConfig.moshy.description,
  url: seoConfig.moshy.url,
  inLanguage: "en-AU",
  datePublished: "2026-01-01",
  dateModified: "2026-06-30",
  about: [
    { "@type": "Thing", name: "Moshy discount code Australia" },
    { "@type": "Thing", name: "Moshy weight loss Australia" },
    { "@type": "Thing", name: "Moshy promo code" },
    { "@type": "Thing", name: "Moshy referral link" },
    { "@type": "Thing", name: "Moshy review Australia" },
    { "@type": "Thing", name: "Australian weight loss telehealth" },
    { "@type": "Thing", name: "Moshy Reddit" },
    { "@type": "Thing", name: "Moshy semaglutide Australia" },
    { "@type": "Thing", name: "Moshy GLP-1 Australia" },
    { "@type": "Thing", name: "Moshy weight loss cost Australia" },
    { "@type": "Thing", name: "how much does Moshy cost" },
    { "@type": "Thing", name: "Moshy Ozempic Australia" },
    { "@type": "Thing", name: "Moshy vs Juniper 2026" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Moshy",
  url: "https://www.getmoshy.com.au",
  description: "Australian online telehealth platform offering clinically supervised weight management programmes. Online eligibility questionnaire, practitioner review, and subscription delivery to Australian residents.",
  areaServed: { "@type": "Country", name: "Australia" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.3",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "1870",
  },
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@type": "Organization",
    name: "Moshy",
    url: "https://www.getmoshy.com.au",
  },
  reviewRating: {
    "@type": "Rating",
    ratingValue: "4.3",
    bestRating: "5",
    worstRating: "1",
  },
  author: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  datePublished: "2026-03-11",
  reviewBody:
    "Moshy is an Australian telehealth platform for weight management, using an online eligibility process and practitioner-led consultation model. The platform is designed for Australians who want a structured, clinically supervised approach to weight loss without requiring an in-person GP appointment. Subscription-based with home delivery. Suitability depends on individual health assessment.",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MoshyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <MoshyLanding />
    </>
  );
}
