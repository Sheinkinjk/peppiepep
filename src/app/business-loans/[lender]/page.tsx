import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import LeadForm from "@/components/lending/LeadForm";
import CommissionDisclosure from "@/components/lending/CommissionDisclosure";
import { LENDERS, getLender, hasHeadlineRate, type Lender } from "@/lib/lenders";
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
    title: `${l.name} Business Loans: Rates, Loan Sizes & How to Apply (Australia) | Refer Labs`,
    description: `Compare ${l.name} business loans: loan sizes, funding speed, rates and eligibility. Check whether ${l.name} fits your business in one short enquiry with Refer Labs.`,
    url: `${SITE_URL}/business-loans/${l.slug}`,
    keywords: [`${l.name.toLowerCase()} business loan`, `${l.name.toLowerCase()} review`, "business loans australia"],
  });
}

function facts(l: Lender): { k: string; v: string }[] {
  const rows: { k: string; v: string }[] = [
    { k: "Rate", v: hasHeadlineRate(l) ? `${l.advertisedRateFrom} (as at ${l.rateAsAt})` : `${l.advertisedRateFrom} — priced per loan` },
    { k: "Loan size", v: `${money(l.minAmount)} – ${money(l.maxAmount)}` },
    { k: "Typical speed", v: l.speed },
    { k: "Products", v: l.products.map((p) => label(p)).join(", ") },
  ];
  if (l.establishmentFee) rows.push({ k: "Establishment fee", v: l.establishmentFee });
  rows.push({ k: "Industry code", v: l.afiaCodeSignatory ? "AFIA Online Small Business Lender Code signatory" : "Not listed" });
  return rows;
}

export default async function LenderPage({ params }: { params: Promise<{ lender: string }> }) {
  const { lender: slug } = await params;
  const l = getLender(slug);
  if (!l) notFound();

  const url = `${SITE_URL}/business-loans/${l.slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Business Loans", item: `${SITE_URL}/business-loans` },
      { "@type": "ListItem", position: 3, name: l.name, item: url },
    ],
  };
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${l.name} business loans`,
    url,
    description: l.overview,
    publisher: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  };

  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <nav className="text-xs text-[#6e7b74]">
          <Link href="/business-loans" className="hover:text-[#0a7c42]">Business loans</Link>
          <span className="px-1.5">/</span>
          <span className="text-[#3d4b44]">{l.name}</span>
        </nav>

        <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] text-[#10251b] sm:text-5xl">{l.name} business loans</h1>
        {/* First 100 words answer the query directly for AEO/GEO. */}
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#3d4b44]">{l.overview}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#6e7b74]">
          Refer Labs is an independent referrer, not {l.name} and not a lender. If {l.name} fits what you need, we can
          introduce your enquiry to them; they assess it and make any offer directly to you. Using us is free.
        </p>

        {/* Key facts */}
        <section className="mt-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-[#9aa39c]">{l.name} at a glance</h2>
          <dl className="mt-4 overflow-hidden rounded-2xl border border-[#e5e9e7]">
            {facts(l).map((f, i) => (
              <div key={f.k} className={`grid grid-cols-[160px_1fr] gap-4 px-4 py-3 sm:grid-cols-[220px_1fr] ${i % 2 ? "bg-[#f8faf9]" : "bg-white"}`}>
                <dt className="text-sm text-[#6e7b74]">{f.k}</dt>
                <dd className="text-sm font-medium text-[#10251b]">{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-xs text-[#6e7b74]">
            Figures are {l.name}&apos;s advertised terms and can change. Verify current rates and eligibility on{" "}
            <a href={l.homepage} target="_blank" rel="nofollow noopener" className="underline hover:text-[#10251b]">{l.name}&apos;s own site</a>.
          </p>
        </section>

        {/* CTA + form */}
        <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <h2 className="text-2xl font-extrabold text-[#10251b]">Check whether {l.name} fits</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">
              Tell us what you need. We&apos;ll tell you whether {l.name} looks like a plausible fit, and which
              other panel lenders might suit better. One short form, no documents.
            </p>
            <div className="mt-5">
              <LeadForm sourcePage={`/business-loans/${l.slug}`} />
            </div>
          </div>
          <aside className="space-y-4">
            <div className="rounded-2xl border border-[#e5e9e7] bg-[#f8faf9] p-5 text-sm leading-relaxed text-[#3d4b44]">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9aa39c]">Read next</h3>
              <ul className="mt-3 space-y-2">
                <li><Link href={`/business-loans/${l.slug}/review`} className="font-semibold text-[#0a7c42] hover:text-[#086536]">{l.name} review</Link></li>
                <li><Link href="/business-loans" className="font-semibold text-[#0a7c42] hover:text-[#086536]">Compare the whole panel</Link></li>
                <li><Link href="/what-a-business-loan-actually-costs" className="font-semibold text-[#0a7c42] hover:text-[#086536]">What a business loan actually costs</Link></li>
              </ul>
            </div>
            <CommissionDisclosure />
          </aside>
        </section>
      </main>
    </ConsumerShell>
  );
}
