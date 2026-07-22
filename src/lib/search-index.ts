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
  { title: "Finasteride vs minoxidil", href: "/finasteride-vs-minoxidil-australia", category: "Hair loss", kind: "Guide", keywords: "finasteride vs minoxidil difference compare oral topical dht together australia" },
  { title: "Online hair loss treatment in Australia", href: "/online-hair-loss-treatment-australia", category: "Hair loss", kind: "Guide", keywords: "online hair loss treatment telehealth doctor australia assessment prescription" },
  { title: "How long does finasteride take to work", href: "/how-long-does-finasteride-take-to-work-australia", category: "Hair loss", kind: "Guide", keywords: "how long finasteride take work results timeline shedding months australia" },
  { title: "How to stop hair loss", href: "/how-to-stop-hair-loss-australia", category: "Hair loss", kind: "Guide", keywords: "how to stop hair loss balding men male pattern dht treatment australia" },
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
  { title: "Best home battery in Australia", href: "/best-home-battery-australia", category: "Home & energy", kind: "Guide", keywords: "best home battery australia solar battery choose capacity chemistry lfp warranty vpp compare" },
  { title: "What size home battery do I need", href: "/what-size-home-battery-do-i-need-australia", category: "Home & energy", kind: "Guide", keywords: "what size home battery do i need kwh sizing calculator australia how many" },
  { title: "NSW home battery rebate 2026", href: "/nsw-home-battery-rebate-2026", category: "Home & energy", kind: "Guide", keywords: "nsw home battery rebate 2026 vpp incentive 1500 federal stack sydney" },
  { title: "Home battery installer NSW", href: "/home-battery-installer-nsw", category: "Home & energy", kind: "Guide", keywords: "home battery installer nsw sydney saa accredited electrical licence solar battery installation" },
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
  // Business-software brand pages (were live + in the /business-software grid but missing from search)
  { title: "ActiveCampaign", href: "/activecampaign", category: "Software", kind: "Guide", keywords: "activecampaign email marketing automation crm discount referral" },
  { title: "FlexiQuiz", href: "/flexiquiz", category: "Software", kind: "Guide", keywords: "flexiquiz quiz test maker assessments exams online" },
  { title: "Hello Bar", href: "/hellobar", category: "Software", kind: "Guide", keywords: "hello bar popups bars lead capture email signups conversion" },
  { title: "Instapage", href: "/instapage", category: "Software", kind: "Guide", keywords: "instapage landing page builder ad conversion ppc post-click" },
  { title: "Landingi", href: "/landingi", category: "Software", kind: "Guide", keywords: "landingi landing page builder no-code conversion" },
  { title: "Nutshell CRM", href: "/nutshell", category: "AI & sales", kind: "Guide", keywords: "nutshell crm easy sales pipeline marketing small business" },
  { title: "Outgrow", href: "/outgrow", category: "Software", kind: "Guide", keywords: "outgrow interactive quizzes calculators lead generation content" },
  { title: "Pipedrive CRM", href: "/pipedrive", category: "AI & sales", kind: "Guide", keywords: "pipedrive crm visual sales pipeline deals" },

  // Business finance (lending vertical)
  { title: "Business loans Australia: compare lenders", href: "/business-loans", category: "Business finance", kind: "Category", keywords: "business loans australia compare lenders unsecured small business finance lumi moula prospa enquiry" },
  { title: "Business loan repayment calculator", href: "/business-loan-calculator", category: "Business finance", kind: "Guide", keywords: "business loan calculator repayments effective rate total cost australia" },
  { title: "What a business loan actually costs", href: "/what-a-business-loan-actually-costs", category: "Business finance", kind: "Guide", keywords: "business loan cost nominal rate factor rate fees comparison rate australia" },
  { title: "The hidden cost of factor rates (analysis)", href: "/true-cost-of-business-loans-australia", category: "Business finance", kind: "Guide", keywords: "factor rate vs interest rate true cost business loan effective annual rate analysis 1.2 factor" },
  { title: "Equipment finance & the instant asset write-off", href: "/equipment-finance-instant-asset-write-off", category: "Business finance", kind: "Guide", keywords: "equipment finance chattel mortgage lease instant asset write off tax vehicle machinery" },
  { title: "Unsecured business loans", href: "/unsecured-business-loans-australia", category: "Business finance", kind: "Guide", keywords: "unsecured business loan no collateral security australia" },
  { title: "Secured vs unsecured business loans", href: "/secured-vs-unsecured-business-loans", category: "Business finance", kind: "Guide", keywords: "secured vs unsecured business loan collateral compare which" },
  { title: "Business line of credit", href: "/business-line-of-credit-australia", category: "Business finance", kind: "Guide", keywords: "business line of credit revolving overdraft facility australia" },
  { title: "Working capital loans", href: "/working-capital-loans-australia", category: "Business finance", kind: "Guide", keywords: "working capital cash flow finance loan australia" },
  { title: "Fast business loans", href: "/fast-business-loans-australia", category: "Business finance", kind: "Guide", keywords: "fast same day quick business loan 24 hours funding australia" },
  { title: "Business loans with bad credit", href: "/business-loans-bad-credit-australia", category: "Business finance", kind: "Guide", keywords: "bad credit business loan default judgement poor credit australia" },
  { title: "Small business loans", href: "/small-business-loans-australia", category: "Business finance", kind: "Guide", keywords: "small business loan finance australia types" },
  { title: "Low-doc business loans", href: "/low-doc-business-loans-australia", category: "Business finance", kind: "Guide", keywords: "low doc no doc business loan without financials bank statements australia" },
  { title: "Startup business loans", href: "/startup-business-loans-australia", category: "Business finance", kind: "Guide", keywords: "startup new business loan no trading history australia" },
  { title: "Business loans for sole traders", href: "/business-loans-sole-traders-australia", category: "Business finance", kind: "Guide", keywords: "sole trader self employed business loan abn australia" },
  { title: "Hospitality business loans", href: "/business-loans-hospitality-australia", category: "Business finance", kind: "Guide", keywords: "cafe restaurant hospitality venue fit out equipment loan australia" },
  { title: "How to get a business loan", href: "/how-to-get-a-business-loan-australia", category: "Business finance", kind: "Guide", keywords: "how to get apply for a business loan australia steps requirements" },
  { title: "What lenders look at (eligibility)", href: "/business-loan-eligibility-australia", category: "Business finance", kind: "Guide", keywords: "business loan eligibility requirements criteria qualify australia abn revenue" },
  { title: "Lumi business loans", href: "/business-loans/lumi", category: "Business finance", kind: "Review", keywords: "lumi business loan review rates eligibility australia" },
  { title: "Lumi review", href: "/business-loans/lumi/review", category: "Business finance", kind: "Review", keywords: "lumi review is lumi legit business lender australia" },
  { title: "Moula business loans", href: "/business-loans/moula", category: "Business finance", kind: "Review", keywords: "moula business loan review rates eligibility australia" },
  { title: "Moula review", href: "/business-loans/moula/review", category: "Business finance", kind: "Review", keywords: "moula review is moula legit business lender australia" },
  { title: "Prospa business loans", href: "/business-loans/prospa", category: "Business finance", kind: "Review", keywords: "prospa business loan review rates eligibility australia" },
  { title: "Prospa review", href: "/business-loans/prospa/review", category: "Business finance", kind: "Review", keywords: "prospa review is prospa legit business lender australia asx" },
  { title: "How Refer Labs makes money", href: "/how-we-make-money", category: "Browse", kind: "Guide", keywords: "how we make money affiliate commission lender referral disclosure" },

  // Core site pages
  { title: "All business software", href: "/business-software", category: "Software", kind: "Category", keywords: "business software tools directory all categories" },
  { title: "Popups, quizzes & lead capture", href: "/compare/lead-generation", category: "Software", kind: "Category", keywords: "popups quizzes calculators lead capture hello bar outgrow flexiquiz" },
  { title: "FAQ", href: "/faq", category: "Browse", kind: "Guide", keywords: "faq frequently asked questions help" },
  { title: "About Refer Labs", href: "/about", category: "Browse", kind: "Guide", keywords: "about us who we are company refer labs" },
  { title: "How we research", href: "/how-we-research", category: "Browse", kind: "Guide", keywords: "editorial standards methodology independence how we research disclosure" },
  { title: "Contact", href: "/contact", category: "Browse", kind: "Guide", keywords: "contact email get in touch support" },
  { title: "For business", href: "/for-business", category: "Browse", kind: "Category", keywords: "for business brands partner with us grow" },
  { title: "Get featured on a comparison", href: "/comparison-website", category: "Browse", kind: "Guide", keywords: "get featured listed comparison website partner brand" },
  { title: "Growth services", href: "/services", category: "Browse", kind: "Category", keywords: "services growth distribution done with you" },
  { title: "Affiliate distribution service", href: "/services/affiliate-distribution", category: "Browse", kind: "Guide", keywords: "affiliate distribution service program growth" },
  { title: "Referral program service", href: "/services/referral-programs", category: "Browse", kind: "Guide", keywords: "referral program service build launch" },
  { title: "APAC expansion service", href: "/services/apac-expansion", category: "Browse", kind: "Guide", keywords: "apac expansion australia market entry service" },
  { title: "Partner activation service", href: "/services/partner-activation", category: "Browse", kind: "Guide", keywords: "partner activation service channel" },
  { title: "Product distribution service", href: "/services/product-distribution", category: "Browse", kind: "Guide", keywords: "product distribution service reach" },
  { title: "Privacy policy", href: "/privacy", category: "Browse", kind: "Guide", keywords: "privacy policy data personal information collection" },
  { title: "Terms of service", href: "/terms", category: "Browse", kind: "Guide", keywords: "terms of service conditions legal" },
];

/**
 * Ranked site search.
 *
 * Scoring favours, in order: the full phrase in the title, the full phrase
 * anywhere, entries matching EVERY search term, then per-term title/keyword hits.
 * Entries that match every term are returned first; if nothing matches all terms
 * we fall back to partial matches so a typo or an extra word still returns
 * something useful rather than an empty state.
 */
export function searchEntries(query: string, limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/).filter(Boolean);

  const scored = SEARCH_INDEX.map((e) => {
    const title = e.title.toLowerCase();
    const hay = `${title} ${e.category} ${e.kind} ${e.keywords ?? ""}`.toLowerCase();

    let score = 0;
    let matchedAll = true;
    for (const w of words) {
      let s = 0;
      if (title.startsWith(w)) s += 5;
      if (title.includes(w)) s += 3;
      else if (hay.includes(w)) s += 1;
      if (s === 0) matchedAll = false;
      score += s;
    }
    // Whole-phrase matches are the strongest relevance signal.
    if (title.includes(q)) score += 8;
    else if (hay.includes(q)) score += 4;
    // Reward covering every term so multi-word queries stop returning noise.
    if (matchedAll && words.length > 1) score += 4;
    // Categories are broader entry points; nudge them up on ties.
    if (e.kind === "Category") score += 1;

    return { e, score, matchedAll };
  }).filter((r) => r.score > 0);

  const complete = scored.filter((r) => r.matchedAll);
  const pool = complete.length > 0 ? complete : scored;

  return pool
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.e);
}
