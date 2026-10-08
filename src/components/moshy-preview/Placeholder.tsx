/**
 * Marks a value that is not final: dashed amber outline plus a small PLACEHOLDER
 * badge. Every placeholder on /preview/moshy-updates renders through this.
 */
export function Placeholder({
  children,
  block = false,
  label = "PLACEHOLDER",
}: {
  children: React.ReactNode;
  block?: boolean;
  label?: string;
}) {
  const Tag = block ? "div" : "span";
  return (
    <Tag
      data-placeholder=""
      className={`${block ? "block" : "inline"} rounded-md border-2 border-dashed border-amber-500 bg-amber-50/70 px-1.5 py-0.5 text-[#14120f]`}
    >
      <span className="mr-1.5 inline-block rounded bg-amber-500 px-1.5 py-px align-middle text-[10px] font-bold uppercase tracking-[0.08em] text-[#14120f]">
        {label}
      </span>
      {children}
    </Tag>
  );
}
