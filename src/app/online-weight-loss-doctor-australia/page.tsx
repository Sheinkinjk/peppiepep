import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import MatchPrompt from "@/components/consumer/MatchPrompt";

export const metadata = generateSEOMetadata(seoConfig.onlineWeightLossDoctor);

const SLUG = "/online-weight-loss-doctor-australia";

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Weight Loss", item: `${SITE_URL}/weight-loss` },
    { "@type": "ListItem", position: 3, name: "Online Weight Loss Doctor Australia", item: `${SITE_URL}${SLUG}` },
  ],
};

const faqs = [
  {
    q: "How does an online weight-loss doctor work in Australia?",
    a: "You complete a detailed health questionnaire online, and a registered Australian practitioner reviews your answers rather than seeing you in a waiting room first. If they need more information they follow up, and if a plan is appropriate they discuss it with you. Everything happens remotely through a secure portal or app. This page is general information, not medical advice.",
  },
  {
    q: "Can I get a weight-loss prescription online in Australia?",
    a: "A prescription can only be issued after a registered practitioner has assessed you individually and decided it is appropriate. Telehealth makes that assessment possible remotely, but it does not remove it. No legitimate service promises a specific prescription before the assessment happens. Suitability is decided case by case and is never guaranteed.",
  },
  {
    q: "What does the eligibility questionnaire ask?",
    a: "The questionnaire covers your health history, current health, any existing conditions, medicines you take, and your goals. It is the screening layer that gives the practitioner the information they need to make a safe assessment. It usually takes around ten minutes to complete. Answering it honestly and fully is what makes the practitioner review meaningful.",
  },
  {
    q: "Is an online weight-loss doctor a real doctor?",
    a: "Reputable Australian telehealth services use registered practitioners who work under the same national health regulations as any other. The format is different, the assessment is remote rather than in person, but the practitioner reviewing your case is a registered health professional. Checking that a real registered practitioner reviews your case is one of the key things to look for.",
  },
  {
    q: "Do I still need to see my GP?",
    a: "Not necessarily to begin, since a telehealth practitioner can assess you remotely. Your own GP is also a completely valid route, and offers whole-of-health context and continuity of care. Many people use both. The right choice depends on your circumstances, and our telehealth versus GP guide covers the trade-off.",
  },
  {
    q: "Why might a practitioner decline my application?",
    a: "Because the assessment is genuine. A practitioner may decide that a particular plan or medicine is not suitable for you based on your health history or other factors. Being declined means the screening is working as intended. Suitability is a clinical judgement about your specific situation.",
  },
  {
    q: "Is an online weight-loss doctor available to men and women?",
    a: "The pathway itself is not gender-specific, though some services market to a particular audience. Moshy, for example, runs its assessment for anyone who is eligible regardless of gender. Whether a plan is appropriate for any individual is decided by the practitioner during the assessment.",
  },
  {
    q: "Does Refer Labs employ these doctors?",
    a: "No. Refer Labs is an independent comparison publisher. We explain how the online consultation process works and link out to services, including a disclosed affiliate link to Moshy. We do not provide medical care and cannot assess eligibility. Nothing here is medical advice. Consult a qualified health professional.",
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
  name: seoConfig.onlineWeightLossDoctor.title,
  description: seoConfig.onlineWeightLossDoctor.description,
  url: seoConfig.onlineWeightLossDoctor.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-05",
  dateModified: "2026-07-05",
  about: [
    { "@type": "Thing", name: "online weight loss doctor Australia" },
    { "@type": "Thing", name: "weight loss prescription online Australia" },
    { "@type": "Thing", name: "telehealth weight loss consultation Australia" },
    { "@type": "Thing", name: "registered practitioner assessment Australia" },
    { "@type": "Thing", name: "online weight loss eligibility questionnaire" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OnlineWeightLossDoctorAustraliaPage() {
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
            <span className="text-[#10251b]">Online weight-loss doctor</span>
          </nav>

          {/* Hero */}
          <header className="pt-9 pb-6">
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b]">
              Online weight-loss doctor in Australia: how a telehealth consult really works
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#3d4b44]">
              Seeing a weight-loss doctor online has become a normal way to be assessed in Australia, but a lot of people are unsure
              what actually happens behind the questionnaire. This page explains how the online consultation model works, what the
              eligibility questionnaire asks, what a registered practitioner reviews, and how a weight-loss prescription online is
              handled. It is general information to help you understand the process, not medical advice and not a recommendation.
            </p>
          </header>

          {/* Info-only note */}
          <div className="nw-card px-5 py-4 text-sm leading-relaxed text-[#3d4b44]">
            <span className="font-bold text-[#10251b]">Information only.</span> Nothing here is medical advice or a recommendation
            of any treatment. Any prescription in Australia is issued only after individual assessment by a registered practitioner,
            who decides suitability. This page contains a disclosed affiliate link to Moshy.
          </div>

          {/* First CTA */}
          <div className="mt-7 flex flex-col items-start gap-3 rounded-2xl border border-[#0a7c42]/25 bg-[#e8f5ee] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-[15px] leading-relaxed text-[#10251b]">
              Ready to be assessed? Moshy&apos;s online eligibility check is reviewed by registered Australian practitioners, is free
              to complete, and takes about ten minutes with no obligation to proceed.
            </p>
            <a
              href={MOSHY_URL}
              target="_blank"
              rel="nofollow sponsored"
              data-cta="doctor-hero"
              className="nw-btn shrink-0 whitespace-nowrap"
            >
              Check your eligibility on Moshy <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Body */}
          <article className="mt-10 space-y-9">

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                What an online weight-loss doctor actually is
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  An online weight-loss doctor is, in practice, a registered health practitioner who assesses you through a telehealth
                  service rather than in a physical consulting room. The care is delivered remotely, through a secure portal or app,
                  but the practitioner reviewing your case is a registered health professional working under the same Australian health
                  regulations as any in-person clinic. The format has changed. The requirement for a genuine practitioner assessment
                  has not.
                </p>
                <p>
                  For many Australians the appeal is straightforward: you can start the assessment in your own time, without waiting
                  weeks for an appointment, and the whole process fits around your life. What you are trading is the in-person physical
                  exam and the whole-of-health continuity that a regular GP provides. Neither model is automatically better. They are
                  two valid doors, and our{" "}
                  <Link href="/moshy-vs-gp" className="nw-link">telehealth versus GP comparison</Link> covers the trade honestly.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                The eligibility questionnaire model
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  Almost every online weight-loss service in Australia starts with an eligibility questionnaire. This is the screening
                  layer, and it exists so the practitioner has the information they need to make a safe assessment. It usually takes
                  around ten minutes and asks about things like:
                </p>
                <ul className="ml-1 space-y-3">
                  {[
                    ["Your health history", "Past and current conditions, so the practitioner understands your full picture."],
                    ["Current medicines", "Anything you already take, which matters for interactions and safety."],
                    ["Relevant measurements and background", "Basic health information the practitioner uses to assess suitability."],
                    ["Your goals", "What you are hoping to achieve, so any plan is oriented around that."],
                  ].map(([title, body]) => (
                    <li key={title} className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e8f5ee] text-xs font-bold text-[#0a7c42]">✓</span>
                      <span><span className="font-semibold text-[#10251b]">{title}.</span> {body}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  The single most important thing to know is that completing the questionnaire is not an approval. It is the start of
                  the assessment, not the end of it. Answering honestly and fully is what makes the practitioner review meaningful,
                  because they are relying on your answers to make a safe judgement.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                What the practitioner reviews
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  Once your questionnaire is submitted, a registered Australian practitioner reviews it. They are weighing up whether a
                  weight-management plan is appropriate for you and, if any medicine could be part of it, whether that would be
                  suitable given your history. If they need more information, they follow up, sometimes with additional questions or a
                  conversation. This is a clinical judgement about your specific situation, and it is theirs to make, not the
                  website&apos;s.
                </p>
                <p>
                  That is also why some applications are declined. If a practitioner decides a plan or a medicine is not suitable for
                  you, that is the screening doing its job, not a flaw in the service. A pathway where nobody is ever turned away would
                  be the thing to worry about. If a prescription is appropriate, any medicine is prescription-only and is arranged
                  through a pharmacy, often with home delivery. Our pages on{" "}
                  <Link href="/glp-1-weight-loss-australia" className="nw-link">GLP-1 weight loss in Australia</Link> and{" "}
                  <Link href="/weight-loss-injections-australia" className="nw-link">weight-loss injections in Australia</Link> explain
                  the medicine side of the category in more detail.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                How to choose a service, and what it costs
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  When you are comparing online weight-loss services, a few checks separate a serious one from a storefront. Confirm
                  that a registered Australian practitioner reviews your case, and that some applicants are declined. Read the full
                  cost model, including whether any medicine is billed separately from the service fee. Check what ongoing support and
                  cancellation look like before you commit. And treat any promise of a guaranteed outcome, or guaranteed access to a
                  specific medicine, as a red flag.
                </p>
                <p>
                  On cost, most services separate the service or subscription fee from any medicine that is dispensed, and the exact
                  figure is confirmed during your consult. Our guide to{" "}
                  <Link href="/weight-loss-telehealth-cost-australia" className="nw-link">weight-loss telehealth cost in Australia</Link>{" "}
                  breaks that down. Moshy is one Australian service that runs the assessment model described here and is open to anyone
                  eligible. You can read how it works in practice in our{" "}
                  <Link href="/moshy-review" className="nw-link">independent Moshy review</Link>, or compare it with other providers in
                  our roundup of the{" "}
                  <Link href="/best-weight-loss-telehealth-australia" className="nw-link">best weight-loss telehealth in Australia</Link>.
                </p>
              </div>
            </section>

            {/* Second CTA */}
            <section className="rounded-2xl border border-[#e5e9e7] bg-[#eef1ec] px-6 py-6">
              <h2 className="text-lg font-bold text-[#10251b]">The process starts with the assessment</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
                The only way to know whether a plan is appropriate for you is to be assessed by a practitioner. Moshy&apos;s online
                eligibility check is free, reviewed by registered Australian practitioners, and takes about ten minutes. Completing it
                does not commit you to anything.
              </p>
              <a
                href={MOSHY_URL}
                target="_blank"
                rel="nofollow sponsored"
                data-cta="doctor-footer"
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
                <li><Link href="/weight-loss-injections-australia" className="nw-link">Weight-loss injections in Australia</Link></li>
                <li><Link href="/weight-loss-telehealth-cost-australia" className="nw-link">How much weight-loss telehealth costs in Australia</Link></li>
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
                All content is for general information only and does not constitute medical advice. Any prescription in Australia is
                issued only after individual assessment by a registered practitioner who decides suitability. Consult a qualified
                health professional before starting any treatment.
              </p>
            </section>
          </article>
        </div>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy weight-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
