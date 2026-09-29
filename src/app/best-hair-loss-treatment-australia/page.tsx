import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";
import { MOSH_HAIR_URL, DENSE_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import HubProviders from "@/components/consumer/HubProviders";
import MatchPrompt from "@/components/consumer/MatchPrompt";
import { EdgeObject } from "@/components/brand/EdgeObject";
import StickyCta from "@/components/consumer/StickyCta";
import OfferSchema from "@/components/offers/OfferSchema";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
export const metadata = generateSEOMetadata(seoConfig.bestHairLossTreatmentAustralia);

const aff = (url: string, loc = "best-hair-loss") => ({
  href: url,
  target: "_blank" as const,
  rel: "nofollow sponsored" as const,
  "data-cta": loc,
});

/*
 * Rewritten 28 Sep 2026. Two faults, both fixed here.
 *
 * 1. The opening screen stacked seven blocks under the h1: a description, the
 *    disclosure, a code sentence, a verification stamp, a medical line, two
 *    buttons and a second disclosure. It now follows the rebuilt weight-loss
 *    comparison: the answer, one disclosure, the route matcher, then the two
 *    providers on identical rows, where the code and its date live.
 *
 * 2. TGA. An earlier find-and-replace of two medicine names left sentences such
 *    as "prescription for hair loss treatments including prescription hair-loss
 *    treatments", "Both are prescription medicines" with nothing for "both" to
 *    refer to, and "(oral and topical options)" for male pattern baldness, which
 *    still identifies the medicines. It also credited the prescription class with
 *    being "most clinically effective" and addressing "the underlying cause" on a
 *    page with affiliate links. The page now describes the service and the
 *    regulatory fact only: hair-loss medicines are prescription-only, and a
 *    registered practitioner decides whether any treatment is appropriate.
 *
 * Title and h1 are unchanged: this page is in the 5 Sep title test (read 5 Oct).
 * The body change is a confound, recorded beside the test in seo.ts.
 */

const FAQS = [
  {
    q: "What is the best hair loss treatment in Australia?",
    a: "There is no single best treatment, because the options do different jobs. A practitioner-assessed route, online through a service such as Mosh or in person through a GP, starts with an assessment, and a registered practitioner decides whether any treatment is appropriate. A topical routine such as Dense Hair Experts is cosmetic and needs no consult. Sudden, patchy or unexplained hair loss is a reason to see a GP first.",
  },
  {
    q: "How much does hair loss treatment cost per month in Australia?",
    a: "Online hair-loss services usually charge a monthly plan that covers the practitioner review and delivery. Mosh runs tiered plans and shows the price inside its sign-up flow before you commit. A GP consult may be bulk-billed or carry a gap fee,",
  },
  {
    q: "Is Mosh good for hair loss?",
    a: "Mosh is an Australian telehealth service for men: an online questionnaire and photo assessment, reviewed by a registered practitioner who decides whether any treatment is appropriate. It suits men who would rather not book a GP appointment. It is not an emergency or diagnostic service.",
  },
  {
    q: "Mosh vs Dense Hair Experts, which should I use?",
    a: "They are not alternatives. Mosh is a clinical service with a practitioner assessment. Dense Hair Experts sells cosmetic hair-care products for density and scalp health, with no consult. If your hair loss is noticeable or getting worse, an assessment is the starting point; a cosmetic routine can sit alongside it.",
  },
  {
    q: "Can I get hair-loss treatment online in Australia?",
    a: "Yes, as an online consultation. Hair-loss medicines are prescription-only in Australia, and online services such as Mosh arrange the assessment remotely: a questionnaire and photos, reviewed by a registered Australian practitioner. Any treatment is decided by that practitioner and only where it is clinically appropriate.",
  },
];

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
  name: "Hair-loss options in Australia, compared",
  description: "Mosh (online practitioner-assessed service for men) and Dense Hair Experts (cosmetic topical products), compared on who each suits, how it works and what it costs.",
  numberOfItems: 2,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Dense Hair Experts", description: "Australian brand selling cosmetic hair-care products for density and scalp health, with no consult.", url: `${SITE_URL}/dense` },
    { "@type": "ListItem", position: 2, name: "Mosh", description: "Australian telehealth service for men's hair loss: an online assessment reviewed by a registered practitioner.", url: `${SITE_URL}/moshhair` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  datePublished: "2026-07-05",
  dateModified: "2026-09-28",
  name: seoConfig.bestHairLossTreatmentAustralia.title,
  description: seoConfig.bestHairLossTreatmentAustralia.description,
  url: `${SITE_URL}/best-hair-loss-treatment-australia`,
  breadcrumb: breadcrumbSchema,
  mainEntity: faqSchema,
};

const articleSchema = comparisonArticleSchema({
  headline: "Hair-loss options in Australia: Mosh, Dense Hair Experts and your GP compared",
  description: "Refer Labs compares Australian hair-loss routes on who each suits, how it works and what it costs.",
  url: "https://referlabs.com.au/best-hair-loss-treatment-australia",
  datePublished: "2026-07-05",
  dateModified: "2026-09-28",
});

const features = [
  { label: "What it is", mosh: "Online clinical service", dense: "Cosmetic hair-care products", gp: "In-person clinical assessment" },
  { label: "Assessment", mosh: "Questionnaire and photos, reviewed by a practitioner", dense: "None", gp: "Face to face, full history" },
  { label: "Who decides on treatment", mosh: "A registered practitioner", dense: "You", gp: "Your GP" },
  { label: "Can refer to a specialist", mosh: "No", dense: "No", gp: "Yes" },
  { label: "Medicare rebate", mosh: "No", dense: "No", gp: "Often, for the consult" },
  { label: "Appointment needed", mosh: "No, fully online", dense: "No, order direct", gp: "Yes" },
  { label: "Who it is for", mosh: "Men", dense: "Anyone", gp: "Anyone" },
];

export default function BestHairLossTreatmentAustraliaPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="relative mx-auto max-w-6xl px-5 sm:px-8 pb-24">
        <nav className="flex items-center gap-2 pt-10 text-sm text-[#56504a]">
          <Link href="/" className="hover:text-[#14120f] transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-[#14120f] transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-[#14120f]">Best Hair Loss Treatment Australia 2026</span>
        </nav>

        <section className="pt-8 pb-4">
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black leading-[1.08] tracking-tight text-[#14120f] mb-4">
                Best Hair Loss Treatment Australia 2026:{" "}
                <span>Mosh vs Dense vs Telehealth</span>
              </h1>
              {/* The answer, directly under the h1. Nothing between: check-answer-slot. */}
              <p className="text-[#14120f] text-base sm:text-lg leading-relaxed">
                Most Australians looking at hair loss end up choosing between three routes: an online
                practitioner-assessed service such as Mosh, a cosmetic topical routine such as Dense Hair Experts, or
                their GP. They do different jobs. Which one fits depends on how noticeable the loss is, how fast it is
                changing, and whether you want an assessment at all.
              </p>
              <AffiliateDisclosure compact className="mt-4" />
            </div>
            <EdgeObject kind="comb" className="lg:mt-14">
              <MatchPrompt
                stacked
                href="/hair-loss-quiz"
                title="Not sure which route fits?"
                sub="Three questions about how you would prefer to go about it. No health questions, no assessment."
                cta="Take the 30-second match"
                dataCta="best-hair-loss-hero-quiz"
              />
            </EdgeObject>
          </div>
          <OfferSchema code="REFERAL55" />
        </section>

        <HubProviders
          className="pt-10"
          ctaPrefix="best-hair-loss"
          heading="The two providers, on the same terms"
          intro="Both answer the same four questions. We earn a commission from both, and neither can pay to be described more favourably. Your GP, which earns us nothing, is often the right first step and is covered below."
          providers={[
            {
              name: "Dense Hair Experts",
              logo: "/logos/dense.png",
              href: "/dense",
              hrefLabel: "Read our Dense guide",
              suits: "Anyone who wants a cosmetic routine for density and scalp health, with no consult.",
              how: "Shampoos, conditioners and serums bought online and used as an ongoing routine. Cosmetic products, not a medical treatment.",
              cost: "Priced per product on Dense's own site.",
              highlight: "No assessment and no prescription involved.",
              visitHref: DENSE_URL,
              visitLabel: "Shop Dense Hair Experts",
              earns: true,
              earnAction: "buy",
            },
            {
              name: "Mosh",
              logo: "/logos/mosh-tile.png",
              href: "/moshhair",
              hrefLabel: "Read our Mosh guide",
              suits: "Men who want a practitioner assessment for hair loss without booking a GP.",
              how: "An online questionnaire and photos, reviewed by a registered practitioner who decides whether any treatment is appropriate.",
              cost: "A monthly plan, with the price shown in Mosh's sign-up flow before you commit.",
              offerCode: "REFERAL55",
              visitHref: MOSH_HAIR_URL,
              visitLabel: "Check your options with Mosh",
              earns: true,
            },
          ]}
        />

        <section className="pt-12 pb-2 max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-black text-[#14120f] mb-4">What is the best hair-loss treatment in Australia?</h2>
          <p className="text-[#14120f] text-sm sm:text-base leading-relaxed">{FAQS[0].a}</p>
        </section>

        <section id="gp" className="border-t border-[#ded8cd] mt-10 py-10 max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-black text-[#14120f] mb-4">When your GP is the better first step</h2>
          <div className="space-y-4 text-[#56504a] text-sm sm:text-base leading-relaxed">
            <p>
              A GP sees you in person, takes a full history, can order blood tests to rule out other causes, and can
              refer you to a dermatologist. The consult may be bulk-billed or carry a Medicare rebate, which an online
              subscription does not. It is slower to arrange, and for straightforward male pattern hair loss many
              people find an online service more convenient.
            </p>
            <p>
              Go to a GP first if the loss is sudden, patchy, comes with scalp symptoms, or you are a woman: the online
              service compared here is for men.
            </p>
          </div>
        </section>

        <section id="cost" className="border-t border-[#ded8cd] py-10 max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-black text-[#14120f] mb-3">How Mosh structures its plans</h2>
          <p className="text-sm text-[#56504a] leading-relaxed mb-5">
            Mosh sells hair loss as three tiers. It shows the price for each inside its sign-up flow, after the
            assessment questions and before you pay.
          </p>
          <div className="overflow-x-auto rounded-xl border border-[#ded8cd]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f7f4ee] text-left">
                  <th className="px-4 py-3 font-bold text-[#14120f]">Mosh plan</th>
                  <th className="px-4 py-3 font-bold text-[#14120f]">Who Mosh pitches it to</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ded8cd]">
                <tr><td className="px-4 py-3 text-[#14120f]">Prevention</td><td className="px-4 py-3 text-[#14120f]">Early thinning or a receding hairline</td></tr>
                <tr><td className="px-4 py-3 text-[#14120f]">Mosh&apos;s middle plan</td><td className="px-4 py-3 text-[#14120f]">Thinning and receding; Mosh labels it most popular</td></tr>
                <tr><td className="px-4 py-3 text-[#14120f]">Hair Loss Clinic</td><td className="px-4 py-3 text-[#14120f]">More established hair loss</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#56504a] mt-3">Source: getmosh.com.au/hair-loss and /pricing, read 27 September 2026.</p>
        </section>

        <section id="feature-table" className="border-t border-[#ded8cd] py-10">
          <h2 className="text-xl sm:text-2xl font-black text-[#14120f] mb-6">Mosh, Dense and your GP, side by side</h2>
          <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[600px] text-sm border-collapse">
              <thead>
                <tr>
                  {["", "Mosh", "Dense Hair Experts", "Your GP"].map((col) => (
                    <th key={col} className="text-left pb-3 pr-4 text-[11px] font-semibold uppercase tracking-widest text-[#56504a]">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-[#f7f4ee]" : ""}>
                    <td className="py-3 px-2 text-[#56504a] font-medium">{row.label}</td>
                    <td className="py-3 pr-4 text-[#14120f]">{row.mosh}</td>
                    <td className="py-3 pr-4 text-[#14120f]">{row.dense}</td>
                    <td className="py-3 pr-4 text-[#14120f]">{row.gp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* "Mosh vs Pilot" still drew about 685 impressions in 90 days at positions 4
            to 8 after /mosh-vs-pilot was retired into this page on 13 Sep 2026.
            No link: Pilot is not a partner. Its new owner is deliberately not
            named (Jarred, 24 Sep 2026: that brand is not mentioned on the site
            until its program is live). */}
        <section id="mosh-vs-pilot" className="border-t border-[#ded8cd] py-10 max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-black text-[#14120f] mb-4">Mosh vs Pilot: what changed</h2>
          <p className="text-[15px] leading-relaxed text-[#56504a]">
            Pilot, the men&apos;s health brand most often compared with Mosh, no longer runs as a standalone service: its
            site now sends visitors to another company&apos;s assessment (read on pilot.com.au, 19 September 2026). A
            Mosh vs Pilot comparison no longer has a Pilot side, so this page compares Mosh with a cosmetic routine
            and with your GP instead.
          </p>
        </section>

        <section id="faq" className="border-t border-[#ded8cd] py-10 max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-black text-[#14120f] mb-6">Common questions</h2>
          <div className="space-y-6">
            {FAQS.slice(1).map(({ q, a }) => (
              <div key={q} className="border-b border-[#ded8cd] pb-6">
                <h3 className="text-sm font-bold text-[#14120f] mb-2">{q}</h3>
                <p className="text-sm text-[#56504a] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-[#56504a] leading-relaxed">
            General information, not medical advice. Hair loss has several causes, and a registered health
            professional should assess your situation before you start any treatment.
          </p>
        </section>

        <section className="border-t border-[#ded8cd] pt-10">
          <h2 className="text-xl sm:text-2xl font-black text-[#14120f] mb-4">Keep comparing</h2>
          <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
            {[
              { href: "/mosh-vs-dense", label: "Mosh vs Dense, compared in detail" },
              { href: "/moshhair", label: "Mosh discount code and how the service works" },
              { href: "/mosh-review", label: "Mosh review" },
              { href: "/dense", label: "Dense Hair Experts guide" },
              { href: "/hair-loss", label: "All hair-loss guides" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="flex items-center gap-2 text-sm text-[#56504a] hover:text-[#14120f] transition-colors">
                <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 text-[#007a95]" />
                {label}
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a {...aff(MOSH_HAIR_URL, "best-hair-loss-foot-mosh")} className="inline-flex items-center gap-2 rounded-xl bg-[#14120f] px-5 py-3 text-sm font-bold text-white">
              Check your options with Mosh <ArrowRight className="h-4 w-4" />
            </a>
            <a {...aff(DENSE_URL, "best-hair-loss-foot-dense")} className="inline-flex items-center gap-2 rounded-xl border border-[#ded8cd] px-5 py-3 text-sm font-semibold text-[#14120f]">
              Shop Dense Hair Experts
            </a>
          </div>
        </section>

        <EditorialMeta lastUpdated="2026-09-28" className="pt-10 pb-2" />
        <AffiliateDisclosure className="pb-10" />
      </main>
      <StickyCta href={MOSH_HAIR_URL} product="Mosh · hair-loss treatment" label="Get started" />
    </ConsumerShell>
  );
}
