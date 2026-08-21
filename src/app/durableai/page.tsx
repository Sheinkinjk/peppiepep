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
  isPartOf: { "@id": `${SITE_URL}/#website` },
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
  url: "https://durable.co",
  sameAs: ["https://durable.co"],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DurableAiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={durableAiConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare website builders</p>
          <Link
            href="/best-website-builder"
            className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors"
          >
            See how Durable AI compares to Carrd, Butternut AI, and Swipe Pages in the 2026 comparison &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
