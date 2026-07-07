import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getRelatedGuides } from "@/lib/related-guides";

/**
 * Auto-generated "related guides" cluster block, driven by the search index.
 * Drop it on any page with a category; it links to that cluster's siblings and
 * stays current as pages are added. Renders nothing if there are no siblings.
 */
export default function RelatedGuides({
  category,
  currentHref,
  limit = 4,
  heading = "Related guides",
}: {
  category: string;
  currentHref?: string;
  limit?: number;
  heading?: string;
}) {
  const items = getRelatedGuides({ category, excludeHref: currentHref, limit });
  if (items.length === 0) return null;

  return (
    <section className="border-t border-[#e5e9e7] py-9">
      <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-[#9aa39c]">{heading}</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="group flex items-center justify-between gap-3 rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-4 transition-all hover:-translate-y-0.5 hover:border-[#0a7c42]/40"
          >
            <span className="min-w-0">
              <span className="block text-[15px] font-bold text-[#10251b] group-hover:text-[#0a7c42]">{g.title}</span>
              <span className="block text-xs text-[#9aa39c]">{g.category}</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-[#0a7c42] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
