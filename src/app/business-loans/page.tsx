import Link from "next/link";
import { ArrowRight, ShieldCheck, FileX2, UserRound, Scale, Check } from "lucide-react";
import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import LeadForm from "@/components/lending/LeadForm";
import LenderTable from "@/components/lending/LenderTable";
import CommissionDisclosure from "@/components/lending/CommissionDisclosure";
import { LENDERS } from "@/lib/lenders";
import { INTENT_PAGES } from "@/lib/lending-intent";

// Hub -> spoke links. Generated from the registry so a new guide appears here
// automatically; the hub is the crawlable path into the whole lending cluster.
const GUIDE_LINKS = [
  { href: "/what-a-business-loan-actually-costs", label: "What a business loan actually costs" },
  { href: "/true-cost-of-business-loans-australia", label: "The hidden cost of factor rates (analysis)" },
  { href: "/business-loan-calculator", label: "Business loan repayment calculator" },
  { href: "/equipment-finance-instant-asset-write-off", label: "Equipment finance and the instant asset write-off" },
  ...INTENT_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.h1 })),
];

const money = (n: number) => `$${n.toLocaleString("en-AU")}`;
const panelMin = Math.min(...LENDERS.map((l) => l.minAmount));
const panelMax = Math.max(...LENDERS.map((l) => l.maxAmount));

const TRUST = [
  { icon: ShieldCheck, label: "AFIA Code of Practice lenders" },
  { icon: FileX2, label: "No bank statements or ID uploads" },
  { icon: UserRound, label: "Every enquiry reviewed by a person" },
  { icon: Scale, label: "Referrer, not a lender. Rankings never sold" },
];

const URL = `${SITE_URL}/business-loans`;

export const metadata = generateSEOMetadata({
  title: "Business Loans Australia: Compare Lenders & Check Your Options | Refer Labs",
  description:
    "Compare Australian business lenders in one short form. A person reviews every enquiry and introduces you to the lenders that fit. Free. Referrer, not a lender.",
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
  { h: "Tell us about your business", p: "A short form covering how much you need, what it's for, and a few facts about the business. It takes about a minute, and there are no documents to upload." },
  { h: "We review and match it", p: "A person, not a bot, checks your enquiry against what each lender on our panel actually funds, then gets in touch within one business day." },
  { h: "You deal with the lender", p: "With your consent, we introduce your enquiry to the lenders that fit. They assess it and make any offer to you directly. You're never obligated to proceed." },
];

export default function BusinessLoansHub() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        {/* Hero */}
        <section className="grid items-start gap-10 pt-4 sm:pt-8 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-[#10251b] sm:text-5xl">
              Compare business loans from Australian lenders
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#3d4b44]">
              Answer a few questions about your business and we&apos;ll match your enquiry to the lenders most likely to
              fund it. A person reviews every enquiry, it&apos;s free to use, and there&apos;s nothing to upload. Refer
              Labs is a referrer, not a lender.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#enquire" className="nw-btn group">
                Compare &amp; enquire <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a href="#how" className="nw-btn-ghost">See how it works</a>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5 text-[13px] font-medium text-[#3d4b44]">
              {["Free to use", "No document uploads", "Enquiring won't affect your credit score"].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#0a7c42]" strokeWidth={2.5} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* At a glance */}
          <aside className="lg:pt-1">
            <div className="nw-card rounded-2xl p-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9aa39c]">The panel at a glance</span>
              <dl className="mt-4 divide-y divide-[#eef1ef] text-sm">
                {[
                  ["Lenders", LENDERS.map((l) => l.name).join(", ")],
                  ["Loan sizes", `${money(panelMin)} – ${money(panelMax)}`],
                  ["Funding", "As fast as same business day"],
                  ["Cost to you", "Free"],
                  ["Standards", "AFIA Code signatories"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3 py-2.5">
                    <dt className="w-24 shrink-0 text-[#9aa39c]">{k}</dt>
                    <dd className="font-medium text-[#2b362f]">{v}</dd>
                  </div>
                ))}
              </dl>
              <a href="#enquire" className="nw-btn mt-5 w-full justify-center">Check your options</a>
              <p className="mt-3 text-center text-[11px] text-[#9aa39c]">About a minute · no documents to upload</p>
            </div>
          </aside>
        </section>

        {/* Trust strip */}
        <section className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#e5e9e7] bg-[#e5e9e7] sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 bg-white px-5 py-5">
              <Icon className="h-5 w-5 shrink-0 text-[#0a7c42]" strokeWidth={1.7} aria-hidden="true" />
              <span className="text-[13px] font-medium leading-snug text-[#3d4b44]">{label}</span>
            </div>
          ))}
        </section>

        {/* Enquiry form */}
        <section className="mt-16">
          <div className="max-w-xl">
            <h2 className="text-2xl font-extrabold text-[#10251b]">Start your enquiry</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">
              Tell us what your business needs. We&apos;ll show you an indicative match and a person will be in touch within
              one business day. There&apos;s no obligation to proceed with any lender.
            </p>
          </div>
          <div id="enquire" className="mt-6 max-w-2xl scroll-mt-24">
            <LeadForm sourcePage="/business-loans" />
            <p className="mt-4 text-xs leading-relaxed text-[#6e7b74]">
              Refer Labs is a referrer, not a lender. With your consent we share your details only with the panel lenders
              relevant to your enquiry, and we may be paid a commission if your loan settles, which never changes your rate
              or the order lenders appear in. See our{" "}
              <Link href="/privacy" className="underline hover:text-[#10251b]">Privacy Policy</Link> and{" "}
              <Link href="/how-we-make-money" className="underline hover:text-[#10251b]">how we make money</Link>.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mt-16 scroll-mt-24">
          <h2 className="text-2xl font-extrabold text-[#10251b]">How it works</h2>
          <ol className="mt-6 grid gap-5 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.h} className="nw-card rounded-2xl p-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#0a7c42] text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(10,124,66,0.5)]">{i + 1}</span>
                <h3 className="mt-4 font-bold text-[#10251b]">{s.h}</h3>
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

        {/* Guides */}
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold text-[#10251b]">Business lending guides</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#3d4b44]">
            Everything we&apos;ve researched on borrowing for a business: what it really costs, which loan type fits, and
            what lenders look at before they say yes.
          </p>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDE_LINKS.map((g) => (
              <li key={g.href}>
                <Link href={g.href} className="text-sm font-semibold leading-snug text-[#0a7c42] hover:text-[#086536] hover:underline">
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
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
          <Link href="/true-cost-of-business-loans-australia" className="font-semibold text-[#0a7c42] hover:text-[#086536]">The hidden cost of factor rates (analysis)</Link>
          <Link href="/business-loan-calculator" className="font-semibold text-[#0a7c42] hover:text-[#086536]">Repayment calculator</Link>
          <Link href="/equipment-finance-instant-asset-write-off" className="font-semibold text-[#0a7c42] hover:text-[#086536]">Equipment finance & the write-off</Link>
          <Link href="/how-we-make-money" className="font-semibold text-[#6e7b74] hover:text-[#10251b]">How we make money</Link>
        </section>
      </main>
    </ConsumerShell>
  );
}
