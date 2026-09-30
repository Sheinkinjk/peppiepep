import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";
import { MOSH_HAIR_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import MatchPrompt from "@/components/consumer/MatchPrompt";
import { EdgeObject } from "@/components/brand/EdgeObject";
import OfferSchema from "@/components/offers/OfferSchema";
import { checkedOn } from "@/lib/offers";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
export const metadata = generateSEOMetadata(seoConfig.bestHairLossTreatmentAustralia);

/*
 * Rebuilt 30 Sep 2026.
 *
 * Dense retired (Jarred, 30 Sep 2026). densehairexperts.com's own footer describes
 * a UK GPhC-registered pharmacy that prescribes after an online consultation, so
 * calling it a "non-prescription topical" was false. The page now compares Mosh
 * (an online consultation) with your GP, and describes over-the-counter products
 * generically, with no brand.
 *
 * Also removed: the Pilot section (retired with /mosh-vs-pilot), the Mosh-only
 * sticky bar (hub neutrality), the provider cards whose footer promised "what we
 * could not verify" about each provider, the unverifiable "Medicare rebate: No"
 * and "Can refer to a specialist: No" rows for Mosh, and the duplicate
 * FAQPage/BreadcrumbList emitted a second time inside the WebPage node.
 *
 * Title test (5 Sep, read 5 Oct): the title is unchanged. The h1 now repeats it.
 * The body change is a confound, recorded beside the test in seo.ts.
 */

const MOSH_READ = "30 September 2026";

const FAQS = [
  {
    q: "What is the best hair loss treatment in Australia?",
    a: "There is no single best treatment, because the right one depends on the cause and stage of the hair loss, and hair-loss medicines are prescription-only in Australia. The practical choice is who assesses you: an online service such as Mosh, or your GP in person. Over-the-counter shampoos and serums are cosmetic and need no consult. Sudden, patchy or unexplained hair loss is a reason to see a GP first.",
  },
  {
    q: "How much does hair loss treatment cost per month in Australia?",
    a: "Online hair-loss services such as Mosh charge a subscription that covers the consultation and ongoing check-ins. Mosh lists a monthly price for each of its hair plans on its own pricing page, and the consultation confirms which plan applies before you pay. A GP consult may be bulk-billed, or carry a gap fee after the Medicare rebate.",
  },
  {
    q: "What does Mosh do?",
    a: `Mosh is an Australian telehealth service for men. For hair loss you complete an online questionnaire with photos, and an AHPRA-registered doctor or nurse practitioner reviews it (getmosh.com.au, read ${MOSH_READ}). It suits men who would rather not book a GP appointment. It is not an emergency or diagnostic service.`,
  },
  {
    q: "Can I have hair loss assessed online in Australia?",
    a: "Yes. Because hair-loss medicines are prescription-only in Australia, an online service arranges a consultation with a registered practitioner: a questionnaire and photos, sometimes followed by a call. Mosh runs this for men. Women, and anyone with sudden or patchy loss, are better served by a GP.",
  },
  {
    q: "Do over-the-counter hair products work on their own?",
    a: "Shampoos, conditioners and serums sold for thinning hair are cosmetic: they can improve how hair looks and feels, and they need no consult. A pharmacist can tell you what a product is for. If the loss is progressing, an assessment by a practitioner or your GP is the step that finds the cause.",
  },
];

// ─── JSON-LD (each node emitted once) ────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Best Hair Loss Treatment Australia 2026", item: `${SITE_URL}/best-hair-loss-treatment-australia` },
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
  dateModified: "2026-09-30",
  name: seoConfig.bestHairLossTreatmentAustralia.title,
  description: seoConfig.bestHairLossTreatmentAustralia.description,
  url: `${SITE_URL}/best-hair-loss-treatment-australia`,
};

const articleSchema = comparisonArticleSchema({
  headline: "Best Hair Loss Treatment Australia 2026: How to Choose",
  description: "Refer Labs compares an online consultation with Mosh and an appointment with your GP for hair loss in Australia, on who each suits, how it works and how it is priced.",
  url: "https://referlabs.com.au/best-hair-loss-treatment-australia",
  datePublished: "2026-07-05",
  dateModified: "2026-09-30",
});

const ROWS: { label: string; mosh: string; gp: string }[] = [
  { label: "What it is", mosh: "An online consultation with an Australian telehealth service", gp: "An appointment with your own doctor" },
  { label: "Who assesses you", mosh: "An AHPRA-registered doctor or nurse practitioner, from a questionnaire and photos", gp: "Your GP, face to face, with a full history" },
  { label: "Who it is for", mosh: "Men", gp: "Anyone" },
  { label: "Where", mosh: "Online, with no clinic visit", gp: "In person, or by telehealth with your own GP" },
  { label: "How it is priced", mosh: "A subscription; no charge for the initial consultation", gp: "A consult fee, which may be bulk-billed or rebated by Medicare" },
];

export default function BestHairLossTreatmentAustraliaPage() {
  const checked = checkedOn("REFERAL55");
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
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
                Best Hair Loss Treatment Australia 2026: <span>How to Choose</span>
              </h1>
              {/* The answer, directly under the h1. Nothing between: check-answer-slot. */}
              <p className="text-[#14120f] text-base sm:text-lg leading-relaxed">
                Hair-loss medicines are prescription-only in Australia, so the real choice is who assesses you: an
                online service such as Mosh, or your GP. Mosh is an online consultation with an AHPRA-registered
                practitioner, who decides whether any treatment is appropriate; it is for men and runs fully online.
                A GP sees anyone, can order tests and refer you on, and the consult may be bulk-billed. Over-the-counter
                shampoos and serums are cosmetic and need no consult. Sudden or patchy loss, or hair loss in a woman, is
                a reason to start with a GP.
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

        {/* One side-by-side. Two columns plus a label column fit a 375px screen
            without a horizontal scroll, so nothing clips. */}
        <section id="side-by-side" className="pt-10">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Mosh and your GP, side by side</h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#56504a]">
            Listed alphabetically. Mosh facts read on getmosh.com.au, {MOSH_READ}.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#ded8cd] bg-white">
            <table className="w-full table-fixed border-collapse text-[13px] sm:text-sm">
              <colgroup>
                <col className="w-[28%] sm:w-[22%]" />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr className="bg-[#f7f4ee] text-left">
                  <th scope="col" className="px-3 py-3 sm:px-4"><span className="sr-only">Attribute</span></th>
                  <th scope="col" className="px-3 py-3 font-bold text-[#14120f] sm:px-4">Mosh</th>
                  <th scope="col" className="px-3 py-3 font-bold text-[#14120f] sm:px-4">Your GP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1ede4] align-top">
                {ROWS.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className="px-3 py-3 text-left font-medium text-[#56504a] sm:px-4">{r.label}</th>
                    <td className="px-3 py-3 text-[#14120f] sm:px-4">{r.mosh}</td>
                    <td className="px-3 py-3 text-[#14120f] sm:px-4">{r.gp}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="px-3 py-3 text-left font-medium text-[#56504a] sm:px-4">Refer Labs offer</th>
                  <td className="px-3 py-3 text-[#14120f] sm:px-4">
                    55% off a new customer&apos;s first order with REFERAL55. Our link carries the code; if it isn&apos;t
                    shown at checkout, enter REFERAL55.{checked ? ` Checked ${checked}.` : ""}
                  </td>
                  <td className="px-3 py-3 text-[#14120f] sm:px-4">None</td>
                </tr>
                <tr>
                  <th scope="row" className="px-3 py-3 text-left font-medium text-[#56504a] sm:px-4"><span className="sr-only">Next step</span></th>
                  <td className="px-3 py-4 sm:px-4">
                    <a
                      href={MOSH_HAIR_URL}
                      target="_blank"
                      rel="nofollow sponsored"
                      data-cta="best-hair-loss-mosh"
                      className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#007a95] px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-[#003647]"
                    >
                      Continue to Mosh <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                    <p className="mt-2 text-[12px] leading-relaxed text-[#56504a]">
                      We earn a commission if you sign up with Mosh through this link, at no extra cost to you.
                    </p>
                  </td>
                  <td className="px-3 py-4 text-[12px] leading-relaxed text-[#56504a] sm:px-4">
                    Book with your own GP. We earn nothing from this.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-[#56504a]">
            More on each: <Link href="/moshhair" className="font-semibold text-[#007a95] hover:underline">our Mosh guide</Link>{" "}
            and <Link href="/mosh-review" className="font-semibold text-[#007a95] hover:underline">whether Mosh is legit</Link>.
          </p>
        </section>

        <section className="pt-12 pb-2 max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-black text-[#14120f] mb-4">What is the best hair-loss treatment in Australia?</h2>
          <p className="text-[#14120f] text-sm sm:text-base leading-relaxed">{FAQS[0].a}</p>
        </section>

        <section id="gp" className="border-t border-[#ded8cd] mt-10 py-10 max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-black text-[#14120f] mb-4">When your GP is the better first step</h2>
          <div className="space-y-4 text-[#56504a] text-sm sm:text-base leading-relaxed">
            <p>
              A GP sees you in person, takes a full history, can order blood tests to rule out other causes, and can
              refer you to a dermatologist. The consult may be bulk-billed or rebated by Medicare. It is slower to
              arrange, and for straightforward male pattern hair loss many men find an online service more convenient.
            </p>
            <p>
              Go to a GP first if the loss is sudden, patchy, comes with scalp symptoms, or you are a woman: the online
              service compared here is for men.
            </p>
          </div>
        </section>

        <section id="over-the-counter" className="border-t border-[#ded8cd] py-10 max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-black text-[#14120f] mb-4">Where over-the-counter products fit</h2>
          <p className="text-[#56504a] text-sm sm:text-base leading-relaxed">
            Pharmacies and supermarkets sell shampoos, conditioners and serums for thinning hair. They are cosmetic,
            need no consult, and are priced per product. A pharmacist can explain what a product is for. They do not
            find the cause of hair loss, which is what an assessment by a practitioner or your GP is for. We do not
            recommend a brand, and we earn nothing from this route.
          </p>
        </section>

        <section id="cost" className="border-t border-[#ded8cd] py-10 max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-black text-[#14120f] mb-3">How Mosh groups its hair plans</h2>
          <p className="text-sm text-[#56504a] leading-relaxed mb-5">
            Mosh sells hair loss as three plans by stage. It lists a monthly price for each on its own pricing page,
            and the consultation confirms which plan applies before you pay.
          </p>
          <div className="rounded-xl border border-[#ded8cd]">
            <table className="w-full table-fixed text-sm">
              <thead>
                <tr className="bg-[#f7f4ee] text-left">
                  <th className="px-4 py-3 font-bold text-[#14120f]">Stage</th>
                  <th className="px-4 py-3 font-bold text-[#14120f]">How Mosh describes it</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ded8cd]">
                <tr><td className="px-4 py-3 text-[#14120f]">Receding hairline</td><td className="px-4 py-3 text-[#14120f]">Early thinning or a receding hairline</td></tr>
                <tr><td className="px-4 py-3 text-[#14120f]">Thinning and receding</td><td className="px-4 py-3 text-[#14120f]">Thinning and receding hair; Mosh labels it most popular</td></tr>
                <tr><td className="px-4 py-3 text-[#14120f]">Advanced</td><td className="px-4 py-3 text-[#14120f]">Advanced thinning and receding</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#56504a] mt-3">Source: getmosh.com.au/hair-loss and /pricing, read {MOSH_READ}.</p>
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
            professional should assess your situation.
          </p>
        </section>

        <section className="border-t border-[#ded8cd] pt-10">
          <h2 className="text-xl sm:text-2xl font-black text-[#14120f] mb-4">Keep comparing</h2>
          <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
            {[
              { href: "/moshhair", label: "Mosh discount code and how the service works" },
              { href: "/mosh-review", label: "Mosh review: is it legit?" },
              { href: "/hair-loss-treatment-cost-australia", label: "How hair-loss care is priced" },
              { href: "/hair-loss", label: "All hair-loss guides" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="flex items-center gap-2 text-sm text-[#56504a] hover:text-[#14120f] transition-colors">
                <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 text-[#007a95]" />
                {label}
              </Link>
            ))}
          </div>
        </section>

        <EditorialMeta lastUpdated="2026-09-30" className="pt-10 pb-2" />
        <AffiliateDisclosure className="pb-10" />
      </main>
    </ConsumerShell>
  );
}
