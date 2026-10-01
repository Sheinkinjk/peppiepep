import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
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
    { "@type": "ListItem", position: 2, name: "Weight loss", item: `${SITE_URL}/weight-loss` },
    { "@type": "ListItem", position: 3, name: "Moshy discount code", item: `${SITE_URL}/moshy` },
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
  dateModified: "2026-10-01",
  about: [
    { "@type": "Thing", name: "Moshy discount code Australia" },
    { "@type": "Thing", name: "Moshy weight loss Australia" },
    { "@type": "Thing", name: "Moshy promo code" },
    { "@type": "Thing", name: "Moshy referral link" },
    { "@type": "Thing", name: "Moshy review Australia" },
    { "@type": "Thing", name: "Australian weight loss telehealth" },
    { "@type": "Thing", name: "Moshy Australia" },
  ],
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Moshy",
  url: "https://www.getmoshy.com.au",
  description: "Australian weight-management telehealth service and brother brand of Mosh. Online questionnaire, then a consultation with a registered practitioner by phone or video.",
  areaServed: { "@type": "Country", name: "Australia" },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MoshyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <MoshyLanding />
    </>
  );
}
