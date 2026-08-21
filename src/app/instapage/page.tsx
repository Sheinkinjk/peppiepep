import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { instapageConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.instapage);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: instapageConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Website builders", item: `${SITE_URL}/best-website-builder` },
    { "@type": "ListItem", position: 3, name: "Instapage", item: seoConfig.instapage.url },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.instapage.title,
  description: seoConfig.instapage.description,
  url: seoConfig.instapage.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-14",
  dateModified: "2026-07-14",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Instapage",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Landing-page platform for advertisers: drag-and-drop builder, A/B testing, heatmaps and ad-to-page personalisation to improve paid-ad conversion rates.",
  offers: { "@type": "Offer", description: "See current offer and pricing on the provider.", availability: "https://schema.org/InStock" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={instapageConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare website & landing-page builders</p>
          <Link href="/compare/website-builders" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            Compare website & landing-page builders &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
