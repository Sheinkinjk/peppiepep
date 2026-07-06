import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { aisdrConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.aisdr);

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: aisdrConfig.faqs.map((faq) => ({
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
    { "@type": "ListItem", position: 3, name: "AiSDR Review", item: `${SITE_URL}/aisdr` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.aisdr.title,
  description: seoConfig.aisdr.description,
  url: seoConfig.aisdr.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-06",
  dateModified: "2026-07-06",
  about: [
    { "@type": "Thing", name: "AiSDR AI sales development rep" },
    { "@type": "Thing", name: "AI SDR tool" },
    { "@type": "Thing", name: "B2B outbound automation" },
    { "@type": "Thing", name: "AiSDR pricing" },
    { "@type": "Thing", name: "AI sales and automation tools" },
    { "@type": "Thing", name: "multi-channel sales sequences" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AiSDR",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI sales development rep that automates B2B outbound: finds in-market prospects via intent signals, researches each one, writes personalised messages, runs multi-channel sequences across email, LinkedIn and phone, qualifies replies and books meetings. Integrates with HubSpot and Salesforce.",
  offers: {
    "@type": "Offer",
    price: "900",
    priceCurrency: "USD",
    description: "Standard from around $900/month billed quarterly at the time of writing, with unlimited seats and no long-term contract. Verify current pricing on the provider.",
    availability: "https://schema.org/InStock",
  },
  url: "https://aisdr.com",
  sameAs: ["https://aisdr.com"],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AiSDRPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={aisdrConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare AI sales tools</p>
          <Link
            href="/best-ai-sales-tools"
            className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors"
          >
            See how AiSDR compares to GoHighLevel in the 2026 AI sales tools roundup &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
