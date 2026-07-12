import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { FLOCKSY_URL } from "@/lib/affiliate-links";

export const flocksyConfig: AffiliatePageConfig = {
  brand: "Flocksy",
  badgeText: "Unlimited design",
  eyebrow: "Design & creative services",
  affiliateUrl: FLOCKSY_URL,
  quickAnswer:
    "Flocksy is a flat-rate subscription that gives you a dedicated team of human creatives for unlimited design and creative requests, across graphic design, video, motion, branding, web and copywriting. There is no free plan or trial, but a 14-day money-back guarantee; plans start at about US$1,199/month.",
  offer: "14-day money-back guarantee",
  atAGlance: [
    { k: "Type", v: "Unlimited creative subscription" },
    { k: "Best for", v: "Businesses & agencies" },
    { k: "Pricing", v: "From US$1,199/mo" },
    { k: "Guarantee", v: "14-day money-back" },
  ],
  hero: {
    h1Prefix: "Flocksy:",
    h1Highlight: "unlimited design for one flat monthly fee",
    subheading:
      "Submit as many creative requests as you like and a dedicated team handles them, graphic design, video, motion, branding, web and more, with unlimited revisions, for a fixed monthly price instead of hiring in-house or paying per project.",
    trustBullets: ["Unlimited requests & revisions","Dedicated human creative team","14-day money-back guarantee"],
  },
  banner: {
    heading: "See how Flocksy works",
    body: "Submit unlimited creative requests to a dedicated team for a flat monthly fee, backed by a 14-day money-back guarantee.",
    buttonLabel: "Continue to Flocksy",
  },
  sections: [
    {
      heading: "What Flocksy is for",
      paragraphs: [
        "Flocksy is an unlimited creative service on a subscription. You submit design and creative requests, graphic design, video editing, motion graphics, branding, web design, illustration, copywriting and more, and a dedicated team works through them, with unlimited revisions until you are happy.",
        "The model replaces per-project freelancers or an in-house hire with a flat monthly fee and a predictable queue. Your plan sets how much work runs at once (measured in daily hours), not a cap on requests.",
      ],
    },
    {
      heading: "Who it suits, and who it doesn't",
      paragraphs: [
        "It fits businesses, marketers and agencies with a steady stream of creative work who want predictable cost and a team that learns their brand, without recruiting. Unlimited requests and revisions are the draw.",
        "It is not a fit for a one-off logo or a tight budget, it is a premium monthly commitment starting around US$1,199. If your creative needs are occasional, a single project or an AI tool is cheaper. If they are constant, the flat fee can pay for itself.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Choose a plan", body: "Open Flocksy through the link and pick the plan that matches how much creative work you run at once." },
    { num: "2", heading: "Submit your briefs", body: "Add unlimited requests to your queue across 140+ creative services." },
    { num: "3", heading: "Review and revise", body: "Get work back from your dedicated team and request unlimited revisions until it is right." },
  ],
  whyUseThis: ["Unlimited requests and unlimited revisions","A dedicated team across 140+ creative services","Flat monthly fee instead of per-project costs","14-day money-back guarantee to start"],
  faqs: [
    { q: "Is there a Flocksy free trial or discount code?", a: "Flocksy does not offer a free plan or free trial, but it is backed by a 14-day money-back guarantee, so you can try it with your own briefs and get a refund if it is not right. It does not usually run a public discount code; quarterly and annual billing lower the rate, and starting through our referral link takes you to the current plans at no extra cost to you." },
    { q: "How much does Flocksy cost?", a: "Plans start at about US$1,199/month for the entry tier (roughly ten hours of creative work a week with a dedicated team), rising to around US$1,699/month and up for more capacity and senior roles. Quarterly billing saves about 10% and annual about 20%. It is a premium, ongoing service, so it suits steady creative needs." },
    { q: "What can Flocksy design for me?", a: "Across 140+ services: graphic design, logos and branding, video editing, motion graphics, web design, illustration, copywriting and more. You submit requests to your queue and a dedicated team works through them with unlimited revisions." },
    { q: "Flocksy vs hiring a freelancer or designer?", a: "A freelancer suits occasional, one-off work. Flocksy suits a constant stream: a flat monthly fee, a team that learns your brand, unlimited requests and revisions, and no recruiting. If you are regularly paying for design, the subscription can work out cheaper and more predictable; if not, per-project is fine." },
  ],
  ctas: {
    primary: "See Flocksy",
    secondary: "Continue to Flocksy",
    midHeading: "Need ongoing design without hiring in-house?",
    midBody: "Start through our link, submit your first brief, and get work back from a dedicated creative team.",
    midButton: "Get started",
    bottomHeading: "Unlimited creative, one flat monthly rate",
    bottomBody: "Send unlimited design requests across 140+ services, with unlimited revisions, for a fixed monthly fee.",
    bottomButton: "Continue to Flocksy",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, check current terms on Flocksy before committing.",
};
