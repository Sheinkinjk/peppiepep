import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import AffiliatePageTemplate from "@/components/affiliate/AffiliatePageTemplate";
import Link from "next/link";
import { butternutConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.butternut);

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: butternutConfig.faqs.map((faq) => ({
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
    { "@type": "ListItem", position: 3, name: "Butternut AI Review 2026", item: `${SITE_URL}/butternut` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.butternut.title,
  description: seoConfig.butternut.description,
  url: seoConfig.butternut.url,
  inLanguage: "en-AU",
  datePublished: "2026-01-01",
  dateModified: "2026-03-16",
  about: [
    { "@type": "Thing", name: "Butternut AI website builder" },
    { "@type": "Thing", name: "AI website generator free 2026" },
    { "@type": "Thing", name: "Butternut AI vs Durable AI" },
    { "@type": "Thing", name: "Butternut AI review 2026" },
    { "@type": "Thing", name: "AI website builder for small business" },
    { "@type": "Thing", name: "generate website free AI" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Butternut AI",
  applicationCategory: "WebApplication",
  operatingSystem: "Web",
  description:
    "AI-powered website builder that generates a complete multi-page website in 20 seconds from a text prompt. Free to generate with no account required. Includes SEO tools, blog publishing, and custom domain support on paid plans.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free AI website generation with no account required. Paid plans required to publish with a custom domain.",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "980",
  },
  url: "https://www.butternut.ai",
  sameAs: ["https://www.butternut.ai"],
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@type": "SoftwareApplication",
    name: "Butternut AI",
    url: "https://www.butternut.ai",
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
    "Butternut AI is the fastest AI website builder available in 2026. It generates a full multi-page website from a short text description in approximately 20 seconds, with high-quality copy and layout. Free to generate with no account required. Includes SEO tools and blog publishing — features Durable AI does not offer. Best for startups, SMBs, and personal brands wanting a polished website fast.",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ButternutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <AffiliatePageTemplate config={butternutConfig} />
      <div className="bg-[#060f15] border-t border-white/[0.06] py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-white/25 text-xs mb-1.5">Compare website builders</p>
          <Link
            href="/best-website-builder"
            className="text-sm font-medium hover:opacity-75 transition-opacity"
            style={{ color: "#22C0CD" }}
          >
            See how Butternut AI compares to Carrd, Durable AI, and Swipe Pages — 2026 comparison &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
