import type { HairLossGuideConfig } from "@/components/consumer/HairLossGuide";

// Registry for the men's hair-loss guide cluster (funnels to Mosh). Each entry is a
// genuine, distinct high-intent query gap (checked against existing pages to avoid
// keyword cannibalisation). Copy is unique per page, with no shared sentence skeletons.
// No efficacy or outcome claims, no urgency; the funnel is to a practitioner assessment
// (TGA/Ahpra audit, 1 Oct 2026).

export interface HairLossGuideEntry extends HairLossGuideConfig {
  meta: { title: string; description: string; keywords: string[]; noIndex?: boolean };
  priority: number;
}

const R = {
  cost: { href: "/hair-loss-treatment-cost-australia", label: "Hair-loss costs compared" },
  hub: { href: "/hair-loss", label: "Compare all hair-loss options" },
  mosh: { href: "/moshhair", label: "Mosh: how it works & the offer" },
  best: { href: "/best-hair-loss-treatment-australia", label: "Best hair-loss treatment, compared" },
  moshReview: { href: "/mosh-review", label: "Is Mosh legit? Our review" },
  receding: { href: "/receding-hairline-treatment-australia", label: "Receding hairline: causes and getting assessed" },
};

// Source for the telehealth prescribing rule: Medical Board of Australia,
// "Telehealth consultations with patients", revised guidelines in effect from
// 1 September 2023. Checked 2 September 2026. The page said "Since 2025" until
// then, which understated the rule by two years and carried no source.
export const HAIR_LOSS_GUIDES: HairLossGuideEntry[] = [
  {
    slug: "/receding-hairline-treatment-australia",
    crumb: "Receding hairline",
    priority: 0.8,
    h1: "Receding hairline in Australia: causes and how to get it assessed",
    meta: {
      title: "Receding Hairline in Australia 2026: Causes and Getting Assessed",
      description:
        "A receding hairline in Australia: what causes it and how an online practitioner assessment works.",
      keywords: ["receding hairline treatment australia", "receding hairline", "receding hairline men australia"],
    },
    lead:
      "A receding hairline, where the hair retreats at the temples and along the front, is one of the earliest and most common signs of male pattern hair loss. Your GP or an online consultation with a registered practitioner can confirm the cause, and whether any treatment is appropriate is that practitioner's decision after an individual assessment.",
    sections: [
      {
        h: "Why a hairline recedes",
        body: [
          "Male pattern hair loss is largely genetic and hormonal: hair follicles at the temples and front gradually shrink until they stop producing visible hair. This is why the hairline is often the first place men notice change.",
          "Not every receding or uneven hairline is male pattern loss, though. A mature hairline that settles slightly higher in your twenties is normal, and other causes behave differently, which is part of why an assessment matters before assuming a treatment.",
        ],
      },
      {
        h: "What a practitioner decides",
        body: ["Whether any treatment suits a receding hairline is decided by a registered practitioner after an individual assessment. Refer Labs does not name or compare medicines."],
        bullets: [
          "Shampoos, supplements and devices sold for hair loss are mostly cosmetic: they change how hair looks, not why it is falling out.",
        ],
      },
      {
        h: "How to get assessed without an in-person visit",
        body: [
          "Telehealth services run the practitioner assessment online. You complete a consultation with photos, and a registered Australian practitioner reviews it individually and decides whether the program is right for you. Some men are declined.",
          "Mosh is one Australian men's telehealth service that runs this process online. New customers get 55% off the first order of a Mosh hair program with REFERAL55, under Mosh's terms, linked beside each offer box on this page. Use code REFERAL55 at checkout; our link opens Mosh's sign-up with the offer. This page is information only, not medical advice.",
        ],
      },
    ],
    faqs: [
      { q: "Can a receding hairline be reversed?", a: "A practitioner can explain what is realistic for you after an assessment; no treatment guarantees an outcome. Whether any treatment suits you is a clinical decision made by a registered practitioner." },
      { q: "What is the best treatment for a receding hairline?", a: "No single treatment is right for everyone. A registered practitioner assesses whether any option is appropriate for you. Over-the-counter shampoos and supplements are cosmetic products and involve no assessment." },
      { q: "Is a receding hairline always male pattern baldness?", a: "No. A mature hairline settling slightly higher in your twenties is normal, and other causes of hair loss behave differently and need their own assessment. That is one reason a practitioner review matters before assuming a treatment is right for you." },
      { q: "How do I get a receding hairline assessed in Australia?", a: "Through your GP or an online consultation with a registered practitioner. Telehealth services run this online: you complete a consultation with photos, and a practitioner reviews it and decides whether the program is right for you. Mosh is one such service; Refer Labs readers get 55% off with the code REFERAL55 at checkout (new customers only, first order of a hair program, Mosh's terms apply). Some applicants are declined." },
    ],
    related: [R.best, R.mosh, R.cost],
  },

  {
    slug: "/early-signs-of-hair-loss-australia",
    crumb: "Early signs of hair loss",
    priority: 0.75,
    h1: "Early signs of hair loss in men: how to tell if you are going bald",
    meta: {
      title: "Early Signs of Hair Loss in Men, Australia: How to Tell",
      description:
        "The early signs of male pattern hair loss and how to tell if you are going bald: a receding hairline, a thinning crown, a widening part and extra shedding.",
      keywords: ["early signs of hair loss", "how to tell if you are going bald", "am i going bald", "signs of balding men", "thinning crown", "early signs of balding australia"],
    },
    lead:
      "Two places show it first: the temples and the crown. Most men notice later than it starts, because the earliest changes are gradual and easy to explain away, and shedding roughly 50 to 100 hairs a day is normal for anyone. If the signs add up, a GP or a registered practitioner online can confirm the cause. General information, not medical advice.",
    sections: [
      {
        h: "The early signs, roughly in order",
        body: ["Male pattern hair loss follows a fairly predictable path, so a few specific changes are worth watching for."],
        bullets: [
          "A hairline creeping back at the temples, leaving a more pronounced M shape.",
          "A crown (the spot at the back) that looks thinner or more see-through under bright light.",
          "A part that looks wider than it used to in photos.",
          "More hair than usual on the pillow, in the shower drain, or on your hands after styling.",
          "Individual hairs that feel finer or shorter as follicles gradually shrink.",
        ],
      },
      {
        h: "What is normal, and what is a real signal",
        body: [
          "Shedding some hair every day is normal, and commonly cited figures put it at roughly 50 to 100 hairs a day. A hairline that settles slightly higher in your late teens or twenties, called a mature hairline, is also normal and not the same as balding.",
          "The signal to pay attention to is change over time: a steady drop in density, a hairline that keeps moving, or a crown that keeps thinning across months rather than a bad shower day. Pattern and progression matter more than any single day.",
        ],
      },
      {
        h: "How to check yourself",
        body: ["You can track this at home before deciding whether to get assessed."],
        bullets: [
          "Compare photos: line up a recent top-of-head and hairline photo against ones from a year or two ago.",
          "The part test: part your hair the same way in the same light and watch whether the gap widens over a few months.",
          "The crown check: use your phone camera or two mirrors to see the crown you cannot normally view.",
          "Track shedding: note whether heavier shedding lasts weeks rather than days.",
        ],
      },
      {
        h: "Where to get it checked",
        body: [
          "If the signs above are adding up, an assessment tells you the cause, since other causes of hair loss exist and behave differently.",
          "You can start with your GP, or with an online telehealth service where a registered Australian practitioner reviews your case and decides whether the program is right for you. Mosh is one Australian men's service that runs this kind of assessment online.",
        ],
      },
    ],
    faqs: [
      { q: "How do I tell if I am going bald?", a: "Look for a pattern that progresses over months rather than a single heavy shed: a hairline receding at the temples, a thinning or see-through crown, and a widening part. Comparing photos a year or two apart is the clearest home check. If the signs are adding up, a practitioner can confirm the cause." },
      { q: "How much hair loss per day is normal?", a: "Commonly cited figures put normal shedding at roughly 50 to 100 hairs a day, and it varies with washing and styling. What matters is a sustained increase or a steady drop in density over months, not the count on any one day." },
      { q: "Are early signs of balding at 20 or 25 normal?", a: "A mature hairline settling slightly higher in your late teens or twenties is common and not the same as balding. Genuine early male pattern hair loss can also start young, so if the crown or hairline keeps changing over months, a GP or a registered practitioner can tell you which it is." },
      { q: "What should I do if I notice early signs?", a: "Track the change with photos over a few months, then have it checked by your GP or through an online consultation with a registered Australian practitioner. The practitioner confirms the cause and decides whether the program is right for you. This is general information, not medical advice." },
      { q: "Who should I see about early hair loss?", a: "You can start with your own GP, or an online telehealth service where a registered Australian practitioner reviews your case. For significant or sudden loss, see a doctor in person." },
    ],
    related: [R.best, R.mosh, R.receding, R.hub],
  },
];

export const HAIR_LOSS_GUIDE_BY_SLUG: Record<string, HairLossGuideEntry> =
  Object.fromEntries(HAIR_LOSS_GUIDES.map((g) => [g.slug, g]));
