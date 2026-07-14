import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { beautifulaiConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.beautifulai);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: beautifulaiConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "AI tools", item: `${SITE_URL}/compare/ai-tools` },
    { "@type": "ListItem", position: 3, name: "Beautiful.ai", item: seoConfig.beautifulai.url },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.beautifulai.title,
  description: seoConfig.beautifulai.description,
  url: seoConfig.beautifulai.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-14",
  dateModified: "2026-07-14",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Beautiful.ai",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "AI presentation software that designs slides automatically as you add content, with smart templates, an AI deck generator, and team branding features.",
  offers: { "@type": "Offer", description: "See current offer and pricing on the provider.", availability: "https://schema.org/InStock" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={beautifulaiConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare AI tools</p>
          <Link href="/compare/ai-tools" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            Compare AI tools &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
