import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import MatchPrompt from "@/components/consumer/MatchPrompt";

export const metadata = generateSEOMetadata(seoConfig.weightLossInjections);

const SLUG = "/weight-loss-injections-australia";

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Weight Loss", item: `${SITE_URL}/weight-loss` },
    { "@type": "ListItem", position: 3, name: "Weight Loss Injections Australia", item: `${SITE_URL}${SLUG}` },
  ],
};

const faqs = [
  {
    q: "What are weight-loss injections in Australia?",
    a: "As a category, weight-loss injections are prescription medicines given by a small injection, usually under the skin. The best-known type belongs to a drug class called GLP-1 receptor agonists. In Australia these are prescription-only medicines. They are not sold over the counter and they are only supplied after an individual assessment by a registered Australian practitioner. This page is general information, not medical advice.",
  },
  {
    q: "Are weight-loss injections prescription-only in Australia?",
    a: "Yes. Injectable weight-loss medicines are Schedule 4 prescription-only medicines in Australia. That means a registered practitioner must assess you and decide whether a prescription is appropriate before anything can be dispensed. No legitimate service can promise a specific injectable medicine before that assessment happens. Suitability is decided case by case, never guaranteed.",
  },
  {
    q: "How do I access weight-loss injections online in Australia?",
    a: "Online telehealth services run an eligibility questionnaire first. You answer detailed questions about your health history, a registered Australian practitioner reviews your answers, and if you are considered suitable a plan is discussed with you. If a medicine is prescribed it is typically arranged through a pharmacy, sometimes with home delivery. Some applicants are declined at the review stage, which is the screening doing its job.",
  },
  {
    q: "Who decides if I am eligible for weight-loss injections?",
    a: "A registered Australian practitioner decides. Eligibility depends on individual health factors that only a practitioner can weigh up, and there is no guarantee that completing a questionnaire leads to a prescription. This is a clinical decision made about your specific situation, not something a website can approve on its own.",
  },
  {
    q: "How much do weight-loss injections cost in Australia?",
    a: "Cost varies by service and is usually made up of two parts: a consultation or subscription fee for the telehealth service, and the cost of any medicine that is dispensed, which is billed separately by the pharmacy. Prices change over time and are confirmed during the consult. Our guide to weight-loss telehealth cost in Australia explains how the pricing usually breaks down.",
  },
  {
    q: "Are weight-loss injections available for men and women?",
    a: "The category itself is not gender-specific. Some telehealth brands market to a particular audience, but a service like Moshy is open to anyone who is eligible, regardless of gender. Whether an injectable is appropriate for any individual is a clinical question answered during the assessment.",
  },
  {
    q: "Do I need to see a GP in person to get weight-loss injections?",
    a: "Not necessarily. Telehealth pathways let a registered practitioner assess you remotely, so an in-person GP visit is not always required to begin. That said, your own GP is a completely valid route and can offer whole-of-health context. Both are legitimate ways to be assessed. The right choice depends on your circumstances.",
  },
  {
    q: "Is Refer Labs a medical provider?",
    a: "No. Refer Labs is an independent comparison publisher. We explain how services work and link out to them, including a disclosed affiliate link to Moshy. We do not provide medical care, cannot assess your eligibility, and nothing here is medical advice. Always consult a qualified health professional before starting any treatment.",
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
  name: seoConfig.weightLossInjections.title,
  description: seoConfig.weightLossInjections.description,
  url: seoConfig.weightLossInjections.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-05",
  dateModified: "2026-07-05",
  about: [
    { "@type": "Thing", name: "weight loss injections Australia" },
    { "@type": "Thing", name: "GLP-1 medications" },
    { "@type": "Thing", name: "prescription weight-loss medication Australia" },
    { "@type": "Thing", name: "weight loss telehealth Australia" },
    { "@type": "Thing", name: "online weight loss assessment Australia" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WeightLossInjectionsAustraliaPage() {
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
            <span className="text-[#10251b]">Weight loss injections</span>
          </nav>

          {/* Hero */}
          <header className="pt-9 pb-6">
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b]">
              Weight loss injections in Australia: how they work and how to access them online
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#3d4b44]">
              Weight-loss injections have become one of the most searched health topics in Australia, and also one of the most
              misunderstood. This page explains, in plain language and without naming any brand of medicine, what these injections
              are as a category, why they are prescription-only here, and how the online telehealth assessment and access process
              actually works. It is general information to help you understand the landscape, not a recommendation and not medical advice.
            </p>
          </header>

          {/* Info-only note */}
          <div className="nw-card px-5 py-4 text-sm leading-relaxed text-[#3d4b44]">
            <span className="font-bold text-[#10251b]">Information only.</span> Nothing here is medical advice or a recommendation
            of any treatment. Prescription weight-loss medicines in Australia are supplied only after an individual assessment by a
            registered practitioner, who decides suitability. This page contains a disclosed affiliate link to Moshy.
          </div>

          {/* First CTA */}
          <div className="mt-7 flex flex-col items-start gap-3 rounded-2xl border border-[#0a7c42]/25 bg-[#e8f5ee] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-[15px] leading-relaxed text-[#10251b]">
              Wondering whether you could be suitable? Moshy runs a free online eligibility check reviewed by Australian practitioners.
              It takes about ten minutes and carries no obligation.
            </p>
            <a
              href={MOSHY_URL}
              target="_blank"
              rel="nofollow sponsored"
              data-cta="injections-hero"
              className="nw-btn shrink-0 whitespace-nowrap"
            >
              Check your eligibility on Moshy <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Body */}
          <article className="mt-10 space-y-9">

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                What are weight-loss injections, as a category?
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  When Australians talk about weight-loss injections, they are usually referring to a group of prescription medicines
                  from a drug class known as GLP-1 receptor agonists. These medicines are given as a small injection under the skin,
                  often using a pre-filled pen, and are prescribed as part of a broader weight-management plan rather than as a
                  standalone quick fix. GLP-1 stands for glucagon-like peptide-1, a hormone the body produces naturally that plays a
                  role in appetite and blood-sugar regulation. Medicines in this class are designed to work with that biological
                  pathway.
                </p>
                <p>
                  Two generic drug names you may come across in factual coverage are semaglutide and tirzepatide. These are drug-class
                  or ingredient names rather than brands, and we mention them only so you can recognise the terms. What matters for
                  understanding the category is that these are serious prescription medicines with real considerations around
                  suitability, side effects and monitoring, which is exactly why a practitioner has to be involved. They are not
                  supplements, and they are not something you can simply order online without an assessment.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                Why weight-loss injections are prescription-only in Australia
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  In Australia, injectable weight-loss medicines are prescription-only, classified under the national scheduling
                  system as medicines that require a practitioner&apos;s authorisation. This is not a bureaucratic hurdle for its own
                  sake. Prescription status exists because these medicines interact with your individual health picture, and whether
                  they are appropriate depends on factors that only a registered practitioner can properly assess: your medical
                  history, any other conditions, other medicines you take, and your overall goals.
                </p>
                <p>
                  The practical upshot is simple. No website, quiz result or marketing page can hand you an injectable medicine.
                  Access always runs through a registered Australian practitioner who assesses you first. Any service that implies you
                  are guaranteed a specific medicine before that assessment, or that skips the assessment entirely, is one to be
                  cautious of. The assessment step is a feature, not friction.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                How online telehealth access works, step by step
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  Telehealth has made the assessment process more accessible without changing the fundamentals. Across the reputable
                  Australian providers, the pathway looks broadly the same:
                </p>
                <ol className="ml-1 space-y-3">
                  {[
                    ["Online eligibility questionnaire", "You complete a detailed health questionnaire covering your history, current health and goals. This is the screening layer, and it takes most people around ten minutes."],
                    ["Practitioner review", "A registered Australian practitioner reviews your answers. They are looking at whether a weight-management plan is appropriate for you and whether any medicine could safely be part of it."],
                    ["Consultation and decision", "If more information is needed, the practitioner follows up. Suitability is decided individually. Some applicants are told a medicine is not appropriate for them, and that is the process working as intended."],
                    ["Dispensing and delivery", "If a medicine is prescribed, it is dispensed through a pharmacy. Many telehealth services arrange discreet home delivery, so you do not need to visit a physical clinic."],
                    ["Ongoing support", "Weight management is not a one-off. Reputable services build in check-ins and ongoing practitioner support rather than issuing a script and disappearing."],
                  ].map(([title, body]) => (
                    <li key={title} className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e8f5ee] text-xs font-bold text-[#0a7c42]">✓</span>
                      <span><span className="font-semibold text-[#10251b]">{title}.</span> {body}</span>
                    </li>
                  ))}
                </ol>
                <p>
                  Moshy is one Australian telehealth service that runs this kind of pathway, and it is open to anyone who is eligible
                  rather than being limited to one gender. You can read how the whole process runs in practice in our{" "}
                  <Link href="/moshy-review" className="nw-link">independent Moshy review</Link>, or see how the main providers compare
                  in our roundup of the{" "}
                  <Link href="/best-weight-loss-telehealth-australia" className="nw-link">best weight-loss telehealth in Australia</Link>.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                What to consider before you start
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  Because these are prescription medicines, there are genuine things worth thinking through, and worth discussing with
                  a practitioner rather than reading about online. Side effects and tolerability vary between people. Ongoing use,
                  monitoring and follow-up are usually part of the picture. Cost is a real factor, and it typically has two components:
                  the telehealth service fee and the separate cost of any medicine dispensed. Our guide to{" "}
                  <Link href="/weight-loss-telehealth-cost-australia" className="nw-link">weight-loss telehealth cost in Australia</Link>{" "}
                  walks through how that usually breaks down.
                </p>
                <p>
                  It is also worth understanding the broader medicine class before you decide anything. Our page on{" "}
                  <Link href="/glp-1-weight-loss-australia" className="nw-link">GLP-1 weight loss in Australia</Link> explains the
                  category in more depth, and our guide to seeing an{" "}
                  <Link href="/online-weight-loss-doctor-australia" className="nw-link">online weight-loss doctor in Australia</Link>{" "}
                  covers what a practitioner actually reviews. None of this replaces a conversation with a qualified health
                  professional about your own situation.
                </p>
              </div>
            </section>

            {/* Second CTA */}
            <section className="rounded-2xl border border-[#e5e9e7] bg-[#eef1ec] px-6 py-6">
              <h2 className="text-lg font-bold text-[#10251b]">The usual first step is the eligibility check</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
                Whether or not an injectable is right for you is a clinical decision, and the way to find out is to be assessed.
                Moshy&apos;s online eligibility check is free, takes about ten minutes, and is reviewed by registered Australian
                practitioners. Completing it does not commit you to anything.
              </p>
              <a
                href={MOSHY_URL}
                target="_blank"
                rel="nofollow sponsored"
                data-cta="injections-footer"
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
                <li><Link href="/glp-1-weight-loss-australia" className="nw-link">GLP-1 weight loss in Australia, explained</Link></li>
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
                All content is for general information only and does not constitute medical advice. Weight-loss injections are
                prescription-only medicines in Australia, available only after individual assessment by a registered practitioner who
                decides suitability. Consult a qualified health professional before starting any treatment. See our{" "}
                <Link href="/how-we-research" className="nw-link">editorial standards</Link>.
              </p>
            </section>
          </article>
        </div>
      </main>
    </ConsumerShell>
  );
}
