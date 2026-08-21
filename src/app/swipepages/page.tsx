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
  isPartOf: { "@id": `${SITE_URL}/#website` },
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
  url: "https://swipepages.com",
  sameAs: ["https://swipepages.com"],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SwipePagesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={swipePagesConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare landing page and website builders</p>
          <Link
            href="/best-website-builder"
            className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors"
          >
            See how Swipe Pages compares to Carrd, Durable AI, and Butternut AI in the 2026 comparison &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
