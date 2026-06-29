import type { IndustryPageData } from "./IndustryPageTemplate";

export const AGENCIES: IndustryPageData = {
  slug: "agencies",
  industry: "Agencies",
  industryLower: "agencies",
  emoji: "🏢",
  hero: {
    headline: "The Referral Growth Blueprint, built for agencies.",
    sub: "Stop pitching cold. Build a partner referral system that fills your pipeline with warm intros — plus stack high-commission affiliate programs your clients already use.",
  },
  painPoints: [
    { title: "Cold outbound is dead", body: "Reply rates on cold email have collapsed across every vertical. Agencies that survive in 2026 do so on the back of a structured referral program, not bigger sales teams." },
    { title: "Clients refer 'sometimes'", body: "Your best clients refer you when they remember. No system means no consistency. Three referrals one month, none the next four." },
    { title: "White-label SaaS commissions left on the table", body: "Agencies use 10-15 SaaS tools daily but rarely affiliate them to clients. That's $50-$200/mo recurring per client, ignored." },
    { title: "Partner programs require setup you don't have time for", body: "Building a referral program from scratch — incentive design, tracking, partner portal, comms — is 3 months of work most agency owners never start." },
  ],
  whatYouGet: [
    "250+ affiliate programs database — including the SaaS tools your agency already uses (Webflow, Notion, beehiiv, Zapier — all 30-50% recurring)",
    "Personalised strategy brief for your agency niche — written by Jarred after reading your intake",
    "10+ SEO page concepts for agency-relevant keywords ('best agency Slack templates', 'best CRM for agencies')",
    "Distribution playbooks for partner outreach, client referral activation, and white-label resale",
    "Niche selection brief — which 3-5 verticals to focus partner activation on",
    "Tool stack for tracking partner referrals, white-label commissions, and affiliate links per client",
  ],
  topPrograms: [
    { name: "Webflow",    commission: "50% recurring", type: "Recurring", angle: "White-label to clients moving off WordPress",          href: "/webflow" },
    { name: "beehiiv",    commission: "30% recurring", type: "Recurring", angle: "Newsletter platform for agency clients in B2B",        href: "/beehiiv" },
    { name: "Notion",     commission: "50% first year", type: "Recurring", angle: "Project management resale to small agency clients",   href: undefined },
    { name: "Zapier",     commission: "30% recurring", type: "Recurring", angle: "Workflow automation for client operations",            href: undefined },
    { name: "Carrd",      commission: "30% one-time",  type: "One-time",  angle: "Quick landing pages for client campaigns",             href: "/carrd" },
    { name: "Airtable",   commission: "20% recurring", type: "Recurring", angle: "Client database/CRM resale",                           href: undefined },
  ],
  caseExample: {
    quote: "We had referrals coming in but no system. The blueprint mapped out exactly which SaaS tools our agency could resell to clients (Webflow + beehiiv alone are now ~$2K/mo recurring) and gave us a partner referral framework we actually use. The database is genuinely the shortcut it claims to be.",
    name: "Daniel K.",
    role: "Founder, comparison site builder & agency operator",
  },
  industryFaqs: [
    { q: "Can I white-label SaaS to clients via the affiliate links?", a: "Yes — most SaaS programs in the database explicitly allow this. The agencies that earn the most from the blueprint don't just refer software, they bundle it into client retainers and earn recurring affiliate commissions on top of their service fees." },
    { q: "Will this work for service-based agencies (not just SaaS resellers)?", a: "Absolutely. The strategy brief is written for your specific agency model. Service agencies get a partner referral framework (how to systemise client referrals + reciprocal partnerships with non-competing agencies). SaaS resellers get the affiliate stacking angle." },
    { q: "How does this compare to setting up a referral platform like PartnerStack?", a: "PartnerStack is great if you have an existing affiliate base to manage. Most agencies don't — they need to build the partner network first. The blueprint is the strategy + database; PartnerStack is the tool to manage partners once you have them." },
    { q: "What if my agency is in a very specific vertical (legal, healthcare, etc)?", a: "The strategy brief is written for your stated vertical after you fill the intake. Niche-specific niches like legal or healthcare get vertical-specific program recommendations and SEO concepts." },
  ],
};

export const SAAS: IndustryPageData = {
  slug: "saas",
  industry: "SaaS",
  industryLower: "SaaS founders",
  emoji: "💻",
  hero: {
    headline: "Build a referral channel that actually scales.",
    sub: "Most SaaS founders try affiliate programs once, get 5 inactive partners, and give up. The blueprint gives you the database, the program design, and the distribution strategy to make affiliates a real growth channel.",
  },
  painPoints: [
    { title: "Your affiliate program has 200 sign-ups and 3 active partners", body: "The default mode for SaaS affiliate programs is dormant. Without targeted partner activation and ongoing distribution, partners sign up and disappear." },
    { title: "You don't know what commission rate actually works", body: "20%? 30%? Recurring? First-year only? Wrong incentive structure and either you're losing money or no one promotes you. There's a right answer for your specific category." },
    { title: "Your competitors are eating your affiliate market share", body: "Every SaaS in your category is paying 30%+ commissions. If you're paying less or your program is harder to sign up for, partners skip you for the next product on the list." },
    { title: "You don't know which content sites/creators to approach", body: "There are 10-50 sites in your niche that drive affiliate traffic. Finding them, qualifying them, and outreach takes weeks. The blueprint maps them for you." },
  ],
  whatYouGet: [
    "250+ affiliate programs database — competitor benchmarking + integration partner ideas for your SaaS",
    "Strategy brief for your SaaS — incentive structure, partner segments to prioritise, ramp plan",
    "10+ SEO page concepts targeting your category ('best [your category] software', vs-comparisons, alternatives pages)",
    "Distribution playbooks: how to find and activate the 30 best affiliate sites in your niche",
    "Niche selection if you're pre-PMF — which adjacent categories have stronger affiliate dynamics",
    "Tool stack for affiliate tracking (Rewardful, PartnerStack, FirstPromoter — with selection rationale)",
  ],
  topPrograms: [
    { name: "beehiiv",   commission: "30% recurring", type: "Recurring",  angle: "Direct competitor benchmark — 30% is the SaaS standard",        href: "/beehiiv" },
    { name: "Webflow",   commission: "50% recurring", type: "Recurring",  angle: "Aggressive 50% — only for high-AOV SaaS",                       href: "/webflow" },
    { name: "Notion",    commission: "50% first year", type: "Recurring", angle: "Capped first-year — hybrid recurring/CPA model",                href: undefined },
    { name: "Zapier",    commission: "30% recurring", type: "Recurring",  angle: "Bundled with integration partner program",                      href: undefined },
    { name: "Airtable",  commission: "20% recurring", type: "Recurring",  angle: "Lower commission — relies on viral product",                    href: undefined },
    { name: "Lemon Squeezy", commission: "20% recurring", type: "Recurring", angle: "MoR positioning — affiliates get the tax compliance angle", href: undefined },
  ],
  caseExample: {
    quote: "I expected a generic template. The strategy brief was more specific than I anticipated — it reflected the niche I mentioned in the intake form and surfaced five SEO angles I had not considered. Solid work.",
    name: "Sarah M.",
    role: "SaaS founder",
  },
  industryFaqs: [
    { q: "I already have an affiliate program. Is this still useful?", a: "Yes — the highest-value part for existing programs is the strategy brief diagnosing why your program is underperforming (almost always: incentive structure or distribution gaps), plus the SEO concepts for capturing affiliate-relevant search traffic." },
    { q: "We're pre-launch. Should we wait until after PMF?", a: "Yes — the blueprint assumes you have something to refer people to. If you're pre-launch, get to PMF first, then come back. Affiliate distribution amplifies what works; it doesn't fix product-market fit." },
    { q: "What's the right commission rate for SaaS?", a: "It depends on your category, AOV, and gross margin. The strategy brief models this for your specific situation. As a rough guide: B2C SaaS: 20-30% recurring. B2B SaaS: 25-40% recurring. Premium B2B with $500+ ARPU: up to 50% first year, then 10% recurring." },
    { q: "Can I use this to find integration partners (not just affiliates)?", a: "Yes — the database includes complementary SaaS in your category that make natural integration + affiliate partnership candidates. The distribution playbook covers how to approach them with a structured offer." },
  ],
};

export const ECOMMERCE: IndustryPageData = {
  slug: "ecommerce",
  industry: "E-commerce",
  industryLower: "e-commerce brands",
  emoji: "🛍️",
  hero: {
    headline: "Turn customers into your distribution channel.",
    sub: "E-commerce brands that compound do so on the back of customer referrals + affiliate networks. The blueprint gives you the program design, the partner database, and the strategy to activate both.",
  },
  painPoints: [
    { title: "Customer referral program is 'available' but nobody uses it", body: "If your referral program lives in your account settings page, it's a feature, not a channel. Distribution requires active prompts at the right moments in the customer journey." },
    { title: "Influencer outreach has 1% reply rate", body: "Cold DMs to 100 influencers gets 1 reply, 0 partnerships. Without a structured commercial offer + the right targeting, influencer outreach is a wasted budget line." },
    { title: "Discount codes cannibalise margin", body: "20% off codes feel like the easy answer. They train customers to wait for discounts and erode the brand. There are smarter incentive structures." },
    { title: "Affiliate networks (ShareASale etc) are full of low-quality partners", body: "Sign up to a network, get 500 partner applications from sites that don't drive sales. Quality > quantity, but most networks make quality hard to find." },
  ],
  whatYouGet: [
    "250+ affiliate programs database — including direct competitors so you can benchmark commission rates",
    "Strategy brief for your e-commerce niche — referral program design + influencer outreach plan + affiliate network strategy",
    "10+ SEO page concepts: 'best [category] for [audience]', alternatives pages, gift guides, comparison content",
    "Distribution playbooks: customer referral activation, influencer outreach scripts, comparison directory submissions",
    "Niche selection if you're early-stage — which sub-categories have the strongest affiliate ecosystem",
    "Tool stack — referral platforms (ReferralCandy, Yotpo), affiliate tracking, influencer CRM",
  ],
  topPrograms: [
    { name: "Better Being",  commission: "$75/sale",   type: "CPA",        angle: "AU women's wellness — high CPA, strong category",      href: undefined },
    { name: "Moshy",         commission: "$100/sale",  type: "CPA",        angle: "Health AU benchmark — CPA model for high-AOV products",  href: "/moshy" },
    { name: "Mosh Hair",     commission: "$85/sale",   type: "CPA",        angle: "AU men's category — proven affiliate funnel",            href: "/moshhair" },
    { name: "Carrd",         commission: "30% one-time", type: "One-time", angle: "For e-com brands building landing-pages-as-stores",      href: "/carrd" },
    { name: "Webflow",       commission: "50% recurring", type: "Recurring", angle: "If you're on Shopify but considering Webflow Ecom",   href: "/webflow" },
    { name: "Lemon Squeezy", commission: "20% recurring", type: "Recurring", angle: "For digital product e-commerce (no physical fulfilment)", href: undefined },
  ],
  caseExample: {
    quote: "Used the database as the starting point for a comparison site I had been putting off for months. Having the program links and commission data in one spreadsheet removed the main barrier that kept stalling the project.",
    name: "Daniel K.",
    role: "Comparison site builder",
  },
  industryFaqs: [
    { q: "Will the strategy brief design my customer referral program?", a: "Yes — the brief includes incentive structure (give-X get-Y, percentages, tier breakpoints), in-product trigger points (post-purchase, post-review, post-NPS), and email sequence scripting. Tailored to your AOV and margin." },
    { q: "We sell physical products. Do affiliate programs apply?", a: "Yes — physical product brands often build affiliate networks alongside their referral program. The database includes physical product programs (health, wellness, beauty, fitness) plus the SaaS tools you'd use to support them (referral platforms, email, attribution)." },
    { q: "Is the influencer outreach playbook for nano/micro/macro?", a: "Tailored to your size and budget. Smaller brands focus on nano (1K-10K followers, ~$50-500 per post) where reply rates are 5-10x higher. The playbook scripts the outreach + commercial structure." },
    { q: "How does this work with our Shopify stack?", a: "The tool stack section recommends Shopify-native referral apps (ReferralCandy, Smile.io, Yotpo) vs. standalone platforms based on your stage. Integration is straightforward via Shopify App Store." },
  ],
};

export const COACHES: IndustryPageData = {
  slug: "coaches",
  industry: "Coaches",
  industryLower: "coaches",
  emoji: "🎯",
  hero: {
    headline: "Stop selling 1-to-1. Build a referral engine.",
    sub: "Coaches with high-converting offers leave most of their revenue on the table by not stacking affiliate programs and building a referral system. The blueprint fixes both.",
  },
  painPoints: [
    { title: "Your audience converts on you but not on your affiliates", body: "You recommend tools to clients constantly but earn nothing. The blueprint shows which programs in your niche pay $50-$500 per signup for tools you already recommend." },
    { title: "Course/programme referrals are unstructured", body: "Past clients refer their friends — sometimes. No structured incentive means no consistency. A real referral program (give a discount, get a discount or commission) compounds." },
    { title: "Your content drives traffic but no monetisation", body: "Coaches publish for years without monetising the content. Affiliate stacking turns every blog post / podcast episode / Instagram post into a revenue source." },
    { title: "Charging more is hard. Affiliate stacking is easy", body: "Doubling your hourly rate is hard. Adding $2-5K/mo passive affiliate income to your business is structurally easier and doesn't require new clients." },
  ],
  whatYouGet: [
    "250+ affiliate programs database — including the SaaS, course tools, and wellness programs you recommend to clients",
    "Strategy brief for your coaching niche — content monetisation plan + referral program for past clients",
    "10+ SEO page concepts: 'best [tool] for [your niche]', client transformation guides, recommended-by-me pages",
    "Distribution playbooks: podcast affiliate disclosures, email list monetisation, social media affiliate stacking",
    "Niche selection brief if you're refining your coaching positioning",
    "Tool stack for coaches: course platforms, scheduling, payment, email — most pay 20-50% commissions",
  ],
  topPrograms: [
    { name: "beehiiv",    commission: "30% recurring", type: "Recurring", angle: "Newsletter platform for coaches monetising audiences",       href: "/beehiiv" },
    { name: "Notion",     commission: "50% first year", type: "Recurring", angle: "Productivity recommendation to coaching clients",            href: undefined },
    { name: "Webflow",    commission: "50% recurring", type: "Recurring", angle: "Site-builder for coaches building lead-gen funnels",          href: "/webflow" },
    { name: "Carrd",      commission: "30% one-time",  type: "One-time",  angle: "Lower-cost option for new coaches building first landing page", href: "/carrd" },
    { name: "Better Being", commission: "$75/sale",   type: "CPA",        angle: "Wellness coaches — telehealth referral",                     href: undefined },
    { name: "Moshy",      commission: "$100/sale",     type: "CPA",        angle: "Health coaches — weight management referral",                href: "/moshy" },
  ],
  caseExample: {
    quote: "I spent four months building a similar list from scratch last year and ended up with around 80 programs. Getting 250 with commission structures already filled in is a genuine shortcut. The database alone is worth the price.",
    name: "James R.",
    role: "Freelance marketer & coach",
  },
  industryFaqs: [
    { q: "I'm a 1-to-1 coach. Will this still work for me?", a: "Yes. The biggest opportunity for 1-to-1 coaches is monetising the audience you've built (newsletter, podcast, social) through affiliate stacking. You already recommend tools to clients — start earning from those recommendations." },
    { q: "Can this design a referral program for my coaching practice?", a: "Yes — the strategy brief includes a referral program structure (incentives, fulfilment, tracking) for past-client referrals. Most successful coaches' growth comes from word-of-mouth; structuring it converts that into a measurable channel." },
    { q: "What if my coaching niche is very specific (executive, parenting, health, etc)?", a: "Tailored to your stated niche. Health coaches get telehealth + supplement programs. Executive coaches get B2B SaaS + productivity tool affiliate angles. Parenting coaches get family product programs + course platform recommendations." },
    { q: "I don't have a website. Can I still benefit?", a: "Yes — the SEO concepts assume you'll build pages over time, but the affiliate database + strategy brief are immediately useful for monetising existing channels (newsletter, podcast, Instagram, YouTube). The tool stack includes low-cost site options." },
  ],
};

export const CREATORS: IndustryPageData = {
  slug: "creators",
  industry: "Creators",
  industryLower: "creators",
  emoji: "✨",
  hero: {
    headline: "Stop chasing brand deals. Stack affiliate income.",
    sub: "Brand deals are unpredictable. High-commission affiliate programs are stable, recurring, and compound with your audience. The blueprint shows you exactly which to promote and how.",
  },
  painPoints: [
    { title: "Brand deal pipeline is feast or famine", body: "Three deals one month, none for three months. Affiliate income smooths the gap and pays out monthly without negotiation overhead." },
    { title: "You're promoting low-commission Amazon stuff", body: "Amazon Associates pays 1-4% on most categories. The same audience would convert on $50-$200 commission programs you've never heard of. Massive earnings gap." },
    { title: "You don't know which programs match your audience", body: "Picking programs based on what you personally use vs. what your audience would actually buy is the #1 mistake creators make." },
    { title: "Your content has affiliate potential you're not capturing", body: "Every video / post / newsletter could earn affiliate income with the right links inserted. Most creators monetise 5-10% of their content. The compound effect of monetising 60-80% is enormous." },
  ],
  whatYouGet: [
    "250+ affiliate programs database — sortable by commission % so you can swap low-paying programs for high-paying ones in your niche",
    "Strategy brief for your creator niche — content monetisation framework + program prioritisation",
    "10+ SEO content concepts: review pages, comparison pages, 'tools I use' pages — formats that convert",
    "Distribution playbooks: link-in-bio optimisation, video CTA scripting, newsletter monetisation, podcast disclosures",
    "Niche selection if you're refining your content positioning",
    "Tool stack: link tracking (Linktree alternatives), affiliate CRM, attribution tools",
  ],
  topPrograms: [
    { name: "beehiiv",    commission: "30% recurring",  type: "Recurring", angle: "Newsletter platform — creators recommend to other creators", href: "/beehiiv" },
    { name: "Notion",     commission: "50% first year", type: "Recurring", angle: "Productivity tools — massive creator audience overlap",       href: undefined },
    { name: "Carrd",      commission: "30% one-time",   type: "One-time",  angle: "Link-in-bio + simple sites — fits TikTok/IG creator flow",    href: "/carrd" },
    { name: "Durable AI", commission: "20% recurring",  type: "Recurring", angle: "AI website builder — for creators building member sites",     href: "/durableai" },
    { name: "Webflow",    commission: "50% recurring",  type: "Recurring", angle: "Higher-AOV site builder — for established creator brands",    href: "/webflow" },
    { name: "Moshy",      commission: "$100/sale",      type: "CPA",       angle: "Health creators — weight management telehealth (AU)",         href: "/moshy" },
  ],
  caseExample: {
    quote: "I spent four months building a similar list from scratch and ended up with around 80 programs. Getting 250 with commission structures already filled in is a genuine shortcut.",
    name: "James R.",
    role: "Creator & freelance marketer",
  },
  industryFaqs: [
    { q: "Do I need a big audience for affiliate marketing to work?", a: "No. Engagement matters more than size. A creator with 5K engaged subscribers and the right affiliate programs out-earns a creator with 50K disengaged followers promoting Amazon links. Quality of audience > raw size." },
    { q: "Is this for YouTube / TikTok / Instagram / Newsletter creators?", a: "All of the above. The distribution playbook covers each channel separately — link placement on YouTube, hooks for TikTok, story-vs-reel CTAs on Instagram, embedded affiliate sequences in newsletters." },
    { q: "I'm in a niche category (book reviewers, board game creators, etc). Will this still help?", a: "Yes. The strategy brief is written for your specific niche after intake. Niche creators typically have higher conversion rates because their audience trusts them more on product recommendations." },
    { q: "How does this compare to LTK / RewardStyle / Amazon Associates?", a: "Those platforms aggregate low-commission e-commerce programs (1-10%). The blueprint database includes higher-commission programs (15-50% recurring SaaS, $50-$200 CPA on health/fintech) that aren't on those platforms — typically 5-50x higher commission per click." },
  ],
};
