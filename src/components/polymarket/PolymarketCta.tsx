import { ArrowRight } from "lucide-react";
import { polymarketRef } from "@/lib/polymarket";

const GREEN = "#0a7c42";

type Props = {
  /** Button label. Benefit-led, honest copy. */
  label: string;
  /** utm_campaign value, typically the page slug. */
  campaign: string;
  /** data-cta location for GA4 affiliate_click tracking. */
  location: string;
  variant?: "primary" | "secondary";
  /** Show the jurisdiction note beneath the button. */
  note?: boolean;
  className?: string;
};

/**
 * The one and only Polymarket call-to-action. Imports the referral URL via the
 * UTM helper (never hard-codes it), carries affiliate-hygiene rel attributes,
 * and fires GA4 affiliate_click through the site's rel~="sponsored" tracker.
 */
export default function PolymarketCta({
  label,
  campaign,
  location,
  variant = "primary",
  note = true,
  className = "",
}: Props) {
  const href = polymarketRef(campaign);
  const primary =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5";
  const secondary =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5";

  return (
    <div className={className}>
      <a
        href={href}
        target="_blank"
        rel="noopener sponsored nofollow"
        data-cta={location}
        className={variant === "primary" ? primary : secondary}
        style={
          variant === "primary"
            ? { background: GREEN, boxShadow: `0 6px 24px ${GREEN}30` }
            : { color: GREEN, border: `1px solid ${GREEN}40`, background: `${GREEN}08` }
        }
      >
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
      {note && (
        <p className="mt-2 text-xs text-[#9aa39c]">
          Check availability in your jurisdiction before signing up.
        </p>
      )}
    </div>
  );
}
