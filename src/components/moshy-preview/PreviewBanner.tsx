import { BANNER } from "./copy";

/** Fixed, full-width, not dismissible. Excluded from the compliance scan (data-preview-chrome). */
export function PreviewBanner() {
  return (
    <div
      data-preview-chrome=""
      role="status"
      className="fixed inset-x-0 top-0 z-50 bg-amber-400 px-4 py-2 text-center text-[13px] font-semibold leading-snug text-[#14120f] shadow"
    >
      {BANNER}
    </div>
  );
}
