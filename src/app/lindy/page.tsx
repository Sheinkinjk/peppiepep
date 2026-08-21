import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { lindyConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.lindy);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: lindyConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "AI tools", item: `${SITE_URL}/compare/ai-tools` },
    { "@type": "ListItem", position: 3, name: "Lindy", item: seoConfig.lindy.url },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.lindy.title,
  description: seoConfig.lindy.description,
  url: seoConfig.lindy.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-09",
  dateModified: "2026-07-09",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Lindy",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "AI work assistant that automates inbox, scheduling, follow-ups and CRM updates by connecting to your existing apps.",
  offers: { "@type": "Offer", description: "See current offer and pricing on the provider.", availability: "https://schema.org/InStock" },
  url: "https://www.lindy.ai",
  sameAs: ["https://www.lindy.ai"],
};

export default function LindyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={lindyConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare AI tools</p>
          <Link href="/compare/ai-tools" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            See the AI tools compared &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
