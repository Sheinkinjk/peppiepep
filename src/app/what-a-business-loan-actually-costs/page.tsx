import Link from "next/link";
import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";

const URL = `${SITE_URL}/what-a-business-loan-actually-costs`;

export const metadata = generateSEOMetadata({
  title: "What a Business Loan Actually Costs in Australia (2026 Guide) | Refer Labs",
  description:
    "Nominal rate, factor rate, fees and comparison rate explained plainly, with a worked example, so you can compare the true cost of an Australian business loan instead of the headline number.",
  url: URL,
  keywords: [
    "business loan cost australia",
    "business loan factor rate",
    "business loan comparison rate",
    "how much do business loans cost australia",
    "unsecured business loan cost",
  ],
});

const faqs = [
  {
    q: "What's the difference between a nominal rate and a factor rate?",
    a: "A nominal rate is an annual percentage applied to your reducing balance, like a normal loan. A factor rate is a fixed multiplier on the amount borrowed: borrow $50,000 at a 1.2 factor and you repay $60,000 regardless of how fast you pay it down. Factor-rate loans can look cheap but often work out to a much higher annualised cost, especially over short terms.",
  },
  {
    q: "What is a comparison rate?",
    a: "A comparison rate rolls the interest rate together with most standard fees into a single percentage, so you can compare loans on a like-for-like basis. Not every business lender publishes one. When they don't, ask for the total cost of the loan in dollars over the full term.",
  },
  {
    q: "Why are unsecured business loans more expensive?",
    a: "With no asset backing the loan, the lender takes on more risk if the business can't repay, and prices that risk into the rate. A secured loan against property or equipment is usually cheaper but puts that asset on the line.",
  },
  {
    q: "What fees should I ask about?",
    a: "Establishment or origination fees, ongoing or monthly account fees, early-repayment or break fees, and any direct-debit or dishonour fees. Ask for every fee in writing before you sign.",
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
    { "@type": "ListItem", position: 3, name: "What a business loan actually costs", item: URL },
  ],
};
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What a business loan actually costs in Australia",
  url: URL,
  dateModified: "2026-07-20",
  author: { "@type": "Organization", name: "Refer Labs" },
  publisher: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
};

export default function CostGuide() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <nav className="text-xs text-[#6e7b74]">
          <Link href="/business-loans" className="hover:text-[#0a7c42]">Business loans</Link>
          <span className="px-1.5">/</span>
          <span className="text-[#3d4b44]">What a business loan actually costs</span>
        </nav>

        <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] text-[#10251b]">What a business loan actually costs</h1>

        {/* First 100 words: direct answer for AEO/GEO. */}
        <p className="mt-4 text-lg leading-relaxed text-[#3d4b44]">
          The headline rate on a business loan rarely tells you the real cost. In Australia, business finance is priced
          three main ways: a nominal interest rate on a reducing balance, a fixed factor rate on the original amount, or a
          flat fee structure. On top of that sit establishment fees, ongoing fees and early-repayment fees. To compare two
          loans on a like-for-like basis, ignore the advertised percentage and ask one question of each lender: what is the total amount I
          will repay, in dollars, over the full term?
        </p>

        <Section h="The three ways business loans are priced">
          <p>
            <strong className="text-[#10251b]">Nominal interest rate.</strong> An annual percentage charged on your
            outstanding balance. As you repay principal, the interest portion shrinks. This is how most bank term loans and
            many online lenders quote.
          </p>
          <p>
            <strong className="text-[#10251b]">Factor rate.</strong> A multiplier on the amount borrowed. A $50,000 loan at
            a factor of 1.2 means you repay $60,000 in total, no matter how quickly you clear it. Factor rates are common on
            short-term and merchant cash advance products, and they can translate to a very high annualised cost.
          </p>
          <p>
            <strong className="text-[#10251b]">Flat or fixed fee.</strong> A set dollar cost for the finance, sometimes
            framed as &ldquo;cents in the dollar&rdquo;. As with factor rates, converting it to an annual figure is the only
            way to compare it against a normal rate.
          </p>
        </Section>

        <Section h="A worked example">
          <p>
            Say two lenders both offer you $50,000 for 12 months.
          </p>
          <div className="my-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#f8faf9] text-[11px] font-bold uppercase tracking-[0.08em] text-[#6e7b74]">
                  <th scope="col" className="px-4 py-3">Lender</th>
                  <th scope="col" className="px-4 py-3">How it&apos;s quoted</th>
                  <th scope="col" className="px-4 py-3">Total repaid</th>
                </tr>
              </thead>
              <tbody className="text-[#3d4b44]">
                <tr className="border-t border-[#eef1ef]">
                  <th scope="row" className="px-4 py-3 font-semibold text-[#10251b]">Lender A</th>
                  <td className="px-4 py-3">18% p.a. nominal + $500 establishment fee</td>
                  <td className="px-4 py-3 tabular-nums">≈ $55,500</td>
                </tr>
                <tr className="border-t border-[#eef1ef]">
                  <th scope="row" className="px-4 py-3 font-semibold text-[#10251b]">Lender B</th>
                  <td className="px-4 py-3">1.15 factor rate, &ldquo;no interest&rdquo;</td>
                  <td className="px-4 py-3 tabular-nums">$57,500</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[#6e7b74]">
            Illustrative figures only. Lender B&apos;s &ldquo;no interest&rdquo; pitch costs about $2,000 more here, even
            though it never quotes a percentage. The dollar total exposes the difference the headline hides.
          </p>
        </Section>

        <Section h="Secured vs unsecured">
          <p>
            A secured loan is backed by an asset such as property or equipment. Because the lender can recover the asset if
            you default, secured loans are usually cheaper, but you put that asset at risk. An unsecured loan needs no
            collateral and funds faster, which is why most online business lenders are unsecured, and why they cost more.
            Neither is &ldquo;better&rdquo; in the abstract; it depends on what you can offer and how quickly you need the money.
          </p>
        </Section>

        <Section h="Fees to ask about before you sign">
          <ul className="space-y-2">
            {[
              "Establishment / origination fee (one-off, sometimes 1–3% of the loan)",
              "Ongoing or monthly account-keeping fees",
              "Early-repayment or break fees, if you clear it ahead of schedule",
              "Direct-debit and dishonour fees",
            ].map((x) => (
              <li key={x} className="flex gap-2.5 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a7c42]" aria-hidden="true" />{x}
              </li>
            ))}
          </ul>
        </Section>

        <div className="mt-10 rounded-2xl border p-6" style={{ borderColor: "#0a7c4240", background: "#0a7c4208" }}>
          <h2 className="text-xl font-extrabold text-[#10251b]">Compare on the dollar total, then enquire</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">
            Use the calculator to sanity-check a quote, then let a person walk you through the lenders that fit.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/business-loan-calculator" className="inline-flex items-center rounded-xl border border-[#0a7c42] px-5 py-3 text-sm font-bold text-[#0a7c42] hover:bg-[#0a7c4210]">Open the calculator</Link>
            <Link href="/business-loans#enquire" className="inline-flex items-center rounded-xl px-5 py-3 text-sm font-bold text-white shadow-md hover:-translate-y-0.5" style={{ background: "#0a7c42", boxShadow: "0 8px 24px #0a7c4225" }}>Check my options</Link>
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
