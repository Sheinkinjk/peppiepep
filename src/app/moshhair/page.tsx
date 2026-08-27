import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import OfferSchema from "@/components/offers/OfferSchema";
import { moshHairConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.moshHair);

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: moshHairConfig.faqs.map((faq) => ({
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
    { "@type": "ListItem", position: 3, name: "Mosh Hair Loss Discount Code Australia", item: `${SITE_URL}/moshhair` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.moshHair.title,
  description: seoConfig.moshHair.description,
  url: seoConfig.moshHair.url,
  inLanguage: "en-AU",
  datePublished: "2026-01-01",
  dateModified: "2026-03-16",
  about: [
    { "@type": "Thing", name: "Mosh hair loss treatment Australia" },
    { "@type": "Thing", name: "Mosh discount code" },
    { "@type": "Thing", name: "Mosh promo code Australia" },
    { "@type": "Thing", name: "Mosh hair loss review" },
    { "@type": "Thing", name: "Australian telehealth hair loss" },
    { "@type": "Thing", name: "Mosh hair loss cost Australia" },
    { "@type": "Thing", name: "how much does Mosh cost" },
    { "@type": "Thing", name: "Mosh vs Dense Hair Experts" },
    { "@type": "Thing", name: "Mosh hair loss results" },
  ],
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mosh",
  url: "https://www.getmosh.com.au",
  description: "Australian telehealth platform for men's health, including clinically supervised hair loss treatment. Online consultation, practitioner review, and subscription delivery.",
  areaServed: { "@type": "Country", name: "Australia" },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MoshHairPage() {
  return (
    <>
      <OfferSchema code="REFERAL55" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <PremiumAffiliateLanding config={moshHairConfig} />
    </>
  );
}
