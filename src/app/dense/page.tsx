import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
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
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dense Hair Experts",
  url: "https://densehairexperts.com.au",
  description: "Australian hair care brand with science-backed formulations for hair density, thickness, and scalp health. Targeted at thinning hair and hair loss.",
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
      <PremiumAffiliateLanding config={denseConfig} />
    </>
  );
}
