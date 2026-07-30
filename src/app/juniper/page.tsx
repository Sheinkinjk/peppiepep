import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { JUNIPER_URL } from "@/lib/affiliate-links";
import { ArrowRight, Check } from "lucide-react";
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

const included = [
  "Online consultations with Australian-registered practitioners",
  "Access to TGA-approved weight-management medication where clinically appropriate",
  "Unlimited practitioner follow-ups",
  "Health tracking through the Juniper app",
  "The Juniper patient community",
  "Optional 1:1 health coaching (a paid add-on)",
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
  dateModified: "2026-07-29",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
  about: {
    "@type": "Service",
    name: "Weight management telehealth",
    serviceType: "Telehealth weight management program",
    areaServed: { "@type": "Country", name: "Australia" },
    provider: { "@type": "Organization", name: "Juniper", url: "https://www.myjuniper.com" },
  },
};

export default function JuniperPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#6e7b74]">
            <Link href="/" className="transition-colors hover:text-[#10251b]">Refer Labs</Link>
            <span>/</span>
            <Link href="/weight-loss" className="transition-colors hover:text-[#10251b]">Weight loss</Link>
            <span>/</span>
            <span className="text-[#10251b]">Juniper</span>
          </nav>

          {/* Hero */}
          <header className="pt-9 pb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/juniper.png" alt="Juniper" className="h-16 w-auto rounded-2xl border border-[#e5e9e7] shadow-[0_10px_28px_-16px_rgba(16,37,27,0.35)]" />
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[#10251b] sm:text-4xl lg:text-[2.6rem]">
              Juniper Australia: the women&apos;s weight-management program, reviewed
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#3d4b44] sm:text-lg">
              Juniper is an Australian weight-management telehealth service designed for women. Its Weight Reset Program
              pairs online consultations with Australian-registered practitioners and access to TGA-approved medication,
              where a practitioner assesses it as appropriate, with structured coaching, unlimited follow-ups, an app and
              a patient community. Here is how it works, what is included, and how it compares to Moshy.
            </p>
          </header>

          {/* Info-only note */}
          <div className="nw-card px-5 py-4 text-sm leading-relaxed text-[#3d4b44]">
            <span className="font-bold text-[#10251b]">Information only.</span> Nothing here is medical advice or a
            recommendation of any treatment. Prescription medicines in Australia are available only after individual
            assessment by a registered practitioner. This page contains a disclosed affiliate link to Juniper.
          </div>

          {/* First CTA */}
          <div className="mt-7 flex flex-col items-start gap-3 rounded-2xl border border-[#0a7c42]/25 bg-[#e8f5ee] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-[15px] leading-relaxed text-[#10251b]">
              Want to see if Juniper is a fit? Start the online eligibility check, an Australian-registered practitioner
              reviews it before anything is prescribed.
            </p>
            <a {...juniperAff} data-cta="juniper-hero" className="nw-btn shrink-0 whitespace-nowrap">
              Check your eligibility <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* What's included */}
          <section className="mt-11">
            <h2 className="text-xl font-bold tracking-tight text-[#10251b] sm:text-2xl">What the Weight Reset Program includes</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
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

          {/* Cost */}
          <section className="mt-11">
            <h2 className="text-xl font-bold tracking-tight text-[#10251b] sm:text-2xl">What Juniper costs</h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
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

          {/* Second CTA */}
          <section className="mt-11 rounded-2xl border border-[#e5e9e7] bg-[#eef1ec] px-6 py-6">
            <h2 className="text-lg font-bold text-[#10251b]">Start Juniper&apos;s eligibility check</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
              If the coaching-led, women-focused approach fits, complete Juniper&apos;s online check. A practitioner
              reviews your answers before anything is prescribed, and you see the cost before you commit.
            </p>
            <a {...juniperAff} data-cta="juniper-footer" className="nw-btn mt-5">
              Check your eligibility <ArrowRight className="h-4 w-4" />
            </a>
          </section>

          {/* FAQ */}
          <section className="mt-11">
            <h2 className="text-xl font-bold tracking-tight text-[#10251b] sm:text-2xl">Frequently asked questions</h2>
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
          <section className="mt-11">
            <h2 className="text-lg font-bold text-[#10251b]">Keep reading</h2>
            <ul className="mt-3 space-y-2 text-[15px]">
              <li><Link href="/moshy-vs-juniper" className="nw-link">Moshy vs Juniper, compared</Link></li>
              <li><Link href="/best-weight-loss-telehealth-australia" className="nw-link">Best weight-loss telehealth in Australia</Link></li>
              <li><Link href="/weight-loss-telehealth-cost-australia" className="nw-link">What weight-loss telehealth costs</Link></li>
              <li><Link href="/weight-loss" className="nw-link">The full weight-loss hub</Link></li>
            </ul>
          </section>

          {/* Disclosure */}
          <section className="border-t border-[#e5e9e7] pt-6 pb-16">
            <p className="text-xs leading-relaxed text-[#9aa39c]">
              This post contains affiliate links. If you are a new Juniper patient and make a purchase through these
              links, I may earn a small commission at no extra cost to you. Refer Labs also has a disclosed affiliate
              arrangement with Moshy. Commissions never change what we write. All content is general information only and
              does not constitute medical advice. Prescription medicines in Australia, including GLP-1 medicines, are
              supplied only after individual assessment by a registered practitioner who decides suitability. Figures such
              such as Juniper&apos;s inclusions and pricing are drawn from Juniper&apos;s own site and can change; confirm
              current terms before you commit. Consult a qualified health professional before starting any treatment.
            </p>
          </section>
        </div>
      </main>
      <StickyCta href={JUNIPER_URL} product="Juniper weight-management program" label="Check eligibility" />
    </ConsumerShell>
  );
}
