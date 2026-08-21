import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { fullenrichConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.fullenrich);

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: fullenrichConfig.faqs.map((faq) => ({
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
    { "@type": "ListItem", position: 2, name: "Best AI Sales Tools 2026", item: `${SITE_URL}/best-ai-sales-tools` },
    { "@type": "ListItem", position: 3, name: "FullEnrich Review", item: `${SITE_URL}/fullenrich` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.fullenrich.title,
  description: seoConfig.fullenrich.description,
  url: seoConfig.fullenrich.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-07",
  dateModified: "2026-07-07",
  about: [
    { "@type": "Thing", name: "FullEnrich contact enrichment" },
    { "@type": "Thing", name: "waterfall enrichment" },
    { "@type": "Thing", name: "B2B data enrichment tool" },
    { "@type": "Thing", name: "email and phone number finder" },
    { "@type": "Thing", name: "FullEnrich pricing" },
    { "@type": "Thing", name: "sales prospecting data" },
  ],
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FullEnrich",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Waterfall B2B contact enrichment tool that queries 15 or more data sources in sequence to find verified emails and mobile phone numbers. Handles bulk enrichment from CSV or CRM and integrates with HubSpot, Clay, Zapier and LinkedIn.",
  offers: {
    "@type": "Offer",
    price: "29",
    priceCurrency: "USD",
    description: "Credit-based pricing with a free 50-credit trial; paid plans from $29/month.",
    availability: "https://schema.org/InStock",
  },
  url: "https://fullenrich.com",
  sameAs: ["https://fullenrich.com"],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FullEnrichPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={fullenrichConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare AI sales tools</p>
          <Link
            href="/best-ai-sales-tools"
            className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors"
          >
            See how FullEnrich fits alongside Reply.io and AiSDR in the 2026 AI sales tools roundup &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
