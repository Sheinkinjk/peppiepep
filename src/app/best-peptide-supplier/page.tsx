import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { CheckCircle2, XCircle, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import FeatureMatrix from "@/components/consumer/FeatureMatrix";

export const metadata = generateSEOMetadata(seoConfig.bestPeptideSupplier);

// ─── Affiliate URLs ───────────────────────────────────────────────────────────

import { APOLLO_URL, ASCENSION_URL, BIOPEPTITECH_URL as BPT_URL } from "@/lib/affiliate-links";

const aff = (url: string) => ({
  href: url,
  target: "_blank" as const,
  rel: "nofollow sponsored" as const,
});

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Best Peptide Supplier Comparison 2026", item: `${SITE_URL}/best-peptide-supplier` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best Research Peptide Suppliers 2026",
  description: "In-depth comparison of the best research peptide suppliers, Apollo Peptide Sciences, Ascension Peptides, and BioPeptiTech. Covers discount codes, current peptides sale offers, purity standards, and catalogue depth.",
  numberOfItems: 3,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Apollo Peptide Sciences", description: "Broadest research peptide catalogue. Includes Semaglutide, CJC-1295, GHK-Cu, Ipamorelin, and Retatrutide. Third-party tested. For research use only.", url: `${SITE_URL}/apollopeptides` },
    { "@type": "ListItem", position: 2, name: "Ascension Peptides", description: "High-purity lab-grade peptides. Covers hormone signalling, metabolic, anti-aging, and tissue repair research. Community-recommended supplier.", url: `${SITE_URL}/ascensionpeptides` },
    { "@type": "ListItem", position: 3, name: "BioPeptiTech", description: "Research peptide supplier frequently running peptides sale promotions. Covers longevity, metabolic, and hormone signalling compounds.", url: `${SITE_URL}/biopeptitech` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best research peptide supplier in 2026?",
      acceptedAnswer: { "@type": "Answer", text: "Apollo Peptide Sciences, Ascension Peptides, and BioPeptiTech are among the most referenced research peptide suppliers in 2026. Apollo has the broadest catalogue including Semaglutide, CJC-1295, GHK-Cu, and Retatrutide. Ascension is frequently cited for purity documentation and community reputation. BioPeptiTech regularly runs peptides sale promotions. All products are for laboratory research use only." }
    },
    {
      "@type": "Question",
      name: "How do I get a research peptide discount code in 2026?",
      acceptedAnswer: { "@type": "Answer", text: "The most reliable route to a current research peptide discount is through an affiliate referral link rather than searching for a manual promo code that may have expired. This page provides direct referral links to Apollo Peptide Sciences, Ascension Peptides, and BioPeptiTech, each link applies any active offer automatically." }
    },
    {
      "@type": "Question",
      name: "What are the best peptides to buy for research?",
      acceptedAnswer: { "@type": "Answer", text: "The most commonly researched peptides include Semaglutide (metabolic pathways), CJC-1295 and Ipamorelin (growth hormone axis research), GHK-Cu (cellular biology and wound healing studies), and Retatrutide (emerging metabolic research). All peptides referenced on this page are intended strictly for laboratory research purposes and are not approved for human or veterinary use." }
    },
    {
      "@type": "Question",
      name: "Do peptide suppliers run sales?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. BioPeptiTech frequently runs peptides sale promotions across their catalogue. Apollo Peptide Sciences and Ascension Peptides also offer discounts accessible via affiliate referral links. This page links directly to each supplier's current sale and offer." }
    },
    {
      "@type": "Question",
      name: "Are these research peptides safe for human use?",
      acceptedAnswer: { "@type": "Answer", text: "No. All products listed on Apollo Peptide Sciences, Ascension Peptides, and BioPeptiTech are intended strictly for laboratory research purposes only and are not approved for human or veterinary use. Researchers should review all applicable safety regulations and guidelines before handling any peptide compound." }
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.bestPeptideSupplier.title,
  description: seoConfig.bestPeptideSupplier.description,
  url: seoConfig.bestPeptideSupplier.url,
  inLanguage: "en-AU",
  datePublished: "2026-03-13",
  dateModified: "2026-07-07",
  about: [
    { "@type": "Thing", name: "best peptide supplier 2026" },
    { "@type": "Thing", name: "research peptides comparison" },
    { "@type": "Thing", name: "peptides sale 2026" },
    { "@type": "Thing", name: "peptide discount code" },
    { "@type": "Thing", name: "buy peptides online" },
    { "@type": "Thing", name: "research peptides supplier comparison" },
    { "@type": "Thing", name: "Apollo Peptide Sciences vs Ascension Peptides" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};


// ─── Design tokens ────────────────────────────────────────────────────────────

const CYAN    = "#0a7c42";
const CYAN_LT = "#0a7c42";

// ─── Sub-components ───────────────────────────────────────────────────────────

function Pro({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm text-[#2b362f] leading-snug">
      <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: CYAN_LT }} />
      {text}
    </li>
  );
}

function Con({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm text-[#9aa39c] leading-snug">
      <XCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-[#9aa39c]" />
      {text}
    </li>
  );
}


// ─── Supplier card ────────────────────────────────────────────────────────────

interface SupplierCardProps {
  id: string;
  index: string;
  name: string;
  tagline: string;
  deal: string;
  dealNote: string;
  strengths: string[];
  limitations: string[];
  affUrl: string;
  ctaLabel: string;
  internalUrl: string;
  reviewLabel: string;
}

function SupplierCard({
  id, index, name, tagline, deal, dealNote,
  strengths, limitations, affUrl, ctaLabel, internalUrl, reviewLabel,
}: SupplierCardProps) {
  return (
    <section
      id={id}
      className="border-t border-[#e5e9e7] py-10 sm:py-12 scroll-mt-24"
    >
      <div className="grid lg:grid-cols-[1fr_260px] gap-8 lg:gap-12">

        {/* Left, identity + content */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="h-9 w-9 rounded-lg flex items-center justify-center text-[11px] font-black text-[#2b362f] flex-shrink-0"
              style={{ background: `${CYAN}1A`, border: `1px solid ${CYAN}30` }}
            >
              {index}
            </div>
            <h2 className="text-xl font-black text-[#10251b] leading-none">{name}</h2>
          </div>

          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed mb-5 max-w-lg">
            {tagline}
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#9aa39c] mb-2.5">Strengths</p>
              <ul className="space-y-2">
                {strengths.map((p) => <Pro key={p} text={p} />)}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#9aa39c] mb-2.5">Limitations</p>
              <ul className="space-y-2">
                {limitations.map((c) => <Con key={c} text={c} />)}
              </ul>
            </div>
          </div>
        </div>

        {/* Right, deal + CTA */}
        <div className="flex flex-col gap-4">
          <div
            className="rounded-xl p-5"
            style={{ background: `${CYAN}0D`, border: `1px solid ${CYAN}30` }}
          >
            <p className="text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: CYAN_LT }}>
              Current offer
            </p>
            <p className="text-[#10251b] font-black text-base leading-snug mb-1">{deal}</p>
            <p className="text-[#3d4b44] text-xs leading-snug">{dealNote}</p>
          </div>

          <a
            {...aff(affUrl)}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            style={{ background: CYAN, boxShadow: `0 6px 24px ${CYAN}30` }}
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </a>

          <Link
            href={internalUrl}
            className="inline-flex items-center justify-center gap-1.5 text-xs transition-colors hover:opacity-80"
            style={{ color: `${CYAN_LT}60` }}
          >
            {reviewLabel} <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Page data ────────────────────────────────────────────────────────────────

const suppliers: SupplierCardProps[] = [
  {
    id: "apollo",
    index: "01",
    name: "Apollo Peptide Sciences",
    tagline: "The broadest research peptide catalogue of the three suppliers, includes Semaglutide, CJC-1295, Ipamorelin, GHK-Cu, and Retatrutide. Third-party tested with COA documentation. Access via referral link for the current discount.",
    deal: "Current discount via referral link",
    dealNote: "Our affiliate link applies the current Apollo Peptide Sciences offer at the URL level. No promo code entry required.",
    strengths: [
      "Broadest compound catalogue",
      "Includes Semaglutide, CJC-1295, GHK-Cu, Retatrutide",
      "Third-party tested with COA available",
      "Strong community reputation in research forums",
    ],
    limitations: [
      "No publicly listed discount code, use referral link",
      "Pricing varies by compound and lot",
    ],
    affUrl: APOLLO_URL,
    ctaLabel: "Access Apollo Peptide Sciences Sale",
    internalUrl: "/apollopeptides",
    reviewLabel: "Full Apollo Peptide Sciences review",
  },
  {
    id: "ascension",
    index: "02",
    name: "Ascension Peptides",
    tagline: "High-purity lab-grade research peptides across hormone signalling, metabolic, anti-aging, and tissue repair research areas. Frequently cited in researcher communities for documentation quality and consistent supply.",
    deal: "Peptides sale via referral link",
    dealNote: "Access the current Ascension Peptides sale through our referral link. The offer is applied at the link level, no discount code required.",
    strengths: [
      "High-purity lab-grade compounds",
      "Covers hormone signalling, metabolic, and anti-aging areas",
      "Community-recommended for documentation quality",
      "Consistent supply for ongoing research programmes",
    ],
    limitations: [
      "Narrower catalogue than Apollo Peptide Sciences",
      "No publicly listed promo code, use referral link",
    ],
    affUrl: ASCENSION_URL,
    ctaLabel: "Access Ascension Peptides Sale",
    internalUrl: "/ascensionpeptides",
    reviewLabel: "Full Ascension Peptides review",
  },
  {
    id: "biopeptitech",
    index: "03",
    name: "BioPeptiTech",
    tagline: "Frequently runs peptides sale promotions, a strong option for researchers looking for discounted access to lab-grade compounds. Covers longevity, metabolic, and hormone signalling research areas.",
    deal: "Frequent peptides sale, check current offer",
    dealNote: "BioPeptiTech regularly runs limited-time peptides sale events. Our referral link takes you directly to their store with any active sale pricing visible.",
    strengths: [
      "Frequently runs peptides sale promotions",
      "Covers longevity, metabolic, and hormone signalling",
      "Good value entry point for research compound sourcing",
      "Direct affiliate discount via referral link",
    ],
    limitations: [
      "Smaller community footprint than Apollo",
      "Catalogue depth varies by research area",
    ],
    affUrl: BPT_URL,
    ctaLabel: "Access BioPeptiTech Peptides Sale",
    internalUrl: "/biopeptitech",
    reviewLabel: "Full BioPeptiTech review",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BestPeptideSupplierPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">

          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#3d4b44]">
            <Link href="/" className="hover:text-[#2b362f] transition-colors">Refer Labs</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-[#2b362f] transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-[#2b362f]">Best Peptide Supplier</span>
          </nav>

          {/* ── Hero ─────────────────────────────────────────────────────────── */}
          <section className="pt-10 pb-8 sm:pt-12">
            <p className="text-[#9aa39c] text-xs mb-6">Updated March 2026 &middot; For laboratory research use only</p>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black leading-[1.08] tracking-tight text-[#10251b] mb-4 max-w-3xl">
              Best Peptide Supplier 2026:{" "}
              <span style={{ color: CYAN_LT }}>Three Suppliers. Clear Differences.</span>
            </h1>

            <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-3">
              Apollo Peptide Sciences has the broadest catalogue, including Semaglutide, CJC-1295, GHK-Cu, and Retatrutide. Ascension Peptides is cited most consistently for purity documentation and COA quality. BioPeptiTech runs the most frequent peptides sale events.
            </p>
            <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-7">
              Below: catalogue differences, current discount access, and a direct link to each supplier. All products are for laboratory research use only and are not approved for human or veterinary use.
            </p>

            {/* Jump nav */}
            <nav aria-label="Jump to section" className="flex flex-wrap gap-2">
              {[
                { href: "#apollo",       label: "Apollo Peptide Sciences" },
                { href: "#ascension",    label: "Ascension Peptides" },
                { href: "#biopeptitech", label: "BioPeptiTech" },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="inline-flex items-center gap-1.5 rounded-sm px-4 py-2 text-xs font-bold transition-all hover:opacity-80"
                  style={{ color: CYAN_LT, border: `1px solid ${CYAN}40`, background: `${CYAN}08` }}
                >
                  {label}
                </a>
              ))}
            </nav>
          </section>

          {/* ── Quick Verdict (answer-first, GEO) ─────────────────────────────── */}
          <section className="pb-2">
            <div className="rounded-xl border px-6 py-5" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: CYAN_LT }}>
                Quick Verdict
              </p>
              <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed max-w-2xl">
                Apollo Peptide Sciences has the broadest catalogue, Ascension Peptides is cited most consistently for purity and COA documentation, and BioPeptiTech runs the most frequent sale events. All three are for laboratory research use only and are not approved for human or veterinary use.
              </p>
            </div>
          </section>

          {/* ── Quick picks table ─────────────────────────────────────────────── */}
          <section className="border-t border-[#e5e9e7] py-8">
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-[#e5e9e7]">
                    <th className="text-left pb-3 pr-4 text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider w-44">Supplier</th>
                    <th className="pb-3 px-3 text-left text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider">Best for</th>
                    <th className="pb-3 px-3 text-left text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider">Discount / Offer</th>
                    <th className="pb-3 pl-3 text-right text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Apollo Peptide Sciences",
                      bestFor: "Broadest catalogue, Semaglutide, CJC-1295, GHK-Cu",
                      offer: "Referral link discount",
                      href: "#apollo",
                      affUrl: APOLLO_URL,
                      cta: "Access sale",
                    },
                    {
                      name: "Ascension Peptides",
                      bestFor: "Hormonal, metabolic & anti-aging research",
                      offer: "Referral link sale",
                      href: "#ascension",
                      affUrl: ASCENSION_URL,
                      cta: "Access sale",
                    },
                    {
                      name: "BioPeptiTech",
                      bestFor: "Longevity & metabolic research, frequent sales",
                      offer: "Frequent peptides sale",
                      href: "#biopeptitech",
                      affUrl: BPT_URL,
                      cta: "Access sale",
                    },
                  ].map((row) => (
                    <tr key={row.name} className="border-b border-[#e5e9e7] hover:bg-[#f5f8f6] transition-colors">
                      <td className="py-3 pr-4">
                        <a href={row.href} className="text-[#10251b] font-bold text-sm hover:opacity-80 transition-opacity">{row.name}</a>
                      </td>
                      <td className="py-3 px-3 text-[#3d4b44] text-xs">{row.bestFor}</td>
                      <td className="py-3 px-3 text-xs font-semibold" style={{ color: CYAN_LT }}>{row.offer}</td>
                      <td className="py-3 pl-3 text-right">
                        <a
                          {...aff(row.affUrl)}
                          className="inline-flex items-center gap-1 rounded-full bg-[#0a7c42] px-3 py-1.5 text-[11px] font-bold text-white whitespace-nowrap transition-all hover:-translate-y-0.5 hover:bg-[#086536]"
                        >
                          {row.cta} <ArrowRight className="h-3 w-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#9aa39c] text-[10px] mt-3">
              All products are intended strictly for laboratory research purposes only and are not approved for human or veterinary use.
            </p>
          </section>

          {/* ── Supplier cards ────────────────────────────────────────────────── */}
          {suppliers.map((s) => (
            <SupplierCard key={s.id} {...s} />
          ))}

          {/* ── Feature breakdown table ───────────────────────────────────────── */}
          <section className="border-t border-[#e5e9e7] py-12 sm:py-14">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#10251b] mb-6">
              Supplier Comparison: Research Peptide Criteria
            </h2>

            <FeatureMatrix
              firstColLabel="Criteria"
              columns={[
                { name: "Apollo Peptide Sciences" },
                { name: "Ascension Peptides" },
                { name: "BioPeptiTech" },
              ]}
              rows={[
                { label: "Certificate of Analysis",          vals: [true,  true,  true]  },
                { label: "Third-party testing",              vals: [true,  true,  false] },
                { label: "Semaglutide available",            vals: [true,  false, false] },
                { label: "CJC-1295 available",               vals: [true,  true,  false] },
                { label: "GHK-Cu peptide",                   vals: [true,  false, false] },
                { label: "Retatrutide available",            vals: [true,  false, false] },
                { label: "Anti-aging / longevity compounds", vals: [true,  true,  true]  },
                { label: "Metabolic research peptides",      vals: [true,  true,  true]  },
                { label: "Hormone signalling peptides",      vals: [true,  true,  true]  },
                { label: "Frequent peptides sales",          vals: [false, false, true]  },
                { label: "Referral link discount",           vals: [true,  true,  true]  },
                { label: "Community reputation",             vals: [true,  true,  false] },
                { label: "Current deal",                     vals: ["Referral link", "Referral link", "Frequent sale"] },
              ]}
            />

            <p className="text-[#9aa39c] text-[10px] mt-4">
              Feature availability is based on publicly available catalogue information at time of publication and may change. All compounds are for laboratory research purposes only.
            </p>
          </section>

          {/* ── Verdict ──────────────────────────────────────────────────────── */}
          <section className="border-t border-[#e5e9e7] py-12 sm:py-14">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#10251b] mb-6">
              The Verdict
            </h2>
            <div className="space-y-4 max-w-2xl">
              {[
                { label: "Choose Apollo Peptide Sciences if:", body: "You need the broadest research peptide catalogue. Apollo is the only supplier of the three that carries Semaglutide, Retatrutide, and GHK-Cu alongside the more common CJC-1295 and Ipamorelin. Strong third-party testing and COA availability. Use the referral link for the current discount." },
                { label: "Choose Ascension Peptides if:", body: "Purity documentation and supplier consistency are your primary criteria. Ascension is cited most frequently in researcher communities for COA quality and reliable fulfilment. Covers hormone signalling, metabolic, and anti-aging research compounds. Referral link applies current offer." },
                { label: "Choose BioPeptiTech if:", body: "You want the best price and are willing to time purchases around sale events. BioPeptiTech runs the most frequent peptides sale promotions of the three. Smaller community footprint than Apollo. Use the affiliate link to see current sale pricing on arrival." },
              ].map(({ label, body }) => (
                <div key={label} className="border-b border-[#e5e9e7] pb-4">
                  <p className="text-sm font-bold text-[#10251b] mb-1">{label}</p>
                  <p className="text-sm text-[#3d4b44] leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ──────────────────────────────────────────────────────────── */}
          <section className="border-t border-[#e5e9e7] py-12 sm:py-14">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#10251b] mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "What is the best research peptide supplier in 2026?",
                  a: "Apollo Peptide Sciences has the broadest catalogue including Semaglutide, CJC-1295, GHK-Cu, and Retatrutide. Ascension Peptides is highly rated for purity documentation and consistency. BioPeptiTech offers frequent peptides sale promotions. The best supplier depends on the specific compounds needed for your research.",
                },
                {
                  q: "How do I get a peptide supplier discount code?",
                  a: "The most reliable route to a research peptide discount is through an affiliate referral link rather than searching for a manually entered promo code that may have expired. All three suppliers on this page offer current deals accessible via the referral links above.",
                },
                {
                  q: "Are these peptides approved for human use?",
                  a: "No. All products listed on Apollo Peptide Sciences, Ascension Peptides, and BioPeptiTech are intended strictly for laboratory research purposes only and are not approved for human or veterinary use.",
                },
                {
                  q: "Which peptide supplier has the most frequent sales?",
                  a: "BioPeptiTech is noted for running the most frequent peptides sale promotions across their catalogue. Apollo Peptide Sciences and Ascension Peptides offer current discounts accessible via referral links on this page.",
                },
              ].map(({ q, a }, i) => (
                <div key={i} className="border-b border-[#e5e9e7] pb-6">
                  <h3 className="text-sm font-bold text-[#10251b] mb-2">{q}</h3>
                  <p className="text-sm text-[#3d4b44] leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Disclaimer ───────────────────────────────────────────────────── */}
          <section className="border-t border-[#e5e9e7] py-8 pb-16">
            <p className="text-[#9aa39c] text-xs leading-relaxed max-w-2xl">
              All products referenced on this page, including those supplied by Apollo Peptide Sciences, Ascension Peptides, and BioPeptiTech, are intended strictly for laboratory and in-vitro research purposes only. They are not approved for human or veterinary use and should not be construed as medical advice. This page is operated by Refer Labs and contains affiliate referral links.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/apollopeptides" className="text-xs hover:opacity-80 transition-opacity" style={{ color: `${CYAN_LT}50` }}>
                Apollo Peptide Sciences review
              </Link>
              <Link href="/ascensionpeptides" className="text-xs hover:opacity-80 transition-opacity" style={{ color: `${CYAN_LT}50` }}>
                Ascension Peptides review
              </Link>
              <Link href="/biopeptitech" className="text-xs hover:opacity-80 transition-opacity" style={{ color: `${CYAN_LT}50` }}>
                BioPeptiTech review
              </Link>
              <Link href="/apollo-vs-ascension" className="text-xs hover:opacity-80 transition-opacity" style={{ color: `${CYAN_LT}50` }}>
                Apollo vs Ascension Peptides
              </Link>
              <Link href="/apollo-vs-biopeptitech" className="text-xs hover:opacity-80 transition-opacity" style={{ color: `${CYAN_LT}50` }}>
                Apollo vs BioPeptiTech
              </Link>
              <Link href="/ascension-vs-biopeptitech" className="text-xs hover:opacity-80 transition-opacity" style={{ color: `${CYAN_LT}50` }}>
                Ascension vs BioPeptiTech
              </Link>
            </div>
          </section>

        </div>
      </main>
      <StickyCta href={APOLLO_URL} product="Apollo Peptide Sciences" label="Visit site" />
    </ConsumerShell>
  );
}
