import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { JUNIPER_URL, MOSHY_URL } from "@/lib/affiliate-links";
import { MOSHY_OFFER } from "@/lib/offers";
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
    a: "Juniper's own site lists the Weight Reset Program from $349 per month, which it says includes the treatment, unlimited consultations and delivery, with optional 1:1 health coaching as a paid add-on and a 30-day money-back guarantee. Any medication is prescribed only after individual assessment, and the final cost depends on the plan. Prices change, so confirm the current figure on Juniper's own site before you commit.",
  },
  {
    q: "Does Juniper offer GLP-1 medication?",
    a: "Juniper can facilitate access to a clinical assessment with an Australian-registered practitioner who may, if it is clinically appropriate, prescribe a GLP-1 or dual-agonist medication. These medicines are prescription-only in Australia and access depends entirely on individual assessment. Not everyone who applies is prescribed medication. This page names the drug class only, not any brand, and is not medical advice.",
  },
  {
    q: "Juniper vs Moshy: which should I choose?",
    a: "They take different approaches. Moshy runs a leaner clinically-led pathway that is open to anyone eligible and currently gives new customers a sign-up discount. Juniper wraps medication access inside a more structured coaching and community program designed for women, from $349 per month. If you want a focused clinical pathway or the sign-up saving, Moshy is the relevant option; if you want coaching and accountability alongside medication and are comfortable with the higher price, Juniper is built for that. Both assess suitability individually.",
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
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[#10251b] sm:text-4xl lg:text-[2.6rem]">
              Juniper Australia: the women&apos;s weight-management program, reviewed
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#3d4b44] sm:text-lg">
              Juniper is an Australian weight-management telehealth service designed for women. Its Weight Reset Program
              pairs online consultations with Australian-registered practitioners and access to TGA-approved medication,
              where a practitioner assesses it as appropriate, with structured coaching, unlimited follow-ups, an app and
              a patient community. It runs from $349 per month. Here is how it works, what is included, and how it
              compares to Moshy.
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
              See Juniper&apos;s program <ArrowRight className="h-4 w-4" />
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
                Juniper&apos;s own site lists the Weight Reset Program from <strong className="text-[#10251b]">$349 per
                month</strong>, which it says covers the treatment, unlimited consultations and delivery. Optional 1:1
                health coaching is a paid add-on, and Juniper offers a 30-day money-back guarantee. Any medication is
                prescribed only after an individual assessment, so the final cost depends on the plan a practitioner
                considers appropriate. Prices change, so confirm the current figure on Juniper&apos;s own site.
              </p>
            </div>
          </section>

          {/* Moshy alternative, kept prominent */}
          <section className="mt-11 rounded-2xl border border-[#0a7c42]/30 bg-[#f5f8f6] p-6 sm:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0a7c42]">Compare before you commit</p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-[#10251b] sm:text-2xl">Prefer a sign-up discount? Look at Moshy</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
              Moshy runs a leaner, clinically-led pathway that is open to anyone eligible, not women only, and new
              customers currently get <strong className="text-[#10251b]">{MOSHY_OFFER.amount}</strong> their first order.
              Juniper&apos;s coaching wrap suits people who want structure and accountability; Moshy suits people who want
              a focused clinical pathway at a lower entry price and the bigger sign-up saving.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/moshy" className="nw-btn" data-cta="juniper-to-moshy">
                See the Moshy offer <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/moshy-vs-juniper" className="nw-btn-ghost">
                Moshy vs Juniper, compared
              </Link>
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
              See Juniper&apos;s program <ArrowRight className="h-4 w-4" />
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
              <li><Link href="/moshy" className="nw-link">Moshy offer &amp; referral link ({MOSHY_OFFER.amount})</Link></li>
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
              as Juniper&apos;s $349/month are drawn from Juniper&apos;s own site and can change; confirm current terms
              before you commit. Consult a qualified health professional before starting any treatment.
            </p>
          </section>
        </div>
      </main>
      <StickyCta href={JUNIPER_URL} product="Juniper weight-management program" label="See Juniper" />
    </ConsumerShell>
  );
}
