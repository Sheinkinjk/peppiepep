import { HubObject, type ObjectKind } from "@/components/home/Objects";
import { objectFor } from "@/lib/home/hubs";

/**
 * The section's drawing, set at the end of a page's breadcrumb row. It sits
 * above the h1, never between the h1 and the lead (check-answer-slot), and it
 * is decorative: the breadcrumb beside it already names the section.
 * Pass `href` for a section hub, or `kind` where the page names its subject.
 */
export function SectionMark({ href, kind, size = 56 }: { href?: string; kind?: ObjectKind; size?: number }) {
  const k = kind ?? (href ? objectFor(href) : undefined);
  if (!k) return null;
  return <HubObject kind={k} size={size} className="hy-obj ml-auto shrink-0" />;
}
