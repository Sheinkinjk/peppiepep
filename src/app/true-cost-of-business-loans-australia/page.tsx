import Link from "next/link";
import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";

const URL = `${SITE_URL}/true-cost-of-business-loans-australia`;

export const metadata = generateSEOMetadata({
  title: "The Hidden Cost of Factor Rates: What Business Loans Really Cost (Australia 2026 Analysis) | Refer Labs",
  description:
    "A 1.2 factor-rate business loan costs about 35% a year, not 20%, and 66% over six months. Our analysis converts common factor rates into their true annual cost, with the method shown in full.",
  url: URL,
  keywords: [
    "factor rate vs interest rate",
    "true cost of a business loan australia",
    "business loan factor rate calculator",
    "what does a factor rate mean",
    "business loan effective interest rate",
  ],
});

// ── The analysis: convert a factor rate to its effective annual rate ──────────
// A factor-rate loan advances P and is repaid as P × factor in equal monthly
// instalments over the term. The effective rate is the internal rate of return of
// that cash flow, annualised as a nominal rate (periodic rate × 12) the same way an
// Australian comparison rate is (National Consumer Credit Protection Regs reg 71).
// Computed here, not asserted, so every figure in the table is reproducible.
function effectiveFromFactor(factor: number, months: number): number {
  const pay = factor / months; // repayment per $1 borrowed, per month
  const pv = (i: number) => (i === 0 ? pay * months : (pay * (1 - Math.pow(1 + i, -months))) / i);
  if (pv(0) < 1) return 0;
  let lo = 0, hi = 3;
  for (let k = 0; k < 200; k++) {
    const mid = (lo + hi) / 2;
    if (pv(mid) > 1) lo = mid; else hi = mid;
  }
  return ((lo + hi) / 2) * 12 * 100; // nominal annual %, comparison-rate convention
}

const FACTORS = [1.1, 1.15, 1.2, 1.25, 1.3];
const TERMS = [6, 12, 18, 24];
const pct = (n: number) => `${n.toFixed(1)}%`;

const faqs = [
  {
    q: "What is a factor rate on a business loan?",
    a: "A factor rate is a fixed multiplier on the amount you borrow, not an annual interest rate. A 1.2 factor rate means you repay 1.2 times what you borrowed: borrow $50,000 and you repay $60,000 in total, regardless of how quickly you pay it down. Because it isn't annualised, it looks smaller than the real yearly cost.",
  },
  {
    q: "How do you convert a factor rate to an interest rate?",
    a: "You calculate the effective rate the same way an Australian comparison rate is calculated: find the rate at which the amount borrowed equals the present value of the repayments, then annualise it. For a loan repaid in equal instalments, a 1.2 factor rate over 12 months works out to about 35% a year, and about 66% over six months, because the shorter the term, the faster you repay and the higher the annualised cost.",
  },
  {
    q: "Why does the same factor rate cost more over a shorter term?",
    a: "Because you repay the same total (factor × principal) in less time, so the money is outstanding for a shorter period at a much higher effective annual rate. A 1.2 factor rate is about 18% a year over 24 months but about 66% over six months, for the same total dollars repaid.",
  },
  {
    q: "Are factor rates a scam?",
    a: "No, they are a legitimate pricing model, common on short-term and merchant cash advance products. The issue is comparability: a factor rate isn't an annual rate, so it can't be compared like for like against a bank's advertised percentage. The fix is to convert it, or to compare loans on the total dollars repaid over the full term.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: URL,
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Business Loans", item: `${SITE_URL}/business-loans` },
    { "@type": "ListItem", position: 3, name: "The hidden cost of factor rates", item: URL },
  ],
};
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The hidden cost of factor rates: what business loans really cost in Australia",
  url: URL,
  dateModified: "2026-07-20",
  author: { "@type": "Organization", name: "Refer Labs" },
  publisher: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
};

export default function FactorRateStudy() {
  const e12 = effectiveFromFactor(1.2, 12);
  const e6 = effectiveFromFactor(1.2, 6);

  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <nav className="text-xs text-[#6e7b74]">
          <Link href="/business-loans" className="hover:text-[#0a7c42]">Business loans</Link>
          <span className="px-1.5">/</span>
          <span className="text-[#3d4b44]">The hidden cost of factor rates</span>
        </nav>

        <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-[#10251b]">
          The hidden cost of factor rates: what a business loan really costs
        </h1>

        {/* First 100 words: the finding, citable */}
        <p className="mt-5 text-lg leading-relaxed text-[#3d4b44]">
          A &ldquo;1.2 factor rate&rdquo; is a 20% markup on what you borrow, and quoted that way it sounds modest. The
          catch is that a factor rate is not an annual rate. Over twelve months that same 1.2 works out to about{" "}
          <strong className="text-[#10251b]">{pct(e12)} a year</strong>, and over six months to about{" "}
          <strong className="text-[#10251b]">{pct(e6)}</strong>, for the same total dollars either way. We took the factor
          rates Australian small businesses are commonly quoted and worked out the annual cost they actually carry, with
          the method shown in full so you can check every figure.
        </p>

        {/* Key findings */}
        <div className="mt-8 rounded-2xl border p-6" style={{ borderColor: "#0a7c4240", background: "#0a7c4208" }}>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0a7c42]">Key findings</p>
          <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-[#10251b]">
            {[
              `A 1.2 factor rate equals roughly ${pct(e12)} a year over 12 months, not the 20% the multiplier implies.`,
              `The same 1.2 factor rate costs about ${pct(e6)} a year if the loan is repaid over six months.`,
              "The shorter the term, the more a factor rate understates the true annual cost, because the money is repaid faster.",
              "A factor rate cannot be compared like for like against a bank's advertised annual rate without converting it first.",
            ].map((f) => (
              <li key={f} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a7c42]" aria-hidden="true" />{f}
              </li>
            ))}
          </ul>
        </div>

        <Section h="What a factor rate actually is">
          <p>
            A factor rate is a fixed multiplier on the amount borrowed, not an annual percentage. Borrow $50,000 at a 1.2
            factor and you repay $60,000 in total, no matter how fast you clear it. You will see it on short-term business
            loans and merchant cash advances, usually written as a small number, 1.1, 1.2, 1.3, because that reads more
            gently than the annual cost it works out to.
          </p>
          <p>
            A 1.2 factor rate and a bank&apos;s &ldquo;12.9% p.a.&rdquo; sit on different scales, so lining them up next to
            each other tells you nothing on its own. You have to convert the factor rate into an annual figure first, which
            is what the rest of this page does.
          </p>
        </Section>

        <Section h="The analysis: factor rates converted to their true annual cost">
          <p>
            The table below converts each factor rate into its effective annual rate, for a loan repaid in equal monthly
            instalments over the term shown. Read down a column to see how the same factor rate costs far more over a
            shorter term.
          </p>
          <div className="my-5 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Effective annual rate by factor rate and loan term</caption>
              <thead>
                <tr className="bg-[#f8faf9] text-[11px] font-bold uppercase tracking-[0.08em] text-[#6e7b74]">
                  <th scope="col" className="px-4 py-3">Factor rate</th>
                  {TERMS.map((t) => <th key={t} scope="col" className="px-4 py-3 text-right">{t} months</th>)}
                </tr>
              </thead>
              <tbody className="text-[#3d4b44]">
                {FACTORS.map((f) => (
                  <tr key={f} className="border-t border-[#eef1ef]">
                    <th scope="row" className="px-4 py-3 font-semibold text-[#10251b]">{f.toFixed(2)}</th>
                    {TERMS.map((t) => (
                      <td key={t} className="px-4 py-3 text-right tabular-nums">{pct(effectiveFromFactor(f, t))}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[#6e7b74]">
            Effective annual rate (nominal, comparison-rate convention). Figures assume equal monthly repayments and no
            additional fees; real products often add establishment or ongoing fees, which push the true cost higher still.
          </p>
        </Section>

        <Section h="A worked example">
          <p>
            Take a $50,000 loan at a 1.2 factor rate over 12 months. You repay $60,000 in total, so the cost of the finance
            is $10,000. Because that $10,000 is paid on a balance that shrinks as you repay, the effective annual rate is
            about <strong className="text-[#10251b]">{pct(e12)}</strong>, not 20%. Compress the same loan into six months
            and the effective rate roughly doubles to about <strong className="text-[#10251b]">{pct(e6)}</strong>, even
            though the total dollars repaid are identical, because you have the money for half as long.
          </p>
        </Section>

        <Section h="What this means if you're borrowing">
          <ul className="space-y-2">
            {[
              "Convert any factor rate before you compare it. A factor rate next to a bank's annual rate is not a like-for-like comparison.",
              "Ask for the total dollars repaid over the full term. That single figure exposes the cost no percentage games can hide.",
              "Watch the term. A short repayment period makes a modest-looking factor rate very expensive in annual terms.",
              "Add the fees. Establishment and ongoing fees sit on top of the factor rate and lift the true cost further.",
            ].map((x) => (
              <li key={x} className="flex gap-2.5 text-[15px] leading-relaxed text-[#3d4b44]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a7c42]" aria-hidden="true" />{x}
              </li>
            ))}
          </ul>
        </Section>

        <Section h="Methodology">
          <p>
            For each factor rate and term, we model a loan that advances the principal and is repaid in equal monthly
            instalments totalling the principal multiplied by the factor rate. The effective rate is the monthly internal
            rate of return that sets the present value of those repayments equal to the amount borrowed, annualised as a
            nominal rate (the monthly rate multiplied by twelve). This mirrors how an Australian comparison rate is
            calculated under the National Consumer Credit Protection Regulations. The figures assume no fees; adding
            establishment or ongoing fees would raise the effective rate. The table is generated from the formula in this
            page&apos;s source, so every number is reproducible.
          </p>
        </Section>

        <div className="mt-10 rounded-2xl border p-6" style={{ borderColor: "#0a7c4240", background: "#0a7c4208" }}>
          <h2 className="text-xl font-extrabold text-[#10251b]">Check a real quote against this</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">
            Enter a lender&apos;s rate and fees into our calculator to see the effective rate on your loan, then compare
            Australian lenders in one short enquiry.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/business-loan-calculator" className="inline-flex items-center rounded-xl border border-[#0a7c42] px-5 py-3 text-sm font-bold text-[#0a7c42] hover:bg-[#0a7c4210]">Open the calculator</Link>
            <Link href="/business-loans" className="inline-flex items-center rounded-xl px-5 py-3 text-sm font-bold text-white shadow-md hover:-translate-y-0.5" style={{ background: "#0a7c42", boxShadow: "0 8px 24px #0a7c4225" }}>Compare lenders</Link>
          </div>
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-extrabold text-[#10251b]">Common questions</h2>
          <dl className="mt-6 divide-y divide-[#eef1ef] border-t border-[#eef1ef]">
            {faqs.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-bold text-[#10251b]">{f.q}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="mt-10 text-xs leading-relaxed text-[#6e7b74]">
          This analysis is general information, not financial advice, and is provided so borrowers and journalists can
          reproduce the figures. You are welcome to cite it with a link to this page. Refer Labs is an independent
          referrer, not a lender. Read our{" "}
          <Link href="/how-we-research" className="underline hover:text-[#10251b]">editorial standards</Link>.
        </p>
      </main>
    </ConsumerShell>
  );
}

function Section({ h, children }: { h: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-extrabold text-[#10251b]">{h}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-[#3d4b44]">{children}</div>
    </section>
  );
}
