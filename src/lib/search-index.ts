export type SearchEntry = { title: string; href: string; category: string; kind: "Category" | "Guide" | "Review" };

/** Static index powering site search. Add an entry when you publish a page. */
export const SEARCH_INDEX: SearchEntry[] = [
  // Categories
  { title: "Weight loss & telehealth", href: "/weight-loss", category: "Health", kind: "Category" },
  { title: "Hair loss treatment", href: "/hair-loss", category: "Health", kind: "Category" },
  { title: "Website builders", href: "/compare/website-builders", category: "Software", kind: "Category" },
  { title: "Newsletter platforms", href: "/compare/newsletter-platforms", category: "Creator tools", kind: "Category" },
  { title: "All guides & comparisons", href: "/guides", category: "Browse", kind: "Category" },

  // Weight loss
  { title: "Moshy review: how the service works", href: "/moshy-review", category: "Weight loss", kind: "Review" },
  { title: "Moshy vs Juniper", href: "/moshy-vs-juniper", category: "Weight loss", kind: "Guide" },
  { title: "Best weight loss telehealth in Australia", href: "/best-weight-loss-telehealth-australia", category: "Weight loss", kind: "Guide" },
  { title: "Moshy vs your GP", href: "/moshy-vs-gp", category: "Weight loss", kind: "Guide" },
  { title: "Moshy alternatives", href: "/moshy-alternatives", category: "Weight loss", kind: "Guide" },
  { title: "Moshy eligibility check explained", href: "/moshy-eligibility", category: "Weight loss", kind: "Guide" },
  { title: "Online weight loss programs, untangled", href: "/online-weight-loss-programs-australia", category: "Weight loss", kind: "Guide" },
  { title: "Weight loss telehealth for men", href: "/weight-loss-telehealth-men-australia", category: "Weight loss", kind: "Guide" },
  { title: "Moshy offer & referral link", href: "/moshy", category: "Weight loss", kind: "Review" },
  { title: "getmoshy.com.au explained", href: "/getmoshy", category: "Weight loss", kind: "Guide" },

  // Hair loss
  { title: "Best hair loss treatment in Australia", href: "/best-hair-loss-treatment-australia", category: "Hair loss", kind: "Guide" },
  { title: "Mosh review & offer", href: "/moshhair", category: "Hair loss", kind: "Review" },
  { title: "Dense Hair Experts", href: "/dense", category: "Hair loss", kind: "Review" },

  // Men's health
  { title: "Men's health telehealth in Australia", href: "/mens-health-telehealth-australia", category: "Health", kind: "Guide" },

  // Software / builders
  { title: "Best website builder 2026", href: "/best-website-builder", category: "Software", kind: "Guide" },
  { title: "Carrd vs Durable AI", href: "/carrd-vs-durable", category: "Software", kind: "Guide" },
  { title: "Carrd review", href: "/carrd", category: "Software", kind: "Review" },
  { title: "Durable AI review", href: "/durableai", category: "Software", kind: "Review" },
  { title: "Butternut AI review", href: "/butternut", category: "Software", kind: "Review" },
  { title: "Swipe Pages review", href: "/swipepages", category: "Software", kind: "Review" },

  // Creator tools
  { title: "Best newsletter platform 2026", href: "/best-newsletter-platform", category: "Creator tools", kind: "Guide" },
  { title: "beehiiv review", href: "/beehiiv", category: "Creator tools", kind: "Review" },
  { title: "IncomeLab", href: "/incomelab", category: "Creator tools", kind: "Review" },

  // Peptides
  { title: "Best peptide supplier 2026", href: "/best-peptide-supplier", category: "Research peptides", kind: "Guide" },
  { title: "Apollo Peptide Sciences", href: "/apollopeptides", category: "Research peptides", kind: "Review" },
  { title: "Ascension Peptides", href: "/ascensionpeptides", category: "Research peptides", kind: "Review" },
  { title: "BioPeptiTech", href: "/biopeptitech", category: "Research peptides", kind: "Review" },
];

export function searchEntries(query: string, limit = 7): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/);
  return SEARCH_INDEX.map((e) => {
    const hay = `${e.title} ${e.category} ${e.kind}`.toLowerCase();
    let score = 0;
    for (const w of words) {
      if (hay.includes(w)) score += 2;
      if (e.title.toLowerCase().startsWith(w)) score += 3;
    }
    return { e, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.e);
}
