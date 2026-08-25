import { ECOFLOW_URL, ANKER_SOLIX_URL } from "@/lib/affiliate-links";

/**
 * The two stores, offered together at the point the reader has just been told
 * which one wins what.
 *
 * Deliberately a quiet pair rather than a banner: on an editorial page the
 * comparison is the product, and a full-width promo above the fold would push
 * the answer paragraph down, which is the one thing these pages are built not
 * to do. Both links are disclosed, and the note says we earn either way.
 */
export default function PowerCtaPair({
  location,
  className = "",
  note = "Both are disclosed affiliate links. We earn from either, at no extra cost to you.",
}: {
  location: string;
  className?: string;
  note?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors";
  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2.5">
        <a
          href={ECOFLOW_URL}
          target="_blank"
          rel="nofollow sponsored"
          data-cta={`${location}-ecoflow`}
          className={`${base} bg-[#0a7c42] text-white hover:bg-[#086536]`}
        >
          See EcoFlow prices
        </a>
        <a
          href={ANKER_SOLIX_URL}
          target="_blank"
          rel="nofollow sponsored"
          data-cta={`${location}-anker`}
          className={`${base} border border-[#cfd8d3] bg-white text-[#10251b] hover:border-[#0a7c42] hover:text-[#0a7c42]`}
        >
          See Anker SOLIX prices
        </a>
      </div>
      <p className="mt-2 text-[12px] text-[#9aa39c]">{note}</p>
    </div>
  );
}
