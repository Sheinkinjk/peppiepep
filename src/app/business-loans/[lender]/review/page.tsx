import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import LeadForm from "@/components/lending/LeadForm";
import CommissionDisclosure from "@/components/lending/CommissionDisclosure";
import { LENDERS, getLender, type Lender } from "@/lib/lenders";
import { label } from "@/lib/lending-schema";

const money = (n: number) => `$${n.toLocaleString("en-AU")}`;

export function generateStaticParams() {
  return LENDERS.map((l) => ({ lender: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lender: string }> }): Promise<Metadata> {
  const { lender: slug } = await params;
  const l = getLender(slug);
  if (!l) return {};
  return generateSEOMetadata({
    title: `${l.name} Review 2026: Who It Suits, Loan Sizes & What to Check (Australia) | Refer Labs`,
    description: `An independent look at ${l.name} for Australian business borrowers: what they fund (${money(l.minAmount)}–${money(l.maxAmount)}), typical speed, and what to check before you apply. No paid rankings.`,
    url: `${SITE_URL}/business-loans/${l.slug}/review`,
    keywords: [`${l.name.toLowerCase()} review`, `${l.name.toLowerCase()} business loan review`, "business lender review australia"],
  });
}

// Editorial framing DERIVED from the config numbers — not fabricated claims or ratings.
function suitsWho(l: Lender): string[] {
  const out: string[] = [];
  if (l.maxAmount >= 500000) out.push(`Businesses wanting a larger facility — ${l.name} funds up to ${money(l.maxAmount)}.`);
  if (l.minAmount <= 5000) out.push(`Smaller top-ups: the ${money(l.minAmount)} minimum suits modest borrowing.`);
  if (l.products.includes("line_of_credit")) out.push("Businesses that want revolving access rather than a single lump sum, via the line of credit.");
  if (/same-day|24/i.test(l.speed)) out.push(`Time-sensitive needs, given a typical turnaround of ${l.speed.toLowerCase()}.`);
  if (out.length === 0) out.push(`Businesses whose borrowing sits inside ${l.name}'s ${money(l.minAmount)}–${money(l.maxAmount)} range.`);
  return out;
}

function whatToCheck(l: Lender): string[] {
  return [
    `The ${l.advertisedRateFrom} figure is an advertised "from" rate (as at ${l.rateAsAt}), not a quote. Ask ${l.name} for the rate and fees for your specific situation.`,
    "Unsecured business finance usually costs more than a secured bank loan. Compare the total cost of the loan, not just the headline rate.",
    "Confirm the loan term, repayment frequency, and any establishment or early-repayment fees before you sign.",
    l.afiaCodeSignatory
      ? `${l.name} is listed as an AFIA Online Small Business Lender Code signatory, which sets conduct and disclosure standards. It is still worth reading the contract in full.`
      : `Check whether ${l.name} subscribes to an industry code of practice and what disclosure you are entitled to.`,
  ];
}

export default async function LenderReviewPage({ params }: { params: Promise<{ lender: string }> }) {
  const { lender: slug } = await params;
  const l = getLender(slug);
  if (!l) notFound();

  const url = `${SITE_URL}/business-loans/${l.slug}/review`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Business Loans", item: `${SITE_URL}/business-loans` },
      { "@type": "ListItem", position: 3, name: l.name, item: `${SITE_URL}/business-loans/${l.slug}` },
      { "@type": "ListItem", position: 4, name: "Review", item: url },
    ],
  };
  // A factual Article, deliberately WITHOUT an aggregateRating — we never publish our own star ratings.
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${l.name} review: who it suits and what to check`,
    about: l.name,
    url,
    dateModified: l.rateAsAt,
    author: { "@type": "Organization", name: "Refer Labs" },
    publisher: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  };

  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <nav className="text-xs text-[#6e7b74]">
          <Link href="/business-loans" className="hover:text-[#0a7c42]">Business loans</Link>
          <span className="px-1.5">/</span>
          <Link href={`/business-loans/${l.slug}`} className="hover:text-[#0a7c42]">{l.name}</Link>
          <span className="px-1.5">/</span>
          <span className="text-[#3d4b44]">Review</span>
        </nav>

        <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] text-[#10251b]">{l.name} review</h1>
        <p className="mt-4 text-lg leading-relaxed text-[#3d4b44]">{l.overview}</p>
        <p className="mt-3 text-sm leading-relaxed text-[#6e7b74]">
          This is an independent overview to help you decide whether to enquire. We don&apos;t publish our own star
          ratings, and no lender can pay to be framed more favourably.
        </p>

        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-[#10251b]">Who {l.name} tends to suit</h2>
          <ul className="mt-4 space-y-2.5">
            {suitsWho(l).map((s) => (
              <li key={s} className="flex gap-2.5 text-sm leading-relaxed text-[#3d4b44]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a7c42]" aria-hidden="true" />{s}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-[#10251b]">What to check before you apply</h2>
          <ul className="mt-4 space-y-2.5">
            {whatToCheck(l).map((s) => (
              <li key={s} className="flex gap-2.5 text-sm leading-relaxed text-[#3d4b44]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a7c42]" aria-hidden="true" />{s}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border border-[#e5e9e7] bg-[#f8faf9] p-5">
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-[#9aa39c]">The facts</h2>
          <div className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            <p className="text-[#3d4b44]"><span className="text-[#6e7b74]">Advertised from:</span> <strong className="text-[#10251b]">{l.advertisedRateFrom}</strong></p>
            <p className="text-[#3d4b44]"><span className="text-[#6e7b74]">Loan size:</span> <strong className="text-[#10251b]">{money(l.minAmount)}–{money(l.maxAmount)}</strong></p>
            <p className="text-[#3d4b44]"><span className="text-[#6e7b74]">Typical speed:</span> <strong className="text-[#10251b]">{l.speed}</strong></p>
            <p className="text-[#3d4b44]"><span className="text-[#6e7b74]">Products:</span> <strong className="text-[#10251b]">{l.products.map((p) => label(p)).join(", ")}</strong></p>
          </div>
          <p className="mt-3 text-xs text-[#6e7b74]">
            Verify current terms on <a href={l.homepage} target="_blank" rel="nofollow noopener" className="underline hover:text-[#10251b]">{l.name}&apos;s own site</a>.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-extrabold text-[#10251b]">See if {l.name} fits your business</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">
            One short enquiry. We&apos;ll tell you whether {l.name} looks like a plausible fit and introduce you if it is.
          </p>
          <div className="mt-5">
            <LeadForm sourcePage={`/business-loans/${l.slug}/review`} />
          </div>
          <div className="mt-4">
            <CommissionDisclosure variant="inline" />
          </div>
        </section>
      </main>
    </ConsumerShell>
  );
}
