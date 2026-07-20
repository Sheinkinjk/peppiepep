import Link from "next/link";
import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";

const URL = `${SITE_URL}/equipment-finance-instant-asset-write-off`;

export const metadata = generateSEOMetadata({
  title: "Equipment Finance & the Instant Asset Write-Off (Australia) | Refer Labs",
  description:
    "How equipment finance works alongside the instant asset write-off in Australia: chattel mortgage vs lease, what you can claim, and why the threshold changes. General information, not tax advice.",
  url: URL,
  keywords: [
    "equipment finance australia",
    "instant asset write-off equipment finance",
    "chattel mortgage vs lease",
    "asset finance australia",
  ],
});

const faqs = [
  {
    q: "Can I use the instant asset write-off if I finance the equipment?",
    a: "Generally yes. With a chattel mortgage you typically own the asset from day one, so it can be eligible for the write-off in the year it's first used or installed, even though you're paying it off over time. The rules and thresholds change year to year, so confirm your eligibility with your accountant or the ATO before relying on it.",
  },
  {
    q: "What's the difference between a chattel mortgage and a lease?",
    a: "With a chattel mortgage you own the asset and borrow against it, so it sits on your balance sheet and you may claim depreciation and the interest portion. With a finance lease the financier owns the asset and you pay to use it, claiming the lease payments instead. Which is better depends on your tax position and cash flow, so it's an accountant question.",
  },
  {
    q: "What's the current write-off threshold?",
    a: "It changes with each federal budget and has been set at different levels in different years. Rather than quote a figure that may be out of date, check the current threshold and eligibility on the ATO website or with your accountant.",
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
    { "@type": "ListItem", position: 3, name: "Equipment finance & the write-off", item: URL },
  ],
};
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Equipment finance and the instant asset write-off",
  url: URL,
  dateModified: "2026-07",
  author: { "@type": "Organization", name: "Refer Labs" },
  publisher: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
};

export default function EquipmentFinanceGuide() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <nav className="text-xs text-[#6e7b74]">
          <Link href="/business-loans" className="hover:text-[#0a7c42]">Business loans</Link>
          <span className="px-1.5">/</span>
          <span className="text-[#3d4b44]">Equipment finance & the write-off</span>
        </nav>

        <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] text-[#10251b]">Equipment finance and the instant asset write-off</h1>

        <p className="mt-4 text-lg leading-relaxed text-[#3d4b44]">
          Equipment finance lets a business acquire vehicles, machinery or fit-out and pay for it over time instead of up
          front. The instant asset write-off is a separate tax measure that lets eligible businesses deduct the cost of a
          qualifying asset sooner rather than depreciating it over years. The two often work together, but the tax rules
          change regularly, so treat the numbers as an accountant question, not a settled figure.
        </p>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
          This is general information, not tax or financial advice. Thresholds and eligibility for the instant asset
          write-off change year to year. Confirm the current position with the ATO or a registered tax agent.
        </div>

        <Section h="How equipment finance is usually structured">
          <p>
            <strong className="text-[#10251b]">Chattel mortgage.</strong> You own the asset from the start and the financier
            takes security over it. It sits on your balance sheet, and you may be able to claim depreciation and the
            interest portion of repayments. This is the structure most often paired with the write-off.
          </p>
          <p>
            <strong className="text-[#10251b]">Finance lease.</strong> The financier owns the asset and you pay to use it,
            usually claiming the lease payments as a deduction rather than depreciation. Ownership may transfer at the end
            depending on the contract.
          </p>
          <p>
            <strong className="text-[#10251b]">Rental / operating lease.</strong> Closest to renting: you use the asset, hand
            it back at the end, and typically deduct the rental payments. No write-off, because you never own it.
          </p>
        </Section>

        <Section h="Where the write-off fits">
          <p>
            When you buy an asset outright or via a chattel mortgage, it can be eligible for the instant asset write-off in
            the year it&apos;s first used or installed ready for use, provided it meets the current rules. Financing the
            purchase doesn&apos;t generally remove that eligibility, because you own the asset, even though the cash leaves
            your account over the loan term. That combination, deduct now, pay over time, is why the two are so often
            discussed together. The catch is entirely in the detail: the threshold, whether your business turnover
            qualifies, and timing all change, so the deduction you&apos;re counting on has to be confirmed for the specific
            financial year.
          </p>
        </Section>

        <Section h="Before you commit">
          <ul className="space-y-2">
            {[
              "Ask your accountant which structure suits your tax position before you sign, not after.",
              "Confirm the current write-off threshold and eligibility for the relevant financial year with the ATO.",
              "Compare the total cost of the finance in dollars, the same way you would any business loan.",
              "Check the balloon or residual payment on leases and chattel mortgages, if any.",
            ].map((x) => (
              <li key={x} className="flex gap-2.5 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a7c42]" aria-hidden="true" />{x}
              </li>
            ))}
          </ul>
        </Section>

        <div className="mt-10 rounded-2xl border p-6" style={{ borderColor: "#0a7c4240", background: "#0a7c4208" }}>
          <h2 className="text-xl font-extrabold text-[#10251b]">Looking at equipment finance?</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">
            Tell us what you need. A person will talk you through the lenders that fund equipment and asset finance.
          </p>
          <div className="mt-4">
            <Link href="/business-loans#enquire" className="inline-flex items-center rounded-xl px-5 py-3 text-sm font-bold text-white shadow-md hover:-translate-y-0.5" style={{ background: "#0a7c42", boxShadow: "0 8px 24px #0a7c4225" }}>Check my options</Link>
          </div>
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

function Section({ h, children }: { h: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-extrabold text-[#10251b]">{h}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-[#3d4b44]">{children}</div>
    </section>
  );
}
