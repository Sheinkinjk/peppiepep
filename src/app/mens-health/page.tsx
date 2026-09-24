import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

import HubProviders from "@/components/consumer/HubProviders";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import MatchPrompt from "@/components/consumer/MatchPrompt";
import { EdgeObject } from "@/components/brand/EdgeObject";
import { GuideGrid, type GuideLink } from "@/components/brand/GuideGrid";
import { HubObject, type ObjectKind } from "@/components/home/Objects";
import { MIDOC } from "@/lib/partners/midoc";

export const metadata = generateSEOMetadata(seoConfig.mensHealthHub);

const SLUG = "/mens-health";

/*
 * Rebuilt 24 Sep 2026 on the pattern /health-and-beauty uses, after Jarred read
 * the old version and found it static, with a boxed regulatory notice sitting at
 * the top of the page before anything a reader came for.
 *
 * What moved. The medicines statement is a fact about how these pages are
 * written, not the answer to the reader's question, so it now sits at the head of
 * the questions band where the FAQ on the same subject already lives. The
 * coming-soon box is gone from the hero: its one fact, that Midoc is the only
 * partner so far, is stated in the providers intro where it is useful. The route
 * matcher moves into the hero in a drawn-object frame, which is the element that
 * makes the other hubs feel like tools rather than lists. Midoc gets the same
 * provider card every hub uses, so the day a second provider lands it is one
 * more object in an array and not a redesign.
 *
 * Clinical register throughout, no imagery of people, and no adult-retail link
 * anywhere in this hub or the clinical guides. The retail category is confined
 * to a single page which this hub links to plainly.
 *
 * TGA: nothing here names a prescription medicine, and the guard in
 * scripts/check-partner-scope.mjs denies the ED and hair-loss molecules beside
 * any Mosh link, so a future placement cannot bring one in by accident.
 */

const guides: GuideLink[] = [
  {
    href: "/midoc",
    title: "Midoc: what it costs and how access works",
    desc: `Consultations from ${MIDOC.consultStandard}, certificates from ${MIDOC.certificateSingleDay}, and who the service does not suit. Prices read ${MIDOC.readOnShort}.`,
    kind: "review",
  },
  {
    href: "/mens-health/erectile-dysfunction-treatment-cost-australia",
    title: "Erectile dysfunction: what treatment costs",
    desc: "How GP, telehealth and subscription pricing differ, and where Medicare applies.",
    kind: "cost",
  },
  {
    href: "/mens-health/premature-ejaculation-treatment-options-australia",
    title: "Premature ejaculation: the routes",
    desc: "What a GP, a psychologist and an online clinic each offer, and how each is priced.",
    kind: "explainer",
  },
  {
    href: "/mens-health/online-mens-health-clinics-compared",
    title: "Online clinics, compared",
    desc: "Consult models, subscription structures, and what is billed separately.",
    kind: "compare",
  },
  {
    href: "/mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health",
    title: "Telehealth or a GP: which is cheaper?",
    desc: "The same question costed over a year rather than a single appointment.",
    kind: "compare",
  },
  {
    href: "/mens-health/online-doctor-medical-certificate-australia",
    title: "Online medical certificate: cost and speed",
    desc: `From ${MIDOC.certificateSingleDay} for a single day (read ${MIDOC.readOnShort}), with what the review buys you.`,
    kind: "cost",
  },
  {
    href: "/mens-health/online-prescription-australia",
    title: "Online prescription: cost and Medicare",
    desc: `${MIDOC.scriptRepeat} for a repeat and ${MIDOC.scriptNew} for a new script (read ${MIDOC.readOnShort}), plus the identifier that decides whether you get one.`,
    kind: "cost",
  },
  {
    href: "/mens-health/mens-health-quiz",
    title: "Which route fits you?",
    desc: "Four questions on cost, discretion and preference. No health questions.",
    kind: "quiz",
  },
];

const OTHER: { href: string; label: string; object: ObjectKind }[] = [
  { href: "/hair-loss", label: "Hair loss", object: "comb" },
  { href: "/weight-loss", label: "Weight loss", object: "scale" },
  { href: "/sleep", label: "Sleep", object: "pillow" },
  { href: "/longevity", label: "Longevity", object: "hourglass" },
];

const faqs = [
  {
    q: "What does men's health treatment cost in Australia?",
    a: "It depends far more on the access route than on the condition. A GP consult may be bulk-billed or carry a gap, with a Medicare rebate on the consultation. Online clinics generally run subscriptions that bundle a consult with ongoing supply and support. The figure worth comparing is what each route costs over twelve months, not what the first appointment costs.",
  },
  {
    q: "Are online men's health clinics legitimate in Australia?",
    a: "The established ones operate as regulated telehealth services: you complete an assessment, an Australian-registered practitioner reviews it, and anything prescription-only is supplied only where that practitioner judges it appropriate and dispensed by a pharmacy. The check to run on any service is whether a practitioner consultation happens before anything is supplied. A service offering to skip that step is the warning sign.",
  },
  {
    q: "Is men's health covered by Medicare?",
    a: "Rebates apply to consultations rather than to products. A GP appointment attracts a rebate and may be bulk-billed. Online clinic subscriptions are often outside Medicare entirely, which is a material difference when comparing them on price. Ask any service directly whether a rebate applies before you subscribe.",
  },
  {
    q: "Do you name specific medicines on these pages?",
    a: "No, and that is deliberate rather than an oversight. Advertising prescription medicines to the public is prohibited in Australia. Our pages compare providers on consult model, price, what is included and whether anything is bulk-billed. What is appropriate for you is a decision for a registered practitioner after an individual assessment, not something a comparison site should be steering.",
  },
  {
    q: "Does Refer Labs earn from this section?",
    a: "Yes, from one partner. Midoc pays us a commission if you use a service through a Midoc link in this section, at no extra cost to you, and each page carrying one says so beside it. The mental health and erectile dysfunction pages carry no commercial link. Commissions do not change what we compare or conclude.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Men's Health", item: `${SITE_URL}${SLUG}` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Men's health guides",
  itemListElement: guides.map((g, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: g.title,
    url: `${SITE_URL}${g.href}`,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.mensHealthHub.title,
  description: seoConfig.mensHealthHub.description,
  url: `${SITE_URL}${SLUG}`,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

export default function MensHealthHub() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content">
        <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
          <nav className="flex items-center gap-2 text-sm text-[#56504a]">
            <Link href="/" className="hover:text-[#007a95]">Refer Labs</Link>
            <span>/</span>
            <span className="text-[#14120f]">Men&apos;s health</span>
          </nav>
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div className="max-w-3xl">
              <h1 className="mt-4 text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#14120f] sm:text-5xl">
                Men&apos;s health telehealth in Australia: <span>what access costs</span>
              </h1>
              {/* The answer, directly under the h1. Nothing between: check-answer-slot. */}
              <p className="mt-5 text-lg leading-relaxed text-[#14120f]">
                An online clinic and a GP charge for the same thing on different models, and the advertised numbers
                cannot be compared directly. One bills a subscription every month whether you consult or not; the
                other bills per appointment, often with a Medicare rebate and sometimes bulk-billed. These guides put
                both on a twelve-month footing, say what each route includes and what is billed separately, and price
                the parts you can actually check, from a consultation to a certificate to a repeat script.
              </p>
              <AffiliateDisclosure compact className="mt-4" />
            </div>
            <EdgeObject kind="pulse" className="lg:mt-14">
              <MatchPrompt
                stacked
                href="/mens-health/mens-health-quiz"
                title="Which route fits you?"
                sub="Four questions on cost, discretion and how you prefer to consult. No health questions, no assessment."
                cta="Find your route"
                dataCta="mens-health-hero-quiz"
              />
            </EdgeObject>
          </div>
        </section>

        <HubProviders
          className="pt-16"
          ctaPrefix="mens-health-hub"
          heading="The provider we cover"
          intro="One Australian telehealth provider so far, with the same four questions answered that every provider on this site gets. We earn a commission if you sign up through the link, hold no discount code for it, and it cannot pay to be described more favourably. More providers are being added; this is a starting set, not the market."
          providers={[
            {
              name: "Midoc",
              href: "/midoc",
              hrefLabel: "Read our Midoc guide",
              suits: "Someone who wants a consultation, a certificate or a repeat script quickly, without booking a clinic visit.",
              how: `Online consultations with ${MIDOC.practitioners}, ${MIDOC.waitTime}. Certificates and scripts are separate lines with their own prices.`,
              cost: `Standard consultation ${MIDOC.consultStandard}, specialist ${MIDOC.consultSpecialist}, certificates from ${MIDOC.certificateSingleDay}, read ${MIDOC.readOnLabel}.`,
              visitHref: "/go/midoc-mens-health-hub",
              highlight: `Mental health care plans and reviews are ${MIDOC.mentalHealth}, read ${MIDOC.readOnLabel}. That is the one line here that Medicare covers in full.`,
              visitLabel: "Visit Midoc",
              earns: true,
              earnAction: "sign up with",
            },
          ]}
        />

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Every guide in this section</h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#56504a]">
            Labelled by what each one does: a cost breakdown, a comparison, a review or a tool. The non-prescription{" "}
            <Link href="/mens-health/sexual-wellness-products" className="font-semibold text-[#007a95] hover:underline">
              sexual wellness retail category
            </Link>{" "}
            sits on its own page, kept apart from these clinical guides.
          </p>
          <GuideGrid guides={guides} />
        </section>

        <section className="border-y border-[#ded8cd] bg-[#f7f4ee]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Common questions</h2>
            {/* The medicines statement lives here, beside the question it answers,
                rather than boxed at the top of the page ahead of the content. */}
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#56504a]">
              <strong className="font-semibold text-[#14120f]">On medicines.</strong> These pages never name a
              prescription medicine, because advertising one to the public is prohibited in Australia and what is
              appropriate for you is a practitioner&apos;s decision after an individual assessment. We compare
              providers on consult model, price, inclusions and whether anything is bulk-billed.
            </p>
            <dl className="mt-7 max-w-3xl divide-y divide-[#ded8cd]">
              {faqs.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="text-[15px] font-bold text-[#14120f]">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[#56504a]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Other categories</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#56504a]">
              Hair loss and weight loss are the two categories next to this one that run on the same telehealth model.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {OTHER.map((o) => (
                <li key={o.href}>
                  <Link
                    href={o.href}
                    className="group flex items-center gap-3 rounded-xl border border-[#ded8cd] bg-white p-3 text-sm font-semibold text-[#14120f] transition-colors hover:border-[#14120f] hover:text-[#007a95]"
                  >
                    <HubObject kind={o.object} size={36} className="hy-obj" />
                    {o.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              <Link href="/guides" className="font-semibold text-[#56504a] hover:text-[#007a95] hover:underline">All guides</Link>
            </p>
          </div>
          <div className="mt-12">
            <NewsletterSignup variant="band" />
          </div>
        </section>
      </main>
    </ConsumerShell>
  );
}
