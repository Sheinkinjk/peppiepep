import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import { apolloPeptidesConfig } from "./config";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.apolloPeptides);

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: apolloPeptidesConfig.faqs.map((faq) => ({
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
    { "@type": "ListItem", position: 2, name: "Best Peptide Supplier Comparison 2026", item: `${SITE_URL}/best-peptide-supplier` },
    { "@type": "ListItem", position: 3, name: "Apollo Peptide Sciences Discount Code & Peptides Sale", item: `${SITE_URL}/apollopeptides` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.apolloPeptides.title,
  description: seoConfig.apolloPeptides.description,
  url: seoConfig.apolloPeptides.url,
  inLanguage: "en-AU",
  datePublished: "2026-03-13",
  dateModified: "2026-03-16",
  about: [
    { "@type": "Thing", name: "Apollo Peptide Sciences discount code" },
    { "@type": "Thing", name: "peptides sale" },
    { "@type": "Thing", name: "research peptides" },
    { "@type": "Thing", name: "Apollo Peptide Sciences review" },
    { "@type": "Thing", name: "buy research peptides online" },
    { "@type": "Thing", name: "peptide supplier discount" },
    { "@type": "Thing", name: "Semaglutide research peptides" },
    { "@type": "Thing", name: "CJC-1295 research peptides" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Apollo Peptide Sciences",
  url: "https://apollopeptidesciences.com",
  description:
    "Research peptide supplier providing high-purity laboratory compounds for scientific research. Catalogue includes metabolic, longevity, tissue repair, and hormone signalling peptides. For laboratory research use only.",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ApolloPeptidesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <PremiumAffiliateLanding config={apolloPeptidesConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare research peptide suppliers</p>
          <Link
            href="/best-peptide-supplier"
            className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors"
          >
            See how Apollo Peptide Sciences compares to Ascension Peptides and BioPeptiTech &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
