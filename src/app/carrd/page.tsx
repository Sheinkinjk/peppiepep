import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import AffiliatePageTemplate from "@/components/affiliate/AffiliatePageTemplate";
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
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "1840",
  },
  url: "https://carrd.co",
  sameAs: ["https://carrd.co"],
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@type": "SoftwareApplication",
    name: "Carrd",
    url: "https://carrd.co",
  },
  reviewRating: {
    "@type": "Rating",
    ratingValue: "4.7",
    bestRating: "5",
    worstRating: "1",
  },
  author: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  datePublished: "2026-03-11",
  reviewBody:
    "Carrd is the simplest and cheapest way to publish a single-page website. The permanent free plan and Pro pricing from $9/year make it unbeatable for portfolios, link-in-bio pages, and landing pages. Its main limitation is single-page only — no multi-page, blog, or e-commerce support.",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CarrdPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <AffiliatePageTemplate config={carrdConfig} />
      <div className="bg-[#060f15] border-t border-white/[0.06] py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-white/25 text-xs mb-1.5">Compare website builders</p>
          <Link
            href="/best-website-builder"
            className="text-sm font-medium hover:opacity-75 transition-opacity"
            style={{ color: "#22C0CD" }}
          >
            See how Carrd compares to Durable AI, Butternut AI, and Swipe Pages — 2026 comparison &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
