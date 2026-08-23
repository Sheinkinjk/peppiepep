import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { MOSH_HAIR_URL } from "@/lib/affiliate-links";

export { MOSH_HAIR_URL };

// TGA compliance: this page advertises a telehealth SERVICE and the condition
// (male-pattern hair loss), never a prescription medicine. Per the TGA's June 2026
// guidance, advertising prescription medicines to the public is prohibited, and the
// prohibition extends to trade names, generic names, abbreviations and colloquial
// terms. So we do not name or endorse specific prescription treatments here; we
// describe the service and direct people to a practitioner assessment.
export const moshHairConfig: AffiliatePageConfig = {
  brand: "Mosh",
  showResearchNote: true,
  logo: "mosh-tile",
  logoBleed: true,
  badgeText: "Australia",
  affiliateUrl: MOSH_HAIR_URL,
  offer: "55% off your first order (code REFERAL55)",

  quickAnswer:
    "New customers can get 55% off their first Mosh order with the code REFERAL55, available through the link on this page. Mosh is an Australian men's hair-loss telehealth service: you complete an online consultation, a registered practitioner reviews your case, and any treatment is decided individually and only if clinically appropriate. Cost is subscription-based and confirmed during the consultation.",

  banner: {
    heading: "Mosh: 55% Off Your First Order",
    body: "Click below to claim 55% off your first order with code REFERAL55, via our referral link.",
    buttonLabel: "Claim 55% off Mosh",
  },

  eyebrow: "Hair-loss telehealth",
  atAGlance: [
    { k: "What it is", v: "Australian men's hair-loss telehealth" },
    { k: "For", v: "Men with thinning or male-pattern hair loss" },
    { k: "How it works", v: "Online consult, reviewed by a practitioner" },
    { k: "Treatment", v: "Decided individually, only if clinically appropriate" },
    { k: "Pricing", v: "Subscription, confirmed in the consult" },
    { k: "Discount code", v: "REFERAL55, applied automatically via our link" },
  ],
  trustStrip: [
    "AHPRA-registered practitioners",
    "Online consult, no GP visit to start",
    "Subscription with home delivery",
    "Code REFERAL55, applied automatically via the link",
  ],
  pullQuote:
    "Hair-loss treatment works best early and consistently, the real value of telehealth is removing the friction that delays men for years.",
  verdict:
    "For Australian men who want a credible, low-friction route to a clinically-supervised hair-loss service, Mosh is a legitimate starting point. The online consult is fast, any treatment is decided only after a genuine practitioner review, and pricing is clear before you commit. As with any subscription health service, results and value come down to consistency and your individual case.",
  verdictPoints: [
    "Fast online consult, no in-person GP appointment to begin",
    "A registered practitioner assesses your case individually",
    "Pricing shown before you commit; eligibility assessed individually",
  ],

  hero: {
    // Title and h1 must agree. This page is titled "Mosh Discount Code 2026:
    // 55% Off Your First Order" and its h1 read "Mosh hair loss in Australia,
    // explained", so the two targeted different intents and Google served
    // /mosh-review for "mosh discount code" at position 20 instead of the page
    // built for it. Its sibling /moshy pairs the title "Moshy Discount Code
    // Australia 2026: $120 Off" with the h1 "Moshy discount code Australia:
    // $120 off your first order" and ranks 8th for the equivalent query. Same
    // pattern here; the hair-loss framing moves to the subheading, which
    // already carried it.
    h1Prefix: "Mosh discount code Australia:",
    h1Highlight: "55% off your first order",
    subheading:
      "If you're weighing up Mosh for hair loss, here's what matters before you start: how the service actually works, what it really costs, and how it compares to a GP and to topical brands like Dense.",
    trustBullets: [
      "How the Mosh service and practitioner review work",
      "How the cost and subscription model work",
      "How it compares to a GP and to topical brands like Dense",
      "Online consult, reviewed by a registered practitioner",
      "55% off your first order, applied through the link",
    ],
  },

  sections: [
    {
      heading: "Current Offer",
      paragraphs: [
        "This page is built for Australians searching for a Mosh hair discount code, Mosh promo code, or the current Mosh sale. Rather than searching for a code that may have expired, our referral link gives you direct access to the Mosh sign-up page with our partner link applied automatically.",
        "Click any button on this page to be taken directly to the Mosh hair treatment platform. No code needs to be entered manually and no information is required on this page before you arrive.",
      ],
      hasCta: true,
      ctaText: "Access the Mosh Referral Link",
    },
    {
      heading: "What Mosh actually is",
      paragraphs: [
        "Mosh is an Australian men's-health telehealth service, and hair loss is one of its core categories. You fill in a questionnaire and upload a couple of photos, a registered Australian practitioner reviews your case, and, if it's appropriate, you're put on a subscription with treatment posted to your door. No waiting room, no GP appointment to get started.",
        "What makes it more than a vending machine is the review step. Not everyone who applies is suitable; the practitioner can decline or redirect you, which is exactly what you'd want a prescriber to do. The trade-off is that it's built for the common case, straightforward male-pattern thinning, rather than complex or unusual hair loss, where an in-person specialist is the better call.",
      ],
      disclaimer:
        "Hair-loss treatment suitability depends on the individual; speak with a qualified health professional before starting anything.",
    },
    {
      heading: "How the Mosh service works",
      paragraphs: [
        "Mosh handles hair loss as a structured, online process rather than a shopfront. You answer questions about your hair-loss history, general health and goals, and upload photos. A registered Australian practitioner then reviews your case and decides, individually, whether any treatment is appropriate for you. Nothing is dispensed automatically, and that is the point.",
        "Because it is a clinical service, what you are offered (if anything) depends entirely on that assessment, not on what you select yourself. The only way to know what would apply to you is to complete the consult, which takes a few minutes and commits you to nothing.",
      ],
      hasCta: true,
      ctaText: "Start the Mosh consultation",
      disclaimer:
        "Any treatment is prescription-only where relevant and depends on assessment by a registered practitioner. This page does not name or recommend any specific medicine and is not medical advice.",
    },
    {
      heading: "What Mosh really costs",
      paragraphs: [
        "There's no single Mosh price, and any page quoting you one exact figure is guessing. It's a subscription, and what you pay tracks the plan your consult lands on. The fee bundles any treatment, the practitioner oversight, and delivery.",
        "It's priced like an ongoing service rather than a one-off purchase, because that's what managing hair loss usually is: consistency matters. You'll see the actual numbers in the consult before you commit to anything, so you know exactly what you'd pay month to month before signing up.",
      ],
    },
    {
      heading: "Mosh vs a GP vs topical brands",
      paragraphs: [
        "Against a topical-only brand like Dense Hair Experts, the difference is category, not quality: Dense is non-prescription scalp and density care, while Mosh is a clinical service where a practitioner assesses whether prescription treatment is appropriate. Early or mild thinning can do well on topicals; active, progressing loss usually calls for a clinical assessment.",
        "Against your own GP, Mosh trades continuity for speed. A GP knows your history and may be cheaper; Mosh is faster, fully online, and removes the awkwardness that keeps a lot of men from ever booking the appointment, which, given hair loss rewards starting early, is the real argument for it.",
        "For the full landscape, clinical telehealth versus topical products, side by side with pricing, see our Best Hair Loss Treatment Australia comparison linked below.",
      ],
    },
    {
      heading: "Mosh Codes & Offers",
      paragraphs: [
        'Searches for "Mosh hair discount code", "Mosh promo code", "Mosh coupon", and "Mosh sale" reflect the number of Australians who want to access Mosh at the best available price before committing to a subscription.',
        "Mosh's current new-customer offer is 55% off your first order, applied through the code REFERAL55. Other codes circulating on coupon sites are frequently expired or unofficial; this is the current, verified offer via our link. You don't need to hunt for a code or type anything at checkout: start through the link on this page and the offer is carried into the Mosh sign-up page automatically. Offers change over time, so treat 55% as the current new-customer rate, confirmed on Mosh's own sign-up page, rather than a permanent price.",
        "If you have been searching for a Mosh hair discount, a Mosh discount Australia, or the best way to get started with Mosh, clicking through this page is the straightforward path.",
      ],
    },
  ],

  steps: [
    {
      num: "01",
      heading: "Click through to Mosh",
      body: "Use any link on this page to go directly to the Mosh sign-up and consultation page at getmosh.com.au.",
    },
    {
      num: "02",
      heading: "Complete the online consultation",
      body: "Answer questions about your hair loss history, health, and goals. The process is completed online and takes a few minutes.",
    },
    {
      num: "03",
      heading: "Practitioner review",
      body: "Mosh's clinical team reviews your consultation individually. Any treatment options, where appropriate, are discussed based on your specific situation.",
    },
    {
      num: "04",
      heading: "Proceed with the platform",
      body: "If eligible, continue with the Mosh platform as directed. Subscription, delivery, and ongoing management are handled through the Mosh website.",
    },
  ],

  whyUseThis: [
    "Quick access to the current Mosh referral link for Australian users",
    "The current 55%-off new-customer offer, applied automatically through the link",
    "Contextual overview of the Mosh service before clicking through",
    "Addresses common search intent including cost, access, and discount codes",
    "Direct link to the official Mosh sign-up page",
  ],

  faqs: [
    {
      q: "What is the current Mosh hair discount code?",
      a: "Mosh's current new-customer offer is 55% off your first order, applied through the code REFERAL55. You don't need to enter it: every button on this page carries it into the Mosh sign-up page at getmosh.com.au automatically. Other codes circulating on coupon sites are frequently expired or unofficial; this is the current, verified offer. Offers can change, so this reflects the current new-customer discount, confirmed on Mosh's own sign-up page.",
    },
    {
      q: "Is the Mosh discount only for your first order?",
      a: "Yes. REFERAL55 takes 55% off your first Mosh order as a new-customer offer, so it applies to that first order rather than to every renewal. Mosh treatment runs as a subscription, and from the second order onward you pay the standard rate for whichever plan a registered practitioner considers appropriate after your consultation. Mosh confirms that price inside its own sign-up flow before you commit, and offers can change, so treat 55% as the current new-customer rate rather than a permanent price.",
    },
    {
      q: "Does Mosh have a promo code for hair loss treatment?",
      a: "Yes. The current promotion is 55% off your first order (code REFERAL55), applied automatically when you start through the link on this page. There is nothing to type. Offers change over time, so the amount shown is the current new-customer rate.",
    },
    {
      q: "Is Mosh available in Australia?",
      a: "Yes. Mosh is an Australian telehealth platform and operates specifically for users in Australia. The service is available online and does not require an in-person GP visit to begin the consultation process.",
    },
    {
      q: "What does Mosh offer for hair loss?",
      a: "Mosh is a clinically-supervised hair-loss service for men. After an online consultation, a registered Australian practitioner reviews your case and decides, individually, whether treatment is appropriate for you. The specifics depend on your health profile and are handled on the Mosh platform. This page does not name or recommend any medicine and does not provide medical advice.",
    },
    {
      q: "Is Mosh legit?",
      a: "Mosh is a registered Australian telehealth business, with clinical decisions overseen by registered Australian practitioners. As with any health service, individual experiences vary. We recommend reading the Mosh website, their FAQs, and independent sources before making a decision. This page links directly to the Mosh sign-up page so you can assess the platform yourself.",
    },
    {
      q: "How much does Mosh cost for hair loss in Australia?",
      a: "Mosh runs on a subscription model and the cost depends on the plan determined through your online consultation. Mosh does not publish plan prices publicly: pricing covers any treatment, practitioner oversight and home delivery, and is shown to you in the consultation flow before you commit. If you are comparing on cost, two published terms matter: Mosh advertises a 180-day money-back guarantee, and a price-match guarantee on substantially comparable programs, so a cheaper like-for-like plan elsewhere is worth raising with them. Checked on Mosh's own site, 14 August 2026.* This page does not provide medical advice. *Terms are indicative and subject to change: view the latest pricing and terms on Mosh's own site before you commit.",
    },
    {
      q: "Does Mosh handle hair-loss treatment online?",
      a: "Mosh is a telehealth service, so the consultation and any ongoing management happen online. Whether treatment is appropriate is a clinical decision made individually by a registered Australian practitioner after reviewing your case; nothing is dispensed automatically. This page does not name or recommend any medicine and does not constitute medical advice.",
    },
    {
      q: "How long does hair-loss treatment take to work?",
      a: "In general, evidence-based hair-loss treatments take several months to show noticeable change, with clinical guidance often pointing to around 3 to 6 months for early signs and up to 12 months for fuller results. Outcomes vary by individual and depend on consistency and the stage of hair loss. Any treatment through Mosh is decided by a practitioner and includes structured follow-up.",
    },
    {
      q: "Mosh vs Dense Hair Experts: which suits hair loss?",
      a: "They serve different purposes. Mosh is a telehealth service where a practitioner assesses whether prescription treatment is appropriate. Dense Hair Experts is a topical hair-care brand focused on density and scalp health, without prescription ingredients. For noticeable or progressive hair loss, a telehealth service like Mosh is a stronger starting point for a clinical assessment; topical products can complement a routine. See our Best Hair Loss Treatment Australia comparison for a full breakdown.",
    },
    {
      q: "Is Mosh worth it?",
      a: "It depends on what you want from it. Mosh's value is convenience and a genuine practitioner review with no in-person appointment, with the plan and price shown before you commit. A GP may be cheaper and already knows your history; Mosh is faster and fully online. Since any treatment is ongoing, the value tracks how consistently you stick with it.",
    },
    {
      q: "How do I access the Mosh referral link?",
      a: "Click any button on this page. You will be taken directly to the Mosh sign-up page at getmosh.com.au via our referral link. The partner offer is applied automatically at the URL level.",
    },
  ],

  breadcrumb: [
    { label: "Refer Labs", href: "/" },
    { label: "Guides", href: "/guides" },
    { label: "Mosh Hair Loss Australia" },
  ],

  relatedLinks: [
    {
      href: "/mosh-review",
      label: "Mosh Review: Is It Legit & Worth It?",
      desc: "An independent look at whether Mosh stacks up, what it costs, and what people actually raise.",
    },
    {
      href: "/best-hair-loss-treatment-australia",
      label: "Best Hair Loss Treatment Australia 2026",
      desc: "Mosh vs Dense Hair Experts vs telehealth options, clinical vs topical, and pricing compared.",
    },
    {
      href: "/dense",
      label: "Dense Hair Experts, Current Offer",
      desc: "Topical hair-density products (shampoos, serums). Direct access to the current Dense offer, no code required.",
    },
    {
      href: "/moshy",
      label: "Moshy Weight Loss, Discount Code & Review",
      desc: "Mosh's sister brand for weight management. Eligibility, Moshy vs Juniper, and reviews.",
    },
    {
      href: "/guides",
      label: "All Guides & Comparisons",
      desc: "Independent comparison guides across health, tools, and business categories.",
    },
  ],

  ctas: {
    primary: "Check your eligibility on Mosh",
    secondary: "Continue to Mosh",
    midHeading: "Ready to Explore the Mosh Service?",
    midBody:
      "Click below to be taken directly to the Mosh sign-up page via our referral link. The partner offer is applied automatically.",
    midButton: "Start the Mosh Consultation",
    bottomHeading: "See whether Mosh can help with your hair loss",
    bottomBody:
      "A few minutes online, reviewed by a registered Australian practitioner, and no code to enter, the referral applies automatically through the link.",
    bottomButton: "Continue to Mosh",
  },

  disclaimer:
    "You will be taken to getmosh.com.au. This page is operated by Refer Labs and contains a personalised affiliate referral link. This page does not name or recommend any prescription medicine and does not constitute medical advice.",
};
