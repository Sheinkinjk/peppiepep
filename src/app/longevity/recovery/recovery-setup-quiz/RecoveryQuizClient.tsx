"use client";

import PreferenceQuiz, { type QuizQuestion, type QuizResult } from "@/components/consumer/PreferenceQuiz";

/** Space, budget, climate and frequency. Nothing about health. */
const QUESTIONS: QuizQuestion[] = [
  {
    key: "frequency",
    q: "How often would you realistically use it?",
    options: [
      { value: "daily", label: "Most days" },
      { value: "few", label: "Two or three times a week" },
      { value: "rare", label: "Occasionally", note: "Once a week or less" },
    ],
  },
  {
    key: "space",
    q: "What space do you have?",
    options: [
      { value: "yard", label: "Outdoor space, and I own the place" },
      { value: "balcony", label: "A balcony or small courtyard" },
      { value: "renting", label: "I rent, so nothing permanent" },
    ],
  },
  {
    key: "budget",
    q: "What are you willing to spend up front?",
    options: [
      { value: "low", label: "Under $1,000" },
      { value: "mid", label: "$1,000 to $5,000" },
      { value: "high", label: "More than $5,000" },
    ],
  },
  {
    key: "climate",
    q: "What are your summers like?",
    options: [
      { value: "hot", label: "Hot", note: "Brisbane, Perth, Darwin and similar" },
      { value: "mild", label: "Mild", note: "Sydney, Adelaide and similar" },
      { value: "cool", label: "Cool", note: "Melbourne, Hobart and similar" },
    ],
  },
];

function resolve(a: Record<string, string>): QuizResult {
  const rare = a.frequency === "rare";
  const renting = a.space === "renting";
  const hot = a.climate === "hot";

  if (rare) {
    return {
      title: "Start with bagged ice before buying anything",
      body: "At this frequency a chiller is hard to justify: it runs continuously to serve a handful of sessions a month, so you pay for cold water you are not using. A simple tub and bagged ice costs very little and tells you honestly whether the habit sticks. If it does, the arithmetic for a chiller changes and you will know it has.",
      next: [
        { href: "/longevity/recovery/ice-bath-running-costs-australia", label: "Work out your own break-even" },
        { href: "/longevity/recovery/contrast-therapy-what-the-evidence-says", label: "What the evidence supports" },
      ],
    };
  }
  if (renting) {
    return {
      title: "Portable, and check the loaded weight",
      body: "Renting rules out anything needing installation or a dedicated circuit, which removes traditional saunas and fixed setups. A portable tub is the practical route. The check most people skip is weight: a filled tub is several hundred kilograms, which matters on a balcony or a suspended floor and is worth confirming before delivery rather than after.",
      next: [
        { href: "/longevity/recovery/ice-bath-comparison-australia", label: "What to compare" },
        { href: "/longevity/recovery/ice-bath-running-costs-australia", label: "Running costs" },
      ],
    };
  }
  if (hot && a.budget !== "low") {
    return {
      title: "Size the chiller for your climate, not the brochure",
      body: "In a hot climate the chiller is doing considerably more work, and undersizing is the expensive mistake: a unit that cannot hold your target will run continuously and still miss it, costing more than the larger one would have. Give the supplier your tub volume, your city and your target temperature and make them size it. Budget for a good cover and shade at the same time, since both cut the load.",
      next: [
        { href: "/longevity/recovery/ice-bath-running-costs-australia", label: "What it will cost to run" },
        { href: "/longevity/recovery/ice-bath-comparison-australia", label: "Comparing setups" },
      ],
    };
  }
  if (a.budget === "high") {
    return {
      title: "At this budget, get the electrical quote first",
      body: "You can afford a sauna as well as a plunge, and the constraint stops being price and starts being your switchboard. Traditional saunas usually need a dedicated high-current circuit, and if your board is full that is a separate and significant cost. Have an electrician look at it before you choose a unit rather than after it arrives.",
      next: [
        { href: "/longevity/recovery/home-sauna-cost-australia", label: "The lines quotes leave out" },
        { href: "/longevity/recovery/infrared-vs-traditional-sauna-australia", label: "Infrared or traditional?" },
      ],
    };
  }
  return {
    title: "Cost it over three years, not at the checkout",
    body: "At this frequency a permanent setup makes sense, and the number that should decide between options is purchase plus three years of running rather than the listing price. A cheaper unit with a weaker chiller and no cover can cost more across that period than a dearer one that holds temperature easily.",
    next: [
      { href: "/longevity/recovery/ice-bath-running-costs-australia", label: "The running-cost calculation" },
      { href: "/longevity/recovery/ice-bath-comparison-australia", label: "What separates the tiers" },
    ],
  };
}

export default function RecoveryQuizClient() {
  return (
    <PreferenceQuiz
      questions={QUESTIONS}
      resolve={resolve}
      source="recovery-setup-quiz"
      captureLabel="Want to know when we've compared providers in this category?"
      captureNote="One email when recovery goes live. Nothing else, and no recommendation until we have checked someone ourselves."
      disclaimer="This quiz asks only about space, budget, climate and how often you would use a setup. It collects no health information and is general information rather than medical advice. Cold and heat exposure carry real risks for some people; speak to a practitioner before starting if you have a heart condition, high blood pressure, are pregnant, or have a condition affecting circulation."
      sendResult
    />
  );
}
