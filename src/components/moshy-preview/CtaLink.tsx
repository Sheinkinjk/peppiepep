"use client";

/** Outbound link to Moshy. In preview: a PLACEHOLDER LINK badge and a confirm step before it opens. */
export function CtaLink({
  href,
  label,
  preview,
  confirmText,
}: {
  href: string;
  label: string;
  preview: boolean;
  confirmText: string;
}) {
  return (
    <span className="inline-flex flex-wrap items-center gap-3">
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener"
        onClick={(e) => {
          if (preview && !window.confirm(confirmText)) e.preventDefault();
        }}
        className="nw-btn inline-flex items-center justify-center px-7 py-3.5 text-[15px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007a95]"
      >
        {label}
      </a>
      {preview && (
        <span className="rounded bg-amber-500 px-1.5 py-px text-[10px] font-bold uppercase tracking-[0.08em] text-[#14120f]">
          PLACEHOLDER LINK
        </span>
      )}
    </span>
  );
}
