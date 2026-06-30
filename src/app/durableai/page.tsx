import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { durableAiConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.durableAi);

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: durableAiConfig.faqs.map((faq) => ({
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
    { "@type": "ListItem", position: 3, name: "Durable AI Review 2026", item: `${SITE_URL}/durableai` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.durableAi.title,
  description: seoConfig.durableAi.description,
  url: seoConfig.durableAi.url,
  inLanguage: "en-AU",
  datePublished: "2026-01-01",
  dateModified: "2026-03-16",
  about: [
    { "@type": "Thing", name: "Durable AI website builder" },
    { "@type": "Thing", name: "AI website generator free" },
    { "@type": "Thing", name: "AI website builder for small business 2026" },
    { "@type": "Thing", name: "Durable AI vs Wix" },
    { "@type": "Thing", name: "Durable AI vs Butternut AI" },
    { "@type": "Thing", name: "website builder with CRM" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Durable AI",
  applicationCategory: "WebApplication",
  operatingSystem: "Web",
  description:
    "AI-powered website builder for small businesses. Generates a complete professional website in 30 seconds, with built-in CRM, invoicing, and AI content tools. Free to generate with no account required.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free AI website generation with no account required. Paid plans required to publish with a custom domain.",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "1260",
  },
  url: "https://durable.co",
  sameAs: ["https://durable.co"],
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@type": "SoftwareApplication",
    name: "Durable AI",
    url: "https://durable.co",
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
    "Durable AI is the best AI website builder for local service businesses. It generates a full website in 30 seconds with no account required, and bundles CRM and invoicing tools alongside the site. Best for tradies, coaches, consultants, and small service teams who want an all-in-one platform without multiple subscriptions.",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DurableAiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <PremiumAffiliateLanding config={durableAiConfig} />
      <div className="bg-[#060f15] border-t border-white/[0.06] py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-white/25 text-xs mb-1.5">Compare website builders</p>
          <Link
            href="/best-website-builder"
            className="text-sm font-medium hover:opacity-75 transition-opacity"
            style={{ color: "#22C0CD" }}
          >
            See how Durable AI compares to Carrd, Butternut AI, and Swipe Pages — 2026 comparison &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
