import Link from "next/link";

/**
 * Commission disclosure for the business-lending section. Unlike the rest of the
 * site (affiliate links), here we pass the enquiry on for assessment and may be
 * paid if a loan settles. Enquiries commonly reach a lender through a finance
 * broker, in which case the payment is a share of that broker's commission rather
 * than a payment from the lender, and the wording below has to reflect that. This has to be stated wherever
 * we present lenders or a lead form. `variant="inline"` is a compact one-liner for
 * under a CTA or table; the default is the fuller boxed version.
 */
export default function CommissionDisclosure({ variant = "box" }: { variant?: "box" | "inline" }) {
  if (variant === "inline") {
    return (
      <p className="text-xs leading-relaxed text-[#6e7b74]">
        If your loan settles, Refer Labs may be paid a share of the broker's commission, or a commission from the lender. This never changes what you pay, and we are not paid to rank one lender above another.{" "}
        <Link href="/how-we-make-money" className="underline hover:text-[#10251b]">How we make money</Link>.
      </p>
    );
  }
  return (
    <div className="rounded-xl border border-[#e5e9e7] bg-white p-4 text-sm leading-relaxed text-[#3d4b44]">
      <p>
        <strong className="text-[#10251b]">How we&apos;re paid.</strong> Enquiries are submitted to lenders either directly or through a finance broker. If a loan settles, Refer Labs may be paid a share of that broker&apos;s commission, or a commission from the lender. It never changes the rate or fees you&apos;re offered, and the amount does not decide the order lenders appear in. We&apos;re a referrer, not a lender and not a credit provider.{" "}
        <Link href="/how-we-make-money" className="font-semibold text-[#0a7c42] underline">Full detail here</Link>.
      </p>
    </div>
  );
}
