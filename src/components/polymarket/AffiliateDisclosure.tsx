/**
 * Clear-and-prominent affiliate disclosure (ACCC-style), placed near the top of
 * every Polymarket guide page.
 */
export default function AffiliateDisclosure() {
  return (
    <p className="rounded-lg border border-[#e5e9e7] bg-[#f5f8f6] px-4 py-3 text-xs leading-relaxed text-[#3d4b44]">
      <span className="font-semibold text-[#2b362f]">Disclosure.</span> ReferLabs may earn a
      commission if you sign up through links on this page, at no extra cost to you. This does not
      affect our analysis.
    </p>
  );
}
