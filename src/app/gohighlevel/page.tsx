import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { goHighLevelConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.goHighLevel);

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: goHighLevelConfig.faqs.map((faq) => ({
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
    { "@type": "ListItem", position: 3, name: "GoHighLevel Review 2026", item: `${SITE_URL}/gohighlevel` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.goHighLevel.title,
  description: seoConfig.goHighLevel.description,
  url: seoConfig.goHighLevel.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-06",
  dateModified: "2026-07-06",
  about: [
    { "@type": "Thing", name: "GoHighLevel all-in-one platform" },
    { "@type": "Thing", name: "GoHighLevel CRM" },
    { "@type": "Thing", name: "marketing automation software" },
    { "@type": "Thing", name: "GoHighLevel pricing 2026" },
    { "@type": "Thing", name: "GoHighLevel for agencies" },
    { "@type": "Thing", name: "AI sales and automation tools" },
  ],
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GoHighLevel",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI-powered all-in-one business platform combining CRM, marketing automation across email and SMS, sales pipelines, funnels and landing pages, reputation management and AI tools. Built for marketing agencies and SMBs.",
  offers: {
    "@type": "Offer",
    price: "97",
    priceCurrency: "USD",
    description: "Starter from $97/month; Unlimited from $297/month. 14-day free trial, no credit card.",
    availability: "https://schema.org/InStock",
  },
  url: "https://www.gohighlevel.com",
  sameAs: ["https://www.gohighlevel.com"],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GoHighLevelPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={goHighLevelConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare AI sales tools</p>
          <Link
            href="/best-ai-sales-tools"
            className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors"
          >
            See how GoHighLevel compares to AiSDR in the 2026 AI sales tools roundup &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
