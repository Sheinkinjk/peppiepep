import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSH_HAIR_URL, DENSE_URL } from "@/lib/affiliate-links";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";

export const metadata = generateSEOMetadata(seoConfig.moshVsDense);

const GREEN = "#0a7c42";

const mosh = { href: MOSH_HAIR_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };
const dense = { href: DENSE_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

// ── JSON-LD ──────────────────────────────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Best Hair Loss Treatment Australia", item: `${SITE_URL}/best-hair-loss-treatment-australia` },
    { "@type": "ListItem", position: 3, name: "Mosh vs Dense", item: `${SITE_URL}/mosh-vs-dense` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Mosh vs Dense: Hair Loss Treatment Compared 2026",
  description:
    "A side-by-side comparison of Mosh and Dense for hair loss in Australia. Mosh is prescription telehealth that can prescribe finasteride and minoxidil after a practitioner review; Dense is a non-prescription topical hair-care range. They serve different needs, clinical versus topical. Information only, not medical advice.",
  numberOfItems: 2,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Mosh",
      description:
        "Australian men's hair-loss telehealth. Online consultation and photo assessment reviewed by a registered Australian practitioner, who may prescribe finasteride or minoxidil where clinically appropriate. Subscription with home delivery. Prescription medicines are subject to individual clinical assessment.",
      url: `${SITE_URL}/moshhair`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Dense Hair Experts",
      description:
        "Australian non-prescription topical hair-care brand. Shampoos, conditioners, serums, and scalp treatments aimed at density and scalp health, bought online with no consultation. Not a prescription treatment.",
      url: `${SITE_URL}/dense`,
    },
  ],
};

const faqs = [
  {
    q: "Is Mosh or Dense better for hair loss?",
    a: "They serve different needs, so neither is universally better. Mosh is a telehealth platform that can prescribe finasteride and minoxidil, the treatments that act on the underlying cause of male-pattern hair loss, after an online consultation and review by a registered Australian practitioner. Dense Hair Experts is a non-prescription topical range focused on density and scalp health. For active or progressing hair loss, a clinical route like Mosh is usually the stronger starting point; a topical range like Dense can suit early thinning or complement a routine. This is general information, not medical advice.",
  },
  {
    q: "What is the difference between Mosh and Dense?",
    a: "The core difference is clinical versus topical. Mosh is prescription telehealth: you complete a questionnaire and photo assessment, a registered Australian practitioner reviews your case, and if it is appropriate you are prescribed finasteride or minoxidil on a subscription with home delivery. Dense is a non-prescription range of shampoos, conditioners, serums, and scalp treatments you buy directly online with no consultation. Mosh can access prescription medicines; Dense cannot, because it is a topical hair-care brand.",
  },
  {
    q: "Does Mosh prescribe finasteride and minoxidil?",
    a: "Mosh can facilitate access to finasteride and minoxidil where a registered Australian practitioner determines it is clinically appropriate following your online consultation and photo assessment. Finasteride and oral minoxidil are prescription-only in Australia; topical minoxidil is available over the counter. Nothing is prescribed automatically, and not everyone who applies is eligible. Treatment is decided individually by the practitioner. This page is not medical advice.",
  },
  {
    q: "Is Dense Hair Experts a prescription treatment?",
    a: "No. Dense Hair Experts is a non-prescription, topical hair-care brand. Its shampoos, conditioners, serums, and scalp treatments are aimed at density, thickness, and scalp health, and are bought directly online with no consultation or practitioner review. It does not contain prescription ingredients such as finasteride. If you want a prescription treatment that targets the cause of male-pattern hair loss, a telehealth provider like Mosh is the appropriate starting point.",
  },
  {
    q: "Can I use Mosh and Dense together?",
    a: "Some men use a topical range alongside a clinical routine, but whether that is appropriate for you is a question for a health professional, not a comparison page. If you are prescribed anything through Mosh, follow the practitioner's guidance, and raise any other products you are using so they can advise. This page provides general information only and does not constitute medical advice.",
  },
  {
    q: "How much do Mosh and Dense cost?",
    a: "Mosh runs on a subscription and the cost depends on the plan your consultation lands on, since finasteride alone differs from a finasteride-plus-minoxidil combination, and the fee bundles medication, practitioner oversight, and delivery. You see the actual figures in the consultation before you commit. Dense is bought per product or as a routine directly from its store. Prices change, so check the current figures on each site. Our links apply any current referral offer at the URL level with no code to enter.",
  },
  {
    q: "Which should I start with for early thinning?",
    a: "For early or mild thinning, some people begin with a topical routine like Dense, while others go straight to a clinical assessment because hair-loss treatment tends to work best when started early. Because Mosh's online consultation commits you to nothing and is reviewed by a registered practitioner, it is a low-friction way to find out what, if anything, you would be offered. Suitability is practitioner-decided and never guaranteed. For significant or rapid hair loss, see a doctor in person. This is not medical advice.",
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
  name: seoConfig.moshVsDense.title,
  description: seoConfig.moshVsDense.description,
  url: seoConfig.moshVsDense.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-06",
  dateModified: "2026-07-06",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

// ── Comparison rows ──────────────────────────────────────────────────────────
const rows: { label: string; mosh: string; dense: string }[] = [
  { label: "What it is", mosh: "Prescription hair-loss telehealth", dense: "Non-prescription topical hair care" },
  { label: "Category", mosh: "Clinical, practitioner-reviewed", dense: "Topical products, no consultation" },
  { label: "Treatments", mosh: "Finasteride & minoxidil, if eligible", dense: "Shampoos, conditioners, serums, scalp care" },
  { label: "Process", mosh: "Online consult → practitioner review → delivery", dense: "Shop online → delivered" },
  { label: "Prescription", mosh: "Yes, where clinically appropriate", dense: "None (non-prescription)" },
  { label: "Best for", mosh: "Active or progressing male-pattern loss", dense: "Early thinning, density & scalp health" },
  { label: "Pricing", mosh: "Subscription, confirmed in the consult", dense: "Per product or routine" },
  { label: "Discount", mosh: "Referral via the link, no code", dense: "Referral via the link, no code" },
];

export default function MoshVsDensePage() {
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
            <Link href="/best-hair-loss-treatment-australia" className="hover:text-[#0a7c42] transition-colors">Hair loss</Link>
            <span>/</span>
            <span className="text-[#2b362f]">Mosh vs Dense</span>
          </nav>

          {/* Hero */}
          <section className="pt-10 pb-8 sm:pt-12">
            <p className="nw-kicker mb-5">Comparison · Hair loss · Australia</p>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b] mb-4 max-w-3xl">
              Mosh vs Dense: hair loss treatment compared (2026)
            </h1>
            <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-3">
              Mosh and Dense both come up when Australians research hair loss, but they are not the same kind of thing.
              Mosh is prescription telehealth: it can prescribe finasteride and minoxidil after an online consultation
              reviewed by a registered Australian practitioner. Dense Hair Experts is a non-prescription topical range,
              shampoos, conditioners, serums, and scalp treatments aimed at density and scalp health. In other words, one
              is a clinical route and the other is a topical one. Below we set out the difference, who each suits, and how
              to think about starting.
            </p>
            <p className="text-[#9aa39c] text-xs leading-relaxed max-w-2xl mb-7">
              Information only, not medical advice. Mosh medicines, including finasteride and oral minoxidil, are
              prescription-only in Australia and available only after an individual assessment by a registered Australian
              practitioner, with suitability practitioner-decided and never guaranteed. This page contains disclosed
              affiliate links to both Mosh and Dense; both are Refer Labs partners.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                {...mosh}
                data-cta="mosh-vs-dense-hero-mosh"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN, boxShadow: `0 6px 24px ${GREEN}30` }}
              >
                Check eligibility on Mosh
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                {...dense}
                data-cta="mosh-vs-dense-hero-dense"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5"
                style={{ color: GREEN, border: `1px solid ${GREEN}40`, background: `${GREEN}08` }}
              >
                Shop Dense Hair Experts
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
                They answer different questions. If you have active or progressing male-pattern hair loss and want access
                to the treatments that target its cause, Mosh is the clinical route, an online consult reviewed by a
                registered practitioner who may prescribe finasteride or minoxidil where appropriate. If you are dealing
                with early thinning and want a topical routine for density and scalp health, Dense is the non-prescription
                option. Suitability for any prescription medicine is decided by the practitioner and never guaranteed. For
                significant or sudden loss, see a doctor in person. This is not medical advice.
              </p>
            </div>
          </section>

          {/* Comparison table */}
          <section className="border-t border-[#e5e9e7] mt-8 py-8">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-6">
              Mosh vs Dense at a glance
            </h2>
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-[#e5e9e7]">
                    <th className="text-left pb-3 pr-4 text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider w-52"></th>
                    <th className="pb-3 px-3 text-left font-extrabold text-[#10251b] text-sm">Mosh</th>
                    <th className="pb-3 px-3 text-left font-extrabold text-[#10251b] text-sm">Dense</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} className="border-b border-[#e5e9e7] hover:bg-[#f5f8f6] transition-colors align-top">
                      <td className="py-3 pr-4 text-[#3d4b44] text-xs font-medium leading-snug">{r.label}</td>
                      <td className="py-3 px-3 text-[#3d4b44] text-xs leading-snug">{r.mosh}</td>
                      <td className="py-3 px-3 text-[#3d4b44] text-xs leading-snug">{r.dense}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#9aa39c] text-[10px] mt-3 leading-relaxed">
              Details are based on publicly available information at the time of writing and can change. Prescription
              medicines are subject to individual clinical assessment by a registered Australian practitioner. This
              comparison is not medical advice.
            </p>
          </section>

          {/* Prose: clinical vs topical */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              Clinical versus topical: the difference that matters
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                The single most important thing to understand is that Mosh and Dense sit in different categories. Mosh is
                a telehealth service. You complete a questionnaire and upload photos, a registered Australian practitioner
                reviews your case, and if it is appropriate you may be prescribed finasteride or minoxidil, delivered on a
                subscription. The review step is the point: not everyone who applies is eligible, and the practitioner can
                decline or redirect you, which is exactly what you would want a prescriber to do.
              </p>
              <p>
                Dense Hair Experts is a topical hair-care brand. Its shampoos, conditioners, serums, and scalp treatments
                are aimed at density, thickness, and scalp health, and you buy them directly online with no consultation.
                There are no prescription ingredients. So the comparison is not about which is a better product, it is
                about which category fits your situation. Active, progressing loss usually needs the prescription route;
                early thinning and general density care can suit a topical routine.
              </p>
            </div>
          </section>

          {/* Prose: what Mosh prescribes */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              What Mosh can prescribe, and the rules around it
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                Two treatments do most of the work for male-pattern hair loss, and Mosh is built around both. Finasteride
                is an oral medicine that lowers DHT, the hormone involved in hereditary hair loss. Minoxidil works on a
                different mechanism and is often used alongside it. The regulatory reality in Australia is clear:
                finasteride and oral minoxidil are prescription-only, while topical minoxidil is available over the
                counter. Mosh's value is that the online consult and photo review can lead to a script without an
                in-person visit, but only when the practitioner judges it appropriate.
              </p>
              <p>
                That last point is the compliance line and the honest one. Nothing is dispensed automatically. Suitability
                is assessed individually, decided by a registered practitioner, and never guaranteed before that
                assessment. The consultation itself takes a few minutes and commits you to nothing, which is the real
                argument for it: hair-loss treatment tends to reward starting early, and the online route removes the
                friction that keeps many men from ever booking an appointment.
              </p>
            </div>
            <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border px-6 py-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: `${GREEN}25`, background: `${GREEN}0A` }}>
              <p className="max-w-lg text-sm leading-relaxed text-[#10251b]">
                Want to know what, if anything, you would be offered clinically? Mosh&apos;s online consultation is the
                usual starting point. A few minutes, reviewed by a registered Australian practitioner, no commitment.
              </p>
              <a
                {...mosh}
                data-cta="mosh-vs-dense-prefaq"
                className="inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN, boxShadow: `0 6px 24px ${GREEN}30` }}
              >
                Check eligibility on Mosh
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>

          {/* Prose: where Dense fits */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              Where Dense fits and how to choose
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                Dense is the option for someone who wants a structured topical routine rather than a prescription. Used
                consistently, its density and scalp-health products can suit early thinning or sit alongside other care. It
                is bought per product or as a routine, with no consultation, so it is the lower-friction, non-clinical
                choice. What it cannot do is prescribe the medicines that act on the cause of male-pattern loss, because
                that is not what a topical brand is.
              </p>
              <p>
                So the decision comes down to your situation. If your loss is active or progressing, start with the
                clinical assessment, since that is where the evidence-backed treatments live. If you are managing early
                thinning or want a density-focused routine, Dense is a reasonable non-prescription option. For anything
                patchy, sudden, or unusual, an online questionnaire is the wrong front door and an in-person doctor is the
                right one. For the full landscape, including pricing and the community verdict, see our best hair loss
                treatment in Australia comparison linked below.
              </p>
            </div>
          </section>

          {/* Pick cards */}
          <section className="border-t border-[#e5e9e7] py-10">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
                <h3 className="text-lg font-bold mb-2">Go with Mosh</h3>
                <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">Prescription telehealth. Best for active male-pattern loss. Practitioner-reviewed; suitability never guaranteed.</p>
                <a {...mosh} data-cta="mosh-vs-dense-card-mosh" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md" style={{ background: GREEN, boxShadow: `0 8px 24px ${GREEN}25` }}>
                  Check eligibility on Mosh <ArrowRight className="h-4 w-4" />
                </a>
                <p className="mt-3"><Link href="/moshhair" className="text-xs text-[#3d4b44] underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#2b362f]">Read our Mosh review →</Link></p>
              </div>
              <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
                <h3 className="text-lg font-bold mb-2">Go with Dense</h3>
                <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">Non-prescription topical range. Best for early thinning, density, and scalp health.</p>
                <a {...dense} data-cta="mosh-vs-dense-card-dense" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md" style={{ background: GREEN, boxShadow: `0 8px 24px ${GREEN}25` }}>
                  Shop Dense Hair Experts <ArrowRight className="h-4 w-4" />
                </a>
                <p className="mt-3"><Link href="/dense" className="text-xs text-[#3d4b44] underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#2b362f]">Read our Dense review →</Link></p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-8">
              Mosh vs Dense: frequently asked questions
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
              <Link href="/moshhair" className="nw-link text-sm">Mosh review</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/mosh-vs-pilot" className="nw-link text-sm">Mosh vs Pilot</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/dense" className="nw-link text-sm">Dense review</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/best-hair-loss-treatment-australia" className="nw-link text-sm">Best hair loss treatment Australia</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/guides" className="nw-link text-sm">All guides</Link>
            </div>
            <p className="text-[#9aa39c] text-xs leading-relaxed max-w-2xl">
              This page is operated by Refer Labs and contains disclosed affiliate referral links to both Mosh and Dense.
              We may earn a commission if you sign up or order through them, at no extra cost to you. We compare on
              category, model, and what is included, and we never sell rankings. All content is for informational purposes
              only and does not constitute medical advice. Prescription medicines in Australia, including finasteride and
              oral minoxidil, are available only after an individual assessment by a registered Australian practitioner,
              and suitability is practitioner-decided and never guaranteed. Consult a qualified health professional before
              starting any hair-loss treatment. Our full standards are at{" "}
              <Link href="/how-we-research" className="underline underline-offset-2">how we research</Link>.
            </p>
          </section>

        </div>
      </main>
      <StickyCta href={MOSH_HAIR_URL} product="Mosh · hair-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
