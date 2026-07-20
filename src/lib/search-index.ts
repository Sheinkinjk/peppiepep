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
  { title: "Website & landing-page builders", href: "/compare/website-builders", category: "Software", kind: "Category", keywords: "no-code landing page builder leadpages landingi ai website site builder web design maker" },
  { title: "Newsletter platforms", href: "/compare/newsletter-platforms", category: "Creator tools", kind: "Category", keywords: "email marketing email list substack convertkit creator audience" },
  { title: "HR & payroll software", href: "/compare/hr-payroll", category: "Software", kind: "Category", keywords: "hr payroll employment hero gusto software compare team pay onboarding benefits" },
  { title: "Sales & outreach tools", href: "/compare/sales-outreach", category: "AI & sales", kind: "Category", keywords: "sales outreach cold email snov.io reply.io prospecting sequences lead generation" },
  { title: "Payments & finance tools", href: "/compare/payments", category: "Software", kind: "Category", keywords: "payments payoneer cross border get paid freelancer global business account fintech" },
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
  { title: "Finasteride in Australia, explained", href: "/finasteride-australia", category: "Hair loss", kind: "Guide", keywords: "finasteride australia hair loss prescription dht blocker propecia generic 1mg" },
  { title: "Minoxidil in Australia, explained", href: "/minoxidil-australia", category: "Hair loss", kind: "Guide", keywords: "minoxidil australia regaine topical oral hair loss over the counter" },
  { title: "Hair loss treatment cost in Australia", href: "/hair-loss-treatment-cost-australia", category: "Hair loss", kind: "Guide", keywords: "hair loss treatment cost australia mosh price finasteride minoxidil subscription" },
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
  { title: "Brevo review", href: "/brevo", category: "Creator tools", kind: "Guide", keywords: "brevo sendinblue email marketing sms automation crm all in one platform" },

  // Software / landing pages
  { title: "Leadpages review", href: "/leadpages", category: "Software", kind: "Guide", keywords: "leadpages landing page builder lead generation ab testing conversion" },
  { title: "CloudTalk review", href: "/cloudtalk", category: "Software", kind: "Guide", keywords: "cloudtalk business phone call centre voip ai voice agents sales support discount code" },
  { title: "KrispCall review", href: "/krispcall", category: "Software", kind: "Guide", keywords: "krispcall cloud phone virtual number shared inbox remote team voip discount code" },
  { title: "Dext review", href: "/dext", category: "Software", kind: "Guide", keywords: "dext bookkeeping automation receipt invoice capture xero quickbooks accounting discount code" },
  { title: "Trainual review", href: "/trainual", category: "Software", kind: "Guide", keywords: "trainual training onboarding sop documentation hr process discount code" },
  { title: "Lindy review", href: "/lindy", category: "AI & sales", kind: "Guide", keywords: "lindy ai work assistant automation inbox scheduling crm agent discount code" },
  { title: "ElevenLabs review", href: "/elevenlabs", category: "AI & sales", kind: "Guide", keywords: "elevenlabs ai voice text to speech tts voice cloning dubbing discount code" },
  { title: "Wing Assistant review", href: "/wing-assistant", category: "Software", kind: "Guide", keywords: "wing assistant managed virtual assistant va outsourcing admin support discount code" },
  { title: "Survicate review", href: "/survicate", category: "Software", kind: "Guide", keywords: "survicate survey customer feedback nps csat forms discount code" },
  { title: "Business phone systems", href: "/compare/business-phone", category: "Software", kind: "Guide", keywords: "compare business phone voip cloudtalk krispcall cloud calling numbers hub" },
  { title: "AI tools compared", href: "/compare/ai-tools", category: "AI & sales", kind: "Guide", keywords: "compare ai tools lindy elevenlabs assistant voice automation hub" },

  // E-commerce
  { title: "Keap review", href: "/keap", category: "Software", kind: "Guide", keywords: "keap crm marketing automation small business infusionsoft pipeline follow up discount code" },
  { title: "Capsule review", href: "/capsule", category: "Software", kind: "Guide", keywords: "capsule crm simple sales pipeline small business free crm" },
  { title: "Beautiful.ai review", href: "/beautifulai", category: "AI & sales", kind: "Guide", keywords: "beautiful.ai ai presentation software slides deck generator design" },
  { title: "PandaDoc review", href: "/pandadoc", category: "Software", kind: "Guide", keywords: "pandadoc proposals contracts quotes e-signature esign documents" },
  { title: "Blinq review", href: "/blinq", category: "Software", kind: "Guide", keywords: "blinq digital business card nfc qr virtual card contact sharing" },
  { title: "Apollo Energy Group: home batteries & $500 off", href: "/apollo-energy", category: "Home & energy", kind: "Guide", keywords: "apollo energy group home battery australia solar battery rebate cheaper home batteries installer $500 discount" },
  { title: "Home battery cost in Australia 2026", href: "/home-battery-cost-australia", category: "Home & energy", kind: "Guide", keywords: "home battery cost australia price payback period tesla powerwall installed cost solar battery" },
  { title: "Home battery payback calculator", href: "/home-battery-payback-calculator", category: "Home & energy", kind: "Guide", keywords: "home battery payback calculator savings roi is a battery worth it australia" },
  { title: "Apollo Energy Group review: is it legit?", href: "/apollo-energy-review", category: "Home & energy", kind: "Guide", keywords: "apollo energy group review is apollo energy legit apollo battery installer reviews australia $500 discount" },
  { title: "Home battery rebate Australia 2026", href: "/home-battery-rebate-australia", category: "Home & energy", kind: "Guide", keywords: "home battery rebate australia cheaper home batteries program battery rebate 2026 solar battery rebate stc taper 14kwh how much" },
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

  // Peptides
  { title: "Research peptide suppliers compared", href: "/compare/research-peptides", category: "Research peptides", kind: "Guide", keywords: "compare peptide suppliers purity catalogue vendors research use hub" },

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
  { title: "Which newsletter platform quiz", href: "/newsletter-platform-quiz", category: "Creator tools", kind: "Guide", keywords: "which newsletter platform quiz match beehiiv substack kit convertkit recommend for me email" },
  { title: "Which hair-loss option fits you", href: "/hair-loss-quiz", category: "Hair loss", kind: "Guide", keywords: "which hair loss treatment quiz match mosh dense telehealth topical gp recommend option for me" },
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
