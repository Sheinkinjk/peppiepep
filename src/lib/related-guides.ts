import { SEARCH_INDEX, type SearchEntry } from "./search-index";

/**
 * The systematic internal-linking engine (E5).
 *
 * Given a category, return that cluster's sibling guides from the single
 * search index, excluding the current page. Because it reads the same index
 * the on-site search uses, every new page added there is automatically wired
 * into its cluster's link graph, no per-page maintenance, no dead links.
 */
export function getRelatedGuides(opts: {
  category: string;
  excludeHref?: string;
  limit?: number;
}): SearchEntry[] {
  const { category, excludeHref, limit = 4 } = opts;
  return SEARCH_INDEX.filter(
    (e) => e.category === category && e.href !== excludeHref,
  ).slice(0, limit);
}
