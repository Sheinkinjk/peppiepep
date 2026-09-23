import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import { iScreenConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.iScreen);

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: iScreenConfig.faqs.map((faq) => ({
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
    { "@type": "ListItem", position: 2, name: "Longevity", item: `${SITE_URL}/longevity` },
    { "@type": "ListItem", position: 3, name: "i-screen", item: `${SITE_URL}/i-screen` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.iScreen.title,
  description: seoConfig.iScreen.description,
  url: seoConfig.iScreen.url,
  inLanguage: "en-AU",
  datePublished: "2026-09-23",
  dateModified: "2026-09-23",
  about: [
    { "@type": "Thing", name: "i-screen Australia" },
    { "@type": "Thing", name: "i-screen discount code" },
    { "@type": "Thing", name: "private blood tests Australia" },
    { "@type": "Thing", name: "pathology without a GP referral" },
    { "@type": "Thing", name: "i-screen cost" },
    { "@type": "Thing", name: "Medicare rebate pathology" },
  ],
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
};

/*
 * Organization, not SoftwareApplication: i-screen is a pathology service, not
 * software, so the software rich-result recipe does not apply and no
 * aggregateRating is invented for it. See the note in CLAUDE.md about leaving
 * those errors alone rather than fabricating ratings.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "i-screen",
  url: "https://www.i-screen.com.au",
  areaServed: "AU",
  description:
    "Australian service selling private pathology and blood tests directly to the public, ordered online without a GP referral, with samples collected at affiliated collection centres and results delivered in an online dashboard.",
};

export default function IScreenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <PremiumAffiliateLanding config={iScreenConfig} />
    </>
  );
}
