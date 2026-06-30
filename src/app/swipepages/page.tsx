import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { swipePagesConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.swipePages);

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: swipePagesConfig.faqs.map((faq) => ({
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
    { "@type": "ListItem", position: 3, name: "Swipe Pages Review 2026", item: `${SITE_URL}/swipepages` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.swipePages.title,
  description: seoConfig.swipePages.description,
  url: seoConfig.swipePages.url,
  inLanguage: "en-AU",
  datePublished: "2026-01-01",
  dateModified: "2026-03-16",
  about: [
    { "@type": "Thing", name: "Swipe Pages landing page builder" },
    { "@type": "Thing", name: "AMP landing pages 2026" },
    { "@type": "Thing", name: "Swipe Pages vs Unbounce" },
    { "@type": "Thing", name: "landing page builder for Google Ads 2026" },
    { "@type": "Thing", name: "conversion rate optimisation" },
    { "@type": "Thing", name: "Swipe Pages 14-day free trial" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Swipe Pages",
  applicationCategory: "WebApplication",
  operatingSystem: "Web",
  description:
    "Dedicated landing page builder for paid advertising campaigns. Builds AMP-powered mobile landing pages that load in under one second, with A/B testing, dynamic text replacement, and agency multi-workspace support. 14-day free trial, no credit card required.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "14-day free trial on all paid plans. No credit card required.",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "730",
  },
  url: "https://swipepages.com",
  sameAs: ["https://swipepages.com"],
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@type": "SoftwareApplication",
    name: "Swipe Pages",
    url: "https://swipepages.com",
  },
  reviewRating: {
    "@type": "Rating",
    ratingValue: "4.6",
    bestRating: "5",
    worstRating: "1",
  },
  author: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  datePublished: "2026-03-11",
  reviewBody:
    "Swipe Pages is the strongest landing page builder for paid ad campaigns in 2026. Its AMP technology produces mobile pages that load in under one second — a measurable conversion advantage when running Google Ads or Meta Ads. Includes A/B testing, dynamic text replacement, and agency workspaces. 14-day free trial with no credit card required. Not a general website builder — purpose-built for performance marketing teams.",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SwipePagesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <PremiumAffiliateLanding config={swipePagesConfig} />
      <div className="bg-[#060f15] border-t border-white/[0.06] py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-white/25 text-xs mb-1.5">Compare landing page and website builders</p>
          <Link
            href="/best-website-builder"
            className="text-sm font-medium hover:opacity-75 transition-opacity"
            style={{ color: "#22C0CD" }}
          >
            See how Swipe Pages compares to Carrd, Durable AI, and Butternut AI — 2026 comparison &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
