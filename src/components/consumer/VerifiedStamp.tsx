import { formatVerified } from "@/lib/offers";

/**
 * "Refer Labs Verified" trust element for money pages, carrying the compare-bars
 * mark so the brand's signature device shows up wherever we vouch for an offer.
 * Visible, dated maintenance is a big part of what makes a comparison site feel
 * premium and trustworthy. The badge is earned, never sold. See /how-we-research.
 */
export default function VerifiedStamp({
  date,
  label = "Offer verified",
  className = "",
}: {
  date: string;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-[#cfe6da] bg-[#eef6f1] px-3 py-1 text-[11px] font-semibold text-[#0a7c42] ${className}`}
    >
      {/* compare-bars mark */}
      <svg width="12" height="10" viewBox="0 0 48 40" fill="none" aria-hidden="true" className="shrink-0">
        <rect x="0" y="2" width="30" height="6" rx="3" fill="#0a7c42" />
        <rect x="0" y="15" width="21" height="6" rx="3" fill="#0a7c42" opacity="0.55" />
        <rect x="0" y="28" width="13" height="6" rx="3" fill="#0a7c42" opacity="0.32" />
      </svg>
      {label} {formatVerified(date)}
    </span>
  );
}
