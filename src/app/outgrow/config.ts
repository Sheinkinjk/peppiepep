import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { OUTGROW_URL } from "@/lib/affiliate-links";

export const outgrowConfig: AffiliatePageConfig = {
  brand: "Outgrow",
  logo: "outgrow",
  badgeText: "Interactive content",
  eyebrow: "Lead generation & conversion",
  affiliateUrl: OUTGROW_URL,
  quickAnswer:
    "Outgrow is a no-code platform for building interactive content, calculators, quizzes, assessments, polls and forms, that engages visitors and captures qualified leads. It has a free forms plan and a 7-day trial of the Business plan with no credit card; paid plans start at about US$14/month billed annually.",
  offer: "Free plan; 7-day Business trial, no card",
  atAGlance: [
    { k: "Type", v: "Interactive content / lead gen" },
    { k: "Best for", v: "Marketers capturing qualified leads" },
    { k: "Pricing", v: "Free plan; paid from US$14/mo (annual)" },
  ],
  hero: {
    h1Prefix: "Outgrow:",
    h1Highlight: "quizzes and calculators that capture leads",
    subheading:
      "Build interactive calculators, quizzes, assessments and polls with no code, embed them anywhere, and turn passive visitors into qualified leads who tell you exactly what they want.",
    trustBullets: ["Free plan to start","No code, embed anywhere","7-day Business trial, no card"],
  },
  banner: {
    heading: "Build interactive content free",
    body: "Create your first calculator or quiz, embed it, and start capturing qualified leads. Free plan plus a 7-day Business trial, no card required.",
    buttonLabel: "Try Outgrow free",
  },
  sections: [
    {
      heading: "What Outgrow is for",
      paragraphs: [
        "Outgrow lets you build interactive content, calculators, quizzes, assessments, polls, chatbots and forms, without code, then embed it on your site, in emails or on social. Because people engage with it and answer questions, you capture better-qualified leads and learn what each person needs.",
        "A pricing calculator, a 'which product is right for you' quiz or a readiness assessment turns a passive visit into a conversation. It suits marketers who want engagement and lead quality, not just a static form.",
      ],
    },
    {
      heading: "Who it suits, and who it doesn't",
      paragraphs: [
        "It fits marketers, agencies and businesses that want to lift engagement and capture qualified leads with interactive experiences. The variety of content types and the no-code builder are its strengths.",
        "It is less relevant if a simple contact form is all you need, where a basic form tool is cheaper. But when you want visitors to interact and self-qualify, interactive content consistently outperforms static pages.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Pick a content type", body: "Open Outgrow through the link, sign up, and choose a calculator, quiz, assessment or form template." },
    { num: "2", heading: "Build with no code", body: "Customise the questions, logic and design in the builder, and add your lead-capture step." },
    { num: "3", heading: "Embed and capture", body: "Embed it on your site, email or socials, then watch qualified leads and insights come in." },
  ],
  whyUseThis: ["Calculators, quizzes, assessments and polls in one tool","No code, embed anywhere","Captures better-qualified, self-selected leads","Templates to launch quickly"],
  faqs: [
    { q: "Is Outgrow free, and is there a discount code?", a: "Outgrow has a free forms/surveys plan and a 7-day trial of the Business plan with no credit card. Paid plans from about US$14/month billed annually unlock more content types and leads. It does not publish a standard discount code; using our link takes you to the current plans, at no extra cost to you." },
    { q: "How much does Outgrow cost?", a: "There is a limited free plan. Paid plans start at about US$14/month billed annually (Freelancer Limited) with caps on content types and monthly leads, rising to Essentials around US$95/month for more. Check the current plans for the content types and lead volume you need." },
    { q: "What can I build with Outgrow?", a: "Interactive calculators, quizzes, assessments, polls, surveys, chatbots and forms, all without code. Common uses are pricing or ROI calculators, product-match quizzes and readiness assessments, each with a lead-capture step." },
    { q: "Why use interactive content instead of a form?", a: "Static forms ask people to give without getting anything back. Interactive content gives a result, a score, a recommendation, a number, in exchange for answers, so more people engage and the leads you capture are better qualified because they have told you what they want." },
  ],
  ctas: {
    primary: "See Outgrow",
    secondary: "Continue to Outgrow",
    midHeading: "Want visitors to interact, not just browse?",
    midBody: "Build a calculator or quiz through our link, embed it, and start capturing qualified leads.",
    midButton: "Get started",
    bottomHeading: "Turn browsing into a conversation",
    bottomBody: "Launch an interactive calculator, quiz or assessment and let people self-qualify as they go.",
    bottomButton: "Continue to Outgrow",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, check current terms on Outgrow before committing.",
};
