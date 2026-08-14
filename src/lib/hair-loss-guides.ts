import type { HairLossGuideConfig } from "@/components/consumer/HairLossGuide";

// Registry for the men's hair-loss guide cluster (funnels to Mosh). Each entry is a
// genuine, distinct high-intent query gap (checked against existing pages to avoid
// keyword cannibalisation). Copy is unique per page, with no shared sentence skeletons.
// Efficacy is always hedged and attributed; the funnel is to a practitioner assessment.

export interface HairLossGuideEntry extends HairLossGuideConfig {
  meta: { title: string; description: string; keywords: string[]; noIndex?: boolean };
  priority: number;
}

const R = {
  cost: { href: "/hair-loss-treatment-cost-australia", label: "What treatment costs" },
  hub: { href: "/hair-loss", label: "Compare all hair-loss options" },
  mosh: { href: "/moshhair", label: "Mosh: how it works & the offer" },
  quiz: { href: "/hair-loss-quiz", label: "Which option fits you? (30-sec quiz)" },
  best: { href: "/best-hair-loss-treatment-australia", label: "Best hair-loss treatment, compared" },
  moshReview: { href: "/mosh-review", label: "Is Mosh legit? Our review" },
};

export const HAIR_LOSS_GUIDES: HairLossGuideEntry[] = [
  {
    slug: "/online-hair-loss-treatment-australia",
    crumb: "Online hair-loss treatment",
    priority: 0.8,
    h1: "Online hair-loss treatment in Australia: how it actually works",
    meta: {
      title: "Online Hair Loss Treatment Australia 2026: How It Works | Refer Labs",
      description:
        "How online hair-loss treatment works in Australia: the telehealth assessment, what a compliant service looks like, what you can and can't get online, and how it compares to your GP. Information only.",
      keywords: ["online hair loss treatment australia", "hair loss telehealth australia", "online hair loss doctor australia", "hair loss treatment online"],
    },
    lead:
      "Online hair-loss treatment in Australia means having your case assessed by a registered practitioner over telehealth rather than in a clinic, and, if it is appropriate, having any prescribed treatment delivered to you. It is not a way around the clinical step. Since 2025 the rules require a genuine practitioner assessment rather than a form filled in on its own, so a compliant service always involves a real review before anything is prescribed. What you gain is convenience and speed to start; what you do not gain is a shortcut past the medicine's rules.",
    sections: [
      {
        h: "How the process runs, step by step",
        body: ["Most online hair-loss services follow the same shape, and knowing it helps you spot a serious one from a storefront."],
        bullets: [
          "You complete an online consultation, usually a health questionnaire, often with photos of the affected area.",
          "A registered Australian practitioner reviews your answers and history, not an algorithm on its own.",
          "If a prescription treatment is appropriate, it is prescribed; if it is not, you should be told so, and some applicants are declined.",
          "Any medicine is dispensed through a pharmacy and delivered, typically as part of a monthly plan with follow-up.",
        ],
      },
      {
        h: "What you can and can't get online",
        body: [
          "You can get an assessment, and, if suitable, prescription treatment along with over-the-counter options bundled into a plan. You can also get ongoing review and delivery, which is the main convenience.",
          "You cannot get a guaranteed outcome, and you cannot be promised a specific treatment before anyone has assessed you. Any service that offers guaranteed access to a prescription treatment before a review is not operating the way a compliant Australian service should. Suitability is decided case by case.",
        ],
      },
      {
        h: "Online telehealth versus your GP",
        body: [
          "Both are valid, and they suit different people. Your GP sees you in person with your whole health picture in view and can manage treatment alongside the rest of your care, but it is slower to get started and depends on appointment availability.",
          "Online telehealth is faster to begin and handles the medicine, review and delivery in one plan, which is why it appeals to people who know what they want and value convenience. The trade is that it is focused on the one issue rather than your whole health, so it is worth being upfront in the questionnaire about anything relevant.",
        ],
      },
      {
        h: "What a compliant service looks like",
        body: ["A few markers separate a legitimate online hair-loss service from a landing page with a checkout."],
        bullets: [
          "A registered Australian practitioner genuinely reviews your case, and the service can decline you.",
          "It does not promise a specific prescription medicine before the assessment.",
          "Pricing, including whether medicine is billed separately from the plan, is clear before you commit.",
          "There is a real cancellation and follow-up process, not just a subscription you have to fight to leave.",
        ],
      },
    ],
    faqs: [
      { q: "Is online hair-loss treatment legitimate in Australia?", a: "Yes, telehealth is a recognised pathway. A registered Australian practitioner assesses you remotely and prescribes only if appropriate. Since 2025 a prescription cannot rest on a questionnaire alone, so a compliant service involves a genuine practitioner review, not just a form." },
      { q: "Can I get prescription hair-loss treatment online without seeing anyone?", a: "No. Prescription treatment requires a registered practitioner to assess you first, even through telehealth. The review can happen online, but it has to be a real assessment. No compliant service can supply it before that." },
      { q: "How much does online hair-loss treatment cost?", a: "It is usually a monthly subscription that bundles the treatment, practitioner oversight and delivery, with the plan and price set at the assessment. Mosh, for example, includes free delivery and shows the plan and price before you commit, so confirm the current terms on the provider's site." },
      { q: "How do I find the cheapest hair-loss treatment online in Australia?", a: "Online telehealth usually charges one monthly subscription that bundles the treatment, practitioner oversight and delivery, so the cheapest option is the one whose bundle fits you, not just the lowest headline figure. Compare the monthly plan, what is included, delivery cost and cancellation terms across providers. Mosh, for example, includes free delivery, shows the plan and price before you commit, and gives new customers 55% off their first order through our link. Confirm current terms on the provider's site, and the lowest price is not always the best fit." },
      { q: "Is telehealth or my GP better for hair loss?", a: "Both are valid. A GP offers in-person, whole-of-health care but is slower to start; telehealth is faster and bundles medicine, review and delivery, but is focused on the one issue. It comes down to how you prefer to be supported." },
      { q: "Is hair-loss treatment safe, and what are the side effects?", a: "Prescription hair-loss treatments carry potential side effects, which is why they are prescription-only and why an assessment is required first. A registered practitioner weighs the likely benefit against the risks for your health history, explains what to watch for, and provides follow-up. Over-the-counter topical products carry their own considerations. Raise any concerns before starting. Information only, not medical advice." },
    ],
    related: [R.best, R.cost, R.mosh, R.moshReview, R.hub],
  },

  {
    slug: "/how-to-stop-hair-loss-australia",
    crumb: "How to stop hair loss",
    priority: 0.78,
    h1: "How to stop hair loss: what actually helps",
    meta: {
      title: "How to Stop Hair Loss (Australia 2026): What Actually Helps | Refer Labs",
      description:
        "How to approach stopping male pattern hair loss in Australia: understanding the cause, among the most studied treatments, what the evidence does and doesn't support, and why acting early matters. Information only.",
      keywords: ["how to stop hair loss", "how to stop balding australia", "stop hair loss men", "hair loss treatment that works australia"],
    },
    lead:
      "If you want to stop hair loss, the first useful step is knowing what kind you have. The most common form in men, male pattern hair loss, is largely genetic and driven by the hormone DHT, and it is gradual and progressive. That matters because the two treatments with the strongest evidence, prescription hair-loss treatments, target that specific process, while most shampoos, supplements and gadgets do not. Acting earlier tends to give you more to work with, since it is easier to hold onto hair you still have than to recover what is gone. What is right for you is a clinical decision, and this page is general information, not medical advice.",
    sections: [
      {
        h: "Work out what is actually causing it",
        body: [
          "Most male hair loss is androgenetic, the inherited 'male pattern' type, which shows up as a receding hairline or thinning crown and progresses slowly over years. It is driven by follicles' genetic sensitivity to DHT, not by anything you did wrong.",
          "Other causes exist, such as stress-related shedding, thyroid issues, nutritional gaps or medication effects, and these behave differently and sometimes reverse on their own. Because the cause changes what helps, the sensible starting point is an assessment rather than guessing, especially if the loss is sudden, patchy or unusual.",
        ],
      },
      {
        h: "What the evidence actually supports",
        body: ["For male pattern hair loss specifically, two treatments carry the strongest evidence, and they work in different ways."],
        bullets: [
          "Prescription treatment: assessed and prescribed by a practitioner, it works on the hormonal driver behind the shrinking of follicles.",
          "Over-the-counter topical products: available without a prescription, they act on the follicle and are often used alongside a prescribed treatment.",
          "Both only work while used, so stopping generally means the loss resumes. Neither guarantees regrowth; for many men the realistic aim is slowing further loss.",
        ],
      },
      {
        h: "What tends not to move the needle",
        body: [
          "Plenty of products are marketed for hair loss without the evidence to match. Caffeine shampoos, most supplements, and low-cost devices may make hair look or feel thicker temporarily, but there is little to suggest they stop male pattern loss the way the two most-studied treatments can. That does not make them scams, but it does make them a poor substitute if actually halting the process is the goal.",
          "The other common trap is waiting. Because the condition is progressive, the hair you keep is easier to hold than the hair you have already lost is to recover, so delaying rarely helps.",
        ],
      },
      {
        h: "How to actually get started",
        body: [
          "You have two mainstream routes. See your own GP, who can assess you in person and manage treatment with your whole health in view, or use an online telehealth service where a registered Australian practitioner reviews your case and prescribes if it is appropriate, usually with the medicine and delivery included in a plan.",
          "Either way, the step that matters is a genuine assessment. Mosh is one Australian men's telehealth service that runs this kind of review for hair loss, and you can compare it against your other options first.",
        ],
      },
    ],
    faqs: [
      { q: "Can you actually stop hair loss?", a: "For male pattern hair loss, among the most studied treatments, prescription hair-loss treatments, can slow further loss and, for some men, produce partial regrowth, while they are used. Neither guarantees an outcome, and whether either is appropriate for you is a clinical decision. Other causes of hair loss behave differently and need their own assessment." },
      { q: "What is the most effective way to stop male pattern baldness?", a: "The strongest evidence sits with prescription treatment (assessed by a practitioner) and over-the-counter topical products, often used together. A practitioner assesses which, if any, suits you. Most shampoos, supplements and devices do not have comparable evidence for stopping the process." },
      { q: "Do hair-loss shampoos and supplements work?", a: "Most have little evidence for stopping male pattern hair loss specifically. They may temporarily improve how hair looks or feels, but they are a poor substitute for the most-studied treatments if halting the underlying process is your goal." },
      { q: "Does acting early make a difference?", a: "Generally yes. Male pattern hair loss is progressive, and it is easier to hold onto hair you still have than to recover hair that is already gone, so getting assessed sooner tends to give you more to work with." },
      { q: "How do I know if I'm actually losing my hair, and when should I start?", a: "Early male pattern hair loss usually shows as gradual thinning at the crown or a hairline receding at the temples over years. A little extra hair in the shower is normal; a steady drop in density or a changing hairline is the signal to get assessed. Because the condition is progressive, acting sooner generally leaves more hair to protect, and a practitioner can confirm the cause." },
    ],
    related: [R.best, R.quiz, R.mosh, R.cost],
  },

  {
    slug: "/receding-hairline-treatment-australia",
    crumb: "Receding hairline",
    priority: 0.8,
    h1: "Receding hairline treatment in Australia: what actually helps",
    meta: {
      title: "Receding Hairline Treatment Australia 2026: What Helps | Refer Labs",
      description:
        "A receding hairline in Australia: what causes it, which treatments have real evidence, why acting early matters, and how an online practitioner assessment works. Information only, not medical advice.",
      keywords: ["receding hairline treatment australia", "receding hairline", "how to fix a receding hairline", "receding hairline men australia"],
    },
    lead:
      "A receding hairline, where the hair retreats at the temples and along the front, is one of the earliest and most common signs of male pattern hair loss. Because it is driven by the same underlying process as thinning on the crown, the treatments with the strongest evidence are the same: prescription hair-loss treatments. The thing that most affects the result is not which product you pick but how early you act, because it is easier to hold onto the hairline you still have than to recover ground already lost. Whether any treatment suits you is a clinical decision made after an assessment.",
    sections: [
      {
        h: "Why a hairline recedes",
        body: [
          "Male pattern hair loss is largely genetic and hormonal: hair follicles at the temples and front are sensitive to DHT, a hormone that gradually shrinks them until they stop producing visible hair. This is why the hairline is often the first place men notice change, and why it tends to progress if left alone.",
          "Not every receding or uneven hairline is male pattern loss, though. A mature hairline that settles slightly higher in your twenties is normal, and other causes behave differently, which is part of why an assessment matters before assuming a treatment.",
        ],
      },
      {
        h: "What the evidence supports",
        body: ["For male pattern hair loss driving a receding hairline, two treatments have the strongest evidence, and they are often used together."],
        bullets: [
          "Prescription treatment: assessed and prescribed by a practitioner, it works on the hormonal driver and is the most-studied route for slowing the process.",
          "Over-the-counter topical products: available without a prescription, they support the follicles and are often combined with a prescribed treatment.",
          "Early action: because the loss is progressive, starting sooner generally leaves more hair to protect.",
          "Most shampoos, supplements and devices lack comparable evidence for stopping the underlying process, whatever they do for appearance.",
        ],
      },
      {
        h: "How to get assessed without an in-person visit",
        body: [
          "Because prescription treatment requires a practitioner assessment, accessing it means a real review, which telehealth services now run online. You complete a consultation with photos, a registered Australian practitioner reviews it individually, and if a treatment is appropriate it is prescribed and delivered. Some men are declined, which is the screening working as intended.",
          "Mosh is one Australian men's telehealth service that runs this process online. Refer Labs readers who start through our link get 55% off their first order, applied automatically with no code to type. It commits you to nothing beyond the consultation, and a practitioner still decides what, if anything, you would be offered. This page is information only, not medical advice.",
        ],
      },
    ],
    faqs: [
      { q: "Can a receding hairline be reversed?", a: "Sometimes partially, but it is more realistic to slow further loss and protect what you have than to fully reverse a receded hairline. Prescription hair-loss treatments have the strongest evidence for male pattern hair loss, and results are better the earlier you start. Whether either suits you is a clinical decision made after an assessment. Neither guarantees an outcome." },
      { q: "What is the best treatment for a receding hairline?", a: "For male pattern hair loss, the most-studied options are prescription treatment (assessed by a practitioner) and over-the-counter topical products, often used together. A practitioner assesses which, if any, is appropriate for you. Most shampoos and supplements lack comparable evidence for stopping the underlying process." },
      { q: "Is a receding hairline always male pattern baldness?", a: "No. A mature hairline settling slightly higher in your twenties is normal, and other causes of hair loss behave differently and need their own assessment. That is one reason a practitioner review matters before assuming a treatment is right for you." },
      { q: "How do I get prescription treatment for a receding hairline in Australia?", a: "Prescription treatment requires an assessment by a registered practitioner. Telehealth services run this online: you complete a consultation with photos, a practitioner reviews it, and if appropriate it is prescribed and delivered. Mosh is one such service; Refer Labs readers get 55% off a first order through our link. Some applicants are declined." },
    ],
    related: [R.best, R.mosh, R.quiz, R.cost],
  },

  {
    slug: "/early-signs-of-hair-loss-australia",
    crumb: "Early signs of hair loss",
    priority: 0.75,
    h1: "Early signs of hair loss in men: how to tell if you are going bald",
    meta: {
      title: "Early Signs of Hair Loss in Men, Australia: How to Tell | Refer Labs",
      description:
        "The early signs of male pattern hair loss and how to tell if you are going bald: a receding hairline, a thinning crown, a widening part and extra shedding. What is normal, when to act, and how to check yourself. Information only.",
      keywords: ["early signs of hair loss", "how to tell if you are going bald", "am i going bald", "signs of balding men", "thinning crown", "early signs of balding australia"],
    },
    lead:
      "Most men notice hair loss later than it starts, because the earliest changes are gradual and easy to explain away. Male pattern hair loss usually shows up first at the temples and the crown, and the sooner you recognise it, the more options you have, since it is easier to hold onto hair than to recover it once it is gone. This page walks through the early signs, what counts as normal, and how to check yourself. It is general information, not medical advice.",
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
        h: "When to act, and where to start",
        body: [
          "Because male pattern hair loss is progressive, acting earlier generally leaves more to work with. If the signs above are adding up, the sensible next step is a proper assessment rather than guessing, since other causes of hair loss exist and behave differently.",
          "You can start with your GP, or with an online telehealth service where a registered Australian practitioner reviews your case and decides whether treatment is appropriate. Our 30-second match points you to the route that fits, and Mosh is one Australian men's service that runs this kind of assessment online.",
        ],
      },
    ],
    faqs: [
      { q: "How do I tell if I am actually going bald?", a: "Look for a pattern that progresses over months rather than a single heavy shed: a hairline receding at the temples, a thinning or see-through crown, and a widening part. Comparing photos a year or two apart is the clearest home check. If the signs are adding up, a practitioner can confirm the cause." },
      { q: "How much hair loss per day is normal?", a: "Commonly cited figures put normal shedding at roughly 50 to 100 hairs a day, and it varies with washing and styling. What matters is a sustained increase or a steady drop in density over months, not the count on any one day." },
      { q: "Are early signs of balding at 20 or 25 normal?", a: "A mature hairline settling slightly higher in your late teens or twenties is common and not the same as balding. Genuine early male pattern hair loss can also start young, so if the crown or hairline keeps changing over months it is worth getting assessed rather than waiting." },
      { q: "Can early hair loss be slowed if I catch it?", a: "Often the earlier it is assessed, the more options there are, because it is easier to hold onto existing hair than to recover hair that is already gone. Whether any treatment is appropriate for you is a clinical decision made by a registered practitioner after an assessment. This is general information, not medical advice." },
      { q: "Who should I see about early hair loss?", a: "You can start with your own GP, or an online telehealth service where a registered Australian practitioner reviews your case. For significant or sudden loss, see a doctor in person. Our hair-loss match can point you to the route that fits." },
    ],
    related: [R.quiz, R.best, R.mosh, R.moshReview, R.hub],
  },
];

export const HAIR_LOSS_GUIDE_BY_SLUG: Record<string, HairLossGuideEntry> =
  Object.fromEntries(HAIR_LOSS_GUIDES.map((g) => [g.slug, g]));
