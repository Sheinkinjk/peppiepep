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
  { title: "Juniper alternatives", href: "/juniper-alternatives", category: "Weight loss", kind: "Guide", keywords: "juniper alternative is juniper only for women gender neutral moshy vs juniper youly weight loss" },
  { title: "Moshy eligibility check explained", href: "/moshy-eligibility", category: "Weight loss", kind: "Guide", keywords: "qualify assessment questionnaire suitability" },
  { title: "Weight-loss cost calculator", href: "/weight-loss-cost-calculator", category: "Weight loss", kind: "Guide", keywords: "cost calculator price how much pay subscription gp medicare pathway planner tool" },
  { title: "Which weight-loss option fits you", href: "/weight-loss-quiz", category: "Weight loss", kind: "Guide", keywords: "which weight loss program quiz match telehealth or gp online moshy eligibility recommend option for me" },
  { title: "Online weight loss programs, untangled", href: "/online-weight-loss-programs-australia", category: "Weight loss", kind: "Guide", keywords: "compare programs australia" },
  { title: "Weight loss telehealth for men", href: "/weight-loss-telehealth-men-australia", category: "Weight loss", kind: "Guide", keywords: "mens weight loss male" },
  { title: "Moshy offer & referral link", href: "/moshy", category: "Weight loss", kind: "Guide", keywords: "getmoshy discount code deal sign up" },
  { title: "getmoshy.com.au explained", href: "/getmoshy", category: "Weight loss", kind: "Guide", keywords: "moshy website legit real" },

  // Hair loss
  { title: "Best hair loss treatment in Australia", href: "/best-hair-loss-treatment-australia", category: "Hair loss", kind: "Guide", keywords: "regrowth finasteride minoxidil telehealth top" },
  { title: "Mosh hair: what to know & offer", href: "/moshhair", category: "Hair loss", kind: "Guide", keywords: "mosh review mens hair loss finasteride" },
  { title: "Mosh vs Pilot", href: "/mosh-vs-pilot", category: "Hair loss", kind: "Guide", keywords: "mosh vs pilot hair loss finasteride minoxidil mens telehealth compare" },
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
  { title: "Brevo review", href: "/brevo", category: "Creator tools", kind: "Guide", keywords: "brevo sendinblue email marketing sms automation crm all in one platform" },

  // Software / landing pages
  { title: "Leadpages review", href: "/leadpages", category: "Software", kind: "Guide", keywords: "leadpages landing page builder lead generation ab testing conversion" },

  // E-commerce
  { title: "AliDrop review", href: "/alidrop", category: "E-commerce", kind: "Guide", keywords: "alidrop dropshipping aliexpress temu alibaba shopify fulfilment sourcing" },

  // AI & sales
  { title: "Best AI sales tools 2026", href: "/best-ai-sales-tools", category: "AI & sales", kind: "Guide", keywords: "ai sales automation gohighlevel aisdr crm outbound sdr compare top" },
  { title: "AI sales tools compared", href: "/compare/ai-sales-tools", category: "AI & sales", kind: "Guide", keywords: "compare ai sales tools by job stack data outreach ai sdr crm hub" },
  { title: "GoHighLevel review", href: "/gohighlevel", category: "AI & sales", kind: "Guide", keywords: "gohighlevel all in one crm marketing automation funnels agency ai" },
  { title: "AiSDR review", href: "/aisdr", category: "AI & sales", kind: "Guide", keywords: "aisdr ai sdr sales development rep outbound prospecting book meetings" },
  { title: "Reply.io review", href: "/replyio", category: "AI & sales", kind: "Guide", keywords: "reply.io reply io sales engagement multichannel email linkedin sequences ai sdr outreach cold email" },
  { title: "FullEnrich review", href: "/fullenrich", category: "AI & sales", kind: "Guide", keywords: "fullenrich waterfall enrichment b2b contact data email mobile phone number finder clay prospecting" },

  // Business software
  { title: "Employment Hero review", href: "/employmenthero", category: "Business software", kind: "Guide", keywords: "employment hero hr payroll software australia single touch payroll stp fair work" },

  // Affiliate marketing
  { title: "Affiliate earnings calculator", href: "/affiliate-earnings-calculator", category: "Affiliate marketing", kind: "Guide", keywords: "affiliate earnings income calculator how much make commission estimate tool" },
  { title: "Superfiliate review (for brands)", href: "/superfiliate", category: "Affiliate marketing", kind: "Guide", keywords: "superfiliate affiliate referral creator program platform brands ecommerce shopify" },
  { title: "Best affiliate programs in Australia", href: "/affiliate-programs-australia", category: "Affiliate marketing", kind: "Guide", keywords: "best affiliate programs australia by category highest paying recurring" },
  { title: "Highest-paying affiliate programs", href: "/high-paying-affiliate-programs", category: "Affiliate marketing", kind: "Guide", keywords: "highest paying high commission affiliate programs big payout" },
  { title: "Best recurring affiliate programs", href: "/recurring-affiliate-programs", category: "Affiliate marketing", kind: "Guide", keywords: "recurring commission monthly affiliate programs saas subscription passive" },
  { title: "How to start affiliate marketing in Australia", href: "/how-to-start-affiliate-marketing-australia", category: "Affiliate marketing", kind: "Guide", keywords: "how to start affiliate marketing australia beginner guide from zero" },

  // Prediction markets
  { title: "Polymarket: sign up & trade", href: "/polymarket", category: "Prediction markets", kind: "Guide", keywords: "polymarket what is how to use sign up prediction markets us international hub start" },
  { title: "Polymarket markets explained", href: "/polymarket/markets-explained", category: "Prediction markets", kind: "Guide", keywords: "polymarket how prediction markets work order book clob shares probability uma oracle fees" },
  { title: "How to register on Polymarket", href: "/polymarket/how-to-register", category: "Prediction markets", kind: "Guide", keywords: "polymarket sign up register account wallet usdc kyc us international deposit states" },
  { title: "Build a Polymarket trading bot", href: "/polymarket/trading-bots", category: "Prediction markets", kind: "Guide", keywords: "polymarket trading bot clob api py-clob-client market making arbitrage automate" },
  { title: "Profitable Polymarket bot strategies", href: "/polymarket/profitable-trading-bots", category: "Prediction markets", kind: "Guide", keywords: "profitable polymarket bots strategy sports politics market making arbitrage mispriced edge make money" },
  { title: "Polymarket profit calculator", href: "/polymarket/profit-calculator", category: "Prediction markets", kind: "Guide", keywords: "polymarket profit payout return calculator odds probability edge tool" },
  { title: "Finding edge on Polymarket", href: "/polymarket/optimising-edge", category: "Prediction markets", kind: "Guide", keywords: "polymarket edge profitable strategy maker rewards arbitrage markout kelly sizing fees" },

  // Peptides
  { title: "Best peptide supplier 2026", href: "/best-peptide-supplier", category: "Research peptides", kind: "Guide", keywords: "research chemicals peptides supplier top" },
  { title: "Research peptide suppliers compared", href: "/compare/research-peptides", category: "Research peptides", kind: "Guide", keywords: "compare peptide suppliers purity catalogue vendors research use hub" },
  { title: "Apollo Peptide Sciences", href: "/apollopeptides", category: "Research peptides", kind: "Guide", keywords: "apollo peptides research" },
  { title: "Ascension Peptides", href: "/ascensionpeptides", category: "Research peptides", kind: "Guide", keywords: "ascension peptides research" },
  { title: "BioPeptiTech", href: "/biopeptitech", category: "Research peptides", kind: "Guide", keywords: "biopeptitech peptides research" },
  { title: "Apollo vs Ascension", href: "/apollo-vs-ascension", category: "Research peptides", kind: "Guide", keywords: "apollo vs ascension peptides compare" },
  { title: "Apollo vs BioPeptiTech", href: "/apollo-vs-biopeptitech", category: "Research peptides", kind: "Guide", keywords: "apollo vs biopeptitech peptides compare" },
  { title: "Ascension vs BioPeptiTech", href: "/ascension-vs-biopeptitech", category: "Research peptides", kind: "Guide", keywords: "ascension vs biopeptitech peptides compare" },

  // Weight loss (guides + head-to-heads not yet indexed)
  { title: "Weight-loss telehealth cost, explained", href: "/weight-loss-telehealth-cost-australia", category: "Weight loss", kind: "Guide", keywords: "cost price how much weight loss telehealth australia subscription" },
  { title: "Cheapest weight-loss telehealth", href: "/cheapest-weight-loss-telehealth-australia", category: "Weight loss", kind: "Guide", keywords: "cheapest affordable low cost weight loss telehealth australia" },
  { title: "Weight-loss injections in Australia", href: "/weight-loss-injections-australia", category: "Weight loss", kind: "Guide", keywords: "weight loss injections glp-1 telehealth australia how to access" },
  { title: "GLP-1 weight loss in Australia", href: "/glp-1-weight-loss-australia", category: "Weight loss", kind: "Guide", keywords: "glp-1 weight loss australia telehealth access information" },
  { title: "Online weight-loss doctor in Australia", href: "/online-weight-loss-doctor-australia", category: "Weight loss", kind: "Guide", keywords: "online weight loss doctor practitioner assessment australia" },
  { title: "Moshy vs Pilot", href: "/moshy-vs-pilot", category: "Weight loss", kind: "Guide", keywords: "moshy vs pilot weight loss telehealth compare price model" },

  // Hair loss head-to-head
  { title: "Mosh vs Dense", href: "/mosh-vs-dense", category: "Hair loss", kind: "Guide", keywords: "mosh vs dense hair loss prescription topical compare" },

  // Software head-to-heads
  { title: "Carrd vs Butternut", href: "/carrd-vs-butternut", category: "Software", kind: "Guide", keywords: "carrd vs butternut website builder compare" },
  { title: "Durable vs Butternut", href: "/durable-vs-butternut", category: "Software", kind: "Guide", keywords: "durable vs butternut ai website builder compare" },
  { title: "Which website builder quiz", href: "/website-builder-quiz", category: "Software", kind: "Guide", keywords: "which website builder should i use quiz recommend carrd durable butternut swipe pages" },
  { title: "Which AI sales tool quiz", href: "/ai-sales-tools-quiz", category: "Software", kind: "Guide", keywords: "which ai sales tool quiz match aisdr reply.io fullenrich gohighlevel ai sdr recommend for me bottleneck outbound" },
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
