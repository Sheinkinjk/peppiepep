import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLender } from "@/lib/lenders";
import { label } from "@/lib/lending-schema";
import LenderLogo from "./LenderLogo";
import CommissionDisclosure from "./CommissionDisclosure";
import LeadForm from "./LeadForm";
import type { LenderComparison } from "@/lib/lender-comparisons";

const money = (n: number) => `$${n.toLocaleString("en-AU")}`;

/**
 * Head-to-head lender comparison. Renders from the two lender configs (accurate,
 * single-source figures) plus the unique lead/verdict copy in the comparison
 * registry. Funnels to the enquiry form, and to each lender's own page.
 */
export default function LenderVersus({ cfg }: { cfg: LenderComparison }) {
  const a = getLender(cfg.a);
  const b = getLender(cfg.b);
  if (!a || !b) return null;

  const rows: { k: string; a: string; b: string }[] = [
    { k: "Advertised rate from", a: a.advertisedRateFrom, b: b.advertisedRateFrom },
    { k: "Loan size", a: `${money(a.minAmount)} – ${money(a.maxAmount)}`, b: `${money(b.minAmount)} – ${money(b.maxAmount)}` },
    { k: "Typical speed", a: a.speed, b: b.speed },
    { k: "Products", a: a.products.map((p) => label(p)).join(", "), b: b.products.map((p) => label(p)).join(", ") },
    { k: "AFIA Code signatory", a: a.afiaCodeSignatory ? "Yes" : "Not listed", b: b.afiaCodeSignatory ? "Yes" : "Not listed" },
  ];

  const Card = ({ l }: { l: NonNullable<ReturnType<typeof getLender>> }) => (
    <div className="rounded-2xl border border-[#ded8cd] bg-white p-6">
      <div className="flex items-center gap-3">
        <LenderLogo src={l.logo} name={l.name} size={40} className="rounded-xl ring-1 ring-[#f1ede4]" />
        <h3 className="text-lg font-extrabold text-[#14120f]">{l.name}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[#56504a]">{l.overview}</p>
      <Link href={`/business-loans/${l.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#007a95] hover:text-[#003647]">
        See {l.name} in full <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );

  return (
    <main className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#56504a]">
        <Link href="/" className="hover:text-[#007a95]">Refer Labs</Link>
        <span>/</span>
        <Link href="/business-loans" className="hover:text-[#007a95]">Business loans</Link>
        <span>/</span>
        <span className="text-[#14120f]">{a.name} vs {b.name}</span>
      </nav>

      <h1 className="text-4xl font-black leading-[1.05] tracking-[-0.02em] text-[#14120f] sm:text-5xl">
        {a.name} vs {b.name}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#56504a]">{cfg.lead}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Card l={a} />
        <Card l={b} />
      </div>

      {/* Data comparison */}
      <section className="mt-12">
        <h2 className="text-2xl font-extrabold text-[#14120f]">Side by side</h2>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ded8cd]">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#f7f4ee] text-[11px] font-bold uppercase tracking-[0.08em] text-[#56504a]">
                <th scope="col" className="px-4 py-3">&nbsp;</th>
                <th scope="col" className="px-4 py-3">{a.name}</th>
                <th scope="col" className="px-4 py-3">{b.name}</th>
              </tr>
            </thead>
            <tbody className="text-[#56504a]">
              {rows.map((r) => (
                <tr key={r.k} className="border-t border-[#f1ede4]">
                  <th scope="row" className="px-4 py-3 font-semibold text-[#14120f]">{r.k}</th>
                  <td className="px-4 py-3">{r.a}</td>
                  <td className="px-4 py-3">{r.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[#56504a]">
          Advertised figures from each lender&apos;s own site, indicative only and not a quote. Your rate and limit depend
          on the lender&apos;s assessment of your business.
        </p>
      </section>

      {/* Verdict */}
      <section className="mt-12 rounded-2xl border border-[#007a95]/20 bg-[#007a95]/[0.05] p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-[#14120f]">The verdict</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-[#14120f]">{cfg.verdict}</p>
      </section>

      {/* Enquiry */}
      <section className="mt-12">
        <h2 className="text-2xl font-extrabold text-[#14120f]">Check which one fits your business</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#56504a]">
          One short enquiry and a person will tell you which of {a.name}, {b.name} and the other lenders we compare your
          business plausibly fits. Free, no documents, and enquiring won&apos;t affect your credit score.
        </p>
        <div id="enquire" className="mt-6 max-w-2xl scroll-mt-24">
          <LeadForm sourcePage={`/compare-business-lenders/${cfg.slug}`} />
          <div className="mt-4"><CommissionDisclosure variant="inline" /></div>
        </div>
      </section>

      {/* Related */}
      <section className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#f1ede4] pt-8 text-sm">
        <Link href="/business-loans" className="font-semibold text-[#007a95] hover:text-[#003647]">Compare all business lenders</Link>
        <Link href={`/business-loans/${a.slug}/review`} className="font-semibold text-[#007a95] hover:text-[#003647]">{a.name} review</Link>
        <Link href={`/business-loans/${b.slug}/review`} className="font-semibold text-[#007a95] hover:text-[#003647]">{b.name} review</Link>
        <Link href="/true-cost-of-business-loans-australia" className="font-semibold text-[#56504a] hover:text-[#14120f]">The real cost of a business loan</Link>
      </section>
    </main>
  );
}
