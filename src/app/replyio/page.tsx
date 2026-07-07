import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { replyioConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.replyio);

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: replyioConfig.faqs.map((faq) => ({
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
    { "@type": "ListItem", position: 3, name: "Reply.io Review", item: `${SITE_URL}/replyio` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.replyio.title,
  description: seoConfig.replyio.description,
  url: seoConfig.replyio.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-07",
  dateModified: "2026-07-07",
  about: [
    { "@type": "Thing", name: "Reply.io sales engagement platform" },
    { "@type": "Thing", name: "multichannel sales outreach" },
    { "@type": "Thing", name: "AI SDR software" },
    { "@type": "Thing", name: "Reply.io pricing" },
    { "@type": "Thing", name: "AI sales and automation tools" },
    { "@type": "Thing", name: "email outreach automation" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Reply.io",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI-first sales engagement platform for multichannel outbound: builds and automates sequences across email, LinkedIn, calls and SMS, includes AI SDR agents that write and personalise messages, and bundles B2B data, an email finder and deliverability tools like inbox warm-up. Integrates with HubSpot, Salesforce and Pipedrive.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    description: "Per-user paid plans with a free trial at the time of writing. Verify current pricing on the provider.",
    availability: "https://schema.org/InStock",
  },
  url: "https://reply.io",
  sameAs: ["https://reply.io"],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReplyioPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={replyioConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare AI sales tools</p>
          <Link
            href="/best-ai-sales-tools"
            className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors"
          >
            See how Reply.io compares to AiSDR and GoHighLevel in the 2026 AI sales tools roundup &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
