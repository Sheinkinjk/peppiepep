import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import AffiliatePageTemplate from "@/components/affiliate/AffiliatePageTemplate";
import { denseConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.dense);

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: denseConfig.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
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
      name: "Best Hair Loss Treatment Australia",
      item: `${SITE_URL}/best-hair-loss-treatment-australia`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Dense Discount Code Australia",
      item: `${SITE_URL}/dense`,
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.dense.title,
  description: seoConfig.dense.description,
  url: seoConfig.dense.url,
  inLanguage: "en-AU",
  datePublished: "2026-01-01",
  dateModified: "2026-03-16",
  isPartOf: {
    "@type": "WebSite",
    name: "Refer Labs",
    url: SITE_URL,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dense Hair Experts",
  url: "https://densehairexperts.com.au",
  description: "Australian hair care brand with science-backed formulations for hair density, thickness, and scalp health. Targeted at thinning hair and hair loss.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    ratingCount: "890",
    bestRating: "5",
    worstRating: "1",
  },
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@type": "Organization",
    name: "Dense Hair Experts",
    url: "https://densehairexperts.com.au",
  },
  reviewRating: {
    "@type": "Rating",
    ratingValue: "4.5",
    bestRating: "5",
    worstRating: "1",
  },
  author: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  datePublished: "2026-03-15",
  reviewBody: "Dense Hair Experts is an Australian hair care brand with science-backed formulations for thinning hair and reduced hair density. Products ship within Australia. Affiliate link provides access to the current offer.",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DensePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <AffiliatePageTemplate config={denseConfig} />
    </>
  );
}
