import Link from "next/link";

/**
 * Australian Privacy Principle 5 collection notice, shown next to the lead form.
 * Plain-language: who collects the data, why, who it's shared with, and the rights
 * that attach. Kept in one component so every place the form appears carries the
 * same notice. The wording is tied to the consent version in src/lib/consent.ts.
 */
export default function CollectionNotice() {
  return (
    <div className="rounded-2xl border border-[#e5e9e7] bg-[#f8faf9] p-5 text-sm leading-relaxed text-[#3d4b44]">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9aa39c]">
        How your information is handled
      </h2>
      <ul className="mt-3 space-y-2.5">
        <li>
          <strong className="text-[#10251b]">Who collects it.</strong> Pepform Pty Ltd trading as Refer Labs
          (ABN 32 660 008 159). We are an independent referrer, <strong className="text-[#10251b]">not a lender or credit provider</strong>,
          and we do not provide credit assistance or credit advice.
        </li>
        <li>
          <strong className="text-[#10251b]">Why we collect it.</strong> To understand your finance needs and,
          with your consent, to pass your enquiry to lenders, and to finance brokers who submit applications to lenders, so it can be assessed.
        </li>
        <li>
          <strong className="text-[#10251b]">Who we share it with.</strong> Only the lenders and finance brokers relevant to your
          enquiry, and only as you consent. We do not sell your data or share it for unrelated marketing.
        </li>
        <li>
          <strong className="text-[#10251b]">What we never ask for here.</strong> Bank statements, ID documents,
          or account logins. This form collects contact and high-level business details only.
        </li>
        <li>
          <strong className="text-[#10251b]">Your rights.</strong> You can ask to access or correct your information,
          or withdraw consent, any time by emailing{" "}
          <a href="mailto:jarred@referlabs.com.au" className="font-semibold text-[#0a7c42] underline">jarred@referlabs.com.au</a>.
          Full detail is in our{" "}
          <Link href="/privacy" className="font-semibold text-[#0a7c42] underline">Privacy Policy</Link>.
        </li>
      </ul>
    </div>
  );
}
