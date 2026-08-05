import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { JUNIPER_URL } from "@/lib/affiliate-links";
import { ArrowRight, Check, ShieldCheck, Stethoscope, Truck, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";

export const metadata = generateSEOMetadata(seoConfig.juniper);

const SLUG = "/juniper";

// Sponsored CTA (rel=nofollow sponsored, picked up by AffiliateClickTracker).
// JARREDKFC is commission-only: NO customer discount is claimed anywhere here.
const juniperAff = {
  href: JUNIPER_URL,
  target: "_blank" as const,
  rel: "nofollow sponsored" as const,
};

const glance: [string, string][] = [
  ["What it is", "Australian women's weight-management telehealth"],
  ["For", "Women seeking a coaching-led, clinically-supervised program"],
  ["Format", "Online eligibility → practitioner review → program & delivery"],
  ["Included", "Unlimited follow-ups, app tracking, patient community"],
  ["Pricing", "Monthly subscription, confirmed in the consult"],
  ["Discount", "No Refer Labs code (commission-only referral)"],
];

const trust = [
  { icon: Stethoscope, label: "AHPRA-registered practitioners" },
  { icon: Users, label: "Coaching, app and patient community" },
  { icon: Truck, label: "Subscription with home delivery" },
  { icon: ShieldCheck, label: "30-day money-back guarantee (Juniper's own)" },
];

const included = [
  "Online consultations with Australian-registered practitioners",
  "Access to TGA-approved weight-management medication where clinically appropriate",
  "Unlimited practitioner follow-ups",
  "Health tracking through the Juniper app",
  "The Juniper patient community",
  "Optional 1:1 health coaching (a paid add-on)",
];

const steps = [
  { num: 1, heading: "Complete the online consultation", body: "You answer a health questionnaire about your history, weight and goals. It takes a few minutes and commits you to nothing." },
  { num: 2, heading: "A practitioner reviews your case", body: "An Australian-registered practitioner assesses your answers individually. Not everyone is suitable, and some applicants are declined at review." },
  { num: 3, heading: "Your Weight Reset Program is set", body: "If you are suitable, a program is discussed with you, including treatment where a practitioner assesses it as appropriate, with the cost shown before you commit." },
  { num: 4, heading: "Ongoing support and delivery", body: "The program runs on a subscription with unlimited follow-ups, app tracking, the patient community, and treatment delivered to your door." },
];

const toc: [string, string][] = [
  ["what", "What Juniper is"],
  ["included", "What the program includes"],
  ["start", "How it works"],
  ["cost", "What it costs"],
  ["bottom-line", "Juniper vs Moshy"],
  ["faq", "FAQ"],
];

const faqs = [
  {
    q: "What is Juniper?",
    a: "Juniper is an Australian weight-management telehealth service, its Weight Reset Program pairs online consultations with Australian-registered practitioners and access to TGA-approved medication (where a practitioner assesses it as appropriate) with a broader program of unlimited follow-ups, health tracking through an app, and a patient community. It is designed for and marketed to women. Optional 1:1 health coaching is available as a paid add-on. This is general information, not medical advice.",
  },
  {
    q: "Is Juniper only for women?",
    a: "Juniper designs and markets its program for women. If you are a man looking for a comparable telehealth weight-management pathway, Moshy is open to anyone eligible, and Pilot runs a men's health service. Suitability for any treatment is decided individually by a registered practitioner.",
  },
  {
    q: "How much does Juniper cost?",
    a: "Juniper runs as a monthly subscription that its own site says includes the treatment, unlimited consultations and delivery, plus optional 1:1 health coaching as a paid add-on and a 30-day money-back guarantee. There isn't one fixed price: any medication is prescribed only after an individual assessment, so the figure that applies to you is confirmed inside Juniper's flow before you commit.",
  },
  {
    q: "Does Juniper have a discount or promo code?",
    a: "There is no Refer Labs discount code for Juniper, unlike some of the programs we cover. Juniper itself sometimes runs a new-patient promotion, which appears in a banner on its own site after you click through from here. Availability changes over time and we don't control it, so there may or may not be one when you visit. We never publish a code we can't stand behind.",
  },
  {
    q: "Does Juniper offer GLP-1 medication?",
    a: "Juniper can facilitate access to a clinical assessment with an Australian-registered practitioner who may, if it is clinically appropriate, prescribe a GLP-1 or dual-agonist medication. These medicines are prescription-only in Australia and access depends entirely on individual assessment. Not everyone who applies is prescribed medication. This page names the drug class only, not any brand, and is not medical advice.",
  },
  {
    q: "Juniper vs Moshy: which should I choose?",
    a: "They take different approaches. Juniper wraps medication access inside a structured coaching and community program designed for women, with unlimited practitioner consultations, an app and ongoing support. Moshy runs a leaner, medication-first clinical pathway that is open to anyone eligible. If you want coaching and accountability built around the medical care, Juniper is designed for exactly that; if you want a focused, no-frills clinical pathway, Moshy is the leaner option. Both assess suitability individually through Australian-registered practitioners.",
  },
  {
    q: "How do I start with Juniper?",
    a: "You complete an online questionnaire, an Australian-registered practitioner reviews it, and if you are suitable a program is discussed with you. Some applicants are declined at review. You can begin from the link on this page.",
  },
  {
    q: "Can I cancel Juniper, and are refunds available?",
    a: "Juniper runs on a subscription, and its cancellation and refund terms are set by Juniper and can change, including any notice period and whether a first-order refund applies. Check the current terms on Juniper's own site before subscribing, and keep written confirmation of any cancellation. Refer Labs does not manage Juniper billing.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Weight Loss", item: `${SITE_URL}/weight-loss` },
    { "@type": "ListItem", position: 3, name: "Juniper", item: `${SITE_URL}${SLUG}` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.juniper.title,
  description: seoConfig.juniper.description,
  url: seoConfig.juniper.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-29",
  dateModified: "2026-08-06",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
  about: {
    "@type": "Service",
    name: "Weight management telehealth",
    serviceType: "Telehealth weight management program",
    areaServed: { "@type": "Country", name: "Australia" },
    provider: { "@type": "Organization", name: "Juniper", url: "https://www.myjuniper.com" },
  },
};

function JuniperCTA({ label = "Check your eligibility", loc, block = false, size = "md" }: { label?: string; loc: string; block?: boolean; size?: "md" | "lg" }) {
  const pad = size === "lg" ? "px-8 py-4 text-base" : "";
  return (
    <a {...juniperAff} data-cta={loc} className={`nw-btn justify-center ${pad} ${block ? "w-full" : ""}`}>
      {label} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

export default function JuniperPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="mx-auto max-w-5xl px-5 pb-24 sm:px-8 text-[#10251b]">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#6e7b74]">
          <Link href="/" className="transition-colors hover:text-[#10251b]">Refer Labs</Link>
          <span>/</span>
          <Link href="/weight-loss" className="transition-colors hover:text-[#10251b]">Weight loss</Link>
          <span>/</span>
          <span className="text-[#10251b]">Juniper</span>
        </nav>

        {/* ── Hero ── */}
        <section className="grid gap-10 pt-8 sm:pt-10 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
          <div>
            <span className="mb-5 inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[#e5e9e7] bg-white shadow-[0_10px_28px_-16px_rgba(16,37,27,0.35)]">
              <Image src="/logos/juniper.png" alt="Juniper logo" width={52} height={52} className="h-12 w-12 object-contain" />
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] text-[#10251b] sm:text-5xl lg:text-[3.2rem]">
              Juniper Australia: the women&apos;s{" "}
              <span className="text-[#0a7c42]">weight-management program, reviewed.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#3d4b44]">
              Juniper is an Australian weight-management telehealth service designed for women. Its Weight Reset Program
              pairs online consultations with Australian-registered practitioners and access to TGA-approved medication,
              where a practitioner assesses it as appropriate, with structured coaching, unlimited follow-ups, an app and a
              patient community. Here is how it works, what it costs, and how it compares to Moshy.
            </p>
            <div className="mt-6">
              <JuniperCTA label="Check your eligibility" loc="hero" size="lg" />
            </div>
            <p className="mt-4 text-xs text-[#9aa39c]">
              Information only · contains a disclosed affiliate link · not medical advice
            </p>
          </div>

          {/* At-a-glance card */}
          <aside className="lg:pt-2">
            <div className="nw-card rounded-2xl p-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9aa39c]">At a glance</span>
              <dl className="mt-4 divide-y divide-[#eef1ef] text-sm">
                {glance.map(([k, v]) => (
                  <div key={k} className="flex gap-3 py-2.5">
                    <dt className="w-24 shrink-0 text-[#9aa39c]">{k}</dt>
                    <dd className="text-[#2b362f]">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5">
                <JuniperCTA loc="glance-card" block />
              </div>
              <p className="mt-3 text-center text-[11px] text-[#9aa39c]">Opens myjuniper.com · AU only</p>
            </div>
          </aside>
        </section>

        {/* ── Trust strip ── */}
        <section className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#e5e9e7] bg-[#e5e9e7] sm:grid-cols-4">
          {trust.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 bg-white px-5 py-5">
              <Icon className="h-5 w-5 shrink-0 text-[#0a7c42]" strokeWidth={1.7} aria-hidden="true" />
              <span className="text-[13px] font-medium leading-snug text-[#3d4b44]">{label}</span>
            </div>
          ))}
        </section>

        {/* ── Compliance notice ── */}
        <p className="mt-8 rounded-xl border border-[#e5e9e7] bg-white px-5 py-4 text-xs leading-relaxed text-[#6e7b74]">
          <span className="font-semibold text-[#3d4b44]">Information only.</span> This page describes Juniper as a service
          and is not medical advice. It does not recommend any treatment or imply suitability for any individual.
          Prescription medicines in Australia are available only after assessment by a registered practitioner. Always
          consult a qualified health professional before making any health decision.
        </p>

        {/* ── Body grid: TOC + article ── */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
          {/* TOC */}
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9aa39c]">On this page</p>
              <ul className="space-y-2.5 text-sm">
                {toc.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-[#6e7b74] transition-colors hover:text-[#0a7c42]">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Article */}
          <article className="max-w-2xl">
            {/* What */}
            <section id="what" className="scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">What Juniper is</h2>
              <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                <p>
                  Juniper is a clinically-led Australian telehealth service designed for women, built around its Weight
                  Reset Program. You complete a health questionnaire online, an Australian-registered practitioner reviews
                  your case, and if it is appropriate you continue on a subscription with treatment delivered to your door.
                  There is no in-person GP appointment to book to get started.
                </p>
                <p>
                  What sets it apart from a bare prescription service is the wraparound: unlimited follow-ups, health
                  tracking through an app, a patient community, and optional 1:1 coaching. It is built for people who want
                  structure and accountability around the clinical care, not just the medication.
                </p>
              </div>
              <p className="my-7 border-l-2 border-[#0a7c42] pl-5 text-[15px] leading-relaxed text-[#3d4b44]">
                The coaching and community are the draw, but the practitioner review is the part that matters: every
                application is assessed individually, and some are declined.
              </p>
            </section>

            {/* Included */}
            <section id="included" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">What the Weight Reset Program includes</h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                Juniper positions itself as more than a prescription: the program wraps clinical care in ongoing support.
                Based on Juniper&apos;s own site, a plan includes:
              </p>
              <ul className="mt-5 grid gap-2.5">
                {included.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#3d4b44]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e6f3ec]">
                      <Check className="h-3.5 w-3.5 text-[#0a7c42]" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </section>

            {/* How it works */}
            <section id="start" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">How it works</h2>
              <ol className="mt-6 space-y-5">
                {steps.map((s) => (
                  <li key={s.num} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f5ee] text-sm font-bold text-[#0a7c42]">
                      {s.num}
                    </span>
                    <div>
                      <p className="font-bold text-[#10251b]">{s.heading}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#3d4b44]">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-7 rounded-xl border border-[#cfe6da] bg-[#e8f5ee] p-5">
                <p className="text-sm leading-relaxed text-[#2b362f]">
                  Want to see if Juniper is a fit? The online eligibility check takes a few minutes and commits you to
                  nothing. A practitioner reviews it before anything is prescribed.
                </p>
                <div className="mt-4">
                  <JuniperCTA label="Start the Juniper eligibility check" loc="start" />
                </div>
              </div>
            </section>

            {/* Cost */}
            <section id="cost" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">What Juniper costs</h2>
              <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                <p>
                  Juniper runs as a monthly subscription that its own site says covers the treatment, unlimited
                  consultations and delivery, with optional 1:1 health coaching as a paid add-on and a 30-day money-back
                  guarantee. It does not hinge on a single sticker price: any medication is prescribed only after an
                  individual assessment, so the cost that applies to you is confirmed inside Juniper&apos;s own flow before
                  you commit to anything.
                </p>
                <p>
                  There is no Refer Labs discount code for Juniper. Juniper itself sometimes runs a new-patient promotion,
                  shown in a banner on its own site after you click through from here. Availability changes over time and it
                  is not something we control, so there may or may not be one when you visit.
                </p>
              </div>
            </section>

            {/* Bottom line */}
            <section id="bottom-line" className="mt-14 scroll-mt-24">
              <div className="nw-card rounded-2xl p-7 sm:p-8">
                <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">Juniper vs Moshy: which fits?</h2>
                <p className="mt-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                  Juniper is built for women who want structure around the clinical care: coaching, community, an app and
                  unlimited follow-ups, not just a prescription. If you want that wraparound support, it is designed for
                  exactly that. If you want a leaner, medication-first pathway open to anyone eligible, Moshy is the lighter
                  option. Both assess suitability individually through Australian-registered practitioners, and this page is
                  information about the service, not medical advice.
                </p>
                <ul className="mt-5 space-y-2">
                  {[
                    "Coaching-led program with unlimited follow-ups and a patient community",
                    "Designed for and marketed to women",
                    "Real practitioner review; not everyone is approved",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-[#2b362f]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0a7c42]" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <JuniperCTA label="Check your eligibility" loc="bottom-line" size="lg" />
                  <Link href="/moshy-vs-juniper" className="text-sm font-semibold text-[#0a7c42] hover:underline">
                    Read the full Moshy vs Juniper comparison →
                  </Link>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mt-14 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">Frequently asked questions</h2>
              <div className="mt-6 divide-y divide-[#e5e9e7] border-y border-[#e5e9e7]">
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
            <section className="mt-12">
              <h2 className="text-lg font-bold text-[#10251b]">Keep reading</h2>
              <ul className="mt-3 space-y-2 text-[15px]">
                <li><Link href="/moshy-vs-juniper" className="nw-link">Moshy vs Juniper, compared</Link></li>
                <li><Link href="/best-weight-loss-telehealth-australia" className="nw-link">Best weight-loss telehealth in Australia</Link></li>
                <li><Link href="/weight-loss-telehealth-women-australia" className="nw-link">Weight-loss telehealth for women, explained</Link></li>
                <li><Link href="/weight-loss-telehealth-cost-australia" className="nw-link">What weight-loss telehealth costs</Link></li>
                <li><Link href="/weight-loss" className="nw-link">The full weight-loss hub</Link></li>
              </ul>
            </section>
          </article>
        </div>

        {/* ── Final CTA band ── */}
        <section className="mt-20 overflow-hidden rounded-3xl bg-[#10251b] px-7 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
            See where you stand with Juniper
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
            A few minutes and no obligation. An Australian-registered practitioner reviews your answers before anything is
            prescribed, and you see the cost before you commit.
          </p>
          <div className="mt-8 flex justify-center">
            <a {...juniperAff} data-cta="final-band" className="nw-btn justify-center !bg-white !text-[#0a7c42] px-8 py-4 text-base hover:!bg-[#e8f5ee]">
              Check your eligibility <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mx-auto mt-6 max-w-lg text-xs leading-relaxed text-white/45">
            You will be taken to myjuniper.com. This page is operated by Refer Labs and contains a disclosed affiliate
            referral link; we may earn a commission if you sign up, at no extra cost to you. Commissions never change what
            we write. Content is general information, not medical advice. Prescription medicines in Australia, including
            GLP-1 medicines, are supplied only after individual assessment by a registered practitioner who decides
            suitability. Juniper&apos;s inclusions and pricing are drawn from Juniper&apos;s own site and can change, so
            confirm current terms before you commit.
          </p>
        </section>
      </main>

      <StickyCta href={JUNIPER_URL} product="Juniper weight-management program" label="Check eligibility" />
    </ConsumerShell>
  );
}
