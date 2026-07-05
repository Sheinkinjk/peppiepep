import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import { ascensionPeptidesConfig } from "./config";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.ascensionPeptides);

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ascensionPeptidesConfig.faqs.map((faq) => ({
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
    { "@type": "ListItem", position: 3, name: "Ascension Peptides Discount Code & Research Peptides Sale", item: `${SITE_URL}/ascensionpeptides` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.ascensionPeptides.title,
  description: seoConfig.ascensionPeptides.description,
  url: seoConfig.ascensionPeptides.url,
  inLanguage: "en-AU",
  datePublished: "2026-03-13",
  dateModified: "2026-03-16",
  about: [
    { "@type": "Thing", name: "Ascension Peptides discount code" },
    { "@type": "Thing", name: "research peptides sale" },
    { "@type": "Thing", name: "Ascension Peptides review" },
    { "@type": "Thing", name: "buy peptides online" },
    { "@type": "Thing", name: "peptide supplier discount" },
    { "@type": "Thing", name: "research peptide deals" },
    { "@type": "Thing", name: "lab grade peptides" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ascension Peptides",
  url: "https://ascensionpeptides.com",
  description:
    "Research peptide supplier specialising in high-purity lab-grade peptide compounds for scientific research. Covers hormone signalling, metabolic, anti-aging, and tissue repair research areas. For laboratory research use only.",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AscensionPeptidesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <PremiumAffiliateLanding config={ascensionPeptidesConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare research peptide suppliers</p>
          <Link
            href="/best-peptide-supplier"
            className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors"
          >
            See how Ascension Peptides compares to Apollo Peptide Sciences and BioPeptiTech &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
