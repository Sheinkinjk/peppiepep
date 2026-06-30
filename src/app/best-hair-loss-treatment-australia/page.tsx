import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSH_HAIR_URL, DENSE_URL } from "@/lib/affiliate-links";
import { CheckCircle2, XCircle, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.bestHairLossTreatmentAustralia);

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
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Best Hair Loss Treatment Australia 2026", item: `${SITE_URL}/best-hair-loss-treatment-australia` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best Hair Loss Treatments Australia 2026",
  description: "Comparison of the best hair loss treatments and providers in Australia — Mosh, Dense Hair Experts, and telehealth options.",
  numberOfItems: 3,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Mosh Hair Loss Treatment", description: "Australian telehealth platform offering clinically supervised hair loss treatment including finasteride and minoxidil with online consultation.", url: `${SITE_URL}/moshhair` },
    { "@type": "ListItem", position: 2, name: "Dense Hair Experts", description: "Australian hair care brand specialising in density and thickness products — shampoos, conditioners, serums, and scalp treatments.", url: `${SITE_URL}/dense` },
    { "@type": "ListItem", position: 3, name: "Telehealth Hair Loss Options", description: "Online clinical consultation for prescription hair loss treatments in Australia — finasteride, minoxidil, and combination approaches.", url: `${SITE_URL}/best-hair-loss-treatment-australia` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best hair loss treatment in Australia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most clinically effective hair loss treatments available in Australia are finasteride (oral) and minoxidil (topical or oral), used alone or in combination. Both are prescription medicines in Australia and require a consultation with a doctor or telehealth provider. Mosh offers online consultation and prescription for both. For non-prescription topical support, Dense Hair Experts provides Australian-formulated products targeting hair density and scalp health. The right approach depends on the type and stage of hair loss — a clinical assessment is the recommended starting point.",
      },
    },
    {
      "@type": "Question",
      name: "What does Reddit say about hair loss treatments in Australia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Australian Reddit communities covering hair loss — including r/HairLoss, r/tressless, and r/AustralianMen — consistently discuss finasteride and minoxidil as the most evidence-backed options for male pattern baldness. Mosh is mentioned as one of the more accessible telehealth platforms for getting a prescription in Australia without visiting a GP in person. Dense Hair Experts comes up in discussions about topical support products. Searching 'hair loss treatment Australia Reddit' or 'finasteride Australia Reddit' surfaces detailed community threads.",
      },
    },
    {
      "@type": "Question",
      name: "Is Mosh good for hair loss Australia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mosh is a legitimate Australian telehealth platform offering online consultation and prescription for hair loss treatments including finasteride and minoxidil. It provides a structured clinical process — photo assessment, questionnaire, and doctor review — and ships treatment directly to your door. Reviews generally acknowledge it as a convenient and properly supervised option for men dealing with hair loss who want to avoid a GP appointment.",
      },
    },
    {
      "@type": "Question",
      name: "What is Dense Hair Experts and is it effective?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dense Hair Experts is an Australian brand offering shampoos, conditioners, serums, and scalp treatments formulated for thinning hair and reduced density. Their products are designed as a topical support approach to hair care and are not prescription medicines. They are most effective as part of a consistent routine rather than a standalone treatment. For people with early or mild hair thinning looking for non-prescription support, Dense products are a reasonable option. For progressive or significant hair loss, clinical treatment through a telehealth provider like Mosh is the stronger approach.",
      },
    },
    {
      "@type": "Question",
      name: "Mosh vs Dense Hair Experts — which should I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The two serve different purposes and are not direct alternatives. Mosh provides clinically supervised treatment — finasteride and minoxidil — which address the underlying cause of androgenetic alopecia (male pattern baldness). Dense Hair Experts provides topical hair care products focused on density and scalp health without prescription ingredients. If you are experiencing noticeable hair loss, Mosh or another telehealth provider with prescription access is the appropriate starting point. Dense products can be used as a complementary part of a hair care routine.",
      },
    },
    {
      "@type": "Question",
      name: "Is finasteride available online in Australia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Finasteride is a prescription medicine in Australia but can be prescribed through online telehealth consultations. Platforms like Mosh allow you to complete a questionnaire and photo assessment, which is reviewed by a registered Australian doctor. If suitable, a prescription is issued and treatment is delivered directly. A GP consultation — whether in person or online — is required before starting finasteride.",
      },
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.bestHairLossTreatmentAustralia.title,
  description: seoConfig.bestHairLossTreatmentAustralia.description,
  url: `${SITE_URL}/best-hair-loss-treatment-australia`,
  breadcrumb: breadcrumbSchema,
  mainEntity: faqSchema,
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const CYAN    = "#0AA7B5";
const CYAN_LT = "#22C0CD";

const options = [
  {
    name: "Mosh Hair Loss",
    badge: "Clinically Supervised",
    badgeColor: CYAN_LT,
    href: MOSH_HAIR_URL,
    internalHref: "/moshhair",
    category: "Telehealth / Prescription",
    tagline: "Online consultation and prescription — finasteride and minoxidil delivered to your door",
    pros: [
      "Clinically supervised — proper doctor review",
      "Access to finasteride and minoxidil (most evidence-backed treatments)",
      "No GP appointment needed — online questionnaire and photo assessment",
      "Shipped directly to your door across Australia",
      "Structured follow-up and ongoing clinical support",
      "Can combine treatments based on your hair loss profile",
    ],
    cons: [
      "Requires ongoing prescription — not a one-off purchase",
      "Finasteride is not suitable for everyone — medical review required",
      "Results take 6-12 months to fully assess",
    ],
  },
  {
    name: "Dense Hair Experts",
    badge: "Topical Support",
    badgeColor: "#F59E0B",
    href: DENSE_URL,
    internalHref: "/dense",
    category: "Topical Hair Care",
    tagline: "Australian hair care products for density, thickness, and scalp health",
    pros: [
      "No prescription required — order directly online",
      "Australian brand focused on hair density and scalp health",
      "Products designed for consistent daily use",
      "Covers shampoos, conditioners, serums, and treatments",
      "Ships within Australia",
    ],
    cons: [
      "Topical products only — does not address underlying hair loss cause",
      "Less clinical evidence than finasteride or minoxidil",
      "Best as complementary support, not a standalone solution for significant hair loss",
    ],
  },
  {
    name: "GP / Specialist Referral",
    badge: "Full Clinical",
    badgeColor: "#8B5CF6",
    href: "#faq",
    internalHref: null,
    category: "In-Person or Telehealth GP",
    tagline: "Full clinical assessment including blood work and specialist referral",
    pros: [
      "Most comprehensive assessment — blood work, scalp check, full history",
      "Can refer to dermatologist or trichologist for complex cases",
      "PRP, hair transplant surgery referrals available",
      "Access to full range of prescription treatments",
    ],
    cons: [
      "Longer wait times for appointments",
      "Higher cost than telehealth platforms for standard cases",
      "Not always necessary for straightforward male pattern baldness",
    ],
  },
];

const features = [
  { label: "Treatment type",          mosh: "Prescription medicine",      dense: "Topical products",           gp: "Full clinical" },
  { label: "Requires prescription",   mosh: "Yes — via telehealth",        dense: "No",                         gp: "Yes — issued after consult" },
  { label: "Clinical oversight",      mosh: "Doctor-reviewed online",      dense: "None",                       gp: "Full GP or specialist" },
  { label: "Finasteride access",      mosh: "Yes",                         dense: "No",                         gp: "Yes" },
  { label: "Minoxidil access",        mosh: "Yes (topical & oral)",        dense: "No",                         gp: "Yes" },
  { label: "No appointment needed",   mosh: "Yes — fully online",          dense: "Yes — order direct",         gp: "No" },
  { label: "Ships to Australia",      mosh: "Yes",                         dense: "Yes",                        gp: "N/A" },
  { label: "Best for",                mosh: "Pattern baldness treatment",  dense: "Thinning / early volume loss",gp: "Complex or uncertain cases" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function BestHairLossTreatmentAustraliaPage() {
  return (
    <div className="relative min-h-screen bg-[#060f15] text-white">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(10,167,181,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,192,205,0.04),transparent_55%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-5xl px-5 sm:px-8 lg:px-12 pb-24 pt-14 sm:pt-18">

        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 text-sm text-white/40">
          <Link href="/" className="hover:text-white/70 transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-white/70 transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-white/60">Best Hair Loss Treatment Australia 2026</span>
        </nav>

        {/* Jump Nav */}
        <div className="mb-10 flex flex-wrap gap-2">
          {["#comparison", "#feature-table", "#reddit-verdict", "#faq"].map((href) => {
            const label = href.slice(1).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
            return (
              <a
                key={href}
                href={href}
                className="rounded-full px-3 py-1 text-xs font-medium transition-all hover:opacity-80"
                style={{ color: CYAN_LT, border: `1px solid ${CYAN}40`, background: `${CYAN}08` }}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* Hero */}
        <div className="mb-16 sm:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0AA7B5]/30 bg-[#0AA7B5]/[0.07] px-3.5 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22C0CD]" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#22C0CD]">Australia · 2026</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black leading-[1.07] text-white mb-5 tracking-tight">
            Best Hair Loss Treatment Australia 2026:{" "}
            <span style={{ color: CYAN_LT }}>Mosh vs Dense vs Telehealth</span>
          </h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            A practical comparison of the most accessible hair loss options for Australians — prescription telehealth, topical products, and when to see a specialist.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8">
            {["Australian providers", "Clinical vs topical breakdown", "Reddit verdict included"].map((tag) => (
              <span key={tag} className="flex items-center gap-2 text-sm text-[#0AA7B5]/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C0CD] flex-shrink-0" />
                {tag}
              </span>
            ))}
          </div>
          <p className="text-white/30 text-xs mb-8">
            This page contains affiliate links. We may earn a commission if you purchase through them. This does not constitute medical advice — consult a registered healthcare professional before starting any hair loss treatment.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              {...aff(MOSH_HAIR_URL)}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
              style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
            >
              Try Mosh Hair Loss
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              {...aff(DENSE_URL)}
              className="inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold text-white/70 transition-all hover:text-white"
              style={{ borderColor: `${CYAN}30` }}
            >
              Shop Dense Hair Experts
            </a>
          </div>
        </div>

        {/* Quick Verdict (answer-first, GEO) */}
        <div className="mb-16 sm:mb-20 max-w-3xl rounded-xl border px-6 py-5" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: CYAN_LT }}>
            Quick Verdict
          </p>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            For prescription hair-loss treatment in Australia (finasteride and minoxidil), Mosh is the most accessible telehealth option — online consultation, practitioner review, and delivery. Dense Hair Experts is a topical, non-prescription complement for density and scalp health. For significant or rapid hair loss, see a specialist. This is not medical advice.
          </p>
        </div>

        {/* Overview */}
        <section id="comparison" className="border-t border-[#0AA7B5]/10 py-12 sm:py-14">
          <h2 className="text-xl sm:text-2xl font-black text-white mb-5">The Landscape: Clinical vs Topical</h2>
          <div className="space-y-4 text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl">
            <p>
              Hair loss treatment in Australia splits into two broad approaches: prescription medicines that address the underlying cause, and topical products that support scalp health and density. The right choice depends on the type, severity, and stage of hair loss.
            </p>
            <p>
              Finasteride and minoxidil are the most clinically evidence-backed treatments for androgenetic alopecia (male pattern baldness). Both require prescriptions in Australia and are now accessible via online telehealth without a GP appointment. Mosh is one of the main platforms offering this.
            </p>
            <p>
              Dense Hair Experts offers topical products — shampoos, serums, conditioners — formulated for hair density and scalp health. These are non-prescription and designed for daily use. They work best as a complementary part of a routine or for people with mild thinning who are not ready for prescription treatment.
            </p>
          </div>
        </section>

        {/* Option Cards */}
        <section className="border-t border-[#0AA7B5]/10 py-12 sm:py-14 space-y-8">
          {options.map((opt) => (
            <div
              key={opt.name}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-7 sm:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-black text-white">{opt.name}</h3>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: opt.badgeColor, background: `${opt.badgeColor}15`, border: `1px solid ${opt.badgeColor}30` }}
                    >
                      {opt.badge}
                    </span>
                  </div>
                  <p className="text-white/35 text-xs mb-1">{opt.category}</p>
                  <p className="text-white/45 text-sm">{opt.tagline}</p>
                </div>
                {opt.internalHref && (
                  <Link
                    href={opt.internalHref}
                    className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: CYAN }}
                  >
                    View {opt.name}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: CYAN_LT }}>Pros</p>
                  <ul className="space-y-2">
                    {opt.pros.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: CYAN_LT }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-red-400/70 mb-3">Cons</p>
                  <ul className="space-y-2">
                    {opt.cons.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                        <XCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-red-400/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Feature Table */}
        <section id="feature-table" className="border-t border-[#0AA7B5]/10 py-12 sm:py-14">
          <h2 className="text-xl sm:text-2xl font-black text-white mb-8">Side-by-Side Comparison</h2>
          <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[580px] text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left pb-3 pr-4 text-[11px] font-semibold uppercase tracking-widest text-white/30">Feature</th>
                  {["Mosh", "Dense", "GP / Specialist"].map((col) => (
                    <th key={col} className="text-left pb-3 pr-4 text-[11px] font-semibold uppercase tracking-widest" style={{ color: col === "Mosh" ? CYAN_LT : "rgba(255,255,255,0.3)" }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white/[0.015]" : ""}>
                    <td className="py-3 pr-4 text-white/40 font-medium">{row.label}</td>
                    <td className="py-3 pr-4 text-white/70 font-medium">{row.mosh}</td>
                    <td className="py-3 pr-4 text-white/55">{row.dense}</td>
                    <td className="py-3 pr-4 text-white/55">{row.gp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Reddit Verdict */}
        <section id="reddit-verdict" className="border-t border-[#0AA7B5]/10 py-12 sm:py-14">
          <h2 className="text-xl sm:text-2xl font-black text-white mb-5">What Reddit Says About Hair Loss in Australia</h2>
          <div className="space-y-4 text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl">
            <p>
              Australian Reddit communities discussing hair loss — including r/tressless, r/HairLoss, r/AskAustralia, and r/AustralianMen — consistently point to finasteride and minoxidil as the starting point for anyone dealing with male pattern baldness. The community consensus is that topical products alone are unlikely to stop progression.
            </p>
            <p>
              Mosh comes up regularly as one of the more convenient telehealth options for getting a finasteride prescription in Australia without booking a GP in person. The main community discussion points are: the clinical process being straightforward, shipping reliability, and cost compared to a private GP consult.
            </p>
            <p>
              Dense Hair Experts is mentioned in threads about topical support — primarily for people looking to improve density and scalp health as a complement to medical treatment, or for those not yet at the point of wanting prescription treatment.
            </p>
            <p>
              Searching "finasteride Australia Reddit", "hair loss treatment Australia Reddit", or "Mosh hair Reddit" surfaces detailed community threads with firsthand experience from Australian users.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="border-t border-[#0AA7B5]/10 py-10">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 max-w-2xl">
            <p className="text-xs text-white/35 leading-relaxed">
              <strong className="text-white/50">Medical disclaimer:</strong> This page is for informational purposes only and does not constitute medical advice. Hair loss has multiple causes and the appropriate treatment varies by individual. Consult a registered Australian healthcare professional before starting any hair loss treatment, particularly prescription medicines such as finasteride. Individual results vary.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-[#0AA7B5]/10 py-12 sm:py-14">
          <h2 className="text-xl sm:text-2xl font-black text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-2xl">
            {[
              {
                q: "What is the best hair loss treatment in Australia?",
                a: "The most clinically effective treatments are finasteride and minoxidil, both available via telehealth prescription. Mosh offers online consultation and prescription. Dense Hair Experts provides topical support products for density and scalp health without prescription. The right approach depends on the type and stage of hair loss.",
              },
              {
                q: "What does Reddit say about hair loss treatments in Australia?",
                a: "Australian Reddit communities consistently discuss finasteride and minoxidil as the most evidence-backed options for male pattern baldness. Mosh is mentioned as a convenient telehealth platform. Dense Hair Experts comes up in discussions about topical support. Searching 'hair loss treatment Australia Reddit' surfaces detailed community threads.",
              },
              {
                q: "Is Mosh good for hair loss Australia?",
                a: "Mosh is a legitimate Australian telehealth platform offering online consultation and prescription for hair loss treatments including finasteride and minoxidil. Reviews acknowledge it as a convenient, properly supervised option for men who want to avoid a GP appointment.",
              },
              {
                q: "Mosh vs Dense Hair Experts — which should I use?",
                a: "They serve different purposes. Mosh provides prescription treatment addressing the underlying cause of androgenetic alopecia. Dense provides topical hair care products focused on density and scalp health without prescription ingredients. For noticeable hair loss, clinical treatment is the appropriate starting point. Dense can be used as a complementary part of a hair care routine.",
              },
              {
                q: "Is finasteride available online in Australia?",
                a: "Yes. Finasteride is a prescription medicine but can be prescribed through online telehealth consultations. Platforms like Mosh allow you to complete a questionnaire and photo assessment reviewed by a registered Australian doctor. A consultation — in person or online — is required before starting finasteride.",
              },
            ].map(({ q, a }, i) => (
              <div key={i} className="border-b border-white/[0.05] pb-6">
                <h3 className="text-sm font-bold text-white mb-2">{q}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-[#0AA7B5]/10 pt-14 sm:pt-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Start With a{" "}
            <span style={{ color: CYAN_LT }}>Clinical Assessment.</span>
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto mb-7 leading-relaxed">
            Access online consultation and prescription for hair loss treatment in Australia through Mosh.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              {...aff(MOSH_HAIR_URL)}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
              style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
            >
              Try Mosh Hair Loss
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              {...aff(DENSE_URL)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border px-7 py-3.5 text-sm font-semibold text-white/70 transition-all hover:text-white"
              style={{ borderColor: `${CYAN}30` }}
            >
              Shop Dense Hair Experts
            </a>
          </div>

          {/* Related guides */}
          <div className="mt-14 text-left max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/25 mb-5">Related Guides</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { href: "/moshhair", label: "Mosh Hair Discount Code & Review" },
                { href: "/dense", label: "Dense Hair Experts Offer" },
                { href: "/best-weight-loss-telehealth-australia", label: "Best Weight Loss Telehealth Australia" },
                { href: "/guides", label: "All Comparison Guides" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" style={{ color: CYAN }} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
