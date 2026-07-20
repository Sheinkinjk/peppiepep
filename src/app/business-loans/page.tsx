import Link from "next/link";
import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import LeadForm from "@/components/lending/LeadForm";
import LenderTable from "@/components/lending/LenderTable";
import CollectionNotice from "@/components/lending/CollectionNotice";
import CommissionDisclosure from "@/components/lending/CommissionDisclosure";
import { LENDERS } from "@/lib/lenders";

const URL = `${SITE_URL}/business-loans`;

export const metadata = generateSEOMetadata({
  title: "Business Loans Australia: Compare Lenders & Check Your Options | Refer Labs",
  description:
    "Compare Australian business lenders and tell us what you need in one short form. A person reviews every enquiry and introduces you to lenders that fit. No bank statements or ID uploads. Referrer, not a lender.",
  url: URL,
  keywords: [
    "business loans australia",
    "compare business loans australia",
    "small business loan australia",
    "unsecured business loan australia",
    "business finance australia",
  ],
});

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is Refer Labs a lender?",
    a: "No. Refer Labs is an independent referrer. We collect your details, and with your consent we introduce your enquiry to lenders on our panel who then assess it and make any offer. We do not lend money, set rates, or approve applications, and we are not a credit provider or credit assistance provider.",
  },
  {
    q: "What does it cost me?",
    a: "Nothing. There is no fee to use the form or to be introduced to a lender. If a loan settles, the lender may pay Refer Labs a commission. That never changes the rate or fees you are offered.",
  },
  {
    q: "Will this affect my credit score?",
    a: "Submitting the form does not involve a credit check. A lender only assesses your credit if you choose to proceed with a full application to them, and they will tell you before they do.",
  },
  {
    q: "Do I have to upload bank statements or ID?",
    a: "Not here. This form only collects contact details and high-level business information. If a lender needs documents later, you provide those directly to that lender through their own secure process, not through this form.",
  },
  {
    q: "How quickly will I hear back?",
    a: "A person reviews your enquiry and gets in touch within one business day to talk through the options that fit your situation.",
  },
  {
    q: "Which lenders are on the panel?",
    a: `Our current panel is ${LENDERS.map((l) => l.name).join(", ")}. We introduce your enquiry only to lenders relevant to what you have told us, and only as you consent. The panel changes over time.`,
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: URL,
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Business Loans", item: URL },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Business Loans Australia",
  url: URL,
  description:
    "Compare Australian business lenders and check your options through one short enquiry. Refer Labs is an independent referrer, not a lender.",
  publisher: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
};

const STEPS = [
  { h: "You tell us what you need", p: "One short form: how much, what for, and a few facts about the business. About a minute, no documents." },
  { h: "A person reviews it", p: "Not a bot. We look at your enquiry against what each panel lender actually funds, and get in touch within one business day." },
  { h: "We introduce you to lenders that fit", p: "With your consent, we pass your enquiry to the relevant lenders. They assess it and make any offer directly to you." },
];

export default function BusinessLoansHub() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        {/* Hero */}
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0a7c42]">Business finance · Australia</p>
          <h1 className="mt-2 text-4xl font-extrabold leading-[1.1] text-[#10251b] sm:text-5xl">
            Compare business lenders. Tell us once.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#3d4b44]">
            One short enquiry, no documents to upload. A person reviews it and introduces you to the Australian lenders that
            actually fit what you need. Refer Labs is a referrer, not a lender, and using us is free.
          </p>
        </div>

        {/* Form + rail */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div id="enquire" className="scroll-mt-24">
            <LeadForm sourcePage="/business-loans" />
          </div>
          <aside className="space-y-5">
            <CollectionNotice />
            <CommissionDisclosure />
          </aside>
        </div>

        {/* How it works */}
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold text-[#10251b]">How it works</h2>
          <ol className="mt-6 grid gap-5 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.h} className="rounded-2xl border border-[#e5e9e7] bg-white p-5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0a7c42] text-sm font-bold text-white">{i + 1}</span>
                <h3 className="mt-3 font-bold text-[#10251b]">{s.h}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">{s.p}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Panel */}
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold text-[#10251b]">The lenders on our panel</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#3d4b44]">
            These are the lenders we currently introduce enquiries to. Where a lender publishes a headline rate we show it;
            others price each loan individually. Either way the figures are indicative, not a quote for your business.
          </p>
          <div className="mt-6">
            <LenderTable caption="Business lenders on the Refer Labs panel" />
          </div>
          <div className="mt-4">
            <CommissionDisclosure variant="inline" />
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-extrabold text-[#10251b]">Common questions</h2>
          <dl className="mt-6 divide-y divide-[#eef1ef] border-t border-[#eef1ef]">
            {FAQS.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-bold text-[#10251b]">{f.q}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Related */}
        <section className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#eef1ef] pt-8 text-sm">
          <Link href="/what-a-business-loan-actually-costs" className="font-semibold text-[#0a7c42] hover:text-[#086536]">What a business loan actually costs</Link>
          <Link href="/business-loan-calculator" className="font-semibold text-[#0a7c42] hover:text-[#086536]">Repayment calculator</Link>
          <Link href="/equipment-finance-instant-asset-write-off" className="font-semibold text-[#0a7c42] hover:text-[#086536]">Equipment finance & the write-off</Link>
          <Link href="/how-we-make-money" className="font-semibold text-[#6e7b74] hover:text-[#10251b]">How we make money</Link>
        </section>
      </main>
    </ConsumerShell>
  );
}
