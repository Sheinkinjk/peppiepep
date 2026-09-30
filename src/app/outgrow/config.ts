import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { OUTGROW_URL } from "@/lib/affiliate-links";

export const outgrowConfig: AffiliatePageConfig = {
  brand: "Outgrow",
  logo: "outgrow",
  badgeText: "Interactive content",
  eyebrow: "Lead generation & conversion",
  affiliateUrl: OUTGROW_URL,
  quickAnswer:
    "Outgrow is a no-code builder for calculators, quizzes, assessments and polls that capture leads. It offers a 7-day trial of its Business plan with no credit card, and its cheapest plan, Freelancer Limited, is listed at US$14 a month against a struck-through US$22 (outgrow.co/pricing, read 30 September 2026). Outgrow's own FAQ says small businesses, startups and nonprofits can ask it for a coupon or custom plan.",
  offer: "7-day Business plan trial, no card",
  offerCheckedOn: "2026-09-30",
  atAGlance: [
    { k: "Type", v: "Interactive content / lead gen" },
    { k: "Best for", v: "Marketers capturing qualified leads" },
    { k: "Pricing", v: "From US$14/mo, Freelancer Limited (read 30 Sep 2026)" },
  ],
  hero: {
    h1Prefix: "Outgrow:",
    h1Highlight: "quizzes and calculators that capture leads",
    subheading:
      "Outgrow's 7-day Business plan trial needs no credit card, and paid plans start at US$14 a month (outgrow.co/pricing, read 30 September 2026). It builds interactive calculators, quizzes, assessments and polls with no code, and turns visitors into leads who tell you what they want.",
    trustBullets: ["7-day Business trial, no card","No code, embed anywhere","Coupons for small businesses on request"],
  },
  banner: {
    heading: "Build interactive content free",
    body: "Create your first calculator or quiz, embed it, and start capturing qualified leads. 7-day Business trial, no card required.",
    buttonLabel: "Try Outgrow free",
  },
  sections: [
    {
      heading: "Is there an Outgrow discount code?",
      paragraphs: [
        "Outgrow lists no discount code on its own site, and Refer Labs has none to pass on, but its own pricing FAQ, read on 30 September 2026, says a small business, startup or nonprofit can ask Outgrow for a coupon or a custom plan. That is the one route to a lower price Outgrow advertises, and it is worth asking before you pay list price.",
        "The published list prices, per month: Freelancer Limited US$14, Freelancer Pro US$25, Essentials US$95 and Business US$600, each shown against a higher struck-through figure (US$22, US$45, US$115 and US$720), with Outgrow advertising savings of up to 44%. Plans differ by content types, yearly lead caps (3,000 on Freelancer Limited) and users. The 7-day Business plan trial needs no credit card.",
      ],
      hasCta: true,
      ctaText: "Try Outgrow free",
    },
    {
      heading: "What Outgrow is for",
      paragraphs: [
        "Outgrow lets you build interactive content, calculators, quizzes, assessments, polls, chatbots and forms, without code, then embed it on your site, in emails or on social. Because people engage with it and answer questions, you capture better-qualified leads and learn what each person needs.",
        "A pricing calculator, a 'which product is right for you' quiz or a readiness assessment turns a passive visit into a conversation. It suits marketers who want more engagement and better-qualified leads than a static form gets.",
      ],
    },
    {
      heading: "Who it suits, and who it doesn't",
      paragraphs: [
        "It fits marketers, agencies and businesses that want to lift engagement and capture qualified leads with interactive experiences. The variety of content types and the no-code builder are its strengths.",
        "It is less relevant if a simple contact form is all you need, where a basic form tool is cheaper. When you want visitors to interact and self-qualify, interactive content is the stronger fit.",
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
    { q: "Is there a free Outgrow trial?", a: "Yes. Outgrow's FAQ says the trial gives you the Business plan for 7 days without adding a credit card; afterwards you add a card and choose a plan (read 30 September 2026)." },
    { q: "What can I build with Outgrow?", a: "Interactive calculators, quizzes, assessments, polls, surveys, chatbots and forms, all without code. Common uses are pricing or ROI calculators, product-match quizzes and readiness assessments, each with a lead-capture step." },
    { q: "Why use interactive content instead of a form?", a: "Static forms ask people to give without getting anything back. Interactive content gives a result, a score, a recommendation, a number, in exchange for answers, so more people engage and the leads you capture are better qualified because they have told you what they want." },
  ],
  relatedLinks: [
    { href: "/compare/lead-generation", label: "Compare lead-gen tools", desc: "See Outgrow next to popups, landing pages and quizzes." },
    { href: "/flexiquiz", label: "FlexiQuiz", desc: "Build quizzes and tests with automatic marking." },
    { href: "/hellobar", label: "Hello Bar", desc: "Capture emails with on-site popups and bars." },
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
