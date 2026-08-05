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
  fin: { href: "/finasteride-australia", label: "Finasteride, explained" },
  min: { href: "/minoxidil-australia", label: "Minoxidil, explained" },
  cost: { href: "/hair-loss-treatment-cost-australia", label: "What treatment costs" },
  hub: { href: "/hair-loss", label: "Compare all hair-loss options" },
  mosh: { href: "/moshhair", label: "Mosh: how it works & the offer" },
  quiz: { href: "/hair-loss-quiz", label: "Which option fits you? (30-sec quiz)" },
  best: { href: "/best-hair-loss-treatment-australia", label: "Best hair-loss treatment, compared" },
};

export const HAIR_LOSS_GUIDES: HairLossGuideEntry[] = [
  {
    slug: "/finasteride-vs-minoxidil-australia",
    crumb: "Finasteride vs minoxidil",
    priority: 0.82,
    h1: "Finasteride vs minoxidil: which is which, and how they differ",
    meta: {
      // TGA compliance: prescription-medicine topic, kept out of public search.
      noIndex: true,
      title: "Finasteride vs Minoxidil (Australia 2026): How They Differ | Refer Labs",
      description:
        "Finasteride and minoxidil are the two most studied hair-loss treatments, and they work in completely different ways. What each does, oral vs topical, prescription vs pharmacy, and using both. Information only.",
      keywords: ["finasteride vs minoxidil", "minoxidil vs finasteride australia", "finasteride and minoxidil together", "hair loss treatment comparison australia"],
    },
    lead:
      "Finasteride and minoxidil are the two most studied treatments for male pattern hair loss, and the confusion between them is understandable, because they do almost opposite jobs. Finasteride is an oral, prescription-only medicine that acts on the hormone driving hair loss. Minoxidil is usually a topical product, available over the counter, that acts on the hair follicle and its blood supply. They are not competitors so much as two different levers, and some men are assessed as suitable for one, the other, or both. Which applies to you is a clinical decision, not something a webpage can settle.",
    sections: [
      {
        h: "What each one actually does",
        body: [
          "Finasteride works on the cause. Male pattern hair loss is driven largely by dihydrotestosterone (DHT), a hormone that gradually shrinks genetically sensitive follicles. Finasteride reduces how much testosterone your body converts into DHT, which is why it is taken as a daily tablet: it changes a body-wide hormone level, not just the scalp.",
          "Minoxidil works on the follicle. It does not touch DHT at all. It is thought to extend the growth phase of the hair cycle and improve blood flow to the follicle, which is why it is applied where you want the effect, as a topical solution or foam on the scalp. An oral form of minoxidil also exists but is prescription-only and used off-label.",
        ],
      },
      {
        h: "The practical differences that matter",
        bullets: [
          "Route: finasteride is an oral tablet; minoxidil is usually applied topically to the scalp.",
          "Access: oral finasteride is Schedule 4 (prescription-only) in Australia; topical minoxidil is sold over the counter at pharmacies.",
          "Mechanism: finasteride lowers DHT (the hormonal cause); minoxidil acts locally on the follicle.",
          "Commitment: both only work while you keep using them, so either is an ongoing routine rather than a course you finish.",
          "Assessment: finasteride needs a practitioner because it carries real considerations, including a serious pregnancy warning; over-the-counter minoxidil does not, though a review is still worthwhile.",
        ],
        body: [],
      },
      {
        h: "Can you use both together?",
        body: [
          "Yes, and it is common. Because they work through different mechanisms, finasteride and minoxidil are often used alongside each other, and many telehealth plans combine them for that reason. Whether a combination suits you, and at what strengths, is exactly the kind of thing a practitioner weighs up during an assessment rather than something to self-prescribe.",
          "The trade is simplicity versus coverage. A single active is one product to manage; a combined plan is more to keep on top of, but targets the problem from two angles. Neither is automatically better, and the right answer depends on your situation and how much routine you will realistically stick to.",
        ],
      },
      {
        h: "How to get either in Australia",
        body: [
          "For topical minoxidil on its own, a pharmacy is the direct route, since it does not need a prescription. The catch is that you are managing it yourself with no assessment, and you cannot get finasteride that way.",
          "For finasteride, or for a combined and assessed plan, you need a practitioner: your own GP, or an online telehealth service where a registered Australian practitioner reviews your case and prescribes if it is appropriate. Mosh is one Australian men's service that runs this kind of assessment for hair loss, usually as a subscription with the medicine and delivery included.",
        ],
      },
    ],
    faqs: [
      { q: "Is finasteride or minoxidil better?", a: "Neither is universally 'better' because they work differently: finasteride lowers the hormone (DHT) behind male pattern hair loss, while minoxidil acts on the follicle locally. Some men are suited to one, some to the other, and some to both. Which is appropriate for you is a clinical decision a practitioner makes after an assessment." },
      { q: "Can I take finasteride and minoxidil at the same time?", a: "Often, yes, and combined plans are common because the two work through different mechanisms. Whether a combination is suitable for you, and at what strengths, is something a practitioner assesses individually. This page is general information, not medical advice." },
      { q: "Is minoxidil prescription-only like finasteride?", a: "No. Topical minoxidil is sold over the counter at Australian pharmacies without a prescription. Oral finasteride is Schedule 4 (prescription-only), and so is oral minoxidil, which is used off-label under practitioner supervision." },
      { q: "Do I have to keep using them forever?", a: "Any benefit from either continues only while you keep using it. Both are treated as ongoing rather than one-off, so stopping generally means the hair loss resumes its previous course over the following months." },
    ],
    related: [R.fin, R.min, R.best, R.mosh, R.hub],
  },

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
          "You can get an assessment, and, if suitable, prescription treatments such as finasteride, along with over-the-counter options like topical minoxidil bundled into a plan. You can also get ongoing review and delivery, which is the main convenience.",
          "You cannot get a guaranteed outcome, and you cannot be promised a specific medicine before anyone has assessed you. Any service that offers guaranteed access to finasteride before a review is not operating the way a compliant Australian service should. Suitability is decided case by case.",
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
      { q: "Can I get finasteride online without seeing anyone?", a: "No. Finasteride is prescription-only, so a registered practitioner must assess you first, even through telehealth. The review can happen online, but it has to be a real assessment. No compliant service can supply it before that." },
      { q: "How much does online hair-loss treatment cost?", a: "It is usually a monthly subscription that bundles the medicine, practitioner oversight and delivery. Mosh, for example, publishes hair-loss plans from $24 a month up to $56 for its more advanced plan, with free delivery. The exact plan is set at the assessment, so confirm the current terms before committing." },
      { q: "Is telehealth or my GP better for hair loss?", a: "Both are valid. A GP offers in-person, whole-of-health care but is slower to start; telehealth is faster and bundles medicine, review and delivery, but is focused on the one issue. It comes down to how you prefer to be supported." },
    ],
    related: [R.fin, R.min, R.best, R.cost, R.mosh],
  },

  {
    slug: "/how-long-does-finasteride-take-to-work-australia",
    crumb: "How long finasteride takes",
    priority: 0.78,
    h1: "How long does finasteride take to work?",
    meta: {
      // TGA compliance: prescription-medicine topic, kept out of public search.
      noIndex: true,
      title: "How Long Does Finasteride Take to Work? (Australia 2026) | Refer Labs",
      description:
        "A realistic finasteride timeline: why it is slow, the early shedding phase, when to judge results, and why any benefit is ongoing. Responses vary between people. Information only, not medical advice.",
      keywords: ["how long does finasteride take to work", "finasteride results timeline", "finasteride shedding", "finasteride how long australia"],
    },
    lead:
      "Finasteride is slow, and patience is part of using it. The approved product information generally points to at least three months of daily use before any change is visible, and clinical reviews note most men need around six months, sometimes twelve, to judge the response fairly. Some men also go through an early shedding phase in the first weeks that can look like the opposite of progress. How much benefit any individual sees varies, and what to watch is whether loss has slowed once you have given it enough time, rather than the week-to-week picture.",
    sections: [
      {
        h: "A realistic timeline",
        body: ["Rough guides only, since responses vary from person to person and a practitioner and the product information are the real reference."],
        bullets: [
          "First few weeks: some men notice increased shedding. This is described as a temporary phase, not a sign it is failing.",
          "Around three months: the earliest point the product information suggests any visible change might appear.",
          "Six months: the point most clinical reviews suggest before judging whether it is helping.",
          "Twelve months: a fuller picture of the response, and the horizon many practitioners use to assess it properly.",
        ],
      },
      {
        h: "Why it takes so long",
        body: [
          "Hair grows slowly, and finasteride works upstream of the follicle by lowering DHT rather than forcing growth directly. It takes months for that hormonal change to translate into a visible difference in the hair cycle, and for any weakened-but-still-present hairs to recover or for further loss to stall.",
          "That is also why the first thing to watch for is loss slowing, not dramatic regrowth. For many men the realistic goal is holding the ground they have, with some partial regrowth for a subset. Framing success as 'keeping what I have' rather than 'growing it all back' tends to match what the evidence supports.",
        ],
      },
      {
        h: "It only works while you keep taking it",
        body: [
          "Any benefit continues only while you keep taking it. Stop, and the DHT level returns to where it was, and the hair loss generally resumes its previous course over the following months, often undoing gains within a year. That is why finasteride is treated as an ongoing treatment rather than a fixed course, and why the cost is usually a subscription.",
          "If you are weighing it up, factor in that this is a long-term commitment, not a quick fix. Deciding whether that suits you, and whether finasteride is appropriate at all, is a conversation for a practitioner.",
        ],
      },
    ],
    faqs: [
      { q: "How long before I see results from finasteride?", a: "The approved product information generally points to at least three months of daily use before any visible change, and most clinical reviews suggest six months or more to judge it fairly. Responses vary between people, so a practitioner is the right person to set your expectations." },
      { q: "Is it normal to shed more hair when starting finasteride?", a: "Some men report increased shedding in the early weeks, which is described as a temporary phase rather than a sign the treatment is failing. If you are worried about how you are responding, raise it with the practitioner managing your treatment." },
      { q: "What happens if I stop taking finasteride?", a: "Any benefit continues only while you keep taking it. Stopping generally means DHT returns to its previous level and the hair loss resumes its earlier course over the following months, often within a year. It is treated as ongoing rather than a one-off course." },
      { q: "Does finasteride regrow hair or just stop loss?", a: "For many men the realistic result is slowing further loss and holding what they have; some also see partial regrowth, though how much varies. Product information and a practitioner are the reference for what it can and cannot do for you." },
    ],
    related: [R.fin, R.min, R.best, R.cost, R.mosh],
  },

  {
    slug: "/how-to-stop-hair-loss-australia",
    crumb: "How to stop hair loss",
    priority: 0.78,
    h1: "How to stop hair loss: what actually helps",
    meta: {
      title: "How to Stop Hair Loss (Australia 2026): What Actually Helps | Refer Labs",
      description:
        "How to approach stopping male pattern hair loss in Australia: understanding the cause, the two most studied treatments, what the evidence does and doesn't support, and why acting early matters. Information only.",
      keywords: ["how to stop hair loss", "how to stop balding australia", "stop hair loss men", "hair loss treatment that works australia"],
    },
    lead:
      "If you want to stop hair loss, the first useful step is knowing what kind you have. The most common form in men, male pattern hair loss, is largely genetic and driven by the hormone DHT, and it is gradual and progressive. That matters because the two treatments with the strongest evidence, finasteride and minoxidil, target that specific process, while most shampoos, supplements and gadgets do not. Acting earlier tends to give you more to work with, since it is easier to hold onto hair you still have than to recover what is gone. What is right for you is a clinical decision, and this page is general information, not medical advice.",
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
          "Finasteride: an oral, prescription-only medicine that lowers DHT, the hormone behind the shrinking of follicles.",
          "Minoxidil: usually a topical product, available over the counter, that acts on the follicle and is often used alongside finasteride.",
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
      { q: "Can you actually stop hair loss?", a: "For male pattern hair loss, the two most studied treatments, finasteride and minoxidil, can slow further loss and, for some men, produce partial regrowth, while they are used. Neither guarantees an outcome, and whether either is appropriate for you is a clinical decision. Other causes of hair loss behave differently and need their own assessment." },
      { q: "What is the most effective way to stop male pattern baldness?", a: "The strongest evidence sits with finasteride (prescription-only, lowers DHT) and minoxidil (usually topical, over the counter), often used together. A practitioner assesses which, if any, suits you. Most shampoos, supplements and devices do not have comparable evidence for stopping the process." },
      { q: "Do hair-loss shampoos and supplements work?", a: "Most have little evidence for stopping male pattern hair loss specifically. They may temporarily improve how hair looks or feels, but they are a poor substitute for the most-studied treatments if halting the underlying process is your goal." },
      { q: "Does acting early make a difference?", a: "Generally yes. Male pattern hair loss is progressive, and it is easier to hold onto hair you still have than to recover hair that is already gone, so getting assessed sooner tends to give you more to work with." },
    ],
    related: [R.fin, R.min, R.best, R.quiz, R.mosh],
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
      "A receding hairline, where the hair retreats at the temples and along the front, is one of the earliest and most common signs of male pattern hair loss. Because it is driven by the same underlying process as thinning on the crown, the treatments with the strongest evidence are the same: finasteride and minoxidil. The thing that most affects the result is not which product you pick but how early you act, because it is easier to hold onto the hairline you still have than to recover ground already lost. Whether any treatment suits you is a clinical decision made after an assessment.",
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
          "Finasteride: prescription-only in Australia, works by lowering DHT, and is the most-studied treatment for slowing the process.",
          "Minoxidil: usually topical and available over the counter, it supports the follicles and is often combined with finasteride.",
          "Early action: because the loss is progressive, starting sooner generally leaves more hair to protect.",
          "Most shampoos, supplements and devices lack comparable evidence for stopping the underlying process, whatever they do for appearance.",
        ],
      },
      {
        h: "How to get assessed without an in-person visit",
        body: [
          "Because finasteride is prescription-only, accessing it means a practitioner assessment, which telehealth services now run online. You complete a consultation with photos, a registered Australian practitioner reviews it individually, and if a treatment is appropriate it is prescribed and delivered. Some men are declined, which is the screening working as intended.",
          "Mosh is one Australian men's telehealth service that runs this process online. Refer Labs readers who start through our link get 55% off their first order, applied automatically with no code to type. It commits you to nothing beyond the consultation, and a practitioner still decides what, if anything, you would be offered. This page is information only, not medical advice.",
        ],
      },
    ],
    faqs: [
      { q: "Can a receding hairline be reversed?", a: "Sometimes partially, but it is more realistic to slow further loss and protect what you have than to fully reverse a receded hairline. Finasteride and minoxidil have the strongest evidence for male pattern hair loss, and results are better the earlier you start. Whether either suits you is a clinical decision made after an assessment. Neither guarantees an outcome." },
      { q: "What is the best treatment for a receding hairline?", a: "For male pattern hair loss, the most-studied options are finasteride (prescription-only, lowers DHT) and minoxidil (usually topical, over the counter), often used together. A practitioner assesses which, if any, is appropriate for you. Most shampoos and supplements lack comparable evidence for stopping the underlying process." },
      { q: "Is a receding hairline always male pattern baldness?", a: "No. A mature hairline settling slightly higher in your twenties is normal, and other causes of hair loss behave differently and need their own assessment. That is one reason a practitioner review matters before assuming a treatment is right for you." },
      { q: "How do I get finasteride for a receding hairline in Australia?", a: "Finasteride is prescription-only, so it requires an assessment by a registered practitioner. Telehealth services run this online: you complete a consultation with photos, a practitioner reviews it, and if appropriate it is prescribed and delivered. Mosh is one such service; Refer Labs readers get 55% off a first order through our link. Some applicants are declined." },
    ],
    related: [R.fin, R.min, R.best, R.mosh, R.quiz],
  },
];

export const HAIR_LOSS_GUIDE_BY_SLUG: Record<string, HairLossGuideEntry> =
  Object.fromEntries(HAIR_LOSS_GUIDES.map((g) => [g.slug, g]));
