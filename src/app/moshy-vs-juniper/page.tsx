import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSHY_URL, JUNIPER_URL } from "@/lib/affiliate-links";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";

export const metadata = generateSEOMetadata(seoConfig.moshyVsJuniper);

const CYAN = "#0a7c42";
const CYAN_LT = "#0a7c42";

const aff = (url: string) => ({ href: url, target: "_blank" as const, rel: "nofollow sponsored" as const });
const ext = (url: string) => ({ href: url, target: "_blank" as const, rel: "nofollow" as const });

// ── JSON-LD ──────────────────────────────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Moshy vs Juniper", item: `${SITE_URL}/moshy-vs-juniper` },
  ],
};

const faqs = [
  {
    q: "Is Moshy or Juniper better for weight loss?",
    a: "Neither is universally better, they take different approaches. Moshy runs a lean, clinically-led telehealth pathway open to anyone eligible; Juniper pairs medication access with a structured coaching and habit program and markets primarily to women. The right choice depends on how much coaching support you want alongside the clinical side. Both can facilitate GLP-1 access through Australian-registered practitioners where clinically appropriate.",
  },
  {
    q: "How do I choose between Moshy and Juniper?",
    a: "Think about the kind of support you want. Moshy keeps the experience focused on the clinical pathway: eligibility check, practitioner review, and delivery if appropriate. Juniper wraps medication access inside a broader coaching and community program, which it designs and markets for women. If neither fits your situation, a GP is always a valid starting point. This is general information, not medical advice.",
  },
  {
    q: "Do Moshy and Juniper both offer GLP-1 medications like semaglutide?",
    a: "Both are commonly associated with GLP-1 weight-management pathways. GLP-1 medications are prescription-only in Australia and access depends entirely on individual clinical assessment by a registered practitioner. Neither platform guarantees any specific medication before that assessment. This page is not medical advice.",
  },
  {
    q: "How much do Moshy and Juniper cost?",
    a: "Both run subscription models, and the cost depends on the treatment plan determined during the clinical consultation rather than a single fixed price. Each platform shows current pricing during its eligibility flow before any commitment. Australian Reddit communities are a useful place to find recent firsthand cost figures.",
  },
  {
    q: "What does Reddit say about Moshy vs Juniper?",
    a: "Both appear regularly in Australian weight-loss, GLP-1, and telehealth subreddits, and experiences vary by individual. Common themes: people value the convenience of the online process, and Juniper users often mention the coaching/community element while Moshy users focus on the clinical pathway. Read recent threads before deciding.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const rows: { label: string; moshy: string; juniper: string }[] = [
  { label: "Approach", moshy: "Clinical pathway, open to anyone eligible", juniper: "Coaching-led, marketed for women" },
  { label: "Model", moshy: "Clinical, practitioner-led pathway", juniper: "Medication + structured coaching & community" },
  { label: "GLP-1 access", moshy: "Via registered practitioner, if eligible", juniper: "Via registered practitioner, if eligible" },
  { label: "Process", moshy: "Online eligibility → practitioner review → delivery", juniper: "Online eligibility → practitioner review → program + delivery" },
  { label: "Pricing", moshy: "Subscription, shown in eligibility flow", juniper: "Subscription, shown in eligibility flow" },
  { label: "Best if you want", moshy: "A focused, no-friction clinical pathway", juniper: "Coaching and accountability alongside medication" },
];

export default function MoshyVsJuniperPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content" className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 pb-24 pt-12 sm:pt-16">
        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#3d4b44]">
          <Link href="/" className="hover:text-[#2b362f] transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-[#2b362f] transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Moshy vs Juniper</span>
        </nav>

        {/* Hero */}
        <p className="text-[#9aa39c] text-xs mb-5">Updated June 2026 · Australia · Not medical advice</p>
        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-4">
          Moshy vs Juniper:{" "}
          <span style={{ color: CYAN_LT }}>which one is built for you?</span>
        </h1>
        <p className="text-[#3d4b44] text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
          Australia&apos;s two most-compared weight-loss telehealth platforms answer the same problem in different
          ways. The short version: <strong className="text-[#2b362f]">Moshy runs a lean clinical pathway, Juniper wraps
          medication in a coaching program</strong>, and the difference goes deeper than that.
        </p>
        <p className="mb-8 rounded-lg border border-[#e5e9e7] bg-[#f5f8f6] px-4 py-3 text-xs leading-relaxed text-[#3d4b44]">
          <span className="font-semibold text-[#2b362f]">Information only.</span> This page compares two telehealth services and is not medical advice. It does not recommend any treatment or medication or imply suitability for any individual. Prescription medicines in Australia are available only after assessment by a registered practitioner.
        </p>

        {/* Quick Verdict */}
        <div className="rounded-xl border px-6 py-5 mb-10" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: CYAN_LT }}>Quick Verdict</p>
          <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed">
            If you want a focused, clinically-led pathway with a fast online eligibility check, Moshy is a natural
            starting point and is open to anyone eligible. If you want coaching and accountability wrapped around
            medication, Juniper is built for that and markets primarily to women. Both assess suitability individually
            through registered Australian practitioners.
          </p>
          <div className="mt-5">
            <a
              {...aff(MOSHY_URL)}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
              style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
            >
              Check Moshy Eligibility
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Comparison table */}
        <h2 className="text-xl font-black mb-4">Moshy vs Juniper at a glance</h2>
        <div className="overflow-hidden rounded-xl border border-[#e5e9e7] mb-10">
          <table className="w-full text-sm">
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
            Juniper wraps medication access inside a broader program — coaching, habit tracking, and a community — and
            positions weight management as a longer behavioural project rather than a prescription alone. If accountability
            and structure are what tend to make or break your results, that is a meaningful advantage.
          </p>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            Neither approach is objectively superior. Outcomes from weight-management programs depend on clinical
            suitability, adherence, and individual factors far more than on which logo is on the box.
          </p>
        </section>

        {/* Dual CTA */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: CYAN_LT }}>The clinical pathway</p>
            <h3 className="text-lg font-bold mb-2">Start with Moshy</h3>
            <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">
              Fast online eligibility check, practitioner-reviewed, delivered. No code needed — the referral applies automatically.
            </p>
            <a
              {...aff(MOSHY_URL)}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md"
              style={{ background: CYAN, boxShadow: `0 8px 24px ${CYAN}25` }}
            >
              Continue to Moshy
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3">
              <Link href="/moshy" className="text-xs text-[#3d4b44] underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#2b362f]">
                Read our full Moshy review →
              </Link>
            </p>
          </div>
          <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2 text-[#3d4b44]">For women</p>
            <h3 className="text-lg font-bold mb-2">Consider Juniper</h3>
            <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">
              Medication access plus a structured coaching and community program designed for women.
            </p>
            <a
              {...ext(JUNIPER_URL)}
              className="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold text-[#2b362f] transition-all hover:text-[#10251b]"
              style={{ borderColor: `${CYAN}30` }}
            >
              Visit Juniper
            </a>
          </div>
        </div>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-black mb-5">Moshy vs Juniper — FAQ</h2>
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
          <Link href="/guides" style={{ color: CYAN }} className="hover:opacity-80">All guides →</Link>
        </div>

        <p className="text-[#9aa39c] text-xs mt-8 leading-relaxed">
          This page contains affiliate links — we may earn a commission if you sign up through them, at no extra cost to
          you. It does not constitute medical advice. GLP-1 and other prescription treatments require assessment by a
          registered Australian practitioner. Consult a qualified health professional before making health decisions.
        </p>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy weight-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
