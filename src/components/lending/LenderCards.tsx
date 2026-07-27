import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck } from "lucide-react";
import { LENDERS, ratesAsAt, type Lender } from "@/lib/lenders";
import LenderLogo from "./LenderLogo";
import { label } from "@/lib/lending-schema";

const money = (n: number) => `$${n.toLocaleString("en-AU")}`;

/**
 * Logo-forward lender cards for the hub. This is the primary, prominent way lenders
 * are presented (NerdWallet-style): a scannable grid up top, each card leading with
 * the brand logo and the three facts that decide a shortlist, with a route into the
 * lender's own page and into the enquiry. The detailed LenderTable stays lower as the
 * full side-by-side spec. Figures are advertised "from" values, never a quote.
 */
export default function LenderCards({ lenders = LENDERS }: { lenders?: Lender[] }) {
  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {lenders.map((l) => (
          <div
            key={l.slug}
            className="group flex flex-col rounded-2xl border border-[#e5e9e7] bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#cfe6da] hover:shadow-[0_22px_50px_-28px_rgba(14,124,66,0.4)]"
          >
            <div className="flex items-center gap-3">
              <LenderLogo src={l.logo} name={l.name} size={44} className="rounded-xl ring-1 ring-[#eef1ef]" />
              <div className="min-w-0">
                <h3 className="text-lg font-extrabold leading-tight text-[#10251b]">{l.name}</h3>
                {l.afiaCodeSignatory ? (
                  <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#0a7c42]">
                    <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" /> AFIA Code signatory
                  </span>
                ) : (
                  <span className="mt-0.5 block text-[11px] font-medium text-[#9aa39c]">Non-bank lender</span>
                )}
              </div>
            </div>

            <dl className="mt-5 space-y-2.5 text-sm">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-[#6e7b74]">Loan size</dt>
                <dd className="text-right font-semibold tabular-nums text-[#10251b]">{money(l.minAmount)} – {money(l.maxAmount)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-[#6e7b74]">Rate from</dt>
                <dd className="text-right font-semibold tabular-nums text-[#10251b]">{l.advertisedRateFrom}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-[#6e7b74]">Funding</dt>
                <dd className="text-right font-semibold text-[#10251b]">{l.speed}</dd>
              </div>
            </dl>

            <p className="mt-4 flex flex-wrap gap-1.5">
              {l.products.slice(0, 3).map((p) => (
                <span key={p} className="rounded-md bg-[#f5f8f6] px-2 py-1 text-[11px] font-medium text-[#3d4b44]">{label(p)}</span>
              ))}
            </p>

            <div className="mt-auto flex items-center gap-3 pt-5">
              <Link
                href={`/business-loans/${l.slug}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#0a7c42] px-4 py-2.5 text-sm font-bold text-white transition-all group-hover:-translate-y-0 hover:bg-[#086536]"
              >
                See {l.name} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href="#enquire" className="text-sm font-semibold text-[#0a7c42] hover:text-[#086536]">Check eligibility</a>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-[#6e7b74]">
        <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9aa39c]" aria-hidden="true" />
        Advertised &ldquo;from&rdquo; rates and loan sizes as at {ratesAsAt()}, from each lender&apos;s own site. &ldquo;Quote-based&rdquo; means the lender prices each loan individually rather than publishing a headline rate. Figures are indicative, not a quote; your rate depends on the lender&apos;s assessment.
      </p>
    </div>
  );
}
