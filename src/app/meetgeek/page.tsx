import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { meetgeekConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.meetgeek);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: meetgeekConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "AI tools", item: `${SITE_URL}/compare/ai-tools` },
    { "@type": "ListItem", position: 3, name: "MeetGeek", item: `${SITE_URL}/meetgeek` },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.meetgeek.title,
  description: seoConfig.meetgeek.description,
  url: seoConfig.meetgeek.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-12",
  dateModified: "2026-07-12",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MeetGeek",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "AI meeting assistant that auto-joins Zoom, Meet and Teams calls to record, transcribe and summarise them with action items.",
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Free plan (a few hours/month, no card); paid plans from around US$9.99/user/month.", availability: "https://schema.org/InStock" },
  url: "https://meetgeek.ai",
  sameAs: ["https://meetgeek.ai"],
};

export default function MeetGeekPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={meetgeekConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare AI tools</p>
          <Link href="/compare/ai-tools" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            See MeetGeek next to the other AI tools &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
