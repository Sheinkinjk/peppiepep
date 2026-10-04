import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";
import { EMPLOYMENT_HERO_URL } from "@/lib/affiliate-links";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import ProviderPair, { type PairProvider } from "@/components/consumer/ProviderPair";
import { FactsTable, ChooseLists, PairFaqs, PairSources } from "@/components/consumer/PairParts";
import { READ_ON, READ_ON_ISO, SRC, XERO, EH } from "@/lib/software-pair-facts";

export const metadata = generateSEOMetadata(seoConfig.employmentHeroVsXeroPayroll);

/**
 * Revenue line: an Australian employer choosing a payroll system ("employment
 * hero vs xero payroll"). Decision: a dedicated HR-payroll platform, or the
 * payroll already inside the accounting plan. Monetisation: Employment Hero
 * affiliate click (demo request). Xero is not a partner.
 *
 * Owned fact: Xero bundles payroll into every AU plan capped by people paid,
 * while Employment Hero's Payroll plan carries a 10-user minimum. The ranking AU
 * comparison prices both from guessed ranges and states neither. The fact argues
 * against our partner for a Xero business under ten staff, and that half stays.
 */

const SLUG = "/employment-hero-vs-xero-payroll";
const seo = seoConfig.employmentHeroVsXeroPayroll;

const providers: PairProvider[] = [
  {
    name: "Employment Hero",
    logo: "/logos/employmenthero.png",
    bestIf: "An HR and payroll platform for employers with ten or more staff.",
    points: [
      "Payroll plan lists unlimited pay runs, award interpretation and employee self-service",
      "Rostering and time and attendance is a paid add-on",
      "Connects to Xero for the accounting side",
    ],
    href: EMPLOYMENT_HERO_URL,
    cta: "Continue to Employment Hero",
    loc: "ehvx-hero-eh",
  },
  {
    name: "Xero Payroll",
    bestIf: "Payroll that comes inside a Xero accounting subscription.",
    points: [
      "Every Australian plan includes payroll for a set number of people",
      "Staff use the Xero Me app for payslips, leave and timesheets",
      "Accounting, GST and BAS in the same login",
    ],
    href: SRC.xeroPricing,
    cta: "See Xero's plans",
    loc: "ehvx-hero-xero",
    sponsored: false,
    note: "No Refer Labs code. Refer Labs does not earn from Xero; this link opens Xero's own pricing page.",
  },
];
const closing = providers.map((p) => ({ ...p, loc: p.loc.replace("hero", "close") }));

const faqs = [
  {
    q: "Does Xero include payroll in Australia?",
    a: `Yes. Every Australian Xero plan includes payroll, capped by the number of people paid: 1 on Ignite (${XERO.ignite}), 2 on Grow (${XERO.grow}), 5 on Comprehensive (${XERO.comprehensive}), 10 on Ultimate 10 (${XERO.ultimate10}), 20 on Ultimate 20 (${XERO.ultimate20}) and 50 on Ultimate 50 (${XERO.ultimate50}), each ${XERO.basis}. Xero's terms say additional charges may apply if you pay more people than the plan includes (xero.com/au/pricing-plans, read ${READ_ON}).`,
  },
  {
    q: "What is the minimum for Employment Hero payroll?",
    a: `Ten users. Employment Hero lists its Payroll plan at ${EH.payroll} with "Conditions apply", and the condition reads: "Your subscription must include a minimum of 10 Users. Billing is based on the higher of the two: the number of Users specified in your customer agreement, or the number of active Users." The card prints no billing period and no GST basis beside the figure (employmenthero.com/pricing, read ${READ_ON}).`,
  },
  {
    q: "Is KeyPay the same as Employment Hero?",
    a: `Yes. KeyPay's own site now opens with "KeyPay is now Employment Hero" (keypay.com.au, read ${READ_ON}), so Employment Hero vs KeyPay is one product under two names rather than a choice between two.`,
  },
  {
    q: "Can I use Employment Hero and Xero together?",
    a: `Yes, in either direction. Employment Hero's Xero integration page says that if you use Employment Hero Payroll you can integrate with Xero for accounting, and if you use Employment Hero HR you can integrate with Xero for payroll (employmenthero.com/integrations/xero, read ${READ_ON}). A business can keep Xero Payroll and add Employment Hero's HR side only.`,
  },
  {
    q: "Does Refer Labs earn from Employment Hero or Xero?",
    a: "Refer Labs earns a commission if you sign up to Employment Hero through the links on this page. It earns nothing from Xero, and the Xero link goes straight to Xero's own pricing page.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "HR & payroll", item: `${SITE_URL}/compare/hr-payroll` },
    { "@type": "ListItem", position: 3, name: "Employment Hero vs Xero Payroll", item: `${SITE_URL}${SLUG}` },
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
  name: seo.title,
  description: seo.description,
  url: seo.url,
  inLanguage: "en-AU",
  datePublished: READ_ON_ISO,
  dateModified: READ_ON_ISO,
  isPartOf: { "@id": `${SITE_URL}/#website` },
};
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Employment Hero vs Xero Payroll",
  description: "Employment Hero and Xero Payroll compared on how payroll is sold, headcount rules and published Australian prices.",
  numberOfItems: 2,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Employment Hero", url: `${SITE_URL}/employmenthero` },
    { "@type": "ListItem", position: 2, name: "Xero Payroll", url: SRC.xeroPricing },
  ],
};
const articleSchema = comparisonArticleSchema({
  headline: "Employment Hero vs Xero Payroll: headcount limits and Australian prices",
  description: seo.description,
  url: seo.url,
  datePublished: READ_ON_ISO,
  dateModified: READ_ON_ISO,
});

export default function Page() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main id="main-content" className="mx-auto max-w-4xl px-5 pb-24 pt-8 sm:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-[#56504a]">
          <Link href="/" className="transition-colors hover:text-[#14120f]">Refer Labs</Link>
          <span aria-hidden>/</span>
          <Link href="/compare/hr-payroll" className="transition-colors hover:text-[#14120f]">HR &amp; payroll</Link>
          <span aria-hidden>/</span>
          <span className="text-[#14120f]">Employment Hero vs Xero Payroll</span>
        </nav>

        <p className="nw-kicker mt-8">Payroll software · Australia</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-[#14120f] sm:text-4xl lg:text-[2.7rem]">
          Employment Hero vs Xero Payroll: headcount limits and prices
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#56504a] sm:text-lg">
          Xero includes payroll in every Australian plan and caps it by the number of people paid: 1 on Ignite
          ({XERO.ignite} a month), 2 on Grow ({XERO.grow}), 5 on Comprehensive ({XERO.comprehensive}) and 10 on Ultimate 10
          ({XERO.ultimate10}), in AUD including GST. Employment Hero sells payroll as its own plan, listed at {EH.payroll} with
          a minimum of {EH.minUsers} users and billed on the higher of contracted or active users; the card prints no billing
          period or GST basis. Both were read on the vendors&apos; own pricing pages on {READ_ON}. A business with fewer than
          ten staff that already runs Xero has payroll in its subscription today. Employment Hero is built for employers who
          want award interpretation, HR records and rostering in the same system as pay runs.
        </p>

        <div className="mt-6 max-w-2xl">
          <AffiliateDisclosure
            compact
            partners={["Employment Hero"]}
            notWholeMarket="Refer Labs earns from Employment Hero and not from Xero. Other payroll software is sold in Australia, and this page covers these two only."
          />
        </div>

        <ProviderPair providers={providers} className="mt-8" />

        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">
            Is Employment Hero better than Xero Payroll?
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
            Headcount settles most of it. Below ten staff, Employment Hero bills for ten users regardless, while a Xero plan
            already covers 1, 2 or 5 people depending on the tier you hold. From ten staff up the minimum stops mattering, and
            the question becomes what the payroll system has to do: Employment Hero lists award interpretation in its Payroll
            plan and sells rostering as a {EH.rostering} per employee a month add-on, whereas Xero&apos;s payroll page (read {READ_ON}) lists pay runs, super, leave and Single Touch Payroll, and its
            FAQ sends questions about a specific award obligation to a payroll specialist or the Fair Work Ombudsman.
          </p>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
            The two also combine. Employment Hero&apos;s own integration page describes running its HR module alongside Xero
            Payroll, or its Payroll alongside Xero accounting, so moving payroll is not the only way to add HR tooling.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">What does each include?</h2>
          <FactsTable
            readOn={READ_ON}
            caption={`Read on each vendor's own Australian pricing page on ${READ_ON}. Xero prints AUD including GST; Employment Hero prints a figure with no period or tax basis, so the two are not added or ranked.`}
            columns={["Employment Hero", "Xero Payroll"]}
            rows={[
              { label: "How payroll is sold", cells: ["A standalone Payroll plan, or inside Employment Unlimited (quoted by sales)", "Included in every Australian accounting plan"] },
              {
                label: "Published price",
                cells: [
                  `${EH.payroll}, "Conditions apply". No billing period or GST basis printed`,
                  `Ignite ${XERO.ignite}, Grow ${XERO.grow}, Comprehensive ${XERO.comprehensive}, Ultimate 10 ${XERO.ultimate10}, Ultimate 20 ${XERO.ultimate20}, Ultimate 50 ${XERO.ultimate50}, ${XERO.basis}`,
                ],
              },
              {
                label: "Headcount rule",
                cells: [
                  `Minimum ${EH.minUsers} users; billed on the higher of contracted or active users`,
                  "Payroll for 1, 2, 5, 10, 20 or 50 people by plan, with an Ultimate 100 tier also listed; charges may apply above the included number",
                ],
              },
              { label: "Rostering", cells: [`Add-on, ${EH.rostering} per employee/month`, "Not on the pricing page; staff log timesheets in Xero Me"] },
              { label: "Award interpretation", cells: ["Listed in the Payroll plan", "Not listed as a feature; Xero's payroll FAQ refers award questions to a payroll specialist or the Fair Work Ombudsman"] },
              { label: "Accounting", cells: ["Not included; integrates with Xero", "Included"] },
            ]}
          />
        </section>

        <ChooseLists
          sides={[
            {
              name: "Employment Hero",
              items: [
                "You employ ten or more people, so the user minimum is not paying for empty seats.",
                "Your staff are on modern awards and you want award interpretation in the payroll plan.",
                "Rostering, onboarding and HR records need to live in the same system as pay runs.",
              ],
            },
            {
              name: "Xero Payroll",
              items: [
                "You already pay for Xero and pay no more people than your plan includes.",
                "You have fewer than ten staff, where Employment Hero would bill you for ten users.",
                "One subscription and one login for the books and the pay runs matters more than HR features.",
              ],
            },
          ]}
        />

        <PairFaqs heading="Employment Hero and Xero Payroll: common questions" faqs={faqs} />

        <section className="mt-14">
          <h2 className="text-xl font-bold text-[#14120f]">Check the plan for your headcount</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#56504a]">
            Both companies change plans and prices; the figures above are dated {READ_ON}. Open whichever fits your team size
            and confirm the current terms before you switch payroll.
          </p>
          <ProviderPair providers={closing} className="mt-5" />
        </section>

        <PairSources
          readOn={READ_ON}
          sources={[
            { label: "Xero Australian plans and pricing terms", url: SRC.xeroPricing },
            { label: "Xero payroll software page and FAQ", url: SRC.xeroPayroll },
            { label: "Employment Hero pricing, Payroll tab", url: SRC.ehPricing },
            { label: "Employment Hero and Xero integration", url: SRC.ehXero },
            { label: "KeyPay", url: SRC.keypay },
          ]}
        />

        <nav aria-label="Related" className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#ded8cd] pt-8 text-sm">
          <Link href="/employment-hero-vs-deputy" className="nw-link">Employment Hero vs Deputy</Link>
          <Link href="/employmenthero" className="nw-link">Employment Hero review</Link>
          <Link href="/compare/hr-payroll" className="nw-link">HR and payroll platforms compared</Link>
          <Link href="/dext-vs-hubdoc" className="nw-link">Dext vs Hubdoc</Link>
          <Link href="/guides" className="nw-link">All guides</Link>
        </nav>

        <EditorialMeta lastUpdated={READ_ON_ISO} className="mt-8" />
        <AffiliateDisclosure partners={["Employment Hero"]} className="mt-6" />
      </main>
    </ConsumerShell>
  );
}
