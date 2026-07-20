import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import MatchPrompt from "@/components/consumer/MatchPrompt";

export const metadata = generateSEOMetadata(seoConfig.glp1WeightLoss);

const SLUG = "/glp-1-weight-loss-australia";

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Weight Loss", item: `${SITE_URL}/weight-loss` },
    { "@type": "ListItem", position: 3, name: "GLP-1 Weight Loss Australia", item: `${SITE_URL}${SLUG}` },
  ],
};

const faqs = [
  {
    q: "What is GLP-1 for weight loss?",
    a: "GLP-1 stands for glucagon-like peptide-1, a hormone the body produces naturally that is involved in appetite and blood-sugar regulation. GLP-1 medications are a class of prescription medicines that work with this pathway. As a category they are used in weight management under practitioner supervision. This page is general, factual information and not medical advice.",
  },
  {
    q: "Is GLP-1 medication prescription-only in Australia?",
    a: "Yes. GLP-1 medications are prescription-only medicines in Australia. They are supplied only after an individual assessment by a registered Australian practitioner, who decides whether a prescription is appropriate. They cannot be bought over the counter, and no service can guarantee access before an assessment.",
  },
  {
    q: "How do I get a GLP-1 prescription in Australia?",
    a: "There are two common routes. You can see your own GP in person, or you can use an online telehealth service that runs an eligibility questionnaire reviewed by a registered practitioner. In both cases a practitioner assesses your individual health picture and decides whether a prescription is suitable. Eligibility is never automatic.",
  },
  {
    q: "Who is eligible for GLP-1 weight-loss medication?",
    a: "Eligibility is decided by a registered practitioner based on your individual circumstances, not by a website or a questionnaire alone. A practitioner weighs up your medical history, other conditions, other medicines and your goals. Completing an assessment does not guarantee a prescription, and some people are told these medicines are not appropriate for them.",
  },
  {
    q: "What are semaglutide and tirzepatide?",
    a: "Semaglutide and tirzepatide are generic drug-class names within the broader GLP-1 and related medicine categories. We mention them only so you can recognise the terms in factual coverage. They are prescription medicines, and whether any specific medicine is appropriate is a clinical decision made by a practitioner during an assessment.",
  },
  {
    q: "Can I get GLP-1 medication through telehealth in Australia?",
    a: "Yes, telehealth is a recognised pathway. A registered Australian practitioner can assess you remotely through an online questionnaire and follow-up, and if a prescription is appropriate it is arranged through a pharmacy, often with home delivery. Moshy is one Australian telehealth service that runs this kind of assessment and is open to anyone eligible.",
  },
  {
    q: "Are GLP-1 medications only for men or only for women?",
    a: "The GLP-1 medicine class is not gender-specific. Some brands market to a particular audience, but the category itself applies to anyone a practitioner assesses as suitable. Moshy, for example, is open to anyone eligible regardless of gender.",
  },
  {
    q: "Does Refer Labs prescribe or supply GLP-1 medication?",
    a: "No. Refer Labs is an independent comparison publisher. We explain how the category and the services work and link out to them, including a disclosed affiliate link to Moshy. We do not provide medical care and cannot assess eligibility. Nothing here is medical advice. Consult a qualified health professional.",
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
  name: seoConfig.glp1WeightLoss.title,
  description: seoConfig.glp1WeightLoss.description,
  url: seoConfig.glp1WeightLoss.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-05",
  dateModified: "2026-07-05",
  about: [
    { "@type": "Thing", name: "GLP-1 weight loss Australia" },
    { "@type": "Thing", name: "GLP-1 medications" },
    { "@type": "Thing", name: "GLP-1 telehealth Australia" },
    { "@type": "Thing", name: "prescription weight-loss medication Australia" },
    { "@type": "Thing", name: "semaglutide tirzepatide drug class" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Glp1WeightLossAustraliaPage() {
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
            <Link href="/weight-loss" className="hover:text-[#10251b] transition-colors">Weight loss</Link>
            <span>/</span>
            <span className="text-[#10251b]">GLP-1 weight loss</span>
          </nav>

          {/* Hero */}
          <header className="pt-9 pb-6">
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b]">
              GLP-1 weight loss in Australia: what the medication class is and how access works
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#3d4b44]">
              GLP-1 has become shorthand for a whole category of weight-management medicines, and the search interest in Australia
              has exploded. This page explains, factually and without naming any brand, what GLP-1 medications are as a class, why
              they are prescription-only here, and how prescription access works through both a GP and online telehealth. It is
              general information to help you understand the category, not medical advice and not a recommendation.
            </p>
          </header>

          {/* Info-only note */}
          <div className="nw-card px-5 py-4 text-sm leading-relaxed text-[#3d4b44]">
            <span className="font-bold text-[#10251b]">Information only.</span> Nothing here is medical advice or a recommendation
            of any treatment. GLP-1 medications are prescription-only in Australia and are supplied only after individual assessment
            by a registered practitioner, who decides suitability. This page contains a disclosed affiliate link to Moshy.
          </div>

          {/* First CTA */}
          <div className="mt-7 flex flex-col items-start gap-3 rounded-2xl border border-[#0a7c42]/25 bg-[#e8f5ee] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-[15px] leading-relaxed text-[#10251b]">
              Curious whether you might be eligible for a practitioner-led plan? Moshy runs a free online eligibility check reviewed
              by registered Australian practitioners. Around ten minutes, no obligation.
            </p>
            <a
              href={MOSHY_URL}
              target="_blank"
              rel="nofollow sponsored"
              data-cta="glp1-hero"
              className="nw-btn shrink-0 whitespace-nowrap"
            >
              Check your eligibility on Moshy <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Body */}
          <article className="mt-10 space-y-9">

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                What GLP-1 medications are, as a class
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  GLP-1 stands for glucagon-like peptide-1. It is a hormone your body makes naturally, released in response to eating,
                  and it plays a part in how you regulate appetite and blood sugar. The medicines commonly grouped under the GLP-1
                  banner are known as GLP-1 receptor agonists. In simple terms, they are designed to work along the same biological
                  pathway as that natural hormone. They are prescription medicines used within a broader, practitioner-supervised
                  weight-management plan, not standalone products you take on your own initiative.
                </p>
                <p>
                  You will sometimes see the generic drug names semaglutide and tirzepatide in factual coverage of this category.
                  These are ingredient and drug-class names rather than brands. Tirzepatide is often described as a dual-action
                  medicine that works on more than one receptor, while semaglutide is one of the more established names in the GLP-1
                  space. We flag these only so the terminology is familiar. The important point is that these are serious prescription
                  medicines, which is exactly why a practitioner must be involved before anyone uses them.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                Why GLP-1 medications are prescription-only in Australia
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  In Australia, GLP-1 medications are prescription-only. Under the national medicines scheduling system they sit in the
                  category that requires a registered practitioner to authorise supply. That status reflects the fact that these
                  medicines carry real clinical considerations: potential side effects, interactions with other medicines, and
                  suitability that depends on your individual health history. None of that can be judged by a webpage or a marketing
                  quiz. It requires a practitioner.
                </p>
                <p>
                  This is worth sitting with, because the online conversation around GLP-1 can make it sound like a consumer product
                  you simply choose. It is not. Legitimate access always runs through an assessment, and the practitioner decides
                  whether a prescription is appropriate for you. Anyone promising guaranteed access to a specific medicine before an
                  assessment is not operating the way a compliant Australian service should.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                How prescription access works: GP and telehealth
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  There are two mainstream ways Australians are assessed for GLP-1 weight-management plans, and both are valid.
                </p>
                <p>
                  <span className="font-semibold text-[#10251b]">Your GP, in person.</span> A regular GP can assess you with full
                  whole-of-health context, order any tests they think are needed, and manage your care alongside anything else that is
                  going on. It is slower to get moving and depends on appointment availability, but for many people the continuity is
                  valuable. Our comparison of{" "}
                  <Link href="/moshy-vs-gp" className="nw-link">telehealth versus your GP</Link> covers the trade-off honestly.
                </p>
                <p>
                  <span className="font-semibold text-[#10251b]">Online telehealth.</span> Telehealth services run an eligibility
                  questionnaire that a registered Australian practitioner reviews. You answer detailed questions about your health,
                  the practitioner assesses whether a plan is appropriate, and if a prescription is suitable it is arranged through a
                  pharmacy, often with home delivery. The appeal is speed and flexibility: you can start the assessment in your own
                  time. Moshy is one Australian telehealth service that runs this model and is open to anyone eligible. You can read
                  how it works in our{" "}
                  <Link href="/moshy-review" className="nw-link">Moshy review</Link>, or see how the online pathway generally runs in
                  our guide to the{" "}
                  <Link href="/online-weight-loss-doctor-australia" className="nw-link">online weight-loss doctor process</Link>.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                Eligibility is decided by a practitioner, not a promise
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  This is the single most important thing to understand about GLP-1 in Australia. Eligibility is a clinical decision.
                  A registered practitioner reviews your individual situation and decides whether a prescription is appropriate.
                  Completing a questionnaire is the start of that process, not the end of it, and it is not an approval. Some people
                  are assessed and told these medicines are not suitable for them, and that outcome is the screening doing exactly what
                  it should.
                </p>
                <p>
                  Cost is also worth understanding up front. It usually has two parts: a fee for the telehealth service or consult, and
                  the separate cost of any medicine that is dispensed. Prices vary and change over time, and the figure is confirmed
                  during the consult. Our guide to{" "}
                  <Link href="/weight-loss-telehealth-cost-australia" className="nw-link">weight-loss telehealth cost in Australia</Link>{" "}
                  explains how that typically works, and our page on{" "}
                  <Link href="/weight-loss-injections-australia" className="nw-link">weight-loss injections in Australia</Link> covers
                  the injectable side of the category in more detail.
                </p>
              </div>
            </section>

            {/* Second CTA */}
            <section className="rounded-2xl border border-[#e5e9e7] bg-[#eef1ec] px-6 py-6">
              <h2 className="text-lg font-bold text-[#10251b]">Find out where you stand, properly</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
                The only way to know whether a GLP-1 plan could be suitable for you is to be assessed by a practitioner. Moshy&apos;s
                online eligibility check is free and reviewed by registered Australian practitioners. It takes about ten minutes and
                does not commit you to anything.
              </p>
              <a
                href={MOSHY_URL}
                target="_blank"
                rel="nofollow sponsored"
                data-cta="glp1-footer"
                className="nw-btn mt-5"
              >
                Check your eligibility on Moshy <ArrowRight className="h-4 w-4" />
              </a>
            </section>

            <MatchPrompt />

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
                <li><Link href="/weight-loss-injections-australia" className="nw-link">Weight-loss injections in Australia, explained</Link></li>
                <li><Link href="/weight-loss-telehealth-cost-australia" className="nw-link">How much weight-loss telehealth costs in Australia</Link></li>
                <li><Link href="/online-weight-loss-doctor-australia" className="nw-link">Seeing an online weight-loss doctor in Australia</Link></li>
                <li><Link href="/moshy-review" className="nw-link">Our independent Moshy review</Link></li>
                <li><Link href="/best-weight-loss-telehealth-australia" className="nw-link">Best weight-loss telehealth in Australia, compared</Link></li>
                <li><Link href="/weight-loss" className="nw-link">The full weight-loss hub</Link></li>
              </ul>
            </section>

            {/* Disclosure */}
            <section className="border-t border-[#e5e9e7] pt-6 pb-16">
              <p className="text-xs leading-relaxed text-[#9aa39c]">
                This page is published by Refer Labs, an independent comparison publisher, and contains a disclosed affiliate link to
                Moshy, which means we may earn a commission if you sign up through our link. Commissions never change what we write.
                All content is for general information only and does not constitute medical advice. GLP-1 medications are
                prescription-only in Australia, available only after individual assessment by a registered practitioner who decides
                suitability. Consult a qualified health professional before starting any treatment.
              </p>
            </section>
          </article>
        </div>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy weight-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
