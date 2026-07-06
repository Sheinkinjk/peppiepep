export type SearchEntry = {
  title: string;
  href: string;
  category: string;
  kind: "Category" | "Guide" | "Review";
  /** Extra search synonyms so common queries match. Not shown in the UI. */
  keywords?: string;
};

/** Static index powering site search. Add an entry when you publish a page. */
export const SEARCH_INDEX: SearchEntry[] = [
  // Categories
  { title: "Weight loss & telehealth", href: "/weight-loss", category: "Health", kind: "Category", keywords: "weight management obesity diet telehealth glp-1 injections online clinic" },
  { title: "Hair loss treatment", href: "/hair-loss", category: "Health", kind: "Category", keywords: "hair regrowth balding thinning finasteride minoxidil scalp" },
  { title: "Website builders", href: "/compare/website-builders", category: "Software", kind: "Category", keywords: "no-code landing page ai website site builder web design maker" },
  { title: "Newsletter platforms", href: "/compare/newsletter-platforms", category: "Creator tools", kind: "Category", keywords: "email marketing email list substack convertkit creator audience" },
  { title: "All guides & comparisons", href: "/guides", category: "Browse", kind: "Category", keywords: "articles reviews compare everything index" },

  // Weight loss
  { title: "Moshy, explained: how the service works", href: "/moshy-review", category: "Weight loss", kind: "Guide", keywords: "getmoshy moshy review telehealth weight management online clinic" },
  { title: "Moshy vs Juniper", href: "/moshy-vs-juniper", category: "Weight loss", kind: "Guide", keywords: "compare weight loss telehealth juniper" },
  { title: "Best weight loss telehealth in Australia", href: "/best-weight-loss-telehealth-australia", category: "Weight loss", kind: "Guide", keywords: "top online weight loss clinic australia glp-1" },
  { title: "Moshy vs your GP", href: "/moshy-vs-gp", category: "Weight loss", kind: "Guide", keywords: "doctor bulk bill medicare gp telehealth" },
  { title: "Moshy alternatives", href: "/moshy-alternatives", category: "Weight loss", kind: "Guide", keywords: "other options competitors similar" },
  { title: "Moshy eligibility check explained", href: "/moshy-eligibility", category: "Weight loss", kind: "Guide", keywords: "qualify assessment questionnaire suitability" },
  { title: "Online weight loss programs, untangled", href: "/online-weight-loss-programs-australia", category: "Weight loss", kind: "Guide", keywords: "compare programs australia" },
  { title: "Weight loss telehealth for men", href: "/weight-loss-telehealth-men-australia", category: "Weight loss", kind: "Guide", keywords: "mens weight loss male" },
  { title: "Moshy offer & referral link", href: "/moshy", category: "Weight loss", kind: "Guide", keywords: "getmoshy discount code deal sign up" },
  { title: "getmoshy.com.au explained", href: "/getmoshy", category: "Weight loss", kind: "Guide", keywords: "moshy website legit real" },

  // Hair loss
  { title: "Best hair loss treatment in Australia", href: "/best-hair-loss-treatment-australia", category: "Hair loss", kind: "Guide", keywords: "regrowth finasteride minoxidil telehealth top" },
  { title: "Mosh hair: what to know & offer", href: "/moshhair", category: "Hair loss", kind: "Guide", keywords: "mosh review mens hair loss finasteride" },
  { title: "Dense Hair Experts", href: "/dense", category: "Hair loss", kind: "Guide", keywords: "dense hair non prescription topical" },

  // Men's health
  { title: "Men's health telehealth in Australia", href: "/mens-health-telehealth-australia", category: "Health", kind: "Guide", keywords: "mens health online clinic male" },

  // Software / builders
  { title: "Best website builder 2026", href: "/best-website-builder", category: "Software", kind: "Guide", keywords: "top no-code ai website maker landing page" },
  { title: "Carrd vs Durable AI", href: "/carrd-vs-durable", category: "Software", kind: "Guide", keywords: "one page ai builder cheap compare" },
  { title: "Carrd review", href: "/carrd", category: "Software", kind: "Guide", keywords: "one page site cheap simple" },
  { title: "Durable AI review", href: "/durableai", category: "Software", kind: "Guide", keywords: "ai website builder generate" },
  { title: "Butternut AI review", href: "/butternut", category: "Software", kind: "Guide", keywords: "ai website builder generate" },
  { title: "Swipe Pages review", href: "/swipepages", category: "Software", kind: "Guide", keywords: "landing page builder conversion" },

  // Creator tools
  { title: "Best newsletter platform 2026", href: "/best-newsletter-platform", category: "Creator tools", kind: "Guide", keywords: "email marketing substack convertkit beehiiv top" },
  { title: "beehiiv review", href: "/beehiiv", category: "Creator tools", kind: "Guide", keywords: "newsletter email platform grow audience" },
  { title: "IncomeLab", href: "/incomelab", category: "Creator tools", kind: "Guide", keywords: "make money ai income side hustle" },

  // AI & sales
  { title: "Best AI sales tools 2026", href: "/best-ai-sales-tools", category: "AI & sales", kind: "Guide", keywords: "ai sales automation gohighlevel aisdr crm outbound sdr compare top" },
  { title: "GoHighLevel review", href: "/gohighlevel", category: "AI & sales", kind: "Guide", keywords: "gohighlevel all in one crm marketing automation funnels agency ai" },
  { title: "AiSDR review", href: "/aisdr", category: "AI & sales", kind: "Guide", keywords: "aisdr ai sdr sales development rep outbound prospecting book meetings" },

  // Business software
  { title: "Employment Hero review", href: "/employmenthero", category: "Business software", kind: "Guide", keywords: "employment hero hr payroll software australia single touch payroll stp fair work" },

  // Peptides
  { title: "Best peptide supplier 2026", href: "/best-peptide-supplier", category: "Research peptides", kind: "Guide", keywords: "research chemicals peptides supplier top" },
  { title: "Apollo Peptide Sciences", href: "/apollopeptides", category: "Research peptides", kind: "Guide", keywords: "apollo peptides research" },
  { title: "Ascension Peptides", href: "/ascensionpeptides", category: "Research peptides", kind: "Guide", keywords: "ascension peptides research" },
  { title: "BioPeptiTech", href: "/biopeptitech", category: "Research peptides", kind: "Guide", keywords: "biopeptitech peptides research" },
];

export function searchEntries(query: string, limit = 7): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/).filter(Boolean);
  return SEARCH_INDEX.map((e) => {
    const title = e.title.toLowerCase();
    const hay = `${title} ${e.category} ${e.kind} ${e.keywords ?? ""}`.toLowerCase();
    let score = 0;
    for (const w of words) {
      if (title.includes(w)) score += 2;
      else if (hay.includes(w)) score += 1;
      if (title.startsWith(w)) score += 3;
    }
    return { e, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.e);
}
