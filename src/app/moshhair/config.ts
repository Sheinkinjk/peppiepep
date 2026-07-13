import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { MOSH_HAIR_URL } from "@/lib/affiliate-links";

export { MOSH_HAIR_URL };

export const moshHairConfig: AffiliatePageConfig = {
  brand: "Mosh",
  showResearchNote: true,
  logo: "mosh",
  badgeText: "Australia",
  affiliateUrl: MOSH_HAIR_URL,
  offer: "55% off your first order (code REFERAL55)",

  quickAnswer:
    "New customers can get 55% off their first Mosh order with the code REFERAL55, available through the link on this page. Mosh is an Australian men's hair-loss telehealth platform that can prescribe finasteride and minoxidil after an online consultation and registered-practitioner review. Cost is subscription-based and confirmed during the consultation. Prescription treatments are subject to individual clinical assessment.",

  banner: {
    heading: "Mosh: 55% Off Your First Order",
    body: "Click below to claim 55% off your first order with code REFERAL55, via our referral link.",
    buttonLabel: "Claim 55% off Mosh",
  },

  eyebrow: "Hair-loss telehealth",
  atAGlance: [
    { k: "What it is", v: "Australian men's hair-loss telehealth" },
    { k: "For", v: "Men with thinning or male-pattern hair loss" },
    { k: "Treatments", v: "Finasteride & minoxidil, if eligible" },
    { k: "Format", v: "Online consult → practitioner review → delivery" },
    { k: "Pricing", v: "Subscription, confirmed in the consult" },
    { k: "Discount code", v: "None needed, referral via the link" },
  ],
  trustStrip: [
    "AHPRA-registered practitioners",
    "Online consult, no GP visit to start",
    "Subscription with home delivery",
    "No code, referral via the link",
  ],
  pullQuote:
    "Hair-loss treatment works best early and consistently, the real value of telehealth is removing the friction that delays men for years.",
  verdict:
    "For Australian men who want a credible, low-friction route to clinically-supervised hair-loss treatment, Mosh is a legitimate starting point. The online consult is fast, finasteride and minoxidil are prescribed only after a genuine practitioner review, and pricing is clear before you commit. As with any subscription health service, results and value come down to consistency and your individual case.",
  verdictPoints: [
    "Fast online consult, no in-person GP appointment to begin",
    "Access to finasteride and minoxidil, the most evidence-backed treatments",
    "Practitioner-reviewed; eligibility is assessed individually",
  ],

  hero: {
    h1Prefix: "Mosh hair loss in Australia,",
    h1Highlight: "explained",
    subheading:
      "If you're weighing up Mosh for hair loss, here's what matters before you start: what Mosh actually prescribes, what it really costs, and how it compares to a GP and to topical brands like Dense.",
    trustBullets: [
      "What Mosh prescribes, finasteride and minoxidil, explained",
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
        "What makes it more than a vending machine is the review step. Not everyone who applies gets a script; the practitioner can decline or redirect you, which is exactly what you'd want a prescriber to do. The trade-off is that it's built for the common case, straightforward male-pattern thinning, rather than complex or unusual hair loss, where an in-person specialist is the better call.",
      ],
      disclaimer:
        "This page is informational and not medical advice. Hair-loss treatment suitability depends on the individual, speak with a qualified health professional before starting anything.",
    },
    {
      heading: "What Mosh prescribes: finasteride & minoxidil",
      paragraphs: [
        "Two treatments do most of the heavy lifting for male-pattern hair loss, and Mosh is built around both. Finasteride is an oral medicine that lowers DHT, the hormone that shrinks follicles in hereditary hair loss, it's the one that slows and often halts the loss. Minoxidil (topical, or increasingly low-dose oral) works on a different lever, extending the growth phase of the follicle, which is why a lot of men end up on the two together.",
        "The regulatory reality in Australia: finasteride and oral minoxidil are prescription-only; topical minoxidil you can buy over the counter. Mosh's value is that the online consult and photo review can lead to a finasteride or minoxidil script without an in-person visit, when the practitioner judges it appropriate. Nothing is dispensed automatically, and that's the point.",
        "If you've been Googling 'finasteride Australia online' or 'Mosh finasteride', the honest answer is that the consult is the only way to know what you'd be offered. It's a few minutes and commits you to nothing.",
      ],
      hasCta: true,
      ctaText: "Start the Mosh consultation",
      disclaimer:
        "Finasteride and oral minoxidil are prescription-only in Australia and depend on assessment by a registered practitioner. Not medical advice.",
    },
    {
      heading: "What Mosh really costs",
      paragraphs: [
        "There's no single Mosh price, and any page quoting you one exact figure is guessing. It's a subscription, and what you pay tracks the plan your consult lands on, finasteride alone is cheaper than a finasteride-plus-minoxidil combination, and the fee bundles the medication, the practitioner oversight, and delivery.",
        "The useful way to think about it: it's priced like an ongoing treatment, not a one-off purchase, because that's what hair-loss treatment is, stop and the benefit fades. You'll see the actual numbers in the consult before you commit to anything, so you know exactly what you'd pay month to month before signing up.",
      ],
    },
    {
      heading: "Mosh vs a GP vs topical brands",
      paragraphs: [
        "Against a topical-only brand like Dense Hair Experts, the difference is category, not quality: Dense is non-prescription scalp and density care, while Mosh can prescribe the medicines that act on the cause of the loss. Early or mild thinning can do well on topicals; active, progressing loss usually needs the prescription route.",
        "Against your own GP, Mosh trades continuity for speed. A GP knows your history and may be cheaper; Mosh is faster, fully online, and removes the awkwardness that keeps a lot of men from ever booking the appointment, which, given hair loss rewards starting early, is the real argument for it.",
        "For the full landscape, clinical telehealth versus topical products, side by side with pricing and the community verdict, see our Best Hair Loss Treatment Australia comparison linked below.",
      ],
    },
    {
      heading: "Mosh Codes & Offers",
      paragraphs: [
        'Searches for "Mosh hair discount code", "Mosh promo code", "Mosh coupon", and "Mosh sale" reflect the number of Australians who want to access Mosh at the best available price before committing to a subscription.',
        "Mosh does not always maintain a publicly listed promotional code. The most consistent way to access a current Mosh offer is through a referral or partner link - which is exactly what this page provides. Our link applies the referral at the URL level, meaning no manual code entry is required.",
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
      body: "Mosh's clinical team reviews your consultation individually. Treatment options, where appropriate, are discussed based on your specific situation.",
    },
    {
      num: "04",
      heading: "Proceed with the platform",
      body: "If eligible, continue with the Mosh platform as directed. Subscription, delivery, and ongoing management are handled through the Mosh website.",
    },
  ],

  whyUseThis: [
    "Quick access to the current Mosh referral link for Australian users",
    "No need to search for a Mosh promo code that may have expired",
    "Contextual overview of the Mosh platform before clicking through",
    "Addresses common search intent including cost, access, and discount codes",
    "Direct link to the official Mosh sign-up page",
  ],

  faqs: [
    {
      q: "What is the current Mosh hair discount code?",
      a: "Mosh does not always publish a publicly available discount code. The most reliable way to access a current Mosh offer is through a partner referral link. Every button on this page takes you directly to the Mosh sign-up page via our referral link, which applies the partner offer at the URL level.",
    },
    {
      q: "Does Mosh have a promo code for hair loss treatment?",
      a: "Mosh occasionally runs promotional offers, but these are not always available as a manually entered code. Our partner link is the most consistent way to access any current Mosh deal or reduced-price consultation. Click any button on this page to continue.",
    },
    {
      q: "Is Mosh available in Australia?",
      a: "Yes. Mosh is an Australian telehealth platform and operates specifically for users in Australia. The service is available online and does not require an in-person GP visit to begin the consultation process.",
    },
    {
      q: "What hair loss treatments does Mosh offer?",
      a: "Mosh offers clinically supervised hair loss treatment options for men, reviewed on a case-by-case basis by their practitioners following an online consultation. The specific treatments available to each user depend on their health profile. Full details are available on the Mosh website. This page does not provide medical advice.",
    },
    {
      q: "Is Mosh legit?",
      a: "Mosh is a registered Australian telehealth business with prescribing overseen by registered Australian practitioners. As with any health service, individual experiences vary. We recommend reading the Mosh website, their FAQs, and independent sources before making a decision. This page links directly to the Mosh sign-up page so you can assess the platform yourself.",
    },
    {
      q: "How much does Mosh cost for hair loss in Australia?",
      a: "Mosh runs on a subscription model and the cost depends on the treatment plan determined through your online consultation - finasteride only, minoxidil only, or a combination. Pricing covers the treatment, practitioner oversight, and home delivery, and is shown transparently in the consultation flow before you commit. This page does not provide medical advice.",
    },
    {
      q: "Does Mosh prescribe finasteride and minoxidil?",
      a: "Mosh can facilitate access to finasteride and minoxidil where a registered Australian practitioner determines it is clinically appropriate following your online consultation and photo assessment. Finasteride and oral minoxidil are prescription-only in Australia; topical minoxidil is available over the counter. Treatment is decided individually - nothing is prescribed automatically. This page does not constitute medical advice.",
    },
    {
      q: "How long does Mosh take to work for hair loss?",
      a: "Results from evidence-based hair loss treatments such as finasteride and minoxidil typically take several months to become noticeable, with most clinical guidance pointing to 3-6 months for early signs and up to 12 months for fuller results. Outcomes vary by individual and depend on consistency, the stage of hair loss, and the specific treatment. Mosh provides structured follow-up as part of its programme. This page does not provide medical advice.",
    },
    {
      q: "Mosh vs Dense Hair Experts - which is better for hair loss?",
      a: "They serve different purposes. Mosh is a telehealth platform that can prescribe finasteride and minoxidil - treatments that target the underlying cause of male pattern baldness. Dense Hair Experts is a topical hair care brand focused on density and scalp health, without prescription ingredients. For noticeable or progressive hair loss, a telehealth provider like Mosh is the stronger starting point; topical products can complement a routine. See our Best Hair Loss Treatment Australia comparison for a full breakdown.",
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
      href: "/best-hair-loss-treatment-australia",
      label: "Best Hair Loss Treatment Australia 2026",
      desc: "Mosh vs Dense Hair Experts vs telehealth options, clinical vs topical, and pricing compared.",
    },
    {
      href: "/dense",
      label: "Dense Hair Experts, Current Offer",
      desc: "Australian topical hair density products. Direct access to the current Dense offer, no code required.",
    },
    {
      href: "/moshy",
      label: "Moshy Weight Loss, Discount Code & Review",
      desc: "Mosh's sister brand for weight management. GLP-1 eligibility, Moshy vs Juniper, and reviews.",
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
    midHeading: "Ready to Explore Mosh Hair Treatment?",
    midBody:
      "Click below to be taken directly to the Mosh sign-up page via our referral link. The partner offer is applied automatically.",
    midButton: "Start the Mosh Consultation",
    bottomHeading: "See whether Mosh can help with your hair loss",
    bottomBody:
      "A few minutes online, reviewed by a registered Australian practitioner, and no code to enter, the referral applies automatically through the link.",
    bottomButton: "Continue to Mosh",
  },

  disclaimer:
    "You will be taken to getmosh.com.au. This page is operated by Refer Labs and contains a personalised affiliate referral link. This page does not constitute medical advice.",
};
