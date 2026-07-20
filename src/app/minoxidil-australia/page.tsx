import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSH_HAIR_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";

export const metadata = generateSEOMetadata(seoConfig.minoxidilAustralia);

const SLUG = "/minoxidil-australia";

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Hair Loss", item: `${SITE_URL}/hair-loss` },
    { "@type": "ListItem", position: 3, name: "Minoxidil Australia", item: `${SITE_URL}${SLUG}` },
  ],
};

const faqs = [
  {
    q: "Is minoxidil available over the counter in Australia?",
    a: "Topical minoxidil is. It is a Schedule 2 (pharmacy) medicine, sold over the counter from a pharmacy without a prescription, commonly as Regaine and generics in 2% and 5% strengths, as a solution or foam. Oral minoxidil is different: it is a Schedule 4 prescription-only medicine. This page is general information, not medical advice.",
  },
  {
    q: "What does minoxidil do for hair loss?",
    a: "Minoxidil is a vasodilator. Applied to the scalp it is thought to improve blood flow around the hair follicle and extend the growing phase of the hair cycle, which can help with androgenetic alopecia in both men and women. It works differently from finasteride, which is why the two are often used together. Whether it suits you is a question for a pharmacist or practitioner.",
  },
  {
    q: "What is the difference between topical and oral minoxidil?",
    a: "Topical minoxidil is applied to the scalp and is available over the counter. Oral minoxidil is a tablet, originally approved as a blood-pressure medicine, and low-dose oral minoxidil for hair loss is prescribed off-label, meaning outside its registered use, after a practitioner assessment. Oral use carries different considerations, such as effects on blood pressure and fluid, so it is prescription-only.",
  },
  {
    q: "How long does minoxidil take to work, and what is the shedding phase?",
    a: "Give it several months. Many people notice a temporary increase in shedding in the first two to three months of use, sometimes called reactive shedding, as follicles cycle. This is generally expected rather than a sign it is failing, but if you are unsure, ask a pharmacist or practitioner. Any benefit continues only while you keep using it.",
  },
  {
    q: "What are the side effects of minoxidil?",
    a: "For topical minoxidil, the common ones are local scalp irritation and unwanted hair growth if it spreads to areas like the face, which is why it is applied carefully to the scalp only. Oral minoxidil can affect blood pressure and cause fluid retention, which is part of why it is prescription-only. This is a factual summary, not personal medical advice.",
  },
  {
    q: "Can I use minoxidil and finasteride together?",
    a: "Many people do, under guidance. Clinical reviews describe topical minoxidil combined with finasteride as more effective than either used alone, because they act on different parts of the problem. Finasteride is prescription-only and needs a practitioner assessment, while topical minoxidil is available over the counter. Our finasteride guide covers the prescription side.",
  },
  {
    q: "Does Refer Labs prescribe or supply minoxidil?",
    a: "No. Refer Labs is an independent comparison publisher. We explain how the medicine and the services work and link out to them, including a disclosed affiliate link to Mosh. We do not provide medical care or supply medicines. Nothing here is medical advice. For topical minoxidil, a pharmacist can advise; for a full assessed plan, a practitioner can.",
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
  name: seoConfig.minoxidilAustralia.title,
  description: seoConfig.minoxidilAustralia.description,
  url: seoConfig.minoxidilAustralia.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-17",
  dateModified: "2026-07-17",
  about: [
    { "@type": "Thing", name: "minoxidil Australia" },
    { "@type": "Thing", name: "Regaine" },
    { "@type": "Thing", name: "topical minoxidil hair loss" },
    { "@type": "Thing", name: "oral minoxidil hair loss" },
    { "@type": "Thing", name: "androgenetic alopecia treatment" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

export default function MinoxidilAustraliaPage() {
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
            <span className="text-[#10251b]">Minoxidil</span>
          </nav>

          {/* Hero */}
          <header className="pt-9 pb-6">
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b]">
              Minoxidil in Australia: topical vs oral, and how to get it
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#3d4b44]">
              Minoxidil is the other pillar of evidence-backed hair-loss treatment alongside finasteride, and the one
              you can buy over the counter. This page explains, factually, what minoxidil is, the difference between the
              topical version you can buy at a pharmacy and the prescription-only oral tablet, what to expect including
              the early shedding phase, and how it fits with a practitioner-assessed plan. It is general information, not
              medical advice.
            </p>
          </header>

          {/* Info-only note */}
          <div className="nw-card px-5 py-4 text-sm leading-relaxed text-[#3d4b44]">
            <span className="font-bold text-[#10251b]">Information only.</span> Nothing here is medical advice. Topical
            minoxidil is a pharmacy medicine you can buy over the counter; oral minoxidil is prescription-only and used
            off-label for hair loss after a practitioner assessment. This page contains a disclosed affiliate link to
            Mosh.
          </div>

          {/* First CTA */}
          <div className="mt-7 flex flex-col items-start gap-3 rounded-2xl border border-[#0a7c42]/25 bg-[#e8f5ee] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-[15px] leading-relaxed text-[#10251b]">
              Prefer a practitioner-assessed plan that can combine actives rather than piecing it together yourself?
              Mosh runs a men&apos;s hair-loss assessment online, reviewed by registered Australian practitioners, with
              treatment delivered if appropriate. New customers get 55% off their first order through our link.
            </p>
            <a
              href={MOSH_HAIR_URL}
              target="_blank"
              rel="nofollow sponsored"
              data-cta="minoxidil-hero"
              className="nw-btn shrink-0 whitespace-nowrap"
            >
              Start a Mosh assessment <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Body */}
          <article className="mt-10 space-y-9">

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                What minoxidil is
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  Minoxidil is a vasodilator, a compound that widens blood vessels. Applied to the scalp for hair loss,
                  it is thought to improve blood flow around the follicle and prolong the active growing phase of the
                  hair cycle. Unlike finasteride, which works on the hormone DHT, minoxidil works on the follicle and its
                  growth cycle, which is why the two are commonly used together rather than as rivals. It is used for
                  androgenetic alopecia in both men and women.
                </p>
                <p>
                  Most people encounter it as Regaine or a generic equivalent, in 2% and 5% strengths, sold as either a
                  liquid solution or a foam.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                Topical vs oral: the important difference
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  <span className="font-semibold text-[#10251b]">Topical minoxidil</span> is a Schedule 2 pharmacy
                  medicine in Australia. That means you can buy it over the counter at a pharmacy without a prescription,
                  though a pharmacist can advise on strength and use. This is the version most people mean when they talk
                  about minoxidil for hair.
                </p>
                <p>
                  <span className="font-semibold text-[#10251b]">Oral minoxidil</span> is a different thing. It is a
                  tablet originally approved as a blood-pressure medicine, and low-dose oral minoxidil for hair loss is
                  prescribed off-label, meaning outside its registered use. Because a tablet affects the whole body, not
                  just the scalp, it carries considerations like effects on blood pressure and fluid retention, and it is
                  Schedule 4, prescription-only. It is only appropriate after a practitioner assessment.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                What to expect, including the shedding phase
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  <span className="font-semibold text-[#10251b]">Early shedding is common.</span> In the first two to
                  three months, many people notice a temporary increase in shedding as follicles reset into a new cycle.
                  It is generally expected rather than a sign of failure, but if it worries you, a pharmacist or
                  practitioner can reassure you or reassess.
                </p>
                <p>
                  <span className="font-semibold text-[#10251b]">It takes months, and it is ongoing.</span> Give it
                  several months before judging the effect, and know that any benefit holds only while you keep using it.
                </p>
                <p>
                  <span className="font-semibold text-[#10251b]">Side effects.</span> For topical use, the common ones
                  are local scalp irritation and unwanted hair growth if the product spreads beyond the scalp, so it is
                  applied carefully. Oral minoxidil&apos;s considerations are different, which is part of why it is
                  prescription-only.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                How it fits with a full treatment plan
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  You can buy topical minoxidil yourself and use it on its own. Many people do. But clinical reviews
                  describe minoxidil combined with finasteride as more effective than either alone, because they tackle
                  different parts of the problem. Finasteride is prescription-only and needs a practitioner assessment,
                  which is where a telehealth service or your GP comes in.
                </p>
                <p>
                  If you would rather have a practitioner assess the whole picture and set up a combined plan than
                  assemble it yourself, that is what services like Mosh do. Our{" "}
                  <Link href="/finasteride-australia" className="nw-link">finasteride guide</Link> covers the
                  prescription side, our{" "}
                  <Link href="/hair-loss-treatment-cost-australia" className="nw-link">cost guide</Link> covers what
                  treatment tends to run to, and our{" "}
                  <Link href="/best-hair-loss-treatment-australia" className="nw-link">comparison</Link> lines up the main
                  options.
                </p>
              </div>
            </section>

            {/* Second CTA */}
            <section className="rounded-2xl border border-[#e5e9e7] bg-[#eef1ec] px-6 py-6">
              <h2 className="text-lg font-bold text-[#10251b]">Want a plan set up for you?</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
                Topical minoxidil you can buy yourself. For a practitioner-assessed plan that can combine actives, Mosh
                runs a men&apos;s hair-loss assessment online, reviewed by registered Australian practitioners, with
                treatment delivered if appropriate. New customers get 55% off their first order through our link.
              </p>
              <a
                href={MOSH_HAIR_URL}
                target="_blank"
                rel="nofollow sponsored"
                data-cta="minoxidil-footer"
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
                <li><Link href="/finasteride-australia" className="nw-link">Finasteride in Australia, explained</Link></li>
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
                advice. Topical minoxidil is a pharmacy medicine; oral minoxidil is prescription-only and used off-label
                for hair loss after a practitioner assessment. Consult a pharmacist or qualified health professional
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
