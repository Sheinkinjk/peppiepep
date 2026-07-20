import type { IntentConfig } from "@/components/lending/IntentPage";

// Registry for the business-lending intent + explainer pages. One entry per page:
// unique copy (never a shared sentence skeleton across siblings), plus the SEO meta.
// Drives the route files, the sitemap and the /guides + llms indexes.

export interface IntentEntry extends IntentConfig {
  meta: { title: string; description: string; keywords: string[] };
  priority: number; // sitemap priority
}

const R = {
  hub: { href: "/business-loans", label: "Compare all business lenders" },
  cost: { href: "/what-a-business-loan-actually-costs", label: "What a business loan actually costs" },
  calc: { href: "/business-loan-calculator", label: "Repayment calculator" },
  equip: { href: "/equipment-finance-instant-asset-write-off", label: "Equipment finance & the write-off" },
  secured: { href: "/secured-vs-unsecured-business-loans", label: "Secured vs unsecured" },
  eligibility: { href: "/business-loan-eligibility-australia", label: "What lenders look at" },
  howto: { href: "/how-to-get-a-business-loan-australia", label: "How to get a business loan" },
};

export const INTENT_PAGES: IntentEntry[] = [
  // ── Intent / comparison pages ──────────────────────────────────────────────
  {
    slug: "unsecured-business-loans-australia",
    kind: "intent", priority: 0.85, filterProducts: ["term_loan"],
    crumb: "Unsecured business loans",
    h1: "Unsecured business loans in Australia",
    meta: {
      title: "Unsecured Business Loans Australia: Compare Lenders (2026) | Refer Labs",
      description: "Unsecured business loans need no property or asset as security, fund faster and cost more than secured debt. Compare Australian lenders and check your options in one enquiry.",
      keywords: ["unsecured business loans australia", "unsecured business finance", "no collateral business loan australia"],
    },
    lead: "An unsecured business loan is finance you don't have to back with property or a specific asset. Because the lender can't fall back on collateral, approval leans on your trading history and cash flow, funding is usually faster, and the rate is higher than a secured bank loan. In Australia most online business lenders, including the ones on our panel, are unsecured, which is why they can fund in days rather than weeks.",
    sections: [
      { h: "When unsecured makes sense", body: ["Unsecured suits businesses that need money quickly, don't want to tie up their home or equipment, or don't have an asset to offer. The trade is cost: you pay for the speed and the lender's extra risk."],
        bullets: ["You need funds in days, not weeks", "You'd rather not put property on the line", "The amount is modest relative to your revenue", "You have consistent bank-account turnover the lender can see"] },
      { h: "What it costs, and how to compare", body: ["Unsecured rates sit above secured bank lending. Don't compare on the headline percentage alone: fold in establishment and ongoing fees, and for short-term or factor-rate products, convert the total to dollars over the full term. That single number is the only fair basis for comparison."] },
    ],
    faqs: [
      { q: "How much can I borrow unsecured?", a: "It depends on the lender and your turnover. Across our current panel, advertised limits run from a few thousand dollars up to $750,000, but the amount you're offered reflects the lender's assessment of your revenue and history." },
      { q: "Do I still need good credit?", a: "It helps. With no asset backing the loan, lenders weight your credit profile and cash flow more heavily. Some consider businesses with past credit issues; a person reviews your enquiry and points you to the lenders most likely to fit." },
      { q: "Is a director's guarantee the same as security?", a: "Not quite. Many unsecured loans still ask for a personal guarantee from a director, which makes you personally liable if the business can't repay, but it isn't a mortgage over a specific asset. Read what you're signing." },
    ],
    related: [R.secured, R.cost, R.eligibility, R.hub],
  },
  {
    slug: "business-loans-bad-credit-australia",
    kind: "intent", priority: 0.8,
    crumb: "Bad-credit business loans",
    h1: "Business loans with bad credit in Australia",
    meta: {
      title: "Business Loans for Bad Credit Australia: What's Realistic (2026) | Refer Labs",
      description: "A past default or judgement doesn't automatically rule out business finance in Australia, but it narrows your options and raises the rate. What lenders actually weigh, and what helps.",
      keywords: ["business loans bad credit australia", "bad credit business finance", "business loan with defaults australia"],
    },
    lead: "A patchy credit file makes business finance harder in Australia, but not always impossible. Lenders vary widely in how they treat defaults, judgements and late payments: some decline outright, others look past an old, paid default if your current cash flow is strong. There's no guaranteed approval, and anyone promising it is a warning sign. What helps most is a clear, recent record of money moving through the business.",
    intro: ["We won't pretend every enquiry gets funded. What we can do is tell you whether the lenders we work with are likely to consider your situation, rather than sending you off to apply blindly and collect knock-backs that dent your file further."],
    sections: [
      { h: "What lenders weigh when credit is imperfect", body: ["The credit score is one input, not the whole decision. With impaired credit, lenders lean harder on the things that show the business is trading and can service repayments."],
        bullets: ["Recent bank-account turnover and consistency", "Whether the default is old, paid, and explained", "Current ATO position, and whether any debt is on a payment plan", "Time in business and the sector you trade in"] },
      { h: "How to improve your odds", body: ["Before applying, it's worth getting your file in order. Small, practical steps change the picture more than you'd expect."],
        bullets: ["Pay or formalise any outstanding defaults where you can", "Put ATO debt onto a documented payment arrangement", "Avoid a scatter-gun of applications, each one leaves a mark", "Have a plain explanation ready for anything on the file"] },
    ],
    faqs: [
      { q: "Can I get a business loan with a default?", a: "Sometimes. It depends on the age and size of the default, whether it's paid, and how your business is trading now. Some lenders consider it; some won't. A person reviews your enquiry and tells you which, if any, are realistic before you apply." },
      { q: "Will applying hurt my credit score further?", a: "Submitting our form doesn't trigger a credit check. A lender only checks credit if you proceed to a full application with them. Making many separate applications in a short window can lower your score, which is one reason a single, targeted introduction helps." },
      { q: "Are 'guaranteed approval' business loans real?", a: "No. In Australia no legitimate lender guarantees approval before assessing you. Treat that promise as a red flag for high fees or a scam." },
    ],
    related: [R.eligibility, R.cost, R.hub, R.howto],
  },
  {
    slug: "fast-business-loans-australia",
    kind: "intent", priority: 0.8,
    crumb: "Fast business loans",
    h1: "Fast business loans in Australia",
    meta: {
      title: "Fast Business Loans Australia: Same-Day & 24-Hour Options (2026) | Refer Labs",
      description: "Some Australian lenders can approve and fund a business loan within 24 hours, occasionally same day. What makes funding fast, what slows it down, and how to be ready.",
      keywords: ["fast business loans australia", "same day business loan australia", "quick business finance australia"],
    },
    lead: "When cash flow can't wait, some Australian online lenders approve and fund a business loan within 24 hours, and occasionally the same day. Speed comes from unsecured lending and automated assessment of your bank-transaction data, rather than manual review of documents. The fastest outcomes go to businesses that are ready: clean bank data, a clear purpose, and no surprises on the credit file.",
    sections: [
      { h: "What actually makes funding fast", body: ["Fast finance is fast because the lender reads your business bank data directly and decides from cash-flow patterns, not a folder of paperwork. Anything that forces a human to pause, missing information, an unexplained default, a mismatch on the ABN, adds days."],
        bullets: ["Unsecured products skip property valuation", "Digital bank-data feeds replace weeks of statement gathering", "A single, clear purpose speeds the assessment", "Being contactable on the day matters more than people expect"] },
      { h: "How to be ready before you apply", body: ["A little preparation turns a two-day approval into a same-day one."],
        bullets: ["Know the amount and what it's for", "Make sure your business bank account reflects real, recent trading", "Have your ABN and business details to hand", "Be reachable by phone the day you enquire"] },
    ],
    faqs: [
      { q: "How fast can I actually get the money?", a: "On our panel, advertised turnarounds range from same-day to within 24 to 48 hours once approved. Real timing depends on how quickly the lender can verify your details and whether anything needs clarifying." },
      { q: "Does fast mean expensive?", a: "Often, yes. Speed and unsecured lending both push the rate up. If your need isn't urgent, a slower secured option may cost less. Compare the total dollar cost, not just the speed." },
      { q: "What slows an application down?", a: "Incomplete details, an unexplained default, ATO debt without a payment plan, or being uncontactable. Clearing those up front is the single biggest thing you control." },
    ],
    related: [R.cost, R.calc, R.hub, R.eligibility],
  },
  {
    slug: "small-business-loans-australia",
    kind: "intent", priority: 0.82,
    crumb: "Small business loans",
    h1: "Small business loans in Australia",
    meta: {
      title: "Small Business Loans Australia: Compare Lenders & Options (2026) | Refer Labs",
      description: "A plain guide to small business loans in Australia: the main loan types, what they cost, what lenders look for, and how to compare offers. Refer Labs is a referrer, not a lender.",
      keywords: ["small business loans australia", "small business finance australia", "compare small business loans"],
    },
    lead: "A small business loan in Australia is finance sized for the everyday needs of a small operator: covering a slow month, buying stock, hiring, or funding a piece of equipment. The main choices are a term loan (a lump sum repaid over a fixed period), a line of credit (a revolving limit you draw as needed), or equipment finance tied to a specific asset. Which one fits depends on whether your need is one-off or ongoing.",
    sections: [
      { h: "The main types, briefly", body: ["Most small business borrowing falls into a few clear buckets. Matching the product to the need is half the battle."],
        bullets: ["Term loan: a lump sum for a defined purpose, repaid over months or years", "Line of credit: a revolving limit for lumpy or seasonal cash flow", "Equipment finance: tied to the vehicle or machine you're buying", "Invoice finance: borrowing against unpaid invoices"] },
      { h: "What lenders look for", body: ["Small business lending leans on the health of the business now, not just a credit score. Time trading, consistent revenue, and a clean-enough credit file do most of the work."] },
    ],
    faqs: [
      { q: "How much can a small business borrow?", a: "It scales with revenue. Advertised limits on our panel span from a few thousand dollars to several hundred thousand, but your offer reflects your turnover and history, not the maximum on the page." },
      { q: "What's the minimum time in business?", a: "It varies by lender. Many want at least six months of trading with steady revenue, though the exact bar differs. Tell us your situation and we'll point you to lenders whose minimums you meet." },
      { q: "Term loan or line of credit?", a: "A term loan suits a one-off, known cost. A line of credit suits recurring or unpredictable gaps because you only pay for what you draw. Some businesses use both." },
    ],
    related: [R.hub, R.cost, R.calc, R.eligibility],
  },
  {
    slug: "business-line-of-credit-australia",
    kind: "intent", priority: 0.78, filterProducts: ["line_of_credit"],
    crumb: "Business line of credit",
    h1: "Business line of credit in Australia",
    meta: {
      title: "Business Line of Credit Australia: How It Works & Who Offers It | Refer Labs",
      description: "A business line of credit gives you a revolving limit to draw on as needed, paying interest only on what you use. How it compares to a term loan, and which panel lenders offer one.",
      keywords: ["business line of credit australia", "revolving business credit", "business overdraft alternative australia"],
    },
    lead: "A business line of credit is a pre-approved limit you can draw down, repay, and draw again, paying interest only on the balance you actually use. It suits lumpy or seasonal cash flow, where a lump-sum term loan would leave you paying interest on money sitting idle. Think of it as a flexible buffer for the gaps between money going out and coming in, rather than finance for a single planned purchase.",
    sections: [
      { h: "Line of credit vs term loan", body: ["The difference is flexibility versus certainty. A term loan gives you a fixed sum and a fixed repayment schedule, which is ideal for a known, one-off cost. A line of credit gives you access to funds on demand, which is ideal when you don't know exactly when or how much you'll need."] },
      { h: "What to check", body: ["Revolving credit has its own fee patterns worth reading closely before you sign."],
        bullets: ["Whether there's a fee just for having the facility open", "The interest rate on drawn balances, and how it's calculated", "Any minimum draw or minimum monthly interest", "How quickly you can access funds once approved"] },
    ],
    faqs: [
      { q: "Do I pay interest if I don't draw on it?", a: "Usually you pay interest only on the balance you've drawn, but some facilities charge a line fee or minimum just for keeping it open. Confirm both before signing." },
      { q: "Is it the same as a business overdraft?", a: "Similar in spirit, a flexible buffer, but overdrafts are typically bank products attached to a transaction account, while a line of credit from a non-bank lender is a standalone facility. The mechanics and pricing differ." },
      { q: "Which lenders offer a line of credit?", a: "On our current panel, Lumi and Prospa advertise a line of credit alongside their term loans. The table above filters to the ones that do." },
    ],
    related: [R.hub, R.cost, R.secured, R.eligibility],
  },
  {
    slug: "working-capital-loans-australia",
    kind: "intent", priority: 0.75,
    crumb: "Working capital loans",
    h1: "Working capital loans in Australia",
    meta: {
      title: "Working Capital Loans Australia: Funding Day-to-Day Cash Flow | Refer Labs",
      description: "Working capital finance covers the everyday gap between money out and money in: wages, stock, rent, a slow season. The options in Australia and how to choose between them.",
      keywords: ["working capital loans australia", "cash flow finance australia", "working capital finance"],
    },
    lead: "Working capital finance covers the ordinary running costs of a business, wages, stock, rent, supplier bills, when the timing of money coming in doesn't line up with money going out. It's not for buying a big asset; it's for keeping the lights on smoothly through a slow month or a growth spurt that ties up cash. The right product depends on whether the gap is a one-off or a recurring pattern.",
    sections: [
      { h: "Matching the product to the gap", body: ["A one-off shortfall and a recurring seasonal dip call for different tools."],
        bullets: ["One-off gap: a short term loan repaid as cash recovers", "Recurring or seasonal gap: a line of credit you draw and repay", "Slow-paying customers: invoice finance against your receivables", "A specific purchase inside the gap: keep it separate from working capital"] },
      { h: "Keeping the cost sensible", body: ["Working capital is often short-term, and short-term finance can carry high annualised costs, especially factor-rate products. Because you're borrowing to smooth cash flow rather than fund growth directly, the cost eats straight into margin. Borrow the smallest amount that solves the problem, and compare offers on total dollars repaid."] },
    ],
    faqs: [
      { q: "How is working capital finance different from a normal loan?", a: "It's the same underlying products, term loans, lines of credit, invoice finance, just used for day-to-day operating costs rather than a capital purchase. The framing is about purpose, not a separate product." },
      { q: "How much working capital should I borrow?", a: "Enough to bridge the specific gap, and no more. Over-borrowing means paying interest on money you don't need. A cash-flow forecast for the next few months usually shows the right figure." },
      { q: "Is invoice finance a good fit?", a: "If your cash is tied up in unpaid invoices from creditworthy customers, invoice finance can release it without adding conventional debt. It works best when slow payment, not low sales, is the problem." },
    ],
    related: [R.hub, R.cost, R.calc, R.eligibility],
  },
  {
    slug: "low-doc-business-loans-australia",
    kind: "intent", priority: 0.75,
    crumb: "Low-doc business loans",
    h1: "Low-doc business loans in Australia",
    meta: {
      title: "Low-Doc Business Loans Australia: How They Work (2026) | Refer Labs",
      description: "Low-doc business loans assess you from bank-transaction data rather than full financials, so they suit newer businesses or those without up-to-date tax returns. The trade-offs, explained.",
      keywords: ["low doc business loans australia", "low doc business finance", "business loan without financials australia"],
    },
    lead: "A low-doc business loan is assessed mainly from your business bank-account activity rather than a full set of financial statements and tax returns. It suits businesses that are newer, between tax returns, or simply don't have tidy financials ready. You still provide information, this isn't a no-questions loan, but the lender leans on the story your bank transactions tell rather than formal accounts.",
    intro: ["Worth being clear on wording: our enquiry form never asks you to upload bank statements or ID. Where a lender needs to verify bank data, that happens directly between you and that lender through their own secure process, not through us."],
    sections: [
      { h: "Who low-doc suits", body: ["Low-doc lending exists because plenty of viable businesses can't produce two years of audited accounts on demand."],
        bullets: ["Newer businesses without a full financial history", "Sole traders and small operators with simple books", "Businesses waiting on the current year's tax return", "Anyone whose bank activity shows the health better than their paperwork does"] },
      { h: "The trade-offs", body: ["Less paperwork usually means the lender prices in more uncertainty, so low-doc rates tend to sit above fully-documented lending. Loan sizes can be smaller too. The upside is speed and accessibility; the cost is a higher rate and, sometimes, a lower limit."] },
    ],
    faqs: [
      { q: "What documents do I actually need?", a: "It varies by lender, but low-doc typically means verifying business bank activity and basic ABN or GST details rather than full financials and tax returns. The exact list comes from the lender you proceed with." },
      { q: "Is low-doc more expensive?", a: "Generally, yes. With less formal information, the lender carries more uncertainty and prices it into the rate. Compare the total dollar cost against a fully-documented option if you can produce the paperwork." },
      { q: "Can a brand-new business get low-doc finance?", a: "Some lenders have a minimum trading period, often around six months, because they need enough bank activity to assess. Very new businesses may find startup-focused options a better fit." },
    ],
    related: [R.eligibility, R.cost, R.hub, R.howto],
  },
  {
    slug: "startup-business-loans-australia",
    kind: "intent", priority: 0.75,
    crumb: "Startup business loans",
    h1: "Startup business loans in Australia",
    meta: {
      title: "Startup Business Loans Australia: Realistic Options (2026) | Refer Labs",
      description: "Most business lenders want six to twelve months of trading, which leaves genuine startups with fewer options. What's realistic for a new Australian business in the first months.",
      keywords: ["startup business loans australia", "new business loans australia", "finance for new business australia"],
    },
    lead: "Finance for a genuine startup is harder to find than the ads suggest. Most business lenders, including those on our panel, want to see six to twelve months of trading and consistent revenue before they'll lend, because they assess from cash-flow history that a brand-new business doesn't have yet. That doesn't leave you with nothing, but it does mean being realistic about which doors are actually open in the first few months.",
    intro: ["We'd rather tell you this up front than take an enquiry we can't help with. If you're pre-revenue or only weeks into trading, a conventional business loan is unlikely, and we'll say so."],
    sections: [
      { h: "What's realistic in the early months", body: ["Before the trading history exists, funding a new business usually leans on options that don't depend on business cash flow."],
        bullets: ["Personal savings or contributions from founders", "A secured facility backed by an asset such as property", "Equipment finance tied to the specific asset you're buying", "Government grants or programs relevant to your sector"] },
      { h: "When lenders start to say yes", body: ["Once you've been trading roughly six months with money moving steadily through a business account, the mainstream unsecured options open up. Reaching that point with clean bank activity and no unexplained credit issues is the single most useful thing a new business can do to become fundable."] },
    ],
    faqs: [
      { q: "Can I get a loan for a business that hasn't started trading?", a: "Rarely through a standard business lender, because there's no cash-flow history to assess. Pre-revenue funding usually comes from founder capital, a secured personal facility, grants, or equipment finance tied to an asset." },
      { q: "How long until my business can borrow?", a: "Many lenders open up at around six months of trading with steady revenue; some want twelve. The clock that matters is consistent income through the business bank account, not just the ABN registration date." },
      { q: "Should I use a personal loan to start?", a: "Some founders do, but it puts you personally on the hook and the terms may not suit a business. It's worth weighing against equipment finance or a secured option, and worth a conversation with an accountant." },
    ],
    related: [R.eligibility, R.equip, R.hub, R.howto],
  },
  {
    slug: "business-loans-sole-traders-australia",
    kind: "intent", priority: 0.75,
    crumb: "Sole trader business loans",
    h1: "Business loans for sole traders in Australia",
    meta: {
      title: "Business Loans for Sole Traders Australia (2026) | Refer Labs",
      description: "Sole traders can access the same business finance as companies, but with the whole application resting on one person. What that means for liability, assessment and the options.",
      keywords: ["business loans sole traders australia", "sole trader finance australia", "self employed business loan australia"],
    },
    lead: "As a sole trader you can access most of the same business finance a company can, term loans, lines of credit, equipment finance, but the whole application rests on you personally. There's no separate legal entity, so your personal and business finances are effectively one, and the loan is your direct responsibility. That simplicity is an advantage in some ways and a risk to be clear-eyed about in others.",
    sections: [
      { h: "What's different for a sole trader", body: ["The mechanics are similar to any small business loan, but the personal dimension is front and centre."],
        bullets: ["You're personally liable, there's no company to sit behind", "Your personal credit file carries more weight in the decision", "Business and personal cash flow are often assessed together", "Approval can be quicker because the structure is simple"] },
      { h: "Making a strong application", body: ["A sole trader who keeps business money separate and visible is far easier to assess. Running income and expenses through a dedicated business account, rather than a personal one, gives a lender the clean picture it needs, and usually gets you a better outcome."] },
    ],
    faqs: [
      { q: "Can a sole trader get a business loan?", a: "Yes. Sole traders are eligible for most business finance products. The main difference is that you're personally liable and your personal credit and cash flow weigh heavily in the assessment." },
      { q: "Do I need a separate business bank account?", a: "It's not always mandatory, but it makes a real difference. A dedicated account gives the lender a clean view of business trading and usually leads to a smoother, better-priced approval." },
      { q: "Is my personal credit score used?", a: "Yes. Without a separate company, your personal credit file is central to the decision. Keeping it clean directly improves your options." },
    ],
    related: [R.eligibility, R.hub, R.cost, R.howto],
  },
  {
    slug: "business-loans-hospitality-australia",
    kind: "intent", priority: 0.72,
    crumb: "Hospitality business loans",
    h1: "Business loans for cafes, restaurants and hospitality",
    meta: {
      title: "Hospitality Business Loans Australia: Cafes & Restaurants (2026) | Refer Labs",
      description: "Hospitality has thin margins, seasonal swings and heavy equipment costs, which shapes what finance fits. Loan options for Australian cafes, restaurants and food businesses.",
      keywords: ["hospitality business loans australia", "cafe business loan australia", "restaurant finance australia"],
    },
    lead: "Hospitality businesses, cafes, restaurants, bars and food vans, borrow for a few recurring reasons: fitting out or refurbishing a venue, buying kitchen equipment, and smoothing the seasonal and weekly swings in trade. Thin margins and lumpy cash flow shape what fits: equipment finance for the gear, a line of credit for the swings, and a term loan for a defined project like a fit-out. Card-based takings also make some lenders comfortable, because daily revenue is visible.",
    sections: [
      { h: "Common hospitality funding needs", body: ["The right product usually maps cleanly onto why you're borrowing."],
        bullets: ["Fit-out or refurbishment: a term loan for the defined project", "Ovens, fridges, coffee machines: equipment finance tied to the asset", "Seasonal or weekly cash-flow swings: a line of credit", "A quiet season or unexpected repair: short-term working capital"] },
      { h: "What helps a hospitality application", body: ["Lenders like visible, consistent takings. Steady card and bank activity, even through seasonal dips, tells the story better than a single strong month. If a chunk of your revenue flows through a card terminal, that daily data can work in your favour."] },
    ],
    faqs: [
      { q: "Can a new cafe get finance?", a: "For fit-out and equipment, sometimes, especially where the equipment itself secures the loan. For unsecured cash-flow lending, most lenders still want a few months of trading first. Equipment finance is often the most accessible early option." },
      { q: "Does seasonal trade count against me?", a: "Not necessarily. Lenders expect hospitality to be seasonal. What matters is that the pattern is consistent year to year and the business covers its costs across the cycle. A line of credit is built for exactly this." },
      { q: "What about equipment for the kitchen?", a: "Kitchen equipment is a natural fit for equipment finance, where the asset secures the loan. It can also interact with the instant asset write-off, worth a word with your accountant." },
    ],
    related: [R.equip, R.hub, R.cost, R.eligibility],
  },

  // ── Explainers (Article schema) ────────────────────────────────────────────
  {
    slug: "secured-vs-unsecured-business-loans",
    kind: "guide", priority: 0.78, showPanel: false,
    crumb: "Secured vs unsecured",
    h1: "Secured vs unsecured business loans",
    meta: {
      title: "Secured vs Unsecured Business Loans: Which Is Right? (Australia) | Refer Labs",
      description: "Secured loans are cheaper but put an asset on the line; unsecured loans are faster and dearer. How to choose in Australia, with the trade-offs laid out plainly.",
      keywords: ["secured vs unsecured business loan", "secured business loan australia", "unsecured business loan comparison"],
    },
    lead: "The difference between a secured and an unsecured business loan comes down to one thing: whether you back the loan with an asset. A secured loan is tied to property, equipment or another asset the lender can recover if you default, which makes it cheaper but puts that asset at risk. An unsecured loan needs no collateral, funds faster, and costs more because the lender carries more risk. Neither is better in the abstract; it depends on what you can offer and how fast you need the money.",
    sections: [
      { h: "Secured: cheaper, slower, asset on the line", body: ["Because the lender can fall back on the asset, secured loans carry lower rates and can run to larger amounts and longer terms. The cost is time, valuing an asset takes longer, and risk: default and you can lose the asset, which may be your home."],
        bullets: ["Lower interest rate than an equivalent unsecured loan", "Access to larger amounts and longer terms", "Slower to arrange, an asset has to be valued", "You can lose the secured asset if you can't repay"] },
      { h: "Unsecured: faster, dearer, no collateral", body: ["Without an asset to recover, the lender leans on your trading history and prices in the extra risk. You get speed and you keep your assets unencumbered, but you pay more, and a personal guarantee is still common."],
        bullets: ["No asset pledged, though a director's guarantee is common", "Funds in days rather than weeks", "Higher rate and often a lower maximum", "Approval leans heavily on cash flow and credit"] },
      { h: "How to choose", body: ["If you have an asset, aren't in a rush, and want the lowest cost, secured usually wins. If you need money quickly, don't want to risk your property, or don't have an asset to offer, unsecured is the trade you make, eyes open, on price. Run both through the total-dollar-cost test before deciding."] },
    ],
    faqs: [
      { q: "Is unsecured always more expensive?", a: "Almost always, for a comparable amount and term, because the lender has no collateral to fall back on and prices that risk in. The gap can be significant, so if you can offer security and aren't pressed for time, it's worth pricing both." },
      { q: "What counts as security?", a: "Commonly residential or commercial property, but also equipment, vehicles, or in some cases business assets like receivables. The lender needs something it can value and recover." },
      { q: "What's a personal guarantee?", a: "A promise that you'll personally cover the debt if the business can't. Many unsecured business loans require one from a director. It isn't a mortgage over a specific asset, but it does make you personally liable." },
    ],
    related: [R.cost, R.hub, R.eligibility, R.calc],
  },
  {
    slug: "how-to-get-a-business-loan-australia",
    kind: "guide", priority: 0.78, showPanel: false,
    crumb: "How to get a business loan",
    h1: "How to get a business loan in Australia",
    meta: {
      title: "How to Get a Business Loan in Australia: Step by Step (2026) | Refer Labs",
      description: "A practical walk-through of getting a business loan in Australia: working out what you need, getting your finances ready, comparing lenders, and applying without denting your credit.",
      keywords: ["how to get a business loan australia", "business loan application australia", "apply for business loan australia"],
    },
    lead: "Getting a business loan in Australia is more straightforward than it looks once you break it into steps: work out exactly what you need and why, get your business finances presentable, compare lenders on total cost rather than headline rate, then make a single targeted application instead of a scatter-gun of them. The businesses that get the best outcomes aren't the ones with perfect numbers; they're the ones who prepared and applied deliberately.",
    sections: [
      { h: "1. Define the amount and the purpose", body: ["Borrow for a clear reason and a specific figure. Lenders assess the request against your capacity to repay, and a vague ask for 'as much as possible' is harder to approve than a defined amount for a defined purpose. It also stops you over-borrowing and paying interest on money you don't need."] },
      { h: "2. Get your finances presentable", body: ["You don't need audited accounts for most online lenders, but you do need a business bank account that shows real, consistent trading. Sort out anything that will raise a question before it does."],
        bullets: ["Run income and expenses through a business account", "Put any ATO debt onto a documented payment plan", "Know your rough monthly revenue and time in business", "Have an explanation ready for anything on your credit file"] },
      { h: "3. Compare on total cost, then apply once", body: ["Line up offers on the total dollars repaid over the full term, not the advertised percentage, and read the fees. Then apply to the lender that fits, rather than to five at once, because a burst of applications can lower your credit score just when you need it intact. This is exactly where a single introduction to the right lenders helps."] },
    ],
    faqs: [
      { q: "What do I need to apply?", a: "For most online lenders: an active ABN, a business bank account showing recent trading, and basic business and contact details. Fuller documentation is only needed if you proceed with a lender that requires it. Our enquiry form never asks for statements or ID." },
      { q: "How long does it take?", a: "Unsecured online lenders can approve within 24 to 48 hours, sometimes same day, once your details are verified. Secured or bank lending takes longer because an asset has to be valued." },
      { q: "Will comparing lenders hurt my credit?", a: "Comparing doesn't. A credit check only happens when you make a full application to a specific lender. Making many applications at once can lower your score, which is why a single, targeted approach is better." },
    ],
    related: [R.cost, R.eligibility, R.hub, R.calc],
  },
  {
    slug: "business-loan-eligibility-australia",
    kind: "guide", priority: 0.78, showPanel: false,
    crumb: "What lenders look at",
    h1: "Business loan eligibility: what lenders actually look at",
    meta: {
      title: "Business Loan Eligibility Australia: What Lenders Look At (2026) | Refer Labs",
      description: "Time in business, revenue, credit profile and ATO position, the four things that most decide a business loan in Australia, and how each one moves the decision.",
      keywords: ["business loan eligibility australia", "business loan requirements australia", "how lenders assess business loans"],
    },
    lead: "Business loan decisions in Australia come down to four things more than any others: how long you've been trading, how much revenue moves through the business, your credit profile, and your position with the ATO. No single one is a pass-or-fail gate, they combine, so a weakness in one can be offset by strength in another. Understanding what each lender weighs is the difference between applying blind and applying where you'll actually qualify.",
    sections: [
      { h: "The four factors that decide it", body: ["Most assessments, especially automated ones, hinge on these four inputs."],
        bullets: ["Time in business: many lenders want six to twelve months of trading", "Revenue: consistent monthly turnover through a business account", "Credit profile: your history of repaying, defaults and judgements included", "ATO position: outstanding tax debt, and whether it's on a payment plan"] },
      { h: "How the factors trade off", body: ["Because lenders look at the whole picture, strength in one area can cover a gap in another. Strong, steady revenue can outweigh a short trading history; a clean credit file can offset thinner turnover. This is also why two lenders can reach opposite decisions on the same business, they weight the factors differently."] },
      { h: "The things you can fix before applying", body: ["Some inputs are fixed, you can't add months of trading overnight, but others move with a little effort. Formalising ATO debt, cleaning up bank-account presentation, and explaining anything on your credit file all shift the odds in your favour."] },
    ],
    faqs: [
      { q: "What's the minimum to qualify for a business loan?", a: "There's no single national threshold; each lender sets its own. As a rough guide, many unsecured online lenders want around six months of trading and consistent monthly revenue. Tell us your numbers and we'll point you to lenders whose bar you clear." },
      { q: "Does ATO debt stop me borrowing?", a: "Not automatically. Many lenders will consider a business with ATO debt, particularly where it's on a documented payment arrangement. Unmanaged tax debt is a bigger obstacle than debt that's being paid down on a plan." },
      { q: "Why do different lenders give different answers?", a: "Because they weight the four factors differently and set different minimums. A business that's marginal for one lender can be a clear yes for another, which is the whole reason comparing, rather than applying to the first name you find, pays off." },
    ],
    related: [R.hub, R.cost, R.howto, R.secured],
  },
];

export const INTENT_BY_SLUG: Record<string, IntentEntry> =
  Object.fromEntries(INTENT_PAGES.map((p) => [p.slug, p]));
