import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { TRAINUAL_URL } from "@/lib/affiliate-links";

export const trainualConfig: AffiliatePageConfig = {
  brand: "Trainual",
  logo: "trainual",
  badgeText: "Training & SOPs",
  eyebrow: "HR, onboarding & training",
  affiliateUrl: TRAINUAL_URL,
  quickAnswer:
    "Trainual is an all-in-one training and operations platform: document how your business runs, build onboarding and role-based training, and keep SOPs searchable in one place. Plans are demo-led, so check the current pricing and any trial on Trainual before you commit.",
  offer: "7-day free trial",
  atAGlance: [
    { k: "Type", v: "Training / onboarding / SOPs" },
    { k: "Best for", v: "Growing teams & franchises" },
    { k: "Pricing", v: "Custom pricing — book a demo" },
  ],
  hero: {
    h1Prefix: "Trainual:",
    h1Highlight: "get how your business runs out of people's heads",
    subheading:
      "Document processes, build onboarding and role-based training, and keep every standard operating procedure searchable in one place, so new hires ramp faster and nothing depends on one person remembering it.",
    trustBullets: ["Onboarding & training in one place", "Searchable SOPs", "AI-assisted content"],
  },
  banner: {
    heading: "See how Trainual works",
    body: "Document your processes and build training your team actually uses. Check the current plan on Trainual.",
    buttonLabel: "See Trainual",
  },
  sections: [
    {
      heading: "What Trainual is for",
      paragraphs: [
        "Trainual is built for the moment a business grows past the point where everything lives in the founder's head. You document how things are done, processes, policies and role responsibilities, and turn that into onboarding and training that new hires work through, with tracking so you know it has been read.",
        "Because the same content doubles as a searchable knowledge base, it also cuts the repeated who-knows-how-to-do-this questions that eat a team's time. AI-assisted content creation helps you draft the documentation faster.",
      ],
    },
    {
      heading: "Who it suits",
      paragraphs: [
        "It fits growing teams, multi-location businesses and franchises that need consistent onboarding and repeatable processes. A very small team with simple, stable operations may not need a dedicated tool yet.",
        "Trainual is sold on a subscription and is usually demo-led, so confirm the current plan and any trial for your team size before committing.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Open Trainual", body: "Go to Trainual through the link to start or book a demo." },
    { num: "2", heading: "Document your processes", body: "Capture how things are done into subjects, policies and role guides, with AI help." },
    { num: "3", heading: "Assign & track", body: "Roll out onboarding and training by role, and track completion." },
  ],
  whyUseThis: [
    "Onboarding, training and SOPs in one system",
    "Role-based learning paths so people see only what's relevant",
    "Searchable knowledge base cuts repeat questions",
    "AI-assisted content creation to build docs faster",
  ],
  faqs: [
    {
      q: "Is there a Trainual free trial or discount code?",
      a: "Trainual is usually demo-led, and the current plans and any trial are shown on its site, check there for the latest terms. We don't publish a promo code we can't verify; our referral link takes you to the current offer, at no extra cost to you.",
    },
    {
      q: "How much does Trainual cost?",
      a: "Trainual is priced on a subscription that scales with team size and plan. Because pricing changes and is often quoted after a demo, confirm the current cost on Trainual before committing.",
    },
    {
      q: "What is Trainual used for?",
      a: "Documenting how a business runs, building onboarding and role-based training, and keeping SOPs searchable, so teams stay consistent and new hires ramp faster.",
    },
    {
      q: "Is Trainual an HR tool?",
      a: "It sits alongside HR: it handles the training, onboarding and process-documentation side rather than payroll or benefits. Many teams pair it with an HR/payroll platform, see our HR & payroll hub.",
    },
  ],
  ctas: {
    primary: "See Trainual",
    secondary: "Continue to Trainual",
    midHeading: "Ready to make onboarding repeatable?",
    midBody: "Open Trainual through our referral link and start documenting how your business runs.",
    midButton: "See Trainual",
    bottomHeading: "Get your processes out of people's heads",
    bottomBody: "Document, assign and track training your team actually uses.",
    bottomButton: "Continue to Trainual",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, verify current terms on Trainual before committing.",
};
