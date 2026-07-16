import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { CARRD_URL, DURABLE_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";

export const metadata = generateSEOMetadata(seoConfig.carrdVsDurable);

const CYAN = "#0a7c42";
const CYAN_LT = "#0a7c42";
const aff = (url: string) => ({ href: url, target: "_blank" as const, rel: "nofollow sponsored" as const });

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Carrd vs Durable AI", item: `${SITE_URL}/carrd-vs-durable` },
  ],
};

const faqs = [
  {
    q: "Is Carrd or Durable AI better?",
    a: "They solve different problems. Carrd is the best cheap one-page builder, ideal for a portfolio, link-in-bio, or simple landing page, free to start and Pro from $9/year. Durable AI generates a full multi-page business website in around 30 seconds and bundles a CRM and invoicing, which suits service businesses that want a working site plus light back-office tools. Pick Carrd for simple and cheap; pick Durable for an AI-built business site.",
  },
  {
    q: "Which is cheaper, Carrd or Durable AI?",
    a: "Carrd is dramatically cheaper, a free plan and Pro tiers starting $9/year. Durable AI is a monthly subscription priced like a business tool because it includes site generation plus CRM and invoicing. If budget is the deciding factor and you only need one page, Carrd wins easily.",
  },
  {
    q: "Can Durable AI build a multi-page website automatically?",
    a: "Yes, that is its core feature. You answer a few prompts and Durable generates a complete multi-page site in about 30 seconds, which you then edit. Carrd is deliberately one-page focused, so for a multi-page business site Durable is the better fit.",
  },
  {
    q: "Do both have free trials?",
    a: "Carrd has a genuinely free plan you can keep. Durable AI lets you generate and preview a site free with no account before subscribing. Both let you try before paying.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const rows: { label: string; carrd: string; durable: string }[] = [
  { label: "Best for", carrd: "One-page sites, portfolios, link-in-bio", durable: "AI-built multi-page business sites" },
  { label: "AI generation", carrd: "No, you build it", durable: "Yes, full site in ~30s" },
  { label: "Pages", carrd: "Single page", durable: "Multi-page" },
  { label: "Extras", carrd: "Forms, simple widgets", durable: "CRM, invoicing, Google Business" },
  { label: "Price", carrd: "Free; Pro from $9/year", durable: "Monthly subscription" },
  { label: "Try free", carrd: "Free plan, keep it", durable: "Generate free, no account" },
];

export default function CarrdVsDurablePage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content" className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 pb-24 pt-12 sm:pt-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#3d4b44]">
          <Link href="/" className="hover:text-[#2b362f] transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-[#2b362f] transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Carrd vs Durable AI</span>
        </nav>

        <p className="text-[#9aa39c] text-xs mb-5">Comparison · Website builders</p>
        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-4">
          Carrd vs Durable AI:{" "}
          <span style={{ color: CYAN_LT }}>cheap-and-simple vs AI-built business site</span>
        </h1>
        <p className="text-[#3d4b44] text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
          Both are excellent, for different jobs. <strong className="text-[#2b362f]">Carrd</strong> is the cheapest way to
          ship a clean one-page site. <strong className="text-[#2b362f]">Durable AI</strong> generates a full business
          website with a CRM in about 30 seconds.
        </p>

        <div className="rounded-xl border px-6 py-5 mb-10" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: CYAN_LT }}>Quick Verdict</p>
          <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed mb-5">
            Want one clean page for the least money? <strong className="text-[#10251b]">Carrd.</strong> Want a full,
            multi-page business site generated by AI, with a CRM and invoicing built in? <strong className="text-[#10251b]">Durable AI.</strong>
          </p>
          <div className="flex flex-wrap gap-3">
            <a {...aff(CARRD_URL)} data-cta="verdict-carrd" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md" style={{ background: CYAN, boxShadow: `0 8px 24px ${CYAN}25` }}>
              Try Carrd Free <ArrowRight className="h-4 w-4" />
            </a>
            <a {...aff(DURABLE_URL)} data-cta="verdict-durable" className="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold text-[#2b362f] transition-all hover:text-[#10251b]" style={{ borderColor: `${CYAN}40` }}>
              Try Durable AI <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <h2 className="text-xl font-black mb-4">Carrd vs Durable AI at a glance</h2>
        <div className="overflow-x-auto rounded-xl border border-[#e5e9e7] mb-10">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="bg-[#f5f8f6]">
                <th className="text-left font-semibold text-[#3d4b44] px-4 py-3 w-1/4"></th>
                <th className="text-left font-black text-[#10251b] px-4 py-3">Carrd</th>
                <th className="text-left font-black text-[#10251b] px-4 py-3">Durable AI</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-t border-[#e5e9e7] align-top">
                  <td className="px-4 py-3 text-[#3d4b44] font-medium">{r.label}</td>
                  <td className="px-4 py-3 text-[#2b362f]">{r.carrd}</td>
                  <td className="px-4 py-3 text-[#2b362f]">{r.durable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">Which should you choose?</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            If you need a single, polished page, a personal site, a link-in-bio, an event or product landing page, Carrd
            is the most cost-effective choice on the market and you can have it live within an hour. There is no AI doing
            the work for you, but for one page you rarely need it.
          </p>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            If you run a service business and want a complete multi-page site without touching a builder, Durable AI is the
            faster route, and the bundled CRM and invoicing mean it can replace two or three other tools. You will still
            want to edit the generated copy, but you start from a working site rather than a blank page.
          </p>
        </section>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
            <h3 className="text-lg font-bold mb-2">Go with Carrd</h3>
            <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">Cheapest one-page builder. Free to start, Pro from $9/year.</p>
            <a {...aff(CARRD_URL)} data-cta="card-carrd" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md" style={{ background: CYAN, boxShadow: `0 8px 24px ${CYAN}25` }}>
              Continue to Carrd <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3"><Link href="/carrd" className="text-xs text-[#3d4b44] underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#2b362f]">Read our Carrd review →</Link></p>
          </div>
          <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
            <h3 className="text-lg font-bold mb-2">Go with Durable AI</h3>
            <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">Full business site in ~30s, with CRM and invoicing.</p>
            <a {...aff(DURABLE_URL)} data-cta="card-durable" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md" style={{ background: CYAN, boxShadow: `0 8px 24px ${CYAN}25` }}>
              Continue to Durable AI <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3"><Link href="/durableai" className="text-xs text-[#3d4b44] underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#2b362f]">Read our Durable AI review →</Link></p>
          </div>
        </div>

        <section>
          <h2 className="text-xl font-black mb-5">Carrd vs Durable AI, FAQ</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-[#10251b] text-sm sm:text-base flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-[#9aa39c] group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                </summary>
                <p className="text-[#3d4b44] text-sm leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="border-t border-[#e5e9e7] mt-12 pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/best-website-builder" style={{ color: CYAN }} className="hover:opacity-80">Best Website Builder 2026 →</Link>
          <Link href="/guides" style={{ color: CYAN }} className="hover:opacity-80">All guides →</Link>
        </div>

        <p className="text-[#9aa39c] text-xs mt-8 leading-relaxed">
          This page contains affiliate links, we may earn a commission if you sign up through them, at no extra cost to you.
        </p>
      </main>
    </ConsumerShell>
  );
}
