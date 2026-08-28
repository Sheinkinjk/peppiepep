import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";
import { MOSH_HAIR_URL } from "@/lib/affiliate-links";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import FactHistory from "@/components/facts/FactHistory";
import CodeAnswer from "@/components/offers/CodeAnswer";
import OfferSchema from "@/components/offers/OfferSchema";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";

import EarningsBalanceNote from "@/components/consumer/EarningsBalanceNote";
export const metadata = generateSEOMetadata(seoConfig.moshVsPilot);

const GREEN = "#0a7c42";

const mosh = { href: MOSH_HAIR_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

// ── JSON-LD ──────────────────────────────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Best Hair Loss Treatment Australia", item: `${SITE_URL}/best-hair-loss-treatment-australia` },
    { "@type": "ListItem", position: 3, name: "Mosh vs Pilot", item: `${SITE_URL}/mosh-vs-pilot` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Mosh vs Pilot: Men's Hair Loss Telehealth Compared 2026",
  description:
    "A side-by-side comparison of Mosh and Pilot for hair loss in Australia. Both are Australian men's telehealth brands that can facilitate access to prescription hair-loss treatments after an online consultation reviewed by a registered practitioner. They differ on model, breadth and experience. Information only, not medical advice.",
  numberOfItems: 2,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Mosh",
      description:
        "Australian men's health telehealth with a strong hair-loss focus. Online consultation and photo assessment reviewed by a registered Australian practitioner, who may prescribe prescription treatment where clinically appropriate. Subscription with home delivery. Prescription medicines are subject to individual clinical assessment.",
      url: `${SITE_URL}/moshhair`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Pilot",
      description:
        "Australian men's telehealth brand (part of the Eucalyptus group) covering hair loss, weight, sexual health and more. Online consultation reviewed by a registered Australian practitioner, who may prescribe prescription treatment where clinically appropriate. Not affiliated with Refer Labs.",
      url: "https://pilot.com.au/",
    },
  ],
};

const faqs = [
  {
    q: "Is Mosh or Pilot better for hair loss?",
    a: "Neither is universally better, because they are close cousins rather than opposites. Both Mosh and Pilot are Australian men's telehealth brands, both run an online consultation reviewed by a registered Australian practitioner, and both can facilitate access to prescription hair-loss treatments where it is clinically appropriate. The practical differences are model and feel: Mosh is the more hair-and-men's-health focused experience, while Pilot sits inside the larger Eucalyptus health ecosystem. For most people the deciding factors are the plan you are offered in the consult, the price it lands on, and which interface you prefer.",
  },
  {
    q: "What is the difference between Mosh and Pilot?",
    a: "The core mechanics are similar: an online questionnaire and photo assessment, a review by a registered Australian practitioner, and, where appropriate, a prescription for prescription treatment delivered on a subscription. Where they differ is scope and positioning. Mosh is a men's health brand with a prominent hair-loss offering. Pilot is part of the Eucalyptus group and offers a broad men's health range across hair, weight and sexual health. The clinical route to a hair-loss script is comparable; the surrounding experience, plans and pricing are where you will notice the difference.",
  },
  {
    q: "Do Mosh and Pilot both prescribe prescription hair-loss treatments?",
    a: "Both can facilitate access to prescription hair-loss treatment where a registered Australian practitioner determines it is clinically appropriate following your online consultation and photo assessment. Some hair-loss treatments are prescription-only in Australia, while some topical products are available over the counter. Neither service prescribes automatically, and not everyone who applies is eligible. Treatment is decided individually by the practitioner.",
  },
  {
    q: "Are Mosh and Pilot the same company?",
    a: "No. They are separate Australian telehealth brands. Pilot is part of the Eucalyptus group, which also runs other health brands. Mosh is its own men's health brand. They compete in overlapping categories, including hair loss, which is why they come up together, but they are run independently.",
  },
  // PILOT-NON-PARTNER: the cost Q&A named both providers and cannot be answered
  // for one alone on a comparison page. Removed here and from FAQPage JSON-LD.
  {
    q: "Which should I start with?",
    a: "Because both use a no-commitment online consult reviewed by a registered practitioner, the low-friction move is to start one and see what you are actually offered before deciding. We link Mosh because it is our partner and its hair-loss consult is quick and focused; Pilot is a legitimate alternative if you prefer its broader ecosystem. For significant or sudden hair loss, see a doctor in person. Suitability for any prescription medicine is practitioner-decided and never guaranteed.",
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
  name: seoConfig.moshVsPilot.title,
  description: seoConfig.moshVsPilot.description,
  url: seoConfig.moshVsPilot.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-06",
  dateModified: "2026-07-06",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

// ── Comparison rows ──────────────────────────────────────────────────────────
const rows: { label: string; mosh: string; pilot: string }[] = [
  { label: "What it is", mosh: "Men's health telehealth, hair-loss focus", pilot: "Men's health telehealth (Eucalyptus group)" },
  { label: "Category", mosh: "Clinical, practitioner-reviewed", pilot: "Clinical, practitioner-reviewed" },
  { label: "Hair treatments", mosh: "Prescription treatment, if eligible", pilot: "Prescription treatment, if eligible" },
  { label: "Process", mosh: "Online consult → practitioner review → delivery", pilot: "Online consult → practitioner review → delivery" },
  { label: "Prescription", mosh: "Yes, where clinically appropriate", pilot: "Yes, where clinically appropriate" },
  { label: "Breadth", mosh: "Hair, skin, weight, mind, sexual health", pilot: "Hair, weight, sexual health and more" },
  { label: "Best for", mosh: "A focused, quick hair-loss consult", pilot: "Those who prefer a broad health ecosystem" },
  // PILOT-NON-PARTNER: pricing row removed. Restore when Pilot approves.
];

const articleSchema = comparisonArticleSchema({
  headline: "Mosh vs Pilot: Refer Labs' Australian men's hair loss comparison",
  description: "Refer Labs compares Mosh and Pilot on treatments, process and who each suits for Australian men's hair loss telehealth.",
  url: "https://referlabs.com.au/mosh-vs-pilot",
  datePublished: "2026-07-05",
  dateModified: "2026-08-08",
});

export default function MoshVsPilotPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
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
            <span className="text-[#2b362f]">Mosh vs Pilot</span>
          </nav>

          {/* Hero */}
          <section className="pt-10 pb-8 sm:pt-12">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b] mb-4 max-w-3xl">
              Mosh vs Pilot: men&apos;s hair loss telehealth compared (2026)
            </h1>
            <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-3">
              Mosh and Pilot are the two names Australian men run into most when they start researching hair loss online,
              and they are more alike than different. Both are telehealth services, both put your case in front of a
              registered Australian practitioner, and both can prescribe prescription hair-loss treatments when it is
              appropriate. So the real question is which experience, plan and price suits you. Below we set out where they overlap, where they diverge, and how to choose.
            </p>
            {/* PILOT-NON-PARTNER: states what Refer Labs holds, not what Pilot lacks. */}
            <CodeAnswer code="REFERAL55" className="mt-6">
              Refer Labs holds one code on this page: REFERAL55, 55% off a new customer&apos;s first Mosh order. We have no commercial arrangement with Pilot.
            </CodeAnswer>
            <OfferSchema code="REFERAL55" />

            <p className="text-[#9aa39c] text-xs leading-relaxed max-w-2xl mb-7">
              Information only, not medical advice. Prescription hair-loss treatment is available only after an individual
              assessment by a registered Australian practitioner, with suitability practitioner-decided and never
              guaranteed. Pilot is mentioned for comparison and is not a Refer Labs partner.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                {...mosh}
                data-cta="mosh-vs-pilot-hero-mosh"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN, boxShadow: `0 6px 24px ${GREEN}30` }}
              >
                Check eligibility on Mosh (55% off first order)
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/best-hair-loss-treatment-australia"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5"
                style={{ color: GREEN, border: `1px solid ${GREEN}40`, background: `${GREEN}08` }}
              >
                See all hair-loss options
              </Link>
            </div>
            <EarningsBalanceNote earnFrom="Mosh" className="mt-4 max-w-2xl" />
          </section>

          {/* Answer-first: the buyer's question verbatim as an H2, then the liftable verdict. */}
          <section className="pb-2">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              Mosh or Pilot: which should you choose for hair loss?
            </h2>
            <div className="rounded-xl border px-6 py-5" style={{ borderColor: `${GREEN}40`, background: `${GREEN}0A` }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: GREEN }}>
                Quick verdict
              </p>
              <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed max-w-2xl">
                Refer Labs compared Mosh and Pilot in August 2026: for the actual hair-loss treatment they land in much
                the same place, a practitioner-reviewed online consult that can lead to prescription treatment. Mosh is the more focused, quick men&apos;s
                hair-loss experience; Pilot suits men who want one login across a broader health ecosystem. If you just
                want to get a hair-loss plan moving, Mosh&apos;s consult is a low-friction place to start. Suitability is
                practitioner-decided and never guaranteed. For significant or sudden loss, see a doctor in person.
              </p>
            </div>
          </section>

          {/* Comparison table */}
          <section className="border-t border-[#e5e9e7] mt-8 py-8">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-6">
              Mosh vs Pilot at a glance
            </h2>
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-[#e5e9e7]">
                    <th className="text-left pb-3 pr-4 text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider w-52"></th>
                    <th className="pb-3 px-3 text-left font-extrabold text-[#10251b] text-sm">Mosh</th>
                    <th className="pb-3 px-3 text-left font-extrabold text-[#10251b] text-sm">Pilot</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} className="border-b border-[#e5e9e7] hover:bg-[#f5f8f6] transition-colors align-top">
                      <td className="py-3 pr-4 text-[#3d4b44] text-xs font-medium leading-snug">{r.label}</td>
                      <td className="py-3 px-3 text-[#3d4b44] text-xs leading-snug">{r.mosh}</td>
                      <td className="py-3 px-3 text-[#3d4b44] text-xs leading-snug">{r.pilot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* PILOT-NON-PARTNER. The table used to carry a "Referral offer" row
                  reading "55% off with code REFERAL55" against "Not a Refer Labs
                  partner". Every other row compares the two services; that one
                  compared our contracts, and put Pilot on the wrong side of a
                  product comparison for a fact about us. Restore the row when
                  Pilot becomes a partner and there is an offer to compare. */}
            </div>
            <p className="text-[#9aa39c] text-[10px] mt-3 leading-relaxed">
              Details are based on publicly available information and can change. Prescription
              medicines are subject to individual clinical assessment by a registered Australian practitioner.
            </p>
          </section>

          {/* Prose: how similar */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              Where Mosh and Pilot are basically the same
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                For hair loss specifically, these two services are built on the same clinical logic. You complete an online questionnaire and upload photos, a registered Australian
                practitioner reviews your case, and if it is appropriate you are prescribed treatment delivered on a
                subscription. The available options are the same evidence-backed treatments either way, because that is
                what works for male-pattern hair loss regardless of which brand&apos;s website you filled in.
              </p>
              <p>
                Both also share the same guardrail, and it is a good one. Nothing is dispensed automatically. Not everyone
                who applies is eligible, and the practitioner can decline or redirect you. That review step is the entire
                point of using a legitimate telehealth service rather than buying something unregulated, and both Mosh and
                Pilot take it seriously.
              </p>
            </div>
          </section>

          {/* Prose: where they diverge */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              Where they actually diverge
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                The difference is breadth and feel rather than the hair-loss treatment itself. Mosh is a men&apos;s health
                brand where hair is one of the headline categories, alongside skin, weight, mental health and sexual
                health, and the hair-loss consult is quick and focused. Pilot sits inside the larger Eucalyptus group and
                offers a broad men&apos;s health range under one account, which some men prefer if they expect to use the
                same provider for more than one thing over time.
              </p>
              <p>
                In practice, the deciding factors are the specific plan each consult offers you, the price it lands on, and
                which interface and cadence you like. Those are personal, and both services show you the actual figures
                before you commit, so the sensible move is to start a consult and compare what you are genuinely offered
                rather than guessing from marketing pages. For the wider landscape, including topical-only options and the
                community verdict, see our best hair loss treatment in Australia comparison below.
              </p>
            </div>
            <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border px-6 py-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: `${GREEN}25`, background: `${GREEN}0A` }}>
              <p className="max-w-lg text-sm leading-relaxed text-[#10251b]">
                Want to see what a hair-loss plan would look like for you? Mosh&apos;s online consultation is a quick,
                no-commitment starting point, reviewed by a registered Australian practitioner.
              </p>
              <a
                {...mosh}
                data-cta="mosh-vs-pilot-prefaq"
                className="inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN, boxShadow: `0 6px 24px ${GREEN}30` }}
              >
                Check eligibility on Mosh
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>

          {/* Pick cards */}
          <section className="border-t border-[#e5e9e7] py-10">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
                <h3 className="text-lg font-bold mb-2">Lean toward Mosh</h3>
                <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">If you want a focused, quick men&apos;s hair-loss consult and a partner offer applied at the link. Practitioner-reviewed; suitability never guaranteed.</p>
                <a {...mosh} data-cta="mosh-vs-pilot-card-mosh" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md" style={{ background: GREEN, boxShadow: `0 8px 24px ${GREEN}25` }}>
                  Check eligibility on Mosh <ArrowRight className="h-4 w-4" />
                </a>
                <p className="mt-3"><Link href="/moshhair" className="text-xs text-[#3d4b44] underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#2b362f]">Read our Mosh review →</Link></p>
              </div>
              <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
                <h3 className="text-lg font-bold mb-2">Lean toward Pilot</h3>
                <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">If you want one account across a broader men&apos;s health ecosystem. Same clinical route to a hair-loss script; Pilot is not a Refer Labs partner.</p>
                <Link href="/best-hair-loss-treatment-australia" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5" style={{ color: GREEN, border: `1px solid ${GREEN}40`, background: `${GREEN}08` }}>
                  Compare all options <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-8">
              Mosh vs Pilot: frequently asked questions
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
              <Link href="/mosh-vs-dense" className="nw-link text-sm">Mosh vs Dense</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/best-hair-loss-treatment-australia" className="nw-link text-sm">Best hair loss treatment Australia</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/guides" className="nw-link text-sm">All guides</Link>
            </div>
            <AffiliateDisclosure partners={["Mosh"]} className="mb-3 max-w-2xl" />
            <p className="text-[#9aa39c] text-xs leading-relaxed max-w-2xl">
              Pilot is referenced for comparison only and is
              not a Refer Labs partner. We compare on category, model, and what is included, and we never sell rankings.
              All content is for informational purposes only and does not constitute medical advice. Prescription
              hair-loss treatment in Australia is available only after an individual assessment by a registered Australian
              practitioner, and suitability is practitioner-decided and never guaranteed. Consult a qualified health
              professional before starting any hair-loss treatment. Our full
            </p>
          </section>

        </div>
      {/* Renders nothing until this subject has a third observation. The slot
          exists so the series appears here the moment the next re-check lands. */}
      <FactHistory subject="Mosh" kind="offer_observation" hub="hair-loss" route="/mosh-vs-pilot" />

      </main>
      <StickyCta href={MOSH_HAIR_URL} product="Mosh · hair-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
