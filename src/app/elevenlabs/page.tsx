import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { elevenlabsConfig } from "./config";

import { pageDates } from "@/lib/page-dates";
export const metadata = generateSEOMetadata(seoConfig.elevenlabs);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: elevenlabsConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "AI tools", item: `${SITE_URL}/compare/ai-tools` },
    { "@type": "ListItem", position: 3, name: "ElevenLabs", item: seoConfig.elevenlabs.url },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.elevenlabs.title,
  description: seoConfig.elevenlabs.description,
  url: seoConfig.elevenlabs.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-09",
  dateModified: pageDates("/elevenlabs")?.updated ?? "2026-07-09",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ElevenLabs",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "AI audio platform for text-to-speech, voice cloning, dubbing and voice agents, with thousands of voices across many languages and an API.",
  offers: { "@type": "Offer", description: "See current offer and pricing on the provider.", availability: "https://schema.org/InStock" },
  url: "https://elevenlabs.io",
  sameAs: ["https://elevenlabs.io"],
};

export default function ElevenlabsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={elevenlabsConfig} />
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
