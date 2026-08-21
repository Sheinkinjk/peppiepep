import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
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
  isPartOf: { "@id": `${SITE_URL}/#website` },
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
  url: "https://www.butternut.ai",
  sameAs: ["https://www.butternut.ai"],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ButternutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={butternutConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare website builders</p>
          <Link
            href="/best-website-builder"
            className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors"
          >
            See how Butternut AI compares to Carrd, Durable AI, and Swipe Pages in the 2026 comparison &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
