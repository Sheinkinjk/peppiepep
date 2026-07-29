import Link from "next/link";
import {
  ArrowRight, ShieldCheck, FileX2, UserRound, Scale, Check,
  Banknote, Zap, RefreshCw, Waves, Truck, Store,
} from "lucide-react";
import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import LeadForm from "@/components/lending/LeadForm";
import LenderCards from "@/components/lending/LenderCards";
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
  { href: "/compare-business-lenders/prospa-vs-lumi", label: "Prospa vs Lumi, compared" },
  { href: "/compare-business-lenders/prospa-vs-moula", label: "Prospa vs Moula, compared" },
  { href: "/compare-business-lenders/lumi-vs-moula", label: "Lumi vs Moula, compared" },
  ...INTENT_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.h1 })),
];

const money = (n: number) => `$${n.toLocaleString("en-AU")}`;
const lowestMin = Math.min(...LENDERS.map((l) => l.minAmount));
const highestMax = Math.max(...LENDERS.map((l) => l.maxAmount));

// Honest, verifiable trust signals only. Refer Labs is a referrer, not a lender,
// so there are no "$X funded / N businesses backed / 95% approval" stats to claim.
const TRUST = [
  { icon: ShieldCheck, label: "AFIA Code status shown per lender" },
  { icon: FileX2, label: "No bank statements or ID uploads" },
  { icon: UserRound, label: "Every enquiry reviewed by a person" },
  { icon: Scale, label: "Referrer, not a lender. Rankings never sold" },
];

// "By the numbers" strip — every figure is real (derived from the lender data),
// not marketing invention.
const STATS = [
  { v: `${LENDERS.length}`, l: "Australian lenders compared" },
  { v: `${money(lowestMin)}–${money(highestMax)}`, l: "Loan sizes across the panel" },
  { v: "Same business day", l: "Fastest advertised funding" },
  { v: "1 business day", l: "A person is in touch within" },
];

// Loan use-cases. Each links to its intent page (real slug), so this section is
// both the UX "what can you help with" and the SEO internal-linking layer.
const PRODUCTS = [
  { icon: Banknote, title: "Unsecured business loans", desc: "No property or asset as security. Faster to fund, assessed on your cash flow.", href: "/unsecured-business-loans-australia" },
  { icon: Zap, title: "Fast business loans", desc: "Same-day to 48-hour funding from lenders that read your bank data directly.", href: "/fast-business-loans-australia" },
  { icon: RefreshCw, title: "Line of credit", desc: "A revolving limit you draw as needed, paying interest only on what you use.", href: "/business-line-of-credit-australia" },
  { icon: Waves, title: "Working capital", desc: "Cover wages, stock and slow seasons when money out and money in don't line up.", href: "/working-capital-loans-australia" },
  { icon: Truck, title: "Equipment finance", desc: "Finance a vehicle or machine, tied to the asset, and check the instant write-off.", href: "/equipment-finance-instant-asset-write-off" },
  { icon: Store, title: "Small business loans", desc: "Term loans sized for everyday needs: stock, hiring, a slow month, or growth.", href: "/small-business-loans-australia" },
];

const URL = `${SITE_URL}/business-loans`;

export const metadata = generateSEOMetadata({
  title: "Business Loans Australia: Compare Lenders & Check Your Options | Refer Labs",
  description:
    "Compare Australian business lenders in one short enquiry. A person reviews every enquiry and introduces you to the lenders that fit. Free, no document uploads, no credit impact to enquire. Referrer, not a lender.",
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
    a: "No. Refer Labs is an independent referrer. We collect your details, and with your consent we pass your enquiry to lenders, or to a finance broker who submits it to lenders, who then assess it and make any offer. We do not lend money, set rates, or approve applications, and we are not a credit provider or credit assistance provider.",
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
    q: "Which lenders do you compare?",
    a: `We currently compare ${LENDERS.map((l) => l.name).join(", ")}. Refer Labs has no partnership or standing arrangement with any of them: each enquiry is submitted individually, directly or through a finance broker, and the lender assesses it on its own criteria. We pass on your enquiry only where a lender is relevant to what you have told us, and only as you consent. Which lenders we compare changes over time.`,
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
  { h: "We review and match it", p: "A person, not a bot, checks your enquiry against what each lender we compare actually funds, then gets in touch within one business day." },
  { h: "You deal with the lender", p: "With your consent, we submit your enquiry to the lenders that fit, directly or through a finance broker. The lender assesses it and makes any offer to you directly. You're never obligated to proceed." },
];

export default function BusinessLoansHub() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main>
        {/* ── Hero (form-first) ── */}
        <section className="border-b border-[#e5e9e7] bg-[#f5f8f6]">
          <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div className="lg:pt-4">
              <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0a7c42]">Business loans, Australia</span>
              <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-[#10251b] sm:text-5xl">
                Compare business lenders and get matched in a minute
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#3d4b44]">
                Tell us what you need and a person matches your enquiry to the {LENDERS.length} Australian lenders most
                likely to fund it. It&apos;s free, there&apos;s nothing to upload, and enquiring won&apos;t touch your
                credit score. Refer Labs is a referrer, not a lender, with no partnership with any lender here.
              </p>
              <ul className="mt-7 grid gap-2.5 text-[15px] font-medium text-[#10251b] sm:grid-cols-2">
                {["Free to use, no obligation", "No document uploads", "No credit impact to enquire", "A person reviews every enquiry"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e6f3ec]">
                      <Check className="h-3.5 w-3.5 text-[#0a7c42]" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 hidden gap-3 lg:flex">
                <a href="#lenders" className="nw-btn-ghost">See the {LENDERS.length} lenders</a>
                <a href="#how" className="nw-btn-ghost">How it works</a>
              </div>
            </div>

            {/* The enquiry form, above the fold */}
            <div id="enquire" className="scroll-mt-24">
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="text-lg font-extrabold tracking-tight text-[#10251b]">Compare &amp; enquire</h2>
                <span className="text-[12px] font-medium text-[#6e7b74]">~1 minute · no uploads</span>
              </div>
              <LeadForm sourcePage="/business-loans" />
              <p className="mt-3 text-xs leading-relaxed text-[#6e7b74]">
                With your consent we share your details only with the lenders and brokers relevant to your enquiry, and we
                may be paid a commission if your loan settles, which never changes your rate. See our{" "}
                <Link href="/privacy" className="underline hover:text-[#10251b]">Privacy Policy</Link> and{" "}
                <Link href="/how-we-make-money" className="underline hover:text-[#10251b]">how we make money</Link>.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          {/* By the numbers (honest) */}
          <section className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#e5e9e7] bg-[#e5e9e7] lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.l} className="bg-white px-5 py-6 text-center">
                <div className="text-xl font-extrabold text-[#0a7c42] sm:text-2xl">{s.v}</div>
                <div className="mt-1 text-[12px] leading-snug text-[#6e7b74]">{s.l}</div>
              </div>
            ))}
          </section>

          {/* Trust strip */}
          <section className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#e5e9e7] bg-[#e5e9e7] sm:grid-cols-2 lg:grid-cols-4">
            {TRUST.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 bg-white px-5 py-5">
                <Icon className="h-5 w-5 shrink-0 text-[#0a7c42]" strokeWidth={1.7} aria-hidden="true" />
                <span className="text-[13px] font-medium leading-snug text-[#3d4b44]">{label}</span>
              </div>
            ))}
          </section>

          {/* What we help fund (use-cases -> intent pages) */}
          <section className="mt-16">
            <h2 className="text-2xl font-extrabold text-[#10251b]">What we can help fund</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#3d4b44]">
              Whatever the reason for borrowing, the enquiry is the same one minute. Pick the closest fit to read the
              detail, or just start the form above and we&apos;ll point you to the lenders that suit.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PRODUCTS.map(({ icon: Icon, title, desc, href }) => (
                <Link key={href} href={href} className="nw-card nw-card-hover group flex flex-col rounded-2xl p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f3ec]">
                    <Icon className="h-5 w-5 text-[#0a7c42]" strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-extrabold text-[#10251b] group-hover:text-[#0a7c42]">{title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#3d4b44]">{desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a7c42]">
                    Read more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Lenders compared */}
          <section id="lenders" className="mt-16 scroll-mt-24">
            <h2 className="text-2xl font-extrabold text-[#10251b]">Compare {LENDERS.length} Australian business lenders</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#3d4b44]">
              Browse the lenders we compare, then open one for the full detail or get matched to the ones that fit through
              the enquiry above. No partnership or paid placement: each is submitted individually and assessed on its own
              criteria.
            </p>
            <div className="mt-6">
              <LenderCards />
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

          {/* Full side-by-side comparison table */}
          <section className="mt-16">
            <h2 className="text-2xl font-extrabold text-[#10251b]">Side-by-side comparison</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#3d4b44]">
              The full detail on every lender we compare, in one table. Refer Labs has no partnership, panel arrangement or
              accreditation with any of them: each enquiry is submitted individually and the lender decides on its own criteria.
            </p>
            <div className="mt-6">
              <LenderTable caption="Australian business lenders compared by Refer Labs" />
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
            <Link href="/equipment-finance-instant-asset-write-off" className="font-semibold text-[#0a7c42] hover:text-[#086536]">Equipment finance &amp; the write-off</Link>
            <Link href="/how-we-make-money" className="font-semibold text-[#6e7b74] hover:text-[#10251b]">How we make money</Link>
          </section>
        </div>
      </main>
    </ConsumerShell>
  );
}
