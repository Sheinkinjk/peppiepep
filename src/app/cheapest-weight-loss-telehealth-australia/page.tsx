import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { MOSHY_URL, JUNIPER_URL } from "@/lib/affiliate-links";
import { requiredDisclosureFor } from "@/lib/partner-disclosures";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import OfferSchema from "@/components/offers/OfferSchema";
import { OfferTermsNote } from "@/components/consumer/TermsApplyLink";
import ProviderPair, { type PairProvider } from "@/components/consumer/ProviderPair";

export const metadata = generateSEOMetadata(seoConfig.cheapestWeightLossTelehealth);

// Rebuilt 30 Sep 2026. The old page printed a Moshy monthly figure (against the
// no-partner-prices rule), described Juniper as dearer without a source, and said
// Juniper was "linked without affiliate arrangements" when Juniper is a partner.
// No provider's price is printed here: each shows its own before you pay.
// Doctors for Weight Loss stays as the pay-as-you-go example; we don't earn from it,
// and its no-subscription model was read on its own home page on 30 Sep 2026.

const DFWL_URL = "https://www.doctorsforweightloss.com.au/";
const JUNIPER_REQUIRED = requiredDisclosureFor(JUNIPER_URL);

// Alphabetical (hub-neutrality rule). Moshy and Juniper wording matches the
// dated inclusions table in src/lib/compare/weight-inclusions.ts.
const providers: PairProvider[] = [
  {
    name: "Doctors for Weight Loss",
    bestIf: "Pay-as-you-go: no subscription, pay per consultation.",
    points: ["Initial and follow-up consultations charged separately", "No lock-in; its fees are listed on its own site"],
    href: DFWL_URL,
    cta: "Visit Doctors for Weight Loss",
    loc: "cheapest-card-dfwl",
    sponsored: false,
  },
  {
    name: "Juniper",
    logo: "/logos/juniper.png",
    logoAspect: 16 / 9,
    bestIf: "A program fee that varies with the plan, designed for women.",
    points: ["Online assessment, then a phone consultation with an Australian practitioner", "Unlimited practitioner support from specialist GPs and nurse practitioners"],
    offer: { text: "No charge for the initial consultation, valued at $89 (program fees apply),", code: "JARREDKFC" },
    href: JUNIPER_URL,
    cta: "Continue to Juniper",
    loc: "cheapest-card-juniper",
  },
  {
    name: "Moshy",
    logo: "/logos/moshy.png",
    bestIf: "An all-inclusive program fee.",
    points: ["Online questionnaire, then a consult by phone or video", "In-app coaching, dietitian meal plans and a community"],
    offer: { text: "$120 off your first order", code: "REFERRAL120" },
    href: MOSHY_URL,
    cta: "Continue to Moshy",
    loc: "cheapest-card-moshy",
  },
];

const faqs = [
  {
    q: "What is the cheapest weight loss telehealth in Australia?",
    a: "No single service is cheapest for everyone. A subscription such as Moshy or Juniper charges a monthly fee that covers consults and support; a pay-as-you-go service such as Doctors for Weight Loss charges per consultation. Which costs less depends on how often you need to be seen. A new-patient code lowers the first bill: REFERRAL120 takes $120 off a first Moshy order with a 3-month minimum commitment, under Moshy's terms, and JARREDKFC means no charge for Juniper's initial consultation, valued at $89; program fees apply.",
  },
  {
    q: "Is subscription or pay-as-you-go cheaper?",
    a: "Pay-as-you-go tends to cost less if you only need occasional appointments. A subscription tends to cost less if you want regular contact, because consults and support sit inside the monthly fee. Add up twelve months of each at the number of consults you expect before deciding.",
  },
  {
    q: "What does a program fee cover?",
    a: "It depends on the service, and each provider publishes what its fee covers on its own pricing page. Look for consultations, follow-ups, practitioner support, coaching, meal plans and any minimum term. Moshy lists one all-inclusive program fee; a pay-as-you-go service charges per consultation.",
  },
  {
    q: "Are there discount codes for Moshy and Juniper?",
    a: "Yes. Through Refer Labs, Moshy's code is REFERRAL120, which takes $120 off a new customer's first order and comes with a 3-month minimum commitment under Moshy's terms. Juniper's is JARREDKFC, which means no charge for the initial consultation, valued by Juniper at $89; program fees apply. Use each code at checkout; our links open each provider's sign-up with the offer.",
  },
  {
    q: "Are cheaper services still legitimate?",
    a: "Price doesn't decide it. A serious provider at any price has a registered Australian practitioner review your case, declines some applicants, shows its pricing before you pay, and never promises a particular outcome before a practitioner has assessed you.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Weight Loss", item: `${SITE_URL}/weight-loss` },
    { "@type": "ListItem", position: 3, name: "Cheapest Weight Loss Telehealth Australia", item: `${SITE_URL}/cheapest-weight-loss-telehealth-australia` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Weight-loss telehealth in Australia by billing model",
  numberOfItems: 3,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Doctors for Weight Loss", description: "Pay-as-you-go, no subscription.", url: DFWL_URL },
    { "@type": "ListItem", position: 2, name: "Juniper", description: "Program fee varying with the plan, designed for women. Refer Labs code JARREDKFC: no charge for the initial consultation, valued at $89; program fees apply.", url: `${SITE_URL}/juniper` },
    { "@type": "ListItem", position: 3, name: "Moshy", description: "All-inclusive program fee. Refer Labs code REFERRAL120: $120 off the first order.", url: `${SITE_URL}/moshy` },
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
  name: seoConfig.cheapestWeightLossTelehealth.title,
  description: seoConfig.cheapestWeightLossTelehealth.description,
  url: seoConfig.cheapestWeightLossTelehealth.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-06",
  dateModified: "2026-10-01",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
};

const steps = [
  { title: "Count your consults", body: "Estimate how often you'd want to speak to a practitioner in a year. Regular contact favours a subscription; occasional check-ins favour pay-as-you-go." },
  { title: "Ask what the fee covers", body: "Consultations, follow-ups, coaching, minimum term. Each provider publishes what its fee covers on its own site." },
  { title: "Apply the first-order saving", body: "A new-patient code only affects the start. Take it off the first bill, then compare what the following eleven months cost." },
];

export default function CheapestWeightLossTelehealthPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <OfferSchema code="REFERRAL120" />
      <OfferSchema code="JARREDKFC" />

      <main id="main-content" className="mx-auto max-w-5xl px-5 pb-24 pt-8 sm:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-[#56504a]">
          <Link href="/" className="transition-colors hover:text-[#14120f]">Refer Labs</Link>
          <span aria-hidden>/</span>
          <Link href="/weight-loss" className="transition-colors hover:text-[#14120f]">Weight loss</Link>
          <span aria-hidden>/</span>
          <span className="text-[#14120f]">Cheapest weight loss telehealth</span>
        </nav>

        <p className="nw-kicker mt-8">Weight-loss telehealth · Australia</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-[#14120f] sm:text-4xl lg:text-[2.6rem]">
          Cheapest weight loss telehealth in Australia: affordable options compared
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#56504a] sm:text-lg">
          No service is cheapest for everyone, because weight-loss telehealth is billed two ways. A subscription such as
          Moshy or Juniper charges a monthly fee that covers consults and support; a pay-as-you-go service such as Doctors
          for Weight Loss charges per consultation. A new-patient code lowers the first bill: REFERRAL120
          takes $120 off a first Moshy order, and JARREDKFC means no charge for
          Juniper&apos;s initial consultation, valued at $89; program fees apply.
        </p>

        <div className="mt-6 max-w-2xl space-y-2">
          <AffiliateDisclosure compact partners={["Moshy", "Juniper"]} required={JUNIPER_REQUIRED?.text} />
        </div>

        <ProviderPair providers={providers} className="mt-8" />

        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">
            What is the cheapest weight-loss telehealth in Australia?
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
            For occasional check-ins, pay-as-you-go usually costs less because you only pay when you&apos;re seen. For
            regular contact, a subscription usually costs less because the consults are already in the monthly fee. Each
            provider shows its current price on its own site before you pay, which is where to read the figure: prices
            change, and the plan and support level you go ahead with set what you pay.
          </p>
        </section>

        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">How to work out which is cheaper for you</h2>
          <ol className="mt-6 space-y-5">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e4f2f5] text-sm font-bold text-[#00748e]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-[#14120f]">{s.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-[#56504a]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <p className="mt-10 max-w-3xl rounded-xl border border-[#ded8cd] bg-white px-5 py-4 text-[13px] leading-relaxed text-[#56504a]">
          Information only, not medical advice. Suitability for any program is decided by a registered Australian
          practitioner, not by price, and a registered practitioner decides what is right for you after an individual assessment.
        </p>
        <OfferTermsNote brand="Moshy" className="mt-4 max-w-3xl" />

        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Cheapest weight loss telehealth: common questions</h2>
          <div className="mt-5 divide-y divide-[#ded8cd] border-y border-[#ded8cd]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#14120f]">
                  {f.q}
                  <span aria-hidden className="text-xl leading-none text-[#007a95] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-[#56504a]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <nav aria-label="Related" className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#ded8cd] pt-8 text-sm">
          <Link href="/moshy" className="nw-link">Moshy discount code</Link>
          <Link href="/moshy-vs-juniper" className="nw-link">Moshy vs Juniper</Link>
          <Link href="/juniper" className="nw-link">Juniper review</Link>
          <Link href="/best-weight-loss-telehealth-australia" className="nw-link">Best weight-loss telehealth</Link>
          <Link href="/weight-loss" className="nw-link">Weight loss hub</Link>
        </nav>

        <EditorialMeta lastUpdated="2026-10-01" className="mt-8" />
        <AffiliateDisclosure
          partners={["Moshy", "Juniper"]}
          extra="We don't earn from Doctors for Weight Loss."
          className="mt-6"
        />
      </main>
    </ConsumerShell>
  );
}
