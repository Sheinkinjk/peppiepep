import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";
import EarningsBalanceNote from "@/components/consumer/EarningsBalanceNote";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";

export const metadata = generateSEOMetadata(seoConfig.moshyVsJuniper);

const CYAN = "#0a7c42";
const CYAN_LT = "#0a7c42";

const aff = (url: string) => ({ href: url, target: "_blank" as const, rel: "nofollow sponsored" as const });

// ── JSON-LD ──────────────────────────────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Weight Loss", item: `${SITE_URL}/weight-loss` },
    { "@type": "ListItem", position: 3, name: "Moshy vs Juniper", item: `${SITE_URL}/moshy-vs-juniper` },
  ],
};

const faqs = [
  {
    q: "Is Moshy or Juniper better for weight loss?",
    a: "They take different approaches. Moshy runs a lean, clinically-led telehealth pathway open to anyone eligible; Juniper pairs practitioner-led care with a structured coaching and habit program and is designed and marketed primarily for women. The right choice depends on how much coaching support you want alongside the clinical side. Both assess suitability individually through registered Australian practitioners.",
  },
  {
    q: "How do I choose between Moshy and Juniper?",
    a: "Think about the kind of support you want. Moshy keeps the experience focused on the clinical pathway: eligibility check, practitioner review, and delivery if appropriate. Juniper wraps that clinical care inside a broader coaching and community program, which it designs and markets for women. If neither fits your situation, a GP is always a valid starting point.",
  },
  {
    q: "Is Moshy or Juniper better for women?",
    a: "Juniper is designed and marketed specifically for women, with coaching, an app and a 20,000-member community built around what women experience with weight, plus a free first consultation for new patients. Moshy is open to anyone eligible and keeps the pathway lean. Either way, suitability is decided individually by a registered Australian practitioner. This page is general information, not medical advice.",
  },
  {
    q: "How much do Moshy and Juniper cost?",
    a: "Both run subscription models, and the cost depends on the plan determined during the clinical consultation rather than a single fixed price. Each platform shows current pricing during its eligibility flow before any commitment, so you see the exact figure for your plan before signing up.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

// The two providers this page compares, so the head-to-head is machine-readable
// the same way /moshy-vs-pilot is.
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Moshy vs Juniper: Weight Loss Telehealth Compared 2026",
  description:
    "Moshy and Juniper compared on approach, eligibility, care model, pricing and who each suits. Moshy runs a lean clinical pathway open to anyone eligible; Juniper pairs practitioner-led care with structured coaching and markets primarily to women.",
  numberOfItems: 2,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Moshy",
      description: "Australian clinically-led telehealth weight management, open to anyone eligible. Online eligibility questionnaire, practitioner review, subscription with home delivery.",
      url: `${SITE_URL}/moshy`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Juniper",
      description: "Australian weight management program marketed primarily to women. Pairs practitioner-led care with structured health coaching and community support.",
      url: `${SITE_URL}/juniper`,
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.moshyVsJuniper.title,
  description: seoConfig.moshyVsJuniper.description,
  url: seoConfig.moshyVsJuniper.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-05",
  dateModified: "2026-08-13",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const rows: { label: string; moshy: string; juniper: string }[] = [
  { label: "Approach", moshy: "Clinical pathway, open to anyone eligible", juniper: "Coaching-led, marketed for women" },
  { label: "Model", moshy: "Clinical, practitioner-led pathway", juniper: "Practitioner-led care + structured coaching & community" },
  { label: "Process", moshy: "Online eligibility → practitioner review → delivery", juniper: "Online eligibility → practitioner review → program + delivery" },
  { label: "Pricing", moshy: "Subscription, shown in eligibility flow", juniper: "Subscription, shown in eligibility flow" },
  { label: "New-patient offer", moshy: "Referral discount via our link", juniper: "Free first consultation" },
  { label: "Best if you want", moshy: "A focused, no-friction clinical pathway", juniper: "Coaching and accountability alongside clinical care" },
];

const articleSchema = comparisonArticleSchema({
  headline: "Moshy vs Juniper: Refer Labs' Australian weight-loss telehealth comparison",
  description: "Refer Labs compares Moshy and Juniper on approach, process and published pricing for Australian weight-loss telehealth.",
  url: "https://referlabs.com.au/moshy-vs-juniper",
  datePublished: "2026-07-05",
  dateModified: "2026-08-13",
});

export default function MoshyVsJuniperPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 pb-24 pt-12 sm:pt-16">
        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#3d4b44]">
          <Link href="/" className="hover:text-[#2b362f] transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/weight-loss" className="hover:text-[#2b362f] transition-colors">Weight loss</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Moshy vs Juniper</span>
        </nav>

        {/* Hero */}
        <p className="text-[#9aa39c] text-xs mb-5">Australia · Weight-loss telehealth</p>
        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-4">
          Moshy vs Juniper:{" "}
          <span style={{ color: CYAN_LT }}>which one is built for you?</span>
        </h1>
        <EditorialMeta lastUpdated="2026-08-13" className="mb-6" />
        <p className="text-[#3d4b44] text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
          Australia&apos;s two most-compared weight-loss telehealth platforms answer the same problem in different
          ways. The short version: <strong className="text-[#2b362f]">Moshy runs a lean clinical pathway, Juniper wraps
          clinical care in a coaching program</strong>, and the difference goes deeper than that.
        </p>
        <p className="mb-8 rounded-lg border border-[#e5e9e7] bg-[#f5f8f6] px-4 py-3 text-xs leading-relaxed text-[#3d4b44]">
          <span className="font-semibold text-[#2b362f]">Information only.</span> This page compares two telehealth services and is not medical advice. It does not recommend any treatment or imply suitability for any individual. Suitability for any program is decided by a registered Australian practitioner.
        </p>

        {/* Answer-first: the buyer's question verbatim as an H2, then a liftable answer. */}
        <h2 className="text-xl sm:text-2xl font-black text-[#10251b] mb-3">Is Moshy or Juniper better for weight loss in Australia?</h2>
        <div className="rounded-xl border px-6 py-5 mb-10" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: CYAN_LT }}>Quick Verdict</p>
          <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed">
            Refer Labs compared Moshy and Juniper in August 2026, and the difference is the style of support. If you
            want a focused, clinically-led pathway with a fast online eligibility check, Moshy is a natural starting
            point and is open to anyone eligible. If you want coaching and accountability wrapped around your care,
            Juniper is built for that, is designed for women, and offers new patients a free first consultation. Both
            assess suitability individually through registered Australian practitioners.
          </p>
        </div>

        {/* Comparison table */}
        <h2 className="text-xl font-black mb-4">Moshy vs Juniper at a glance</h2>
        <div className="overflow-x-auto rounded-xl border border-[#e5e9e7] mb-10">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="bg-[#f5f8f6]">
                <th className="text-left font-semibold text-[#3d4b44] px-4 py-3 w-1/4"></th>
                <th className="text-left font-black text-[#10251b] px-4 py-3">Moshy</th>
                <th className="text-left font-black text-[#10251b] px-4 py-3">Juniper</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-t border-[#e5e9e7] align-top">
                  <td className="px-4 py-3 text-[#3d4b44] font-medium">{r.label}</td>
                  <td className="px-4 py-3 text-[#2b362f]">{r.moshy}</td>
                  <td className="px-4 py-3 text-[#2b362f]">{r.juniper}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Prose */}
        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">The real difference</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            The most useful distinction is philosophy. Moshy keeps the experience deliberately lean: complete the
            eligibility questionnaire, have a practitioner review your case, and if appropriate, proceed with a treatment
            plan delivered to your door. For a lot of people who simply want to get started without friction, that focus
            is the appeal.
          </p>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            Juniper wraps that clinical care inside a broader program: coaching, habit tracking, and a community, and
            positions weight management as a longer behavioural project rather than a one-off. If accountability
            and structure are what tend to make or break your results, that is a meaningful advantage.
          </p>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            Outcomes from weight-management programs depend on clinical
            suitability, adherence, and individual factors far more than on which logo is on the box.
          </p>
        </section>

        {/* Dual CTA */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: CYAN_LT }}>The clinical pathway</p>
            <h3 className="text-lg font-bold mb-2">Start with Moshy</h3>
            <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">
              Fast online eligibility check, practitioner-reviewed, delivered. No code needed, the referral applies automatically.
            </p>
            <a
              {...aff(MOSHY_URL)}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md"
              style={{ background: CYAN, boxShadow: `0 8px 24px ${CYAN}25` }}
            >
              Continue to Moshy ($120 off first order)
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3">
              <Link href="/moshy" className="text-xs text-[#3d4b44] underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#2b362f]">
                Read our full Moshy review →
              </Link>
            </p>
            <EarningsBalanceNote earnFrom="Moshy" noEarnFrom="Juniper" className="mt-4" />
          </div>
          <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2 text-[#3d4b44]">Designed for women</p>
            <h3 className="text-lg font-bold mb-2">Consider Juniper</h3>
            <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">
              A structured coaching and community program designed for women, with a free first consultation.
            </p>
            <Link
              href="/juniper"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md"
              style={{ background: CYAN, boxShadow: `0 8px 24px ${CYAN}25` }}
            >
              See Juniper: free first consult
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3">
              <Link href="/weight-loss-telehealth-women-australia" className="text-xs text-[#3d4b44] underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#2b362f]">
                Weight-loss telehealth for women &rarr;
              </Link>
            </p>
          </div>
        </div>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-black mb-5">Moshy vs Juniper, FAQ</h2>
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

        {/* Related */}
        <div className="border-t border-[#e5e9e7] mt-12 pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/best-weight-loss-telehealth-australia" style={{ color: CYAN }} className="hover:opacity-80">
            Best Weight Loss Telehealth Australia →
          </Link>
          <Link href="/moshy" style={{ color: CYAN }} className="hover:opacity-80">Moshy full review →</Link>
          <Link href="/juniper" style={{ color: CYAN }} className="hover:opacity-80">Juniper review →</Link>
          <Link href="/guides" style={{ color: CYAN }} className="hover:opacity-80">All guides →</Link>
        </div>

        <p className="text-[#9aa39c] text-xs mt-8 leading-relaxed">
          This post contains affiliate links. If you are a new Juniper patient and make a purchase through these links, I
          may earn a small commission at no extra cost to you. Refer Labs also has a disclosed affiliate arrangement with
          Moshy. Commissions never change what we write. This page does not constitute medical advice. Treatment
          suitability is decided by a registered Australian practitioner. Consult a qualified health professional
          before making health decisions.
        </p>
      </main>
    </ConsumerShell>
  );
}
