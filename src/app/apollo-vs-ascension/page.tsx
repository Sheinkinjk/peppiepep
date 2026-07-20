import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { APOLLO_URL, ASCENSION_URL } from "@/lib/affiliate-links";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";

export const metadata = generateSEOMetadata(seoConfig.apolloVsAscension);

const GREEN = "#0a7c42";

const apollo = { href: APOLLO_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };
const ascension = { href: ASCENSION_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

// ── JSON-LD ──────────────────────────────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Best Peptide Supplier", item: `${SITE_URL}/best-peptide-supplier` },
    { "@type": "ListItem", position: 3, name: "Apollo Peptides vs Ascension Peptides", item: `${SITE_URL}/apollo-vs-ascension` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Apollo Peptides vs Ascension Peptides: Research Supplier Comparison 2026",
  description:
    "A side-by-side comparison of Apollo Peptide Sciences and Ascension Peptides, two research-peptide suppliers, on catalogue range, third-party testing and COA documentation, shipping, and community trust. For laboratory research use only.",
  numberOfItems: 2,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Apollo Peptide Sciences",
      description:
        "Research peptide supplier with the broadest catalogue in this comparison, including Semaglutide, CJC-1295, GHK-Cu, Ipamorelin, and Retatrutide. Third-party testing and COA documentation. Strictly for laboratory research use only, not for human or veterinary use.",
      url: `${SITE_URL}/apollopeptides`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Ascension Peptides",
      description:
        "Research peptide supplier focused on high-purity, lab-grade compounds with COA documentation, cited in researcher communities for documentation quality and reliable sourcing. Strictly for in-vitro laboratory research use only, not for human consumption.",
      url: `${SITE_URL}/ascensionpeptides`,
    },
  ],
};

const faqs = [
  {
    q: "Are Apollo Peptides or Ascension Peptides products safe to consume?",
    a: "No. Products from both Apollo Peptide Sciences and Ascension Peptides are supplied strictly for laboratory and in-vitro research purposes only. They are not approved for human or veterinary use and are not for human consumption. This page is information only and does not constitute medical advice. Researchers should review all applicable regulations and safety guidelines before handling any peptide compound.",
  },
  {
    q: "Which supplier has the broader research catalogue?",
    a: "Apollo Peptide Sciences carries the broader catalogue of the two. It is the one that commonly lists compounds such as Semaglutide, Retatrutide, and GHK-Cu alongside CJC-1295 and Ipamorelin, spanning metabolic, growth hormone axis, tissue repair, and longevity research areas. Ascension Peptides focuses on a high-purity range across hormone signalling, metabolic, anti-aging, and tissue repair research. If breadth across many research areas from one supplier matters, Apollo covers more ground. All compounds from both are for laboratory research use only.",
  },
  {
    q: "Do both suppliers provide third-party testing and COA documentation?",
    a: "Both are commonly noted for third-party testing and certificate of analysis (COA) documentation, which are among the criteria researchers weigh most heavily. Apollo Peptide Sciences documents quality standards and COA availability across its catalogue, and Ascension Peptides is cited in researcher communities specifically for its purity and documentation quality. The most reliable step is to review the COA for the specific compound you need directly on each supplier before ordering.",
  },
  {
    q: "How do Apollo and Ascension compare on purity?",
    a: "Both position themselves around high-purity, lab-grade compounds. Ascension Peptides is cited most consistently in researcher communities for its purity focus and documentation. Apollo Peptide Sciences also documents purity standards and pairs them with the widest catalogue. Purity claims are best verified against the third-party testing and COA for each individual compound rather than taken at the brand level. For research use only.",
  },
  {
    q: "What about shipping and reliability?",
    a: "Both suppliers offer shipping for research orders, and reliable fulfilment is one of the criteria researcher communities cite when choosing between suppliers. Shipping timelines, regions, and policies are detailed on each supplier's own website and can change, so check the current shipping information on each store before ordering. Nothing on this page is a guarantee of delivery times.",
  },
  {
    q: "Is there a discount code for Apollo or Ascension Peptides?",
    a: "Neither supplier always publishes a traditional, publicly listed discount code. The most consistent way to access a current offer from either is through a referral link, which applies any active offer at the URL level with no manual code entry. The buttons on this page take you directly to each supplier's store via our referral links.",
  },
  {
    q: "How should I choose between Apollo and Ascension Peptides?",
    a: "Match the supplier to your research needs. If you need one supplier that covers many compounds and research areas, including harder-to-find ones, Apollo's catalogue breadth is the reason to start there. If your priority is a tightly documented, high-purity range and the community reputation that goes with it, Ascension is the one to look at. In both cases, review the catalogue, third-party testing, and COA documentation directly. All products are for laboratory research use only and not for human consumption.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.apolloVsAscension.title,
  description: seoConfig.apolloVsAscension.description,
  url: seoConfig.apolloVsAscension.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-06",
  dateModified: "2026-07-06",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

// ── Comparison rows ──────────────────────────────────────────────────────────
const rows: { label: string; apollo: string; ascension: string }[] = [
  { label: "What it is", apollo: "Research peptide supplier", ascension: "Research peptide supplier" },
  { label: "Catalogue range", apollo: "Broadest here (incl. Semaglutide, CJC-1295, GHK-Cu, Retatrutide)", ascension: "High-purity range across common research areas" },
  { label: "Purity focus", apollo: "Documented purity standards", ascension: "Cited for purity and documentation quality" },
  { label: "Third-party testing", apollo: "Third-party tested, COA available", ascension: "COA documentation, community-cited" },
  { label: "Research areas", apollo: "Metabolic, GH axis, tissue repair, longevity", ascension: "Hormone signalling, metabolic, anti-aging, repair" },
  { label: "Shipping", apollo: "Research-order shipping (see store)", ascension: "Research-order shipping (see store)" },
  { label: "Discount", apollo: "Applied via referral link, no code", ascension: "Applied via referral link, no code" },
  { label: "Use", apollo: "Laboratory research only", ascension: "Laboratory research only" },
];

export default function ApolloVsAscensionPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">

          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#3d4b44]">
            <Link href="/" className="hover:text-[#0a7c42] transition-colors">Refer Labs</Link>
            <span>/</span>
            <Link href="/best-peptide-supplier" className="hover:text-[#0a7c42] transition-colors">Peptide suppliers</Link>
            <span>/</span>
            <span className="text-[#2b362f]">Apollo vs Ascension</span>
          </nav>

          {/* Hero */}
          <section className="pt-10 pb-8 sm:pt-12">
            <p className="nw-kicker mb-5">For research use only</p>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b] mb-4 max-w-3xl">
              Apollo Peptides vs Ascension Peptides (2026)
            </h1>
            <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-3">
              Apollo Peptide Sciences and Ascension Peptides are two research-peptide suppliers researchers compare when
              sourcing lab-grade compounds. This is a supplier comparison, not a product one: we line them up on the
              dimensions that actually decide the choice, namely catalogue range, third-party testing and COA
              documentation, shipping, and community trust. Apollo carries the broadest catalogue here; Ascension is cited
              most consistently for purity and documentation. All compounds from both are supplied strictly for
              laboratory research use only.
            </p>
            <p className="text-[#9aa39c] text-xs leading-relaxed max-w-2xl mb-7">
              Information only. All products referenced are intended strictly for laboratory and in-vitro research
              purposes and are not approved for human or veterinary use, and are not for human consumption. This page does
              not constitute medical advice and makes no health, therapeutic, or dosage claims. It contains disclosed
              affiliate links to both suppliers; both are Refer Labs partners.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                {...apollo}
                data-cta="apollo-vs-ascension-hero-apollo"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN, boxShadow: `0 6px 24px ${GREEN}30` }}
              >
                View Apollo Peptides
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                {...ascension}
                data-cta="apollo-vs-ascension-hero-ascension"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5"
                style={{ color: GREEN, border: `1px solid ${GREEN}40`, background: `${GREEN}08` }}
              >
                View Ascension Peptides
              </a>
            </div>
          </section>

          {/* Quick verdict */}
          <section className="pb-2">
            <div className="rounded-xl border px-6 py-5" style={{ borderColor: `${GREEN}40`, background: `${GREEN}0A` }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: GREEN }}>
                Quick verdict
              </p>
              <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed max-w-2xl">
                Choose Apollo Peptide Sciences if catalogue breadth is your priority, since it covers the widest range of
                research compounds from a single supplier. Choose Ascension Peptides if a tightly documented, high-purity
                range and strong community reputation matter most. In both cases, verify the third-party testing and COA
                for each specific compound directly. Everything here is for laboratory research use only and not for human
                consumption.
              </p>
            </div>
          </section>

          {/* Comparison table */}
          <section className="border-t border-[#e5e9e7] mt-8 py-8">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-6">
              Apollo vs Ascension at a glance
            </h2>
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-[#e5e9e7]">
                    <th className="text-left pb-3 pr-4 text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider w-52"></th>
                    <th className="pb-3 px-3 text-left font-extrabold text-[#10251b] text-sm">Apollo Peptides</th>
                    <th className="pb-3 px-3 text-left font-extrabold text-[#10251b] text-sm">Ascension Peptides</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} className="border-b border-[#e5e9e7] hover:bg-[#f5f8f6] transition-colors align-top">
                      <td className="py-3 pr-4 text-[#3d4b44] text-xs font-medium leading-snug">{r.label}</td>
                      <td className="py-3 px-3 text-[#3d4b44] text-xs leading-snug">{r.apollo}</td>
                      <td className="py-3 px-3 text-[#3d4b44] text-xs leading-snug">{r.ascension}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#9aa39c] text-[10px] mt-3 leading-relaxed">
              Details are based on publicly available information and can change. All compounds are
              for laboratory research use only and not for human or veterinary use. Verify testing and COA documentation
              on each supplier before ordering.
            </p>
          </section>

          {/* Prose: catalogue */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              Catalogue range: where Apollo covers more ground
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                The clearest practical difference between the two is catalogue breadth. Apollo Peptide Sciences carries the
                widest range in this comparison, and it is the one that commonly lists compounds referenced in metabolic
                research such as Semaglutide and Retatrutide, growth hormone axis compounds such as CJC-1295 and
                Ipamorelin, and compounds referenced in skin biology and tissue repair research such as GHK-Cu. For a
                research group that wants to source across several areas from a single supplier, that range reduces the
                number of accounts and shipments to manage.
              </p>
              <p>
                Ascension Peptides takes a narrower, purity-led approach, covering hormone signalling, metabolic,
                anti-aging, and tissue repair research areas. If the specific compounds you work with sit inside that
                range, the narrower catalogue is not a drawback. All compounds from both suppliers are intended strictly
                for laboratory research purposes and are not approved for human or veterinary use.
              </p>
            </div>
          </section>

          {/* Prose: testing + trust */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              Third-party testing, documentation, and community trust
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                For research sourcing, documentation is usually the deciding factor, and both suppliers lean on it. Apollo
                pairs its broad catalogue with documented quality standards and certificate of analysis availability.
                Ascension is cited most consistently in researcher communities for its purity focus and documentation
                quality, which is the reputation it is best known for. Neither claim should be taken at the brand level:
                the reliable step is to open the COA for the exact compound you need and check the third-party testing
                before you order.
              </p>
              <p>
                On community trust, both names surface in researcher forums and threads that discuss peptide supplier
                comparisons, sourcing, and documentation. That visibility is a useful signal but not a substitute for
                checking current testing yourself. Shipping for research orders is available from both, with timelines and
                regions detailed on each store. Because pricing and offers change, the most current picture is always on
                the suppliers' own sites.
              </p>
            </div>
            <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border px-6 py-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: `${GREEN}25`, background: `${GREEN}0A` }}>
              <p className="max-w-lg text-sm leading-relaxed text-[#10251b]">
                Need the broadest research catalogue from a single supplier? Apollo Peptide Sciences is the widest here.
                Review the range and COA documentation directly. For laboratory research use only.
              </p>
              <a
                {...apollo}
                data-cta="apollo-vs-ascension-prefaq"
                className="inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN, boxShadow: `0 6px 24px ${GREEN}30` }}
              >
                View Apollo Peptides
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>

          {/* Prose: how to choose */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              How to choose between them
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                Match the supplier to the research, not the other way round. If your work spans several compound families
                and you value sourcing from one place, Apollo's breadth is the reason to start there. If you work within a
                narrower set of compounds and weight purity documentation and community reputation most heavily, Ascension
                is the one to look at. Many researchers end up checking both, comparing the specific COA and current
                pricing for the compound they need, then deciding.
              </p>
              <p>
                Whatever you choose, the framing does not change: these are research suppliers, the compounds are for
                laboratory and in-vitro research only, and nothing here is a health, therapeutic, or dosage
                recommendation. For the wider field, including a third supplier, see our best peptide supplier roundup
                linked below.
              </p>
            </div>
          </section>

          {/* Pick cards */}
          <section className="border-t border-[#e5e9e7] py-10">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
                <h3 className="text-lg font-bold mb-2">Apollo Peptide Sciences</h3>
                <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">Broadest research catalogue here. Best if you source across many compound areas. For research use only.</p>
                <a {...apollo} data-cta="apollo-vs-ascension-card-apollo" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md" style={{ background: GREEN, boxShadow: `0 8px 24px ${GREEN}25` }}>
                  View Apollo Peptides <ArrowRight className="h-4 w-4" />
                </a>
                <p className="mt-3"><Link href="/apollopeptides" className="text-xs text-[#3d4b44] underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#2b362f]">Read our Apollo Peptides review →</Link></p>
              </div>
              <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
                <h3 className="text-lg font-bold mb-2">Ascension Peptides</h3>
                <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">Purity-led, well-documented range. Best if COA quality and reputation matter most. For research use only.</p>
                <a {...ascension} data-cta="apollo-vs-ascension-card-ascension" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md" style={{ background: GREEN, boxShadow: `0 8px 24px ${GREEN}25` }}>
                  View Ascension Peptides <ArrowRight className="h-4 w-4" />
                </a>
                <p className="mt-3"><Link href="/ascensionpeptides" className="text-xs text-[#3d4b44] underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#2b362f]">Read our Ascension Peptides review →</Link></p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-8">
              Apollo vs Ascension Peptides: frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqs.map((f) => (
                <div key={f.q} className="border-b border-[#e5e9e7] pb-6">
                  <h3 className="text-sm font-bold text-[#10251b] mb-2 flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: GREEN }} />
                    {f.q}
                  </h3>
                  <p className="text-sm text-[#3d4b44] leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related + disclosure */}
          <section className="border-t border-[#e5e9e7] py-8 pb-16">
            <h2 className="text-sm font-bold text-[#10251b] mb-3">Keep comparing</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/apollopeptides" className="nw-link text-sm">Apollo Peptides review</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/ascensionpeptides" className="nw-link text-sm">Ascension Peptides review</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/best-peptide-supplier" className="nw-link text-sm">Best peptide supplier 2026</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/guides" className="nw-link text-sm">All guides</Link>
            </div>
            <p className="text-[#9aa39c] text-xs leading-relaxed max-w-2xl">
              This page is operated by Refer Labs and contains disclosed affiliate referral links to both Apollo Peptide
              Sciences and Ascension Peptides. We may earn a commission if you order through them, at no extra cost to you.
              All products referenced are intended strictly for laboratory and in-vitro research purposes only, are not
              approved for human or veterinary use, and are not for human consumption. This page is information only, makes
              no health, therapeutic, or dosage claims, and does not constitute medical advice. Comparisons are based on
              publicly available information at the time of publication and may change.
            </p>
          </section>

        </div>
      </main>
      <StickyCta href={APOLLO_URL} product="Apollo Peptides · research use only" label="View store" />
    </ConsumerShell>
  );
}
