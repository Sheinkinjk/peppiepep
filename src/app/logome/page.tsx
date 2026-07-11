import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { logomeConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.logome);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: logomeConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "AI tools", item: `${SITE_URL}/compare/ai-tools` },
    { "@type": "ListItem", position: 3, name: "Logome.ai", item: `${SITE_URL}/logome` },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.logome.title,
  description: seoConfig.logome.description,
  url: seoConfig.logome.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-11",
  dateModified: "2026-07-11",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Logome.ai",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "AI logo and brand-kit generator that creates logos, colour palettes, typography, business cards and social templates from a text description.",
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Free to design and preview; downloads on paid plans from around US$19/month billed annually.", availability: "https://schema.org/InStock" },
  url: "https://www.logome.ai",
  sameAs: ["https://www.logome.ai"],
};

export default function LogomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={logomeConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare AI tools</p>
          <Link href="/compare/ai-tools" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            See Logome next to the other AI tools &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
