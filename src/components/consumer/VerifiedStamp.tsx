import { BadgeCheck } from "lucide-react";
import { formatVerified } from "@/lib/offers";

/**
 * Small "we checked this" trust element for money pages. Visible maintenance is
 * a big part of what makes a comparison site feel premium and trustworthy.
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
      className={`inline-flex items-center gap-1.5 rounded-full border border-[#b9e3eb] bg-[#eef6f1] px-3 py-1 text-[11px] font-semibold text-[#007a95] ${className}`}
    >
      <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
      {label} {formatVerified(date)}
    </span>
  );
}
