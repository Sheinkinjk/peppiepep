import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSHY_URL, JUNIPER_URL } from "@/lib/affiliate-links";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.moshyVsJuniper);

const CYAN = "#0AA7B5";
const CYAN_LT = "#22C0CD";

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
    a: "Neither is universally better — they are built for different people. Moshy is a men-only weight-management telehealth service; Juniper is women-only and pairs medication access with a structured coaching and habit program. The right choice is the one matched to your gender and how much coaching support you want. Both can facilitate GLP-1 access through Australian-registered practitioners where clinically appropriate.",
  },
  {
    q: "Can men use Juniper or women use Moshy?",
    a: "Juniper's program is designed and marketed for women, and Moshy's for men. Their clinical content and coaching are tailored accordingly, so most people start with the platform built for them. If neither fits your situation, a GP is always a valid starting point. This is general information, not medical advice.",
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
  { label: "Designed for", moshy: "Men", juniper: "Women" },
  { label: "Model", moshy: "Clinical, practitioner-led pathway", juniper: "Medication + structured coaching & community" },
  { label: "GLP-1 access", moshy: "Via registered practitioner, if eligible", juniper: "Via registered practitioner, if eligible" },
  { label: "Process", moshy: "Online eligibility → practitioner review → delivery", juniper: "Online eligibility → practitioner review → program + delivery" },
  { label: "Pricing", moshy: "Subscription, shown in eligibility flow", juniper: "Subscription, shown in eligibility flow" },
  { label: "Best if you want", moshy: "A focused, no-friction clinical pathway", juniper: "Coaching and accountability alongside medication" },
];

export default function MoshyVsJuniperPage() {
  return (
    <div className="relative min-h-screen bg-[#060f15] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(10,167,181,0.10),transparent_55%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 pb-24 pt-12 sm:pt-16">
        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/40">
          <Link href="/" className="hover:text-white/70 transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-white/70 transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-white/60">Moshy vs Juniper</span>
        </nav>

        {/* Hero */}
        <p className="text-white/25 text-xs mb-5">Updated June 2026 · Australia · Not medical advice</p>
        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-4">
          Moshy vs Juniper:{" "}
          <span style={{ color: CYAN_LT }}>which one is built for you?</span>
        </h1>
        <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
          Australia&apos;s two most-compared weight-loss telehealth platforms answer the same problem for different
          people. The short version: <strong className="text-white/80">Moshy is for men, Juniper is for women</strong> — and the
          difference goes deeper than that.
        </p>
        <p className="mb-8 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-xs leading-relaxed text-white/45">
          <span className="font-semibold text-white/70">Information only.</span> This page compares two telehealth services and is not medical advice. It does not recommend any treatment or medication or imply suitability for any individual. Prescription medicines in Australia are available only after assessment by a registered practitioner.
        </p>

        {/* Quick Verdict */}
        <div className="rounded-xl border px-6 py-5 mb-10" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: CYAN_LT }}>Quick Verdict</p>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            If you are a man, Moshy is the natural starting point — a focused, clinically-led pathway with a fast online
            eligibility check. If you are a woman who wants coaching and accountability alongside medication, Juniper is
            purpose-built for that. Both assess suitability individually through registered Australian practitioners.
          </p>
          <div className="mt-5">
            <a
              {...aff(MOSHY_URL)}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
              style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
            >
              Check Moshy Eligibility (Men)
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Comparison table */}
        <h2 className="text-xl font-black mb-4">Moshy vs Juniper at a glance</h2>
        <div className="overflow-hidden rounded-xl border border-white/[0.08] mb-10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.03]">
                <th className="text-left font-semibold text-white/40 px-4 py-3 w-1/4"></th>
                <th className="text-left font-black text-white px-4 py-3">Moshy</th>
                <th className="text-left font-black text-white px-4 py-3">Juniper</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-t border-white/[0.06] align-top">
                  <td className="px-4 py-3 text-white/40 font-medium">{r.label}</td>
                  <td className="px-4 py-3 text-white/70">{r.moshy}</td>
                  <td className="px-4 py-3 text-white/70">{r.juniper}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Prose */}
        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">The real difference</h2>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed">
            Gender targeting is the headline, but the more useful distinction is philosophy. Moshy keeps the experience
            deliberately lean: complete the eligibility questionnaire, have a practitioner review your case, and — if
            appropriate — proceed with a treatment plan delivered to your door. For a lot of men who simply want to get
            started without friction, that focus is the appeal.
          </p>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed">
            Juniper wraps medication access inside a broader program — coaching, habit tracking, and a community — and
            positions weight management as a longer behavioural project rather than a prescription alone. If accountability
            and structure are what tend to make or break your results, that is a meaningful advantage.
          </p>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed">
            Neither approach is objectively superior. Outcomes from weight-management programs depend on clinical
            suitability, adherence, and individual factors far more than on which logo is on the box.
          </p>
        </section>

        {/* Dual CTA */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: CYAN_LT }}>For men</p>
            <h3 className="text-lg font-bold mb-2">Start with Moshy</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
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
              <Link href="/moshy" className="text-xs text-white/40 underline decoration-white/20 underline-offset-2 hover:text-white/70">
                Read our full Moshy review →
              </Link>
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2 text-white/40">For women</p>
            <h3 className="text-lg font-bold mb-2">Consider Juniper</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Medication access plus a structured coaching and community program designed for women.
            </p>
            <a
              {...ext(JUNIPER_URL)}
              className="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold text-white/70 transition-all hover:text-white"
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
              <details key={f.q} className="group rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-white text-sm sm:text-base flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-white/30 group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                </summary>
                <p className="text-white/55 text-sm leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related */}
        <div className="border-t border-white/[0.08] mt-12 pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/best-weight-loss-telehealth-australia" style={{ color: CYAN }} className="hover:opacity-80">
            Best Weight Loss Telehealth Australia →
          </Link>
          <Link href="/moshy" style={{ color: CYAN }} className="hover:opacity-80">Moshy full review →</Link>
          <Link href="/guides" style={{ color: CYAN }} className="hover:opacity-80">All guides →</Link>
        </div>

        <p className="text-white/25 text-xs mt-8 leading-relaxed">
          This page contains affiliate links — we may earn a commission if you sign up through them, at no extra cost to
          you. It does not constitute medical advice. GLP-1 and other prescription treatments require assessment by a
          registered Australian practitioner. Consult a qualified health professional before making health decisions.
        </p>
      </main>
    </div>
  );
}
