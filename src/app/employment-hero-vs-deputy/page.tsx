import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";
import { EMPLOYMENT_HERO_URL } from "@/lib/affiliate-links";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import ProviderPair, { type PairProvider } from "@/components/consumer/ProviderPair";
import { FactsTable, ChooseLists, PairFaqs, PairSources } from "@/components/consumer/PairParts";
import { READ_ON, READ_ON_ISO, SRC, EH, DEPUTY } from "@/lib/software-pair-facts";

export const metadata = generateSEOMetadata(seoConfig.employmentHeroVsDeputy);

/**
 * Revenue line: a shift-based employer choosing roster plus payroll
 * ("employment hero vs deputy"). Decision: an HR-first platform with a roster
 * add-on, or a roster-first platform with a payroll add-on. Monetisation:
 * Employment Hero affiliate click. Deputy is not a partner.
 *
 * Owned fact: Deputy sells its own Australian payroll ($5 per user add-on on
 * every AU plan, $30 monthly minimum, managers counted as users), and Employment
 * Hero publishes a per-seat Payroll plan with a 10-user minimum. The ranking page
 * says Employment Hero publishes no per-seat rate, which is wrong today.
 *
 * Deputy's base prices differ by billing: $6.75 / $8.75 / $13 billed annually,
 * $7.50 / $9.75 / $14.50 billed monthly. Both are printed, labelled.
 */

const SLUG = "/employment-hero-vs-deputy";
const seo = seoConfig.employmentHeroVsDeputy;

const providers: PairProvider[] = [
  {
    name: "Employment Hero",
    logo: "/logos/employmenthero.png",
    bestIf: "HR and payroll first, with rostering added on.",
    points: [
      "Payroll plan with award interpretation and employee self-service",
      "Rostering and time and attendance as an add-on",
      "HR plans, and a Managed Payroll service, sold alongside",
    ],
    href: EMPLOYMENT_HERO_URL,
    cta: "Continue to Employment Hero",
    loc: "ehvd-hero-eh",
  },
  {
    name: "Deputy",
    bestIf: "Rostering and timesheets first, with payroll added on.",
    points: [
      "Lite, Core and Pro plans built around shifts and time clocks",
      "Payroll add-on available on every Australian plan",
      "Award templates and a Pay Rate Builder for pay rules",
    ],
    href: SRC.deputyPricing,
    cta: "See Deputy's plans",
    loc: "ehvd-hero-deputy",
    sponsored: false,
    note: "No Refer Labs code. Refer Labs does not earn from Deputy; this link opens Deputy's own pricing page.",
  },
];
const closing = providers.map((p) => ({ ...p, loc: p.loc.replace("hero", "close") }));

const faqs = [
  {
    q: "Does Deputy do payroll in Australia?",
    a: `Yes. Deputy sells a Payroll add-on at ${DEPUTY.payroll} per user a month, AUD excluding taxes, billed monthly, which it says is available on all plans in Australia and can be tried free for 30 days (deputy.com/au/pricing, read ${READ_ON}). Its payroll page says Deputy Payroll is designed to support Single Touch Payroll Phase 2 reporting.`,
  },
  {
    q: "Is there a minimum spend on Deputy?",
    a: `Yes. Deputy's pricing FAQ states a minimum monthly spend of ${DEPUTY.minMonthly} per invoice on its monthly Lite, Core and Pro plans, in place since 1 September 2025 (read ${READ_ON}).`,
  },
  {
    q: "Do managers count as users on Deputy?",
    a: `Yes. Deputy's FAQ says all users, administrators and supervisors are counted in your total user number (deputy.com/au/pricing, read ${READ_ON}). Count your managers when you work out a per-user bill.`,
  },
  {
    q: "How many users does Employment Hero charge for at minimum?",
    a: `Ten. The Payroll plan, listed at ${EH.payroll}, carries the condition that a subscription must include at least ${EH.minUsers} users, billed on the higher of your contracted or active users. No billing period or GST basis is printed beside the price (employmenthero.com/pricing, read ${READ_ON}).`,
  },
  {
    q: "Is Refer Labs paid by Deputy?",
    a: "No. Employment Hero pays Refer Labs a commission on sign-ups from this page. Deputy has no arrangement with us, and the Deputy button opens its pricing page directly.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "HR & payroll", item: `${SITE_URL}/compare/hr-payroll` },
    { "@type": "ListItem", position: 3, name: "Employment Hero vs Deputy", item: `${SITE_URL}${SLUG}` },
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
  name: "Employment Hero vs Deputy",
  description: "Employment Hero and Deputy compared on payroll, rostering, minimums and published Australian prices.",
  numberOfItems: 2,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Employment Hero", url: `${SITE_URL}/employmenthero` },
    { "@type": "ListItem", position: 2, name: "Deputy", url: SRC.deputyPricing },
  ],
};
const articleSchema = comparisonArticleSchema({
  headline: "Employment Hero vs Deputy: payroll plan or roster add-on",
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
          <span className="text-[#14120f]">Employment Hero vs Deputy</span>
        </nav>

        <p className="nw-kicker mt-8">Rostering and payroll · Australia</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-[#14120f] sm:text-4xl lg:text-[2.7rem]">
          Employment Hero vs Deputy: payroll plan or roster add-on
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#56504a] sm:text-lg">
          Both now run Australian payroll, from opposite starting points. Deputy is a rostering platform whose base plans
          start at {DEPUTY.liteAnnual} per user a month billed annually ({DEPUTY.liteMonthly} billed monthly), with payroll
          as a {DEPUTY.payroll} per user add-on on every Australian plan, all in AUD excluding taxes; monthly plans carry a{" "}
          {DEPUTY.minMonthly} minimum spend and every manager counts as a user (deputy.com/au/pricing, read {READ_ON}).
          Employment Hero is an HR and payroll platform whose Payroll plan is listed at {EH.payroll} with a {EH.minUsers}-user
          minimum, and rostering is a {EH.rostering} per employee a month add-on; no billing period or tax basis is printed
          beside the {EH.payroll} (employmenthero.com/pricing, read {READ_ON}). For a shift team under ten people,
          Deputy&apos;s floor is a dollar amount and Employment Hero&apos;s is a headcount.
        </p>

        <div className="mt-6 max-w-2xl">
          <AffiliateDisclosure
            compact
            partners={["Employment Hero"]}
            notWholeMarket="Deputy is not a Refer Labs partner and earns us nothing. Other rostering and payroll software is sold in Australia, and only these two are compared here."
          />
        </div>

        <ProviderPair providers={providers} className="mt-8" />

        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Does Deputy do payroll in Australia?</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
            Yes, as an add-on. Deputy lists Payroll at {DEPUTY.payroll} per user a month (AUD, excluding taxes, billed
            monthly, with 10% off on annual billing; read {READ_ON}), available on all Australian plans, with multi-entity pay runs, award
            templates, a Pay Rate Builder and payslips in the mobile app. Its payroll page says it is designed to support
            Single Touch Payroll Phase 2. Payroll sits on top of a base plan rather than replacing it, so the bill is the base
            rate plus the add-on for each user.
          </p>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
            The mirror image holds on the other side. Employment Hero publishes a per-seat Payroll plan and sells rostering,
            time clocks, timesheets and geofencing as its Rostering &amp; Time and Attendance add-on, so neither company now
            needs the other to cover both jobs.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">What does each include?</h2>
          <FactsTable
            readOn={READ_ON}
            caption={`Read on each vendor's own Australian pricing page on ${READ_ON}. Deputy prints AUD excluding taxes; Employment Hero prints no tax basis or period beside its Payroll price. Not added or ranked.`}
            columns={["Employment Hero", "Deputy"]}
            rows={[
              { label: "Built around", cells: ["HR and payroll", "Rostering, timesheets and time clocks"] },
              {
                label: "Base plan",
                cells: [
                  `Payroll plan ${EH.payroll}, "Conditions apply"; no period or tax basis printed`,
                  `Lite ${DEPUTY.liteAnnual}, Core ${DEPUTY.coreAnnual}, Pro ${DEPUTY.proAnnual} per user/month billed annually; ${DEPUTY.liteMonthly}, ${DEPUTY.coreMonthly}, ${DEPUTY.proMonthly} billed monthly; AUD excl taxes`,
                ],
              },
              { label: "Payroll", cells: ["The base plan itself", `Add-on, ${DEPUTY.payroll} per user/month billed monthly, on all Australian plans`] },
              { label: "Rostering", cells: [`Add-on, ${EH.rostering} per employee/month`, "Included: basic on Lite, advanced on Core"] },
              { label: "HR", cells: ["HR plans sold separately; Employment Unlimited bundles both (quoted)", `Add-on, ${DEPUTY.hr} per user/month`] },
              {
                label: "Minimum",
                cells: [`${EH.minUsers} users, billed on the higher of contracted or active`, `${DEPUTY.minMonthly} a month per invoice on monthly plans`],
              },
              { label: "Who counts as a user", cells: ["Users in your agreement or active users, whichever is higher", "All users, administrators and supervisors"] },
            ]}
          />
        </section>

        <ChooseLists
          sides={[
            {
              name: "Employment Hero",
              items: [
                "You employ ten or more people, so the minimum is already covered by headcount.",
                "Contracts, onboarding, performance and employee records are as big a job as the roster.",
                `You want a payroll specialist to run pay for you: Managed Payroll is listed at ${EH.managedPayroll} per employee a month (read ${READ_ON}).`,
              ],
            },
            {
              name: "Deputy",
              items: [
                "Your staff work shifts and the roster is the screen managers open every day.",
                "You have fewer than ten staff, where Employment Hero would bill for ten users.",
                "You already roster in Deputy and want payroll without moving to another system.",
              ],
            },
          ]}
        />

        <PairFaqs heading="Employment Hero and Deputy: common questions" faqs={faqs} />

        <section className="mt-14">
          <h2 className="text-xl font-bold text-[#14120f]">Open the one that fits your roster</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#56504a]">
            Per-user pricing moves with plan changes and promotions. Everything above is dated {READ_ON}; confirm the current
            figures on the vendor&apos;s page before you commit.
          </p>
          <ProviderPair providers={closing} className="mt-5" />
        </section>

        <PairSources
          readOn={READ_ON}
          sources={[
            { label: "Deputy Australian pricing and FAQ", url: SRC.deputyPricing },
            { label: "Deputy Australian payroll page", url: SRC.deputyPayroll },
            { label: "Employment Hero pricing, Payroll tab and add-ons", url: SRC.ehPricing },
          ]}
        />

        <nav aria-label="Related" className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#ded8cd] pt-8 text-sm">
          <Link href="/employment-hero-vs-xero-payroll" className="nw-link">Employment Hero vs Xero Payroll</Link>
          <Link href="/employmenthero" className="nw-link">Employment Hero review</Link>
          <Link href="/compare/hr-payroll" className="nw-link">HR and payroll platforms compared</Link>
          <Link href="/guides" className="nw-link">All guides</Link>
        </nav>

        <EditorialMeta lastUpdated={READ_ON_ISO} className="mt-8" />
        <AffiliateDisclosure partners={["Employment Hero"]} className="mt-6" />
      </main>
    </ConsumerShell>
  );
}
