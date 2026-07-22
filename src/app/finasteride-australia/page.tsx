import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSH_HAIR_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";

export const metadata = generateSEOMetadata(seoConfig.finasterideAustralia);

const SLUG = "/finasteride-australia";

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Hair Loss", item: `${SITE_URL}/hair-loss` },
    { "@type": "ListItem", position: 3, name: "Finasteride Australia", item: `${SITE_URL}${SLUG}` },
  ],
};

const faqs = [
  {
    q: "Is finasteride prescription-only in Australia?",
    a: "Yes. Oral finasteride is a Schedule 4 (prescription-only) medicine in Australia, including the 1mg dose used for hair loss. It can only be supplied after a registered practitioner assesses you and decides it is appropriate. It cannot be bought over the counter, and no service can guarantee a prescription before an assessment. This page is general information, not medical advice.",
  },
  {
    q: "What does finasteride do for hair loss?",
    a: "Finasteride works on the hormone pathway behind male pattern hair loss. It reduces the conversion of testosterone to dihydrotestosterone (DHT), the hormone linked to the shrinking of hair follicles in androgenetic alopecia. At the 1mg daily dose it is used in men to slow further loss, and some also see partial regrowth, though responses vary between people. Whether it is suitable for you is a clinical decision a practitioner makes.",
  },
  {
    q: "How long does finasteride take to work?",
    a: "Results are slow and vary between people. Product information generally points to at least three months of daily use before any change is visible, and clinical reviews note most people need around six months or more to judge the response. Any benefit continues only while you keep taking it, so it is treated as an ongoing rather than a one-off treatment.",
  },
  {
    q: "How do I get finasteride in Australia?",
    a: "Through a practitioner. You can see your own GP, or use an online telehealth service where a registered Australian practitioner reviews your case and prescribes if it is appropriate. Australian regulators require a genuine assessment rather than a form filled in on its own, so a compliant service involves a real practitioner review before any prescription. Mosh is one Australian men's telehealth service that runs this kind of assessment for hair loss.",
  },
  {
    q: "Can women take finasteride for hair loss?",
    a: "Finasteride at the hair-loss dose is used in men. It carries a serious warning for women who are or may become pregnant, because it can affect the development of a male baby, and women in that group are advised not even to handle broken or crushed tablets. Whether any hair-loss treatment is appropriate for a woman is a question for a practitioner, and this page is not medical advice.",
  },
  {
    q: "What are the side effects of finasteride?",
    a: "The ones most discussed are sexual, such as reduced libido or difficulty with erections, and these are generally reversible if the medicine is stopped. Breast tenderness can also occur. Regulators also monitor rarer reports of effects that some people describe as persisting after stopping. This is a factual summary, not a risk assessment for you personally, which only a practitioner can give after reviewing your history.",
  },
  {
    q: "Is topical finasteride available in Australia?",
    a: "Topical finasteride exists and has some trial evidence, but it is not a TGA-registered product for hair loss in Australia. Where it is offered it is made up by a compounding pharmacy and still requires a prescription after a practitioner assessment. Treat it as an off-label, prescription-required option rather than a standard registered product.",
  },
  {
    q: "Does Refer Labs prescribe or supply finasteride?",
    a: "No. Refer Labs is an independent comparison publisher. We explain how the medicine and the services work and link out to them, including a disclosed affiliate link to Mosh. We do not provide medical care and cannot assess suitability. Nothing here is medical advice. Consult a qualified health professional.",
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
  name: seoConfig.finasterideAustralia.title,
  description: seoConfig.finasterideAustralia.description,
  url: seoConfig.finasterideAustralia.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-17",
  dateModified: "2026-07-17",
  about: [
    { "@type": "Thing", name: "finasteride Australia" },
    { "@type": "Thing", name: "male pattern hair loss treatment" },
    { "@type": "Thing", name: "androgenetic alopecia" },
    { "@type": "Thing", name: "DHT blocker hair loss" },
    { "@type": "Thing", name: "hair loss telehealth Australia" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

export default function FinasterideAustraliaPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">

          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#6e7b74]">
            <Link href="/" className="hover:text-[#10251b] transition-colors">Refer Labs</Link>
            <span>/</span>
            <Link href="/hair-loss" className="hover:text-[#10251b] transition-colors">Hair loss</Link>
            <span>/</span>
            <span className="text-[#10251b]">Finasteride</span>
          </nav>

          {/* Hero */}
          <header className="pt-9 pb-6">
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b]">
              Finasteride in Australia: what it is, how it works, and how access works
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#3d4b44]">
              Finasteride is one of the two most studied treatments for male pattern hair loss, and one of the
              most searched. This page explains, factually, what finasteride is, why it is prescription-only in
              Australia, how a prescription is assessed through a GP or telehealth, and what is genuinely worth knowing
              before you consider it. It is general information to help you understand the medicine, not medical advice
              and not a recommendation.
            </p>
          </header>

          {/* Info-only note */}
          <div className="nw-card px-5 py-4 text-sm leading-relaxed text-[#3d4b44]">
            <span className="font-bold text-[#10251b]">Information only.</span> Nothing here is medical advice or a
            recommendation of any treatment. Finasteride is a prescription-only medicine in Australia, supplied only
            after an individual assessment by a registered practitioner who decides suitability. This page contains a
            disclosed affiliate link to Mosh.
          </div>

          {/* First CTA */}
          <div className="mt-7 flex flex-col items-start gap-3 rounded-2xl border border-[#0a7c42]/25 bg-[#e8f5ee] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-[15px] leading-relaxed text-[#10251b]">
              Want a practitioner to assess whether a hair-loss treatment suits you? Mosh runs a men&apos;s hair-loss
              assessment online, reviewed by registered Australian practitioners, with treatment delivered if
              appropriate. New customers get 55% off their first order through our link.
            </p>
            <a
              href={MOSH_HAIR_URL}
              target="_blank"
              rel="nofollow sponsored"
              data-cta="finasteride-hero"
              className="nw-btn shrink-0 whitespace-nowrap"
            >
              Start a Mosh assessment <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Body */}
          <article className="mt-10 space-y-9">

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                What finasteride is
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  Finasteride is a medicine that acts on the hormone pathway behind male pattern hair loss. In technical
                  terms it is a type II 5-alpha-reductase inhibitor: it reduces how much testosterone your body converts
                  into dihydrotestosterone, or DHT. DHT is the hormone most closely linked to the gradual shrinking of
                  hair follicles in androgenetic alopecia, the common inherited form of hair loss. By lowering DHT,
                  finasteride is used to slow that process, and some men also see partial regrowth over time. How much
                  benefit any individual sees varies, and that is something a practitioner and the approved product
                  information can speak to, not a webpage.
                </p>
                <p>
                  The dose used for hair loss is 1mg taken orally once a day. A higher 5mg strength of the same medicine
                  is used for a prostate condition, which is a different use entirely. Finasteride is a genuine
                  prescription medicine with real clinical considerations, not a supplement, which is exactly why a
                  practitioner has to be involved before anyone takes it.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                Why finasteride is prescription-only in Australia
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  In Australia, oral finasteride is a Schedule 4 medicine, which means prescription-only. Every oral
                  strength, including the 1mg hair-loss dose, sits in the category that requires a registered
                  practitioner to authorise supply. That reflects the fact that it carries real considerations: possible
                  side effects, a serious warning around pregnancy, and suitability that depends on your individual
                  health. None of that can be judged by a webpage or a marketing quiz.
                </p>
                <p>
                  It is worth knowing that the regulator has looked at whether the 1mg dose could be sold without a
                  prescription and decided against it, keeping it prescription-only while safety signals continue to be
                  monitored. So anyone offering guaranteed access to finasteride before an assessment is not operating
                  the way a compliant Australian service should.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                How a prescription is assessed: GP and telehealth
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  There are two mainstream routes, and both are valid.
                </p>
                <p>
                  <span className="font-semibold text-[#10251b]">Your GP, in person.</span> A GP can assess you with full
                  context, check anything relevant, and manage the treatment alongside the rest of your health. It is
                  slower to get started and depends on appointment availability.
                </p>
                <p>
                  <span className="font-semibold text-[#10251b]">Online telehealth.</span> A telehealth service runs an
                  online questionnaire that a registered Australian practitioner reviews, and prescribes if it is
                  appropriate, usually with home delivery. Worth understanding: Australian regulators tightened the rules
                  in 2025 so that a prescription cannot rest on a questionnaire alone. A compliant service must include a
                  genuine practitioner assessment, not just a form. Mosh is one Australian men&apos;s telehealth service
                  that runs this model. You can read how it works in our{" "}
                  <Link href="/moshhair" className="nw-link">Mosh hair-loss guide</Link>.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                What is genuinely worth knowing
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  <span className="font-semibold text-[#10251b]">It is slow, and ongoing.</span> Most people need three
                  to six months or more of daily use before judging the effect, and any benefit only holds while you keep
                  taking it. It is a long-term commitment rather than a quick fix.
                </p>
                <p>
                  <span className="font-semibold text-[#10251b]">Pregnancy warning.</span> Finasteride carries a serious
                  warning for women who are or may become pregnant, because of the risk to a developing male baby. Women
                  in that group are advised not even to handle broken or crushed tablets.
                </p>
                <p>
                  <span className="font-semibold text-[#10251b]">Side effects.</span> The most discussed are sexual, such
                  as reduced libido or erection difficulties, generally reversible on stopping. Rarer reports of effects
                  persisting after stopping are monitored by regulators. A practitioner is the person to weigh these
                  against your own history.
                </p>
                <p>
                  <span className="font-semibold text-[#10251b]">It is often combined with minoxidil.</span> Clinical
                  reviews describe finasteride and topical minoxidil together as more effective than either on its own.
                  We cover the second medicine in our guide to{" "}
                  <Link href="/minoxidil-australia" className="nw-link">minoxidil in Australia</Link>.
                </p>
              </div>
            </section>

            {/* Second CTA */}
            <section className="rounded-2xl border border-[#e5e9e7] bg-[#eef1ec] px-6 py-6">
              <h2 className="text-lg font-bold text-[#10251b]">See whether treatment suits you, properly</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
                The only way to know whether finasteride or another hair-loss treatment is right for you is a
                practitioner assessment. Mosh runs a men&apos;s hair-loss assessment online, reviewed by registered
                Australian practitioners, with treatment delivered if appropriate. New customers get 55% off their first
                order through our link.
              </p>
              <a
                href={MOSH_HAIR_URL}
                target="_blank"
                rel="nofollow sponsored"
                data-cta="finasteride-footer"
                className="nw-btn mt-5"
              >
                Start a Mosh assessment <ArrowRight className="h-4 w-4" />
              </a>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">Frequently asked questions</h2>
              <div className="mt-5 divide-y divide-[#e5e9e7] border-y border-[#e5e9e7]">
                {faqs.map((f) => (
                  <details key={f.q} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#10251b]">
                      {f.q}
                      <span className="text-xl leading-none text-[#0a7c42] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related */}
            <section>
              <h2 className="text-lg font-bold text-[#10251b]">Keep reading</h2>
              <ul className="mt-3 space-y-2 text-[15px]">
                <li><Link href="/minoxidil-australia" className="nw-link">Minoxidil in Australia, explained</Link></li>
                <li><Link href="/hair-loss-treatment-cost-australia" className="nw-link">What hair-loss treatment costs in Australia</Link></li>
                <li><Link href="/best-hair-loss-treatment-australia" className="nw-link">Best hair-loss treatment in Australia, compared</Link></li>
                <li><Link href="/moshhair" className="nw-link">Mosh hair-loss: how it works and the current offer</Link></li>
                <li><Link href="/hair-loss" className="nw-link">The full hair-loss hub</Link></li>
              </ul>
            </section>

            {/* Disclosure */}
            <section className="border-t border-[#e5e9e7] pt-6 pb-16">
              <p className="text-xs leading-relaxed text-[#9aa39c]">
                This page is published by Refer Labs, an independent comparison publisher, and contains a disclosed
                affiliate link to Mosh, which means we may earn a commission if you sign up through our link. Commissions
                never change what we write. All content is for general information only and does not constitute medical
                advice. Finasteride is a prescription-only medicine in Australia, available only after individual
                assessment by a registered practitioner who decides suitability. Consult a qualified health professional
                before starting any treatment.
              </p>
            </section>
          </article>
        </div>
      </main>
      <StickyCta href={MOSH_HAIR_URL} product="Mosh hair-loss telehealth" label="Start assessment" />
    </ConsumerShell>
  );
}
