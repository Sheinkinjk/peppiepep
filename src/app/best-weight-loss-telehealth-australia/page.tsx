import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSHY_URL, JUNIPER_URL, BETTERBEING_URL } from "@/lib/affiliate-links";
import { CheckCircle2, XCircle, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.bestWeightLossTelehealth);

const aff = (url: string) => ({
  href: url,
  target: "_blank" as const,
  rel: "nofollow sponsored" as const,
});

const ext = (url: string) => ({
  href: url,
  target: "_blank" as const,
  rel: "noopener noreferrer" as const,
});

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Best Weight Loss Telehealth Australia 2026", item: `${SITE_URL}/best-weight-loss-telehealth-australia` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best Weight Loss Telehealth Platforms Australia 2026",
  description: "In-depth comparison of Australian weight loss telehealth platforms — Moshy, Juniper, and Better Being. GLP-1 access, eligibility process, pricing, and who each platform suits.",
  numberOfItems: 3,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Moshy", description: "Australian telehealth weight management platform for men. Online eligibility questionnaire, practitioner review, GLP-1 medication access. Subscription with home delivery.", url: `${SITE_URL}/moshy` },
    { "@type": "ListItem", position: 2, name: "Juniper", description: "Australian weight management program for women. Combines GLP-1 medication with health coaching and ongoing practitioner support. Premium subscription model.", url: JUNIPER_URL },
    { "@type": "ListItem", position: 3, name: "Better Being", description: "Australian digital health platform with a holistic weight management approach. Practitioner support, nutrition, and lifestyle programs.", url: BETTERBEING_URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best weight loss telehealth platform in Australia in 2026?",
      acceptedAnswer: { "@type": "Answer", text: "Moshy and Juniper are the most widely used GLP-1 telehealth weight loss platforms in Australia in 2026. Moshy is primarily designed for men seeking clinically supervised weight management including medication options. Juniper is designed for women and combines GLP-1 medication with a coached program. Better Being takes a broader lifestyle approach. Suitability depends on individual health factors — consult a qualified health professional before starting any weight management programme." }
    },
    {
      "@type": "Question",
      name: "Is Moshy or Juniper better for weight loss in Australia?",
      acceptedAnswer: { "@type": "Answer", text: "Moshy and Juniper serve different demographics. Moshy is targeted at Australian men. Juniper is designed for Australian women and includes health coaching as part of its programme. Both use an online eligibility questionnaire and practitioner-led review process. Neither is right for everyone — suitability is assessed individually by each platform's clinical team. This page does not constitute medical advice." }
    },
    {
      "@type": "Question",
      name: "Do these platforms provide GLP-1 medications for weight loss?",
      acceptedAnswer: { "@type": "Answer", text: "Moshy and Juniper are both known for offering GLP-1 medication options (such as Semaglutide) through their telehealth model, subject to clinical eligibility assessment. GLP-1 medications are prescription-only in Australia and only available following a practitioner consultation and individual assessment. Not every person who completes an eligibility questionnaire will be prescribed medication. Better Being focuses more on behavioural and lifestyle-based approaches. This page does not constitute medical advice." }
    },
    {
      "@type": "Question",
      name: "How do I access these weight loss platforms in Australia?",
      acceptedAnswer: { "@type": "Answer", text: "All three platforms operate through an online eligibility and consultation process. Users complete an online questionnaire, which is reviewed by a practitioner. If eligible, treatment or programme access is arranged via subscription. Moshy and Juniper deliver medications directly to your home if prescribed. Click the links on this page to access each platform's eligibility flow directly." }
    },
    {
      "@type": "Question",
      name: "Is weight loss telehealth in Australia covered by Medicare or private health insurance?",
      acceptedAnswer: { "@type": "Answer", text: "Coverage varies by insurer and individual policy. Telehealth consultations may attract a Medicare rebate in some circumstances, but the specific medications, programmes, and subscription costs offered by Moshy, Juniper, and Better Being are typically not fully covered by Medicare. Check with each platform and your insurer for current coverage information. This page does not provide financial or health advice." }
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.bestWeightLossTelehealth.title,
  description: seoConfig.bestWeightLossTelehealth.description,
  url: seoConfig.bestWeightLossTelehealth.url,
  inLanguage: "en-AU",
  datePublished: "2026-03-16",
  dateModified: "2026-03-16",
  about: [
    { "@type": "Thing", name: "weight loss telehealth Australia 2026" },
    { "@type": "Thing", name: "Moshy vs Juniper Australia" },
    { "@type": "Thing", name: "GLP-1 telehealth Australia" },
    { "@type": "Thing", name: "online weight management Australia" },
    { "@type": "Thing", name: "Semaglutide Australia telehealth" },
    { "@type": "Thing", name: "Moshy weight loss review" },
    { "@type": "Thing", name: "Juniper weight loss Australia" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

// ─── Design tokens ────────────────────────────────────────────────────────────

const CYAN    = "#0AA7B5";
const CYAN_LT = "#22C0CD";

// ─── Sub-components ───────────────────────────────────────────────────────────

function Pro({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm text-white/60 leading-snug">
      <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: CYAN_LT }} />
      {text}
    </li>
  );
}

function Con({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm text-white/30 leading-snug">
      <XCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-white/15" />
      {text}
    </li>
  );
}

function TableCheck({ yes }: { yes: boolean }) {
  return yes
    ? <CheckCircle2 className="h-4 w-4 mx-auto" style={{ color: CYAN_LT }} />
    : <span className="block text-center text-white/15 text-xs">—</span>;
}

// ─── Platform card ────────────────────────────────────────────────────────────

interface PlatformCardProps {
  id: string;
  index: string;
  name: string;
  tagline: string;
  deal: string;
  dealNote: string;
  pros: string[];
  cons: string[];
  affUrl?: string;
  extUrl?: string;
  ctaLabel: string;
  internalUrl?: string;
  reviewLabel?: string;
  isAffiliate: boolean;
}

function PlatformCard({
  id, index, name, tagline, deal, dealNote,
  pros, cons, affUrl, extUrl, ctaLabel, internalUrl, reviewLabel, isAffiliate,
}: PlatformCardProps) {
  const ctaHref = isAffiliate ? affUrl! : extUrl!;
  const ctaLinkProps = isAffiliate ? aff(ctaHref) : ext(ctaHref);

  return (
    <section
      id={id}
      className="border-t border-white/[0.06] py-10 sm:py-12 scroll-mt-24"
    >
      <div className="grid lg:grid-cols-[1fr_260px] gap-8 lg:gap-12">

        {/* Left — identity + content */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="h-9 w-9 rounded-lg flex items-center justify-center text-[11px] font-black text-white/70 flex-shrink-0"
              style={{ background: `${CYAN}1A`, border: `1px solid ${CYAN}30` }}
            >
              {index}
            </div>
            <h2 className="text-xl font-black text-white leading-none">{name}</h2>
          </div>

          <p className="text-white/55 text-sm sm:text-base leading-relaxed mb-5 max-w-lg">
            {tagline}
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/20 mb-2.5">Strengths</p>
              <ul className="space-y-2">
                {pros.map((p) => <Pro key={p} text={p} />)}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/20 mb-2.5">Limitations</p>
              <ul className="space-y-2">
                {cons.map((c) => <Con key={c} text={c} />)}
              </ul>
            </div>
          </div>
        </div>

        {/* Right — deal + CTA */}
        <div className="flex flex-col gap-4">
          <div
            className="rounded-xl p-5"
            style={{ background: `${CYAN}0D`, border: `1px solid ${CYAN}30` }}
          >
            <p className="text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: CYAN_LT }}>
              Current access
            </p>
            <p className="text-white font-black text-base leading-snug mb-1">{deal}</p>
            <p className="text-white/40 text-xs leading-snug">{dealNote}</p>
          </div>

          <a
            {...ctaLinkProps}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            style={{ background: CYAN, boxShadow: `0 6px 24px ${CYAN}30` }}
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </a>

          {internalUrl && reviewLabel && (
            <Link
              href={internalUrl}
              className="inline-flex items-center justify-center gap-1.5 text-xs transition-colors hover:opacity-80"
              style={{ color: `${CYAN_LT}60` }}
            >
              {reviewLabel} <ExternalLink className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Page data ────────────────────────────────────────────────────────────────

const platforms: PlatformCardProps[] = [
  {
    id: "moshy",
    index: "01",
    name: "Moshy",
    tagline: "Australian telehealth weight management for men. Moshy's online eligibility questionnaire is reviewed by Australian-registered practitioners. GLP-1 medication options are available subject to individual clinical assessment. Subscription with home delivery.",
    deal: "Online eligibility — referral link",
    dealNote: "Our referral link takes you directly to the Moshy eligibility page. No code required. The offer is applied at the link level.",
    pros: [
      "Purpose-built for Australian men",
      "GLP-1 medication access (subject to eligibility)",
      "Online-only process — no in-person GP visit required",
      "Subscription home delivery",
    ],
    cons: [
      "Men only — not available for women",
      "Not all applicants are eligible for medication",
    ],
    affUrl: MOSHY_URL,
    isAffiliate: true,
    ctaLabel: "Check Eligibility with Moshy",
    internalUrl: "/moshy",
    reviewLabel: "Full Moshy review & current offer",
  },
  {
    id: "juniper",
    index: "02",
    name: "Juniper",
    tagline: "Australian weight management programme for women. Juniper combines GLP-1 medication access with structured health coaching and practitioner support. The programme takes a more comprehensive approach than medication-only services.",
    deal: "Online eligibility check",
    dealNote: "Juniper uses an online eligibility and consultation process. Practitioners review each submission individually before recommending a programme.",
    pros: [
      "Purpose-built for Australian women",
      "GLP-1 medication access (subject to eligibility)",
      "Health coaching included in programme",
      "Online process — no in-person GP visit required",
    ],
    cons: [
      "Women only — not available for men",
      "More premium pricing than some alternatives",
    ],
    extUrl: JUNIPER_URL,
    isAffiliate: false,
    ctaLabel: "Visit Juniper",
  },
  {
    id: "betterbeing",
    index: "03",
    name: "Better Being",
    tagline: "Australian digital health platform offering a broader lifestyle-based approach to weight management. Better Being's programme includes practitioner support, nutrition guidance, and behavioural coaching — with less emphasis on medication than Moshy or Juniper.",
    deal: "Holistic weight management programme",
    dealNote: "Better Being supports clients through nutrition, lifestyle, and practitioner-led approaches. Access via their website.",
    pros: [
      "Available for both men and women",
      "Lifestyle and nutrition coaching included",
      "Practitioner-led programme support",
      "Non-medication-first approach",
    ],
    cons: [
      "Limited GLP-1 medication access compared to Moshy/Juniper",
      "Smaller community footprint in researcher forums",
    ],
    extUrl: BETTERBEING_URL,
    isAffiliate: false,
    ctaLabel: "Visit Better Being",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BestWeightLossTelehealthPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="bg-[#060f15] text-white min-h-screen">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">

          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">Refer Labs</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-white/70 transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-white/60">Best Weight Loss Telehealth</span>
          </nav>

          {/* ── Hero ─────────────────────────────────────────────────────────── */}
          <section className="pt-10 pb-8 sm:pt-12">
            <p className="text-white/25 text-xs mb-6">
              Updated March 2026 &middot; Australia only &middot; Not medical advice
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black leading-[1.08] tracking-tight text-white mb-4 max-w-3xl">
              Best Weight Loss Telehealth Australia 2026:{" "}
              <span style={{ color: CYAN_LT }}>Moshy vs Juniper vs Better Being</span>
            </h1>

            <p className="text-white/45 text-sm sm:text-base leading-relaxed max-w-2xl mb-3">
              Moshy and Juniper dominate GLP-1-based weight management in Australia — but they serve different demographics. Moshy is men-only. Juniper is women-only. Better Being takes a more holistic, lifestyle-first approach and serves both.
            </p>
            <p className="text-white/45 text-sm sm:text-base leading-relaxed max-w-2xl mb-7">
              Below: what each platform actually does, who it suits, and how to access each eligibility flow. This page does not constitute medical advice — suitability is assessed individually by each platform&apos;s clinical team.
            </p>

            {/* Jump nav */}
            <nav aria-label="Jump to section" className="flex flex-wrap gap-2">
              {[
                { href: "#moshy",       label: "01 — Moshy" },
                { href: "#juniper",     label: "02 — Juniper" },
                { href: "#betterbeing", label: "03 — Better Being" },
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
              <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl">
                Moshy (men only) and Juniper (women only) are Australia&apos;s leading GLP-1 weight-management telehealth platforms; Better Being suits people of either gender who want a more holistic, lifestyle-first program. Eligibility and suitability are assessed individually by each platform&apos;s clinical team — this page does not constitute medical advice.
              </p>
            </div>
          </section>

          {/* ── Quick comparison table ─────────────────────────────────────────── */}
          <section className="border-t border-white/[0.06] py-8">
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full min-w-[540px] text-sm">
                <thead>
                  <tr className="border-b border-white/[0.07]">
                    <th className="text-left pb-3 pr-4 text-white/20 font-semibold text-[11px] uppercase tracking-wider w-36">Platform</th>
                    <th className="pb-3 px-3 text-left text-white/20 font-semibold text-[11px] uppercase tracking-wider">Who it&apos;s for</th>
                    <th className="pb-3 px-3 text-left text-white/20 font-semibold text-[11px] uppercase tracking-wider">Approach</th>
                    <th className="pb-3 px-3 text-left text-white/20 font-semibold text-[11px] uppercase tracking-wider">GLP-1 access</th>
                    <th className="pb-3 pl-3 text-right text-white/20 font-semibold text-[11px] uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Moshy",        audience: "Men (Australia)",         approach: "Telehealth + medication",    glp1: "Yes (subject to eligibility)", href: "#moshy",       url: MOSHY_URL,    cta: "Check eligibility",  isAff: true },
                    { name: "Juniper",      audience: "Women (Australia)",        approach: "Coaching + medication",      glp1: "Yes (subject to eligibility)", href: "#juniper",     url: JUNIPER_URL,  cta: "Visit Juniper",      isAff: false },
                    { name: "Better Being", audience: "Men & Women (Australia)",  approach: "Lifestyle + practitioner",   glp1: "Limited", href: "#betterbeing", url: BETTERBEING_URL, cta: "Visit site",  isAff: false },
                  ].map((row) => (
                    <tr key={row.name} className="border-b border-white/[0.04] hover:bg-white/[0.015] transition-colors">
                      <td className="py-3 pr-4">
                        <a href={row.href} className="text-white font-bold text-sm hover:opacity-80 transition-opacity">{row.name}</a>
                      </td>
                      <td className="py-3 px-3 text-white/40 text-xs">{row.audience}</td>
                      <td className="py-3 px-3 text-white/40 text-xs">{row.approach}</td>
                      <td className="py-3 px-3 text-xs font-semibold" style={{ color: CYAN_LT }}>{row.glp1}</td>
                      <td className="py-3 pl-3 text-right">
                        <a
                          {...(row.isAff ? aff(row.url) : ext(row.url))}
                          className="inline-flex items-center gap-1 text-xs font-bold transition-all hover:opacity-80"
                          style={{ color: CYAN_LT }}
                        >
                          {row.cta} <ArrowRight className="h-3 w-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-white/20 text-[10px] mt-3">
              GLP-1 medication access is subject to individual clinical assessment by each platform&apos;s practitioners. This comparison does not constitute medical advice.
            </p>
          </section>

          {/* ── Platform cards ────────────────────────────────────────────────── */}
          {platforms.map((p) => (
            <PlatformCard key={p.id} {...p} />
          ))}

          {/* ── Feature breakdown ─────────────────────────────────────────────── */}
          <section className="border-t border-white/[0.06] py-12 sm:py-14">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-6">
              Platform Comparison: Key Criteria
            </h2>

            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b border-white/[0.07]">
                    <th className="text-left pb-4 pr-4 text-white/20 font-semibold text-[11px] uppercase tracking-wider w-44">Criteria</th>
                    {["Moshy", "Juniper", "Better Being"].map((h) => (
                      <th key={h} className="pb-4 px-3 text-center font-bold text-white/50 text-xs">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Available in Australia",         vals: [true,  true,  true]  },
                    { label: "Men's programme",           vals: [true,  false, true]  },
                    { label: "Women's programme",         vals: [false, true,  true]  },
                    { label: "GLP-1 medication access",        vals: [true,  true,  false], note: "Subject to individual clinical eligibility" },
                    { label: "Online eligibility process",     vals: [true,  true,  true]  },
                    { label: "No in-person GP required",       vals: [true,  true,  true]  },
                    { label: "Health coaching included",       vals: [false, true,  true]  },
                    { label: "Home delivery",                  vals: [true,  true,  false] },
                    { label: "Lifestyle programme",            vals: [false, true,  true]  },
                    { label: "Community discussion",           vals: [true,  true,  false] },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.015] transition-colors">
                      <td className="py-3 pr-4 text-white/40 text-xs font-medium leading-snug">
                        {row.label}
                        {row.note && <span className="block text-white/20 text-[10px] mt-0.5">{row.note}</span>}
                      </td>
                      {row.vals.map((v, j) => (
                        <td key={j} className="py-3 px-3"><TableCheck yes={v} /></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-white/20 text-[10px] mt-4">
              Feature availability is based on publicly available information at time of publication and may change. This page does not constitute medical advice.
            </p>
          </section>

          {/* ── Verdict ──────────────────────────────────────────────────────── */}
          <section className="border-t border-white/[0.06] py-12 sm:py-14">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-6">
              The Verdict
            </h2>
            <div className="space-y-4 max-w-2xl">
              {[
                { label: "Choose Moshy if:", body: "You are a man in Australia seeking a clinically supervised weight management programme with access to GLP-1 medication options. Moshy's online-only process means no in-person GP appointment is required to start. Eligibility is assessed individually. Use our referral link for the current Moshy offer." },
                { label: "Choose Juniper if:", body: "You are a woman in Australia looking for a weight management programme that combines GLP-1 medication access with structured health coaching and practitioner support. Juniper's programme is more coaching-intensive than Moshy's and is designed for women exclusively." },
                { label: "Choose Better Being if:", body: "You want a broader lifestyle and behavioural approach to weight management that is not primarily medication-focused. Better Being is available to both men and women in Australia and includes nutrition and lifestyle coaching alongside practitioner support. A stronger fit for people who prefer or are not suited to GLP-1 medication programmes." },
              ].map(({ label, body }) => (
                <div key={label} className="border-b border-white/[0.05] pb-4">
                  <p className="text-sm font-bold text-white mb-1">{label}</p>
                  <p className="text-sm text-white/45 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ──────────────────────────────────────────────────────────── */}
          <section className="border-t border-white/[0.06] py-12 sm:py-14">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "What is the best weight loss telehealth platform in Australia?",
                  a: "Moshy (men) and Juniper (women) are the most widely used GLP-1 telehealth weight loss platforms in Australia. Better Being offers a broader lifestyle-based programme. The best platform depends on your gender, health profile, and whether you are seeking a medication-based or lifestyle-based approach. Suitability is assessed by each platform's practitioners individually.",
                },
                {
                  q: "Is Moshy or Juniper better?",
                  a: "Moshy and Juniper serve different demographics. Moshy is designed for Australian men. Juniper is designed for Australian women and includes health coaching as part of the programme. If you are a man, Moshy is the relevant option. If you are a woman, Juniper or Better Being are the relevant options. Both require individual clinical eligibility assessment.",
                },
                {
                  q: "Do Australian weight loss telehealth platforms provide Semaglutide?",
                  a: "Moshy and Juniper are known for offering GLP-1 medication options, including Semaglutide, through their telehealth model. These are prescription-only medications in Australia. Prescribing is at the sole discretion of each platform's practitioners following individual eligibility assessment. Not everyone who applies will be prescribed medication. This page does not constitute medical advice.",
                },
                {
                  q: "Are these platforms available across all of Australia?",
                  a: "Moshy, Juniper, and Better Being are all Australian platforms operating nationally. Availability may vary by state for certain services. Check each platform's website for current service coverage.",
                },
              ].map(({ q, a }, i) => (
                <div key={i} className="border-b border-white/[0.05] pb-6">
                  <h3 className="text-sm font-bold text-white mb-2">{q}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Disclaimer + internal links ───────────────────────────────────── */}
          <section className="border-t border-white/[0.06] py-8 pb-16">
            <p className="text-white/20 text-xs leading-relaxed max-w-2xl">
              This page is operated by Refer Labs and contains an affiliate referral link to Moshy. Juniper and Better Being are linked without affiliate arrangements. All content on this page is for informational purposes only and does not constitute medical advice. Suitability for any weight management programme depends on individual health factors. Consult a qualified health professional before starting any treatment.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/moshy" className="text-xs hover:opacity-80 transition-opacity" style={{ color: `${CYAN_LT}50` }}>
                Moshy discount code &amp; full review
              </Link>
              <Link href="/moshhair" className="text-xs hover:opacity-80 transition-opacity" style={{ color: `${CYAN_LT}50` }}>
                Mosh hair loss review
              </Link>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
