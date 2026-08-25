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
  { title: "Deals & discount codes", href: "/deals", category: "Deals", kind: "Guide", keywords: "deals discount codes promo codes australia moshy mosh apollo offers current verified" },
  { title: "Weight loss & telehealth", href: "/weight-loss", category: "Health", kind: "Category", keywords: "weight management obesity diet telehealth weight management telehealth online clinic" },
  { title: "Hair loss treatment", href: "/hair-loss", category: "Health", kind: "Category", keywords: "hair regrowth balding thinning telehealth topical scalp" },
  { title: "Who underwrites pet insurance in Australia", href: "/who-underwrites-pet-insurance-australia", category: "Insurance", kind: "Guide", keywords: "who underwrites pet insurance petsure hollard pacific international knose petsonme trupanion bow wow underwriter issuer australia" },
  { title: "Pet insurance", href: "/pet-insurance", category: "Insurance", kind: "Category", keywords: "pet insurance australia dog cat cover waiting period exclusions excess annual limit knose offers referrer" },
  { title: "Skin & beauty", href: "/skin-and-beauty", category: "Skin & beauty", kind: "Category", keywords: "skincare australia skin treatments beauty acne anti ageing led mask" },
  { title: "Coming soon: what we are building", href: "/coming-soon", category: "Refer Labs", kind: "Guide", keywords: "coming soon new sections skin beauty sleep refer labs" },
  { title: "Longevity", href: "/longevity", category: "Longevity", kind: "Category", keywords: "longevity australia biohacking recovery diagnostics supplements" },
  { title: "Recovery: ice baths and saunas", href: "/longevity/recovery", category: "Longevity", kind: "Category", keywords: "ice bath sauna australia recovery cold plunge" },
  { title: "Ice bath running costs", href: "/longevity/recovery/ice-bath-running-costs-australia", category: "Longevity", kind: "Guide", keywords: "ice bath running cost australia chiller electricity cold plunge" },
  { title: "Comparing ice baths", href: "/longevity/recovery/ice-bath-comparison-australia", category: "Longevity", kind: "Guide", keywords: "ice bath comparison australia chiller insulation filtration" },
  { title: "Home sauna cost", href: "/longevity/recovery/home-sauna-cost-australia", category: "Longevity", kind: "Guide", keywords: "home sauna cost australia installation electrician running cost" },
  { title: "Infrared vs traditional sauna", href: "/longevity/recovery/infrared-vs-traditional-sauna-australia", category: "Longevity", kind: "Guide", keywords: "infrared vs traditional sauna australia difference" },
  { title: "Contrast therapy evidence", href: "/longevity/recovery/contrast-therapy-what-the-evidence-says", category: "Longevity", kind: "Guide", keywords: "contrast therapy evidence cold plunge research" },
  { title: "Recovery setup quiz", href: "/longevity/recovery/recovery-setup-quiz", category: "Longevity", kind: "Guide", keywords: "recovery setup quiz ice bath or sauna australia" },
  { title: "Diagnostics & screening", href: "/longevity/diagnostics", category: "Longevity", kind: "Category", keywords: "health screening australia diagnostics preventive" },
  { title: "Whole-body MRI cost", href: "/longevity/diagnostics/whole-body-mri-australia-cost", category: "Longevity", kind: "Guide", keywords: "whole body mri australia cost prenuvo medicare incidental findings" },
  { title: "Everlab vs Prenuvo vs i-screen", href: "/longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia", category: "Longevity", kind: "Guide", keywords: "everlab prenuvo i-screen australia compared screening" },
  { title: "Biological age testing", href: "/longevity/diagnostics/biological-age-testing-australia", category: "Longevity", kind: "Guide", keywords: "biological age test australia epigenetic methylation" },
  { title: "CGM without diabetes", href: "/longevity/diagnostics/cgm-for-non-diabetics-australia", category: "Longevity", kind: "Guide", keywords: "cgm non diabetic australia glucose monitor cost ndss" },
  { title: "Health screening quiz", href: "/longevity/diagnostics/health-screening-quiz", category: "Longevity", kind: "Guide", keywords: "health screening quiz australia worth it" },
  { title: "Longevity supplements evidence", href: "/longevity/supplements/longevity-supplements-evidence-review", category: "Longevity", kind: "Guide", keywords: "longevity supplements australia aust l evidence review" },
  { title: "Men's health", href: "/mens-health", category: "Men's health", kind: "Category", keywords: "mens health australia erectile dysfunction premature ejaculation online clinic cost" },
  { title: "Erectile dysfunction treatment cost", href: "/mens-health/erectile-dysfunction-treatment-cost-australia", category: "Men's health", kind: "Guide", keywords: "erectile dysfunction cost australia ed treatment gp telehealth medicare" },
  { title: "Premature ejaculation options", href: "/mens-health/premature-ejaculation-treatment-options-australia", category: "Men's health", kind: "Guide", keywords: "premature ejaculation australia treatment options psychology mental health plan" },
  { title: "Online men's health clinics compared", href: "/mens-health/online-mens-health-clinics-compared", category: "Men's health", kind: "Guide", keywords: "online mens health clinic australia subscription consult model ahpra" },
  { title: "Telehealth or a GP for men's health", href: "/mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health", category: "Men's health", kind: "Guide", keywords: "telehealth vs gp cost mens health bulk billed medicare rebate" },
  { title: "Sexual wellness products", href: "/mens-health/sexual-wellness-products", category: "Men's health", kind: "Guide", keywords: "sexual wellness products australia retail adults artg" },
  { title: "Men's health quiz", href: "/mens-health/mens-health-quiz", category: "Men's health", kind: "Guide", keywords: "mens health quiz australia gp or online clinic" },
  { title: "Sleep", href: "/sleep", category: "Sleep", kind: "Category", keywords: "sleep australia sleep apnoea cpap mattress sleep tracker sleep study" },
  { title: "Do I have sleep apnoea?", href: "/sleep/do-i-have-sleep-apnoea", category: "Sleep", kind: "Guide", keywords: "sleep apnoea diagnosis australia gp referral sleep study symptoms" },
  { title: "Home sleep study cost", href: "/sleep/home-sleep-test-australia-cost", category: "Sleep", kind: "Guide", keywords: "home sleep study australia cost medicare rebate referral bulk billed" },
  { title: "CPAP costs in Australia", href: "/sleep/cpap-machine-costs-australia", category: "Sleep", kind: "Guide", keywords: "cpap machine cost australia resmed airsense price consumables" },
  { title: "Comparing mattresses", href: "/sleep/mattress-comparison-australia", category: "Sleep", kind: "Guide", keywords: "mattress comparison australia trial period foam density warranty" },
  { title: "Sleep trackers", href: "/sleep/sleep-tracker-comparison-australia", category: "Sleep", kind: "Guide", keywords: "sleep tracker australia accuracy wearable vs sleep study" },
  { title: "What good sleep costs", href: "/sleep/how-much-does-good-sleep-cost", category: "Sleep", kind: "Guide", keywords: "cost of good sleep australia free sleep improvements worth it" },
  { title: "Retinol vs prescription-strength", href: "/skin-and-beauty/retinol-vs-prescription-strength-australia", category: "Skin & beauty", kind: "Guide", keywords: "retinol australia prescription strength skincare access route" },
  { title: "LED face masks in Australia", href: "/skin-and-beauty/led-face-mask-comparison-australia", category: "Skin & beauty", kind: "Guide", keywords: "led face mask australia price omnilux red light therapy artg" },
  { title: "Skincare cost per use", href: "/skin-and-beauty/best-value-skincare-australia-cost-per-use", category: "Skin & beauty", kind: "Guide", keywords: "best value skincare australia cost per use expensive skincare worth it" },
  { title: "Acne treatment routes and costs", href: "/skin-and-beauty/acne-treatment-options-and-costs-australia", category: "Skin & beauty", kind: "Guide", keywords: "acne treatment australia cost gp dermatologist medicare referral" },
  { title: "Anti-ageing treatment pricing", href: "/skin-and-beauty/anti-ageing-treatments-what-they-cost", category: "Skin & beauty", kind: "Guide", keywords: "anti ageing treatment cost australia cosmetic clinic quote" },
  { title: "Skincare quiz", href: "/skin-and-beauty/skincare-quiz", category: "Skin & beauty", kind: "Guide", keywords: "skincare quiz routine matcher australia" },
  { title: "Knose pet insurance (2 months free)", href: "/knose", category: "Insurance", kind: "Guide", keywords: "knose pet insurance promo code referlab2mf 2 months free australia quote" },
  { title: "PetsOnMe pet insurance", href: "/petsonme", category: "Insurance", kind: "Guide", keywords: "petsonme pets on me pet insurance australia accidental classic deluxe plan annual limit 80% excess referlabs code hereditary dental pacific international" },
  { title: "Knose vs PetsOnMe", href: "/knose-vs-petsonme", category: "Insurance", kind: "Guide", keywords: "knose vs petsonme pet insurance compare benefit percentage 90% 80% annual limit excess sub-limits hereditary dental australia" },
  { title: "Best pet insurance Australia: how to choose", href: "/best-pet-insurance-australia", category: "Insurance", kind: "Guide", keywords: "best pet insurance australia compare dog cat insurance benefit percentage annual limit hereditary waiting period excess exclusions petsonme knose" },
  { title: "What pet insurance covers", href: "/what-pet-insurance-covers-australia", category: "Insurance", kind: "Guide", keywords: "what pet insurance covers waiting period exclusions excess benefit percentage annual limit accident illness pds" },
  { title: "Website & landing-page builders", href: "/compare/website-builders", category: "Software", kind: "Category", keywords: "no-code landing page builder leadpages landingi ai website site builder web design maker" },
  { title: "Newsletter platforms", href: "/compare/newsletter-platforms", category: "Creator tools", kind: "Category", keywords: "email marketing email list substack convertkit creator audience" },
  { title: "HR & payroll software", href: "/compare/hr-payroll", category: "Software", kind: "Category", keywords: "hr payroll employment hero software compare team pay onboarding benefits" },
  { title: "Sales & outreach tools", href: "/compare/sales-outreach", category: "AI & sales", kind: "Category", keywords: "sales outreach cold email snov.io reply.io prospecting sequences lead generation" },
  { title: "Payments & finance tools", href: "/compare/payments", category: "Software", kind: "Category", keywords: "payments payoneer cross border get paid freelancer global business account fintech" },
  { title: "All guides & comparisons", href: "/guides", category: "Browse", kind: "Category", keywords: "articles reviews compare everything index" },

  // Weight loss
  { title: "Moshy, explained: how the service works", href: "/moshy-review", category: "Weight loss", kind: "Guide", keywords: "getmoshy moshy review telehealth weight management online clinic" },
  { title: "Moshy vs Juniper", href: "/moshy-vs-juniper", category: "Weight loss", kind: "Guide", keywords: "compare weight loss telehealth juniper" },
  { title: "Juniper review (women's weight-management)", href: "/juniper", category: "Weight loss", kind: "Guide", keywords: "juniper australia weight loss review cost 349 coaching women weight management vs moshy myjuniper" },
  { title: "Best weight loss telehealth in Australia", href: "/best-weight-loss-telehealth-australia", category: "Weight loss", kind: "Guide", keywords: "top online weight loss clinic australia weight management" },
  { title: "Do you qualify for weight-loss treatment?", href: "/weight-loss-treatment-eligibility-australia", category: "Weight loss", kind: "Guide", keywords: "weight loss treatment eligibility australia do i qualify bmi criteria am i eligible" },
  { title: "Moshy vs your GP", href: "/moshy-vs-gp", category: "Weight loss", kind: "Guide", keywords: "doctor bulk bill medicare gp telehealth" },
  { title: "Moshy alternatives", href: "/moshy-alternatives", category: "Weight loss", kind: "Guide", keywords: "other options competitors similar" },
  { title: "Moshy eligibility check explained", href: "/moshy-eligibility", category: "Weight loss", kind: "Guide", keywords: "qualify assessment questionnaire suitability" },
  { title: "Weight-loss cost calculator", href: "/weight-loss-cost-calculator", category: "Weight loss", kind: "Guide", keywords: "cost calculator price how much pay subscription gp medicare pathway planner tool" },
  { title: "Which weight-loss option fits you", href: "/weight-loss-quiz", category: "Weight loss", kind: "Guide", keywords: "which weight loss program quiz match telehealth or gp online moshy eligibility recommend option for me" },
  { title: "Online weight loss programs, untangled", href: "/online-weight-loss-programs-australia", category: "Weight loss", kind: "Guide", keywords: "compare programs australia" },
  { title: "Weight loss telehealth for men", href: "/weight-loss-telehealth-men-australia", category: "Weight loss", kind: "Guide", keywords: "mens weight loss male" },
  { title: "Moshy offer & referral link", href: "/moshy", category: "Weight loss", kind: "Guide", keywords: "getmoshy discount code deal sign up" },
  { title: "getmoshy.com.au explained", href: "/getmoshy", category: "Weight loss", kind: "Guide", keywords: "moshy website legit real" },

  // Hair loss
  { title: "Hair loss: compare your options", href: "/hair-loss", category: "Hair loss", kind: "Guide", keywords: "hair loss australia compare telehealth topical options men" },
  { title: "Best hair loss treatment in Australia", href: "/best-hair-loss-treatment-australia", category: "Hair loss", kind: "Guide", keywords: "regrowth telehealth topical prescription treatment top compare" },
  { title: "Mosh hair: what to know & offer", href: "/moshhair", category: "Hair loss", kind: "Guide", keywords: "mosh review mens hair loss telehealth offer discount" },
  { title: "Mosh review: is it legit & worth it?", href: "/mosh-review", category: "Hair loss", kind: "Guide", keywords: "mosh review is mosh legit worth it does mosh work reviews australia" },
  { title: "Early signs of hair loss in men", href: "/early-signs-of-hair-loss-australia", category: "Hair loss", kind: "Guide", keywords: "early signs of hair loss am i going bald how to tell thinning crown balding signs" },
  { title: "Hair loss treatment cost in Australia", href: "/hair-loss-treatment-cost-australia", category: "Hair loss", kind: "Guide", keywords: "hair loss treatment cost australia mosh price subscription telehealth" },
  { title: "Online hair loss treatment in Australia", href: "/online-hair-loss-treatment-australia", category: "Hair loss", kind: "Guide", keywords: "online hair loss treatment telehealth doctor australia assessment prescription" },
  { title: "How to stop hair loss", href: "/how-to-stop-hair-loss-australia", category: "Hair loss", kind: "Guide", keywords: "how to stop hair loss balding men male pattern treatment australia" },
  { title: "Receding hairline treatment", href: "/receding-hairline-treatment-australia", category: "Hair loss", kind: "Guide", keywords: "receding hairline treatment male pattern telehealth australia" },
  { title: "Mosh vs Dense", href: "/mosh-vs-dense", category: "Hair loss", kind: "Guide", keywords: "mosh vs dense hair loss clinical topical compare" },
  { title: "Mosh vs Pilot", href: "/mosh-vs-pilot", category: "Hair loss", kind: "Guide", keywords: "mosh vs pilot hair loss mens telehealth compare" },
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
  { title: "Solar & energy: where to start", href: "/solar-and-energy", category: "Solar & energy", kind: "Category", keywords: "solar energy australia home battery guide rebate payback installer portable power renters hub" },
  { title: "EcoFlow vs Anker SOLIX: priced per watt-hour", href: "/ecoflow-vs-anker-solix", category: "Solar & energy", kind: "Guide", keywords: "ecoflow vs anker solix comparison portable power station delta river c1000 c2000 f3800 price per wh australia" },
  { title: "Portable power stations in Australia: prices & runtimes", href: "/portable-power-station-australia", category: "Solar & energy", kind: "Guide", keywords: "portable power station australia price best portable battery camping blackout backup fridge runtime ecoflow anker" },
  { title: "EcoFlow Australia: the range and what it costs", href: "/ecoflow", category: "Solar & energy", kind: "Guide", keywords: "ecoflow australia price delta 3 river 3 delta pro ultra portable power station review discount" },
  { title: "Anker SOLIX Australia: the range and what it costs", href: "/anker-solix", category: "Solar & energy", kind: "Guide", keywords: "anker solix australia price c300 c1000 c2000 f3800 portable power station review discount" },
  { title: "Portable vs installed home battery", href: "/portable-vs-installed-home-battery-australia", category: "Solar & energy", kind: "Guide", keywords: "portable vs installed home battery australia rebate renters apartment blackout backup which is better" },
  { title: "Apollo Energy Group: home batteries & $500 off", href: "/apollo-energy-group", category: "Solar & energy", kind: "Guide", keywords: "apollo energy group home battery australia solar battery rebate cheaper home batteries installer $500 discount" },
  { title: "Home battery cost in Australia 2026", href: "/home-battery-cost-australia", category: "Solar & energy", kind: "Guide", keywords: "home battery cost australia price payback period tesla powerwall installed cost solar battery" },
  { title: "Home battery payback calculator", href: "/home-battery-payback-calculator", category: "Solar & energy", kind: "Guide", keywords: "home battery payback calculator savings roi is a battery worth it australia" },
  { title: "Apollo Energy Group review: is it legit?", href: "/apollo-energy-review", category: "Solar & energy", kind: "Guide", keywords: "apollo energy group review is apollo energy legit apollo battery installer reviews australia $500 discount" },
  { title: "Home battery rebate Australia 2026", href: "/home-battery-rebate-australia", category: "Solar & energy", kind: "Guide", keywords: "home battery rebate australia cheaper home batteries program battery rebate 2026 solar battery rebate stc taper 14kwh how much" },
  { title: "Home battery rebate by state 2026", href: "/home-battery-rebate-by-state-australia", category: "Solar & energy", kind: "Guide", keywords: "home battery rebate by state nsw victoria queensland wa sa tasmania act nt state battery incentive scheme which states 2026" },
  { title: "Virtual power plant (VPP) Australia 2026", href: "/virtual-power-plant-australia", category: "Solar & energy", kind: "Guide", keywords: "virtual power plant vpp australia how payments work is it worth it home battery vpp incentive nsw join a vpp earnings warranty cycling" },
  { title: "Best home battery in Australia", href: "/best-home-battery-australia", category: "Solar & energy", kind: "Guide", keywords: "best home battery australia solar battery choose capacity chemistry lfp warranty vpp compare" },
  { title: "What size home battery do I need", href: "/what-size-home-battery-do-i-need-australia", category: "Solar & energy", kind: "Guide", keywords: "what size home battery do i need kwh sizing calculator australia how many" },
  { title: "NSW home battery rebate 2026", href: "/nsw-home-battery-rebate-2026", category: "Solar & energy", kind: "Guide", keywords: "nsw home battery rebate 2026 vpp incentive federal stack sydney pdrs" },
  { title: "Home battery installer NSW", href: "/home-battery-installer-nsw", category: "Solar & energy", kind: "Guide", keywords: "home battery installer nsw sydney saa accredited electrical licence solar battery installation" },
  { title: "Weight loss telehealth for women", href: "/weight-loss-telehealth-women-australia", category: "Health", kind: "Guide", keywords: "weight loss telehealth women australia female online program juniper alternative moshy" },
  { title: "Best CRM for small business", href: "/best-crm-small-business-australia", category: "Business software", kind: "Guide", keywords: "best crm small business australia pipedrive capsule nutshell keap cheapest simple crm" },
  { title: "Home battery installer Sydney", href: "/home-battery-installer-sydney", category: "Solar & energy", kind: "Guide", keywords: "home battery installer sydney solar battery installation sydney metro nsw saa accredited" },
  { title: "Solar and battery packages", href: "/solar-and-battery-package-australia", category: "Solar & energy", kind: "Guide", keywords: "solar and battery package australia bundle solar plus storage sizing rebate cost" },
  { title: "Tesla Powerwall alternatives", href: "/tesla-powerwall-alternatives-australia", category: "Solar & energy", kind: "Guide", keywords: "tesla powerwall alternatives australia home battery vs powerwall compare best alternative" },
  { title: "Is a home battery worth it?", href: "/is-a-home-battery-worth-it-australia", category: "Solar & energy", kind: "Guide", keywords: "is a home battery worth it australia are batteries worth it 2026 payback solar battery worth" },
  { title: "Home battery blackout backup", href: "/home-battery-blackout-backup-australia", category: "Solar & energy", kind: "Guide", keywords: "home battery backup blackout power outage does battery work in blackout whole home essential circuits" },
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
  { title: "Affiliate & referral software: how to choose", href: "/affiliate-software-australia", category: "Affiliate marketing", kind: "Guide", keywords: "affiliate software australia referral software platform for brands pricing" },
  { title: "Best affiliate programs in Australia", href: "/affiliate-programs-australia", category: "Affiliate marketing", kind: "Guide", keywords: "best affiliate programs australia by category highest paying recurring" },
  { title: "Highest-paying affiliate programs", href: "/high-paying-affiliate-programs", category: "Affiliate marketing", kind: "Guide", keywords: "highest paying high commission affiliate programs big payout" },
  { title: "Best recurring affiliate programs", href: "/recurring-affiliate-programs", category: "Affiliate marketing", kind: "Guide", keywords: "recurring commission monthly affiliate programs saas subscription passive" },
  { title: "How to start affiliate marketing in Australia", href: "/how-to-start-affiliate-marketing-australia", category: "Affiliate marketing", kind: "Guide", keywords: "how to start affiliate marketing australia beginner guide from zero" },

  // Prediction markets

  // Peptides

  // Weight loss (guides + head-to-heads not yet indexed)
  { title: "Weight-loss telehealth cost, explained", href: "/weight-loss-telehealth-cost-australia", category: "Weight loss", kind: "Guide", keywords: "cost price how much weight loss telehealth australia subscription" },
  { title: "Cheapest weight-loss telehealth", href: "/cheapest-weight-loss-telehealth-australia", category: "Weight loss", kind: "Guide", keywords: "cheapest affordable low cost weight loss telehealth australia" },
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
  { title: "Landingi", href: "/landingi", category: "Software", kind: "Guide", keywords: "landingi landing page builder no-code conversion" },
  { title: "Unbounce (20% off 3 months, or 35% off a year)", href: "/unbounce", category: "Website builders", kind: "Review", keywords: "unbounce discount code promo landing page builder conversion ab testing" },
  { title: "Nutshell CRM", href: "/nutshell", category: "AI & sales", kind: "Guide", keywords: "nutshell crm easy sales pipeline marketing small business" },
  { title: "Outgrow", href: "/outgrow", category: "Software", kind: "Guide", keywords: "outgrow interactive quizzes calculators lead generation content" },
  { title: "Pipedrive CRM", href: "/pipedrive", category: "AI & sales", kind: "Guide", keywords: "pipedrive crm visual sales pipeline deals" },

  // Business finance (lending vertical)
  { title: "How Refer Labs makes money", href: "/how-we-make-money", category: "Browse", kind: "Guide", keywords: "how we make money affiliate commission lender referral disclosure" },

  // Core site pages
  { title: "All business software", href: "/business-software", category: "Software", kind: "Category", keywords: "business software tools directory all categories" },
  { title: "Popups, quizzes & lead capture", href: "/compare/lead-generation", category: "Software", kind: "Category", keywords: "popups quizzes calculators lead capture hello bar outgrow flexiquiz" },
  { title: "FAQ", href: "/faq", category: "Browse", kind: "Guide", keywords: "faq frequently asked questions help" },
  { title: "About Refer Labs", href: "/about", category: "Browse", kind: "Guide", keywords: "about us who we are company refer labs" },
  { title: "Contact", href: "/contact", category: "Browse", kind: "Guide", keywords: "contact email get in touch support" },
  { title: "For business", href: "/for-business", category: "Browse", kind: "Category", keywords: "for business brands partner with us grow" },
  { title: "Get featured on a comparison", href: "/comparison-website", category: "Browse", kind: "Guide", keywords: "get featured listed comparison website partner brand" },
  { title: "Privacy policy", href: "/privacy", category: "Browse", kind: "Guide", keywords: "privacy policy data personal information collection" },
  { title: "Terms of service", href: "/terms", category: "Browse", kind: "Guide", keywords: "terms of service conditions legal" },
];

/** A word plus simple singular forms: batteries -> battery, loans -> loan. */
function wordVariants(w: string): string[] {
  const out = [w];
  if (w.endsWith("ies") && w.length > 4) out.push(`${w.slice(0, -3)}y`);
  if (w.endsWith("es") && w.length > 3) out.push(w.slice(0, -2));
  if (w.endsWith("s") && w.length > 3) out.push(w.slice(0, -1));
  return out;
}

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
      // Try the word, then simple singular forms, so "batteries" finds "battery"
      // and "loans" finds "loan" without needing every plural in the keywords.
      for (const v of wordVariants(w)) {
        if (title.startsWith(v)) s += 5;
        if (title.includes(v)) s += 3;
        else if (hay.includes(v)) s += 1;
        if (s > 0) break;
      }
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
