import Link from "next/link";

/**
 * Commission disclosure for the business-lending section. Unlike the rest of the
 * site (affiliate links), here we introduce the applicant to a lender and may be
 * paid a commission by that lender if a loan settles. This has to be stated wherever
 * we present lenders or a lead form. `variant="inline"` is a compact one-liner for
 * under a CTA or table; the default is the fuller boxed version.
 */
export default function CommissionDisclosure({ variant = "box" }: { variant?: "box" | "inline" }) {
  if (variant === "inline") {
    return (
      <p className="text-xs leading-relaxed text-[#6e7b74]">
        Refer Labs may be paid a commission by a lender if your loan settles. This never changes what you pay, and
        we are not paid to rank one lender above another.{" "}
        <Link href="/how-we-make-money" className="underline hover:text-[#10251b]">How we make money</Link>.
      </p>
    );
  }
  return (
    <div className="rounded-xl border border-[#e5e9e7] bg-white p-4 text-sm leading-relaxed text-[#3d4b44]">
      <p>
        <strong className="text-[#10251b]">How we&apos;re paid.</strong> If we introduce you to a lender and your
        loan settles, that lender may pay Refer Labs a commission. It never changes the rate or fees you&apos;re offered,
        and the amount does not decide the order lenders appear in. We&apos;re a referrer, not a credit provider.{" "}
        <Link href="/how-we-make-money" className="font-semibold text-[#0a7c42] underline">Full detail here</Link>.
      </p>
    </div>
  );
}
