import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { MOSHY_URL } from "@/lib/affiliate-links";

export { MOSHY_URL };

export const moshyConfig: AffiliatePageConfig = {
  brand: "Moshy",
  badgeText: "Australia",
  affiliateUrl: MOSHY_URL,

  quickAnswer:
    "Yes, there is a current Moshy discount: new customers can receive $120 off their first treatment with the code REFERRAL120 (current at the time of writing). You do not need to type it anywhere when you use the link on this page, because Moshy's landing page carries the code into the sign-up flow automatically. Moshy is an Australian clinically-led weight-management telehealth platform, open to anyone eligible, that assesses eligibility through an online questionnaire and registered-practitioner review. Pricing is subscription-based and confirmed during the consultation. Prescription medicines in Australia depend on individual clinical assessment.",

  banner: {
    heading: "Moshy - Current Offer (Australia)",
    body: "New customers can currently receive $120 off their first treatment with code REFERRAL120. Click below and Moshy applies the code automatically, nothing to type.",
    buttonLabel: "Continue to Moshy",
  },

  hero: {
    h1Prefix: "Moshy Discount Code Australia 2026:",
    h1Highlight: "Referral Link, Review & Eligibility Guide",
    subheading:
      "Looking for a Moshy discount code, promo code, or referral link? This page gives you direct access to the current Moshy referral offer and covers the eligibility process, cost, GLP-1 options, and how Moshy compares to Juniper.",
    trustBullets: [
      "Current Moshy referral link - no code required",
      "Covers Moshy weight loss cost and subscription pricing",
      "Moshy vs Juniper comparison",
      "GLP-1 and semaglutide eligibility explained",
      "Australia-only - links to getmoshy.com.au",
    ],
  },

  sections: [
    {
      heading: "Current Offer",
      paragraphs: [
        "This page is built for Australians searching for a Moshy discount code, Moshy promo code, Moshy referral code, or a Moshy referral link. Rather than a code that may or may not be active, our personalised referral link gives you direct access to the Moshy eligibility page - the correct starting point for anyone exploring what Moshy offers in Australia.",
        "The button below takes you directly to the Moshy eligibility flow at getmoshy.com.au. No information needs to be entered on this page before clicking through. The referral is tracked through the link, so no code needs to be entered manually on the Moshy side either.",
      ],
      hasCta: true,
      ctaText: "Access the Moshy Referral Link",
    },
    {
      heading: "What Is Moshy?",
      paragraphs: [
        "Moshy is an Australian online telehealth platform, open to anyone eligible, with its most widely discussed offering being a clinically supervised weight management programme. Users complete an online eligibility questionnaire from home, after which Moshy's clinical team reviews each submission individually before any treatment discussion takes place.",
        "The Moshy platform is designed around the reality that many Australians are reluctant to book an in-person GP appointment for weight-related concerns. The online process is straightforward, a health questionnaire, practitioner review, and if eligible, a subscription-based programme with home delivery. Moshy operates under Australian health service regulations and uses only Australian-registered practitioners.",
        "Not everyone who completes the eligibility quiz will be approved. Moshy's clinical team assesses each submission based on the information provided, and some individuals will be referred to alternative care pathways. The platform is transparent about this.",
      ],
      disclaimer:
        "This page does not constitute medical advice and does not imply suitability for any specific individual. Consult a qualified health professional before making any health-related decisions.",
    },
    {
      heading: "GLP-1 & Semaglutide",
      paragraphs: [
        "Moshy is one of the most searched Australian telehealth platforms in connection with GLP-1 medications used in weight management. The most important thing to understand up front is a regulatory fact, not a sales pitch.",
        "In Australia, GLP-1 medications are prescription-only. A telehealth platform like Moshy can facilitate access to an assessment with a registered Australian practitioner who, if they determine it is clinically appropriate, may prescribe. Moshy does not advertise which specific medications are available - this is discussed only as part of the clinical consultation after eligibility is assessed.",
        "No platform can guarantee access to any specific medication before the consultation, and suitability is assessed individually. This is information about the service, not medical advice or a recommendation to use any medicine.",
      ],
      hasCta: true,
      ctaText: "Start the Moshy Eligibility Quiz",
      disclaimer:
        "GLP-1 medications are prescription-only in Australia. Access depends on individual clinical assessment by a registered Australian practitioner. This page does not constitute medical advice.",
    },
    {
      heading: "Moshy Cost & Pricing",
      paragraphs: [
        "Moshy operates on a subscription model. Pricing is not publicly listed on the Moshy website in full before the eligibility process is completed - the cost of a Moshy programme depends on the treatment plan determined through the clinical consultation, which varies by individual.",
        "Based on publicly available information and community discussions, Moshy weight management programmes in Australia typically involve a monthly subscription that covers practitioner oversight, ongoing check-ins, and home delivery of any prescribed treatments. Pricing can range significantly depending on the specific treatment pathway.",
        "The most accurate way to get current Moshy pricing is to complete the eligibility flow and proceed through the consultation process. Moshy is transparent about costs before any subscription commitment is made, so you see the exact figure for your plan before committing to anything.",
      ],
    },
    {
      heading: "Moshy vs Juniper",
      paragraphs: [
        "Moshy and Juniper are Australia's two most commonly compared online weight management telehealth platforms. The most significant structural difference is approach: Moshy runs a lean, practitioner-led clinical pathway that is open to anyone eligible, while Juniper wraps medication in a structured coaching programme and markets primarily to women. Both platforms use an online eligibility and consultation model and can facilitate access to GLP-1 medications through Australian-registered practitioners.",
        "The differences between the two platforms come down to how much support wraps around the medication. Juniper combines medication access with a structured coaching and community programme, positioning itself as a holistic weight management system rather than purely a telehealth prescribing service. Moshy's approach is more clinical, the focus is on the practitioner-led treatment pathway rather than ongoing lifestyle coaching.",
        "In terms of which platform is 'better' for weight loss, this is not a meaningful comparison at a general level. Outcomes from weight management programmes depend on the individual, adherence, clinical suitability for specific treatments, and lifestyle factors. The right starting point is completing the eligibility process with whichever platform matches the kind of support you want and your health profile.",
      ],
      hasCta: true,
      ctaText: "Check Eligibility with Moshy",
    },
    {
      heading: "Moshy Codes & How They Work",
      paragraphs: [
        'Search volume for "Moshy discount code", "Moshy promo code", "Moshy coupon code", and "Moshy referral code" reflects the number of Australians looking to access Moshy\'s services at a reduced rate. Moshy does not consistently publish a traditional discount code that applies at checkout in the way e-commerce sites do.',
        "The most reliable mechanism for accessing a current Moshy offer is through a referral link - which is exactly what this page provides. Referral links are tracked at the link level, meaning no code needs to be manually entered. When you click through to the Moshy eligibility page from this page, the referral is automatically applied.",
        "Occasionally Moshy runs promotional campaigns with specific offer codes. These are distributed through approved affiliates and partner channels. If a specific code-based promotion is active at the time you visit, this page will reflect it. In all other cases, using the referral link below is the correct approach.",
      ],
    },
  ],

  steps: [
    {
      num: "01",
      heading: "Click through to Moshy",
      body: "Use any link or button on this page to reach the official Moshy eligibility page at getmoshy.com.au. The referral is applied automatically - no code required.",
    },
    {
      num: "02",
      heading: "Complete the eligibility questionnaire",
      body: "Answer a short series of questions about your health, goals, and background. The questionnaire takes around 5-10 minutes and can be completed at your own pace from home.",
    },
    {
      num: "03",
      heading: "Practitioner review",
      body: "Moshy's clinical team reviews your submission individually. Not all submissions proceed - eligibility depends on each person's health profile and what the practitioners determine is appropriate.",
    },
    {
      num: "04",
      heading: "Proceed with the programme",
      body: "If eligible, Moshy's team will outline your treatment options, subscription cost, and next steps. You are not committed to anything until you choose to proceed.",
    },
  ],

  whyUseThis: [
    "Direct access to the current Moshy referral link - no outdated or expired codes",
    "Covers Moshy pricing, GLP-1 access, and what to expect from the eligibility process",
    "Moshy vs Juniper comparison in plain terms",
    "Built for Australian users - links to the AU Moshy platform only",
    "Medical disclaimers throughout - no misleading health claims",
  ],

  faqs: [
    {
      q: "What is the current Moshy discount code?",
      a: "The current Moshy discount code is REFERRAL120, worth $120 off a new customer's first treatment (current at the time of writing; offers change). You do not need to type it: when you click through from this page, Moshy's landing page carries the code into the sign-up flow automatically. Every button on this page takes you directly to that flow.",
    },
    {
      q: "Does Moshy have a referral code?",
      a: "Yes, Moshy operates through referral links that give users direct access to their eligibility flow and any associated offer. This page provides a personalised Moshy referral link. Click any button on this page to use it - the referral is tracked through the link automatically.",
    },
    {
      q: "How do I use a Moshy referral link?",
      a: "Simply click any button on this page. You will be taken directly to the Moshy eligibility page where you can complete the online questionnaire. No code needs to be entered manually - the referral is tracked through the link itself.",
    },
    {
      q: "What's the cheapest way to start Moshy?",
      a: "The lowest-cost way in is the current new-customer offer: $120 off your first treatment, applied automatically when you start through the link on this page, with nothing to type. The ongoing subscription then depends on the plan your consultation lands on, and Moshy shows you the price before you commit to anything. We don't quote a fixed figure here because it is confirmed during the consultation, but beginning with the $120 offer is the most affordable way to start.",
    },
    {
      q: "Does Moshy offer semaglutide or GLP-1 medications in Australia?",
      a: "Moshy can facilitate access to a clinical assessment with an Australian-registered practitioner who may, if clinically appropriate, prescribe GLP-1 medications. GLP-1 medications are prescription-only in Australia and access depends entirely on individual clinical suitability. Moshy does not advertise which specific medications are available prior to the consultation. This page does not constitute medical advice.",
    },
    {
      q: "Is Moshy available in all Australian states?",
      a: "Moshy is an Australian telehealth platform that operates nationally. The eligibility process is completed online and treatments are delivered directly to your home address. Availability of specific treatment options may vary depending on state-level regulations.",
    },
    {
      q: "What is Moshy's weight loss programme?",
      a: "Moshy offers a clinically supervised weight management programme for eligible Australians. Users complete an online eligibility questionnaire and, if suitable, are connected with a practitioner who reviews their case and discusses appropriate treatment options. The programme is subscription-based with home delivery. Specific treatments and pricing are detailed on the Moshy platform after completing the eligibility flow. This page does not constitute medical advice.",
    },
    {
      q: "How does Moshy compare to a GP for weight loss?",
      a: "Moshy offers an online alternative to booking an in-person GP appointment for weight management. The clinical process is similar - health assessment, practitioner review, and treatment plan if appropriate - but is conducted entirely online. Some people prefer the convenience of online telehealth; others may prefer the ongoing relationship of a regular GP. Both pathways are valid and the right choice depends on individual circumstances.",
    },
  ],

  breadcrumb: [
    { label: "Refer Labs", href: "/" },
    { label: "Guides", href: "/guides" },
    { label: "Moshy Discount Code Australia" },
  ],

  relatedLinks: [
    {
      href: "/best-weight-loss-telehealth-australia",
      label: "Best Weight Loss Telehealth Australia 2026",
      desc: "Moshy vs Juniper vs Better Being compared, GLP-1 access, eligibility, pricing, and the community verdict.",
    },
    {
      href: "/moshhair",
      label: "Mosh Hair Loss, Discount Code & Review",
      desc: "Mosh is Moshy's men's health sister brand for hair loss. Access the current Mosh referral offer.",
    },
    {
      href: "/best-peptide-supplier",
      label: "Best Peptide Supplier 2026",
      desc: "Research peptide suppliers compared, purity, catalogue, and current discount codes.",
    },
    {
      href: "/guides",
      label: "All Guides & Comparisons",
      desc: "Independent comparison guides across health, tools, and business categories.",
    },
  ],

  ctas: {
    primary: "Check Eligibility with Moshy",
    secondary: "Go to Moshy",
    midHeading: "Ready to Start the Moshy Eligibility Process?",
    midBody:
      "Click below to be taken directly to the Moshy eligibility page via our personalised referral link. No code required - the referral is applied automatically.",
    midButton: "Start the Moshy Quiz",
    bottomHeading: "Access the Current Moshy Referral Link",
    bottomBody:
      "Click below to continue to the official Moshy eligibility check page at getmoshy.com.au. The referral offer is applied automatically through our link.",
    bottomButton: "Continue to Moshy",
  },

  disclaimer:
    "You will be taken to getmoshy.com.au. This page is operated by Refer Labs and contains a personalised affiliate referral link. This page does not constitute medical advice.",
};
