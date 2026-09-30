import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import { beehiivConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.beehiiv);

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: beehiivConfig.faqs.map((faq) => ({
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
    { "@type": "ListItem", position: 2, name: "Best Newsletter Platform", item: `${SITE_URL}/best-newsletter-platform` },
    { "@type": "ListItem", position: 3, name: "beehiiv Review 2026", item: `${SITE_URL}/beehiiv` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.beehiiv.title,
  description: seoConfig.beehiiv.description,
  url: seoConfig.beehiiv.url,
  inLanguage: "en-AU",
  datePublished: "2026-01-01",
  dateModified: "2026-03-16",
  about: [
    { "@type": "Thing", name: "beehiiv newsletter platform 2026" },
    { "@type": "Thing", name: "beehiiv vs Substack 2026" },
    { "@type": "Thing", name: "newsletter monetization" },
    { "@type": "Thing", name: "beehiiv ad network" },
    { "@type": "Thing", name: "beehiiv free plan" },
    { "@type": "Thing", name: "best newsletter platform 2026" },
  ],
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "beehiiv",
  applicationCategory: "WebApplication",
  operatingSystem: "Web",
  description:
    "Newsletter platform built for growth. Free Launch plan up to 2,500 subscribers with unlimited sends; the ad network, referral program and paid subscriptions come with the paid Scale and Max plans.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free Launch plan up to 2,500 subscribers, no card (beehiiv.com/pricing, read 30 September 2026).",
    availability: "https://schema.org/InStock",
  },
  url: "https://www.beehiiv.com",
  sameAs: ["https://www.beehiiv.com"],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BeehiivPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={beehiivConfig} />
    </>
  );
}
