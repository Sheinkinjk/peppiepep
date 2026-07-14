import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { FLEXIQUIZ_URL } from "@/lib/affiliate-links";

export const flexiQuizConfig: AffiliatePageConfig = {
  brand: "FlexiQuiz",
  logo: "flexiquiz",
  badgeText: "Quiz & test maker",
  eyebrow: "Quizzes, tests & assessments",
  affiliateUrl: FLEXIQUIZ_URL,
  quickAnswer:
    "FlexiQuiz is an online quiz, test and assessment maker: build quizzes and exams, mark them automatically, issue certificates and analyse results. It has a permanent free plan (up to 20 responses a month, no credit card) and paid plans from US$17/month.",
  offer: "Free plan to start",
  atAGlance: [
    { k: "Type", v: "Quiz, test & assessment maker" },
    { k: "Best for", v: "Trainers, educators & assessments" },
    { k: "Pricing", v: "Free plan; paid from US$17/mo" },
  ],
  hero: {
    h1Prefix: "FlexiQuiz:",
    h1Highlight: "build quizzes, tests and assessments online",
    subheading:
      "Create quizzes and exams with automatic marking, timers, certificates and detailed reports, then share them by link, so training, hiring and education assessments run themselves.",
    trustBullets: ["Free plan to start","Automatic marking & certificates","No credit card to try"],
  },
  banner: {
    heading: "Build your first quiz free",
    body: "Create a quiz or test, share the link and see the results roll in with automatic marking. Free plan, no card required.",
    buttonLabel: "Try FlexiQuiz free",
  },
  sections: [
    {
      heading: "What FlexiQuiz is for",
      paragraphs: [
        "FlexiQuiz is a tool for making online quizzes, tests and assessments. You build questions of many types, set timers and passing scores, let it mark responses automatically, and hand out custom certificates. Detailed reports show how individuals and groups performed.",
        "It suits training, education, recruitment and compliance, anywhere you need to test knowledge and record the result. You share a quiz by link and the grading and reporting are handled for you.",
      ],
    },
    {
      heading: "Who it suits, and who it doesn't",
      paragraphs: [
        "It fits trainers, educators, HR teams and businesses that run assessments, onboarding tests or knowledge checks and want them marked and recorded automatically. The free plan is enough to try it properly.",
        "It is less relevant if you only need a casual marketing quiz for lead capture, where an interactive-content tool fits better. For real tests and assessments with grading and certificates, FlexiQuiz is purpose-built.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Create a quiz", body: "Open FlexiQuiz through the link, sign up free, and build your questions from the available types." },
    { num: "2", heading: "Set the rules", body: "Add timers, passing scores, automatic marking and a certificate for those who pass." },
    { num: "3", heading: "Share and review", body: "Send the quiz link to respondents, then review automatic grades and detailed reports." },
  ],
  whyUseThis: ["Many question types with automatic marking","Timers, passing scores and custom certificates","Detailed reports on individuals and groups","Free plan to build and share real quizzes"],
  faqs: [
    { q: "Is FlexiQuiz free, and is there a discount code?", a: "Yes, FlexiQuiz has a permanent free plan that lets you build and share quizzes with up to 20 responses a month, no credit card. Paid plans from US$17/month raise the limits and add features. It does not publish a standard discount code; using our link takes you to the current plans, at no extra cost to you." },
    { q: "How much does FlexiQuiz cost?", a: "The free plan covers up to 20 responses a month. Paid plans start at US$17/month (Essentials), with Premium US$25/month for more responses and features. Check the current plans for your expected response volume before committing." },
    { q: "Can FlexiQuiz mark quizzes automatically and issue certificates?", a: "Yes. It marks supported question types automatically, applies passing scores, and can issue custom certificates to those who pass, with detailed reporting on results. That makes it well suited to training and assessments." },
    { q: "FlexiQuiz vs a marketing quiz tool, which do I need?", a: "FlexiQuiz is built for real tests and assessments: grading, certificates and reporting. A marketing-quiz or interactive-content tool is built for engagement and lead capture. Choose FlexiQuiz when the goal is to test and record knowledge, not just generate leads." },
  ],
  relatedLinks: [
    { href: "/compare/lead-generation", label: "Compare lead-gen tools", desc: "See FlexiQuiz next to quizzes, popups and landing pages." },
    { href: "/outgrow", label: "Outgrow", desc: "Interactive quizzes and calculators for marketing." },
    { href: "/survicate", label: "Survicate", desc: "Run customer-feedback surveys across your site." },
  ],
  ctas: {
    primary: "See FlexiQuiz",
    secondary: "Continue to FlexiQuiz",
    midHeading: "Need to test knowledge, not just collect emails?",
    midBody: "Build a quiz or test through our link, set automatic marking, and share it with a single link.",
    midButton: "Get started",
    bottomHeading: "Run assessments that mark themselves",
    bottomBody: "Create your questions, add a certificate for those who pass, and review the results in detail.",
    bottomButton: "Continue to FlexiQuiz",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, check current terms on FlexiQuiz before committing.",
};
