import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { carrdConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.carrd);

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: carrdConfig.faqs.map((faq) => ({
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
    { "@type": "ListItem", position: 2, name: "Best Website Builder Comparison 2026", item: `${SITE_URL}/best-website-builder` },
    { "@type": "ListItem", position: 3, name: "Carrd Review 2026", item: `${SITE_URL}/carrd` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.carrd.title,
  description: seoConfig.carrd.description,
  url: seoConfig.carrd.url,
  inLanguage: "en-AU",
  datePublished: "2026-01-01",
  dateModified: "2026-03-16",
  about: [
    { "@type": "Thing", name: "Carrd website builder" },
    { "@type": "Thing", name: "one page website builder" },
    { "@type": "Thing", name: "Carrd vs Squarespace" },
    { "@type": "Thing", name: "Carrd pricing 2026" },
    { "@type": "Thing", name: "Carrd free plan" },
    { "@type": "Thing", name: "Carrd link in bio" },
  ],
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Carrd",
  applicationCategory: "WebApplication",
  operatingSystem: "Web",
  description:
    "Simple, affordable website builder for single-page sites. Free plan available permanently. Used by freelancers, indie hackers, and creators for portfolios, landing pages, and link-in-bio pages.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free plan available permanently. Pro plans from $9/year.",
    availability: "https://schema.org/InStock",
  },
  url: "https://carrd.co",
  sameAs: ["https://carrd.co"],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CarrdPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={carrdConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare website builders</p>
          <Link
            href="/best-website-builder"
            className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors"
          >
            See how Carrd compares to Durable AI, Butternut AI, and Swipe Pages in the 2026 comparison &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
