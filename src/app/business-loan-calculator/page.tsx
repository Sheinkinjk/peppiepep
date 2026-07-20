import Link from "next/link";
import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import RepaymentCalculator from "@/components/lending/RepaymentCalculator";

const URL = `${SITE_URL}/business-loan-calculator`;

export const metadata = generateSEOMetadata({
  title: "Business Loan Repayment Calculator (Australia) | Refer Labs",
  description:
    "Estimate monthly repayments and total interest on a business loan. Free, no sign-up. Nominal amortised estimates only — see how fees and factor rates change the real cost before you borrow.",
  url: URL,
  keywords: ["business loan calculator australia", "business loan repayment calculator", "loan repayment estimate australia"],
});

const faqs = [
  {
    q: "Is this the real cost of the loan?",
    a: "No. It shows nominal amortised repayments based on the rate and term you enter. It does not include establishment fees, ongoing fees, or factor-rate pricing, which many business lenders use. The true cost is usually higher, so always ask the lender for the total cost of the loan in dollars.",
  },
  {
    q: "What rate should I put in?",
    a: "If you have a quote, use its nominal annual rate. If you are just exploring, the advertised 'from' rates on our panel are a starting point, but your actual rate depends on the lender's assessment of your business.",
  },
  {
    q: "Does using this involve a credit check?",
    a: "No. The calculator runs entirely in your browser. Nothing is submitted and no credit check happens unless you choose to make a full application to a lender.",
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
    { "@type": "ListItem", position: 3, name: "Repayment Calculator", item: URL },
  ],
};

export default function CalculatorPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <nav className="text-xs text-[#6e7b74]">
          <Link href="/business-loans" className="hover:text-[#0a7c42]">Business loans</Link>
          <span className="px-1.5">/</span>
          <span className="text-[#3d4b44]">Repayment calculator</span>
        </nav>

        <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] text-[#10251b]">Business loan repayment calculator</h1>
        <p className="mt-4 text-lg leading-relaxed text-[#3d4b44]">
          Enter an amount, a nominal rate and a term to estimate monthly repayments and total interest. It runs in your
          browser, involves no sign-up and no credit check. Treat the result as a starting point, not a quote.
        </p>

        <div className="mt-8">
          <RepaymentCalculator />
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-extrabold text-[#10251b]">Questions</h2>
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
