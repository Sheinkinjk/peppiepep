import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { EMPLOYMENT_HERO_URL } from "@/lib/affiliate-links";

export { EMPLOYMENT_HERO_URL };

export const employmentHeroConfig: AffiliatePageConfig = {
  brand: "Employment Hero",
  logo: "employmenthero",
  badgeText: "HR & payroll",
  affiliateUrl: EMPLOYMENT_HERO_URL,
  offer: "Free demo",
  // Every figure below was read on employmenthero.com/pricing (AU), in a
  // rendered browser with each of its Recruitment, HR and Payroll tabs opened,
  // on 30 September 2026. The plan cards print "$10 * Conditions apply" with no
  // billing period beside the figure; the condition is a 10-user minimum. Do not
  // add "a month" or "per employee" to the plan prices: the page does not say it.
  // (The add-ons do say "per employee/month", and are quoted that way.)
  offerCheckedOn: "2026-09-30",

  quickAnswer:
    "Employment Hero lists a standalone Payroll plan at $10 and its HR plans at $10 (HR Essentials) and $14 (HR Engage), each with a minimum of 10 users; HR Elite and Employment Unlimited, which bundles payroll with every HR feature, are quoted by sales (employmenthero.com/pricing, read 30 September 2026). Employment Hero is an Australian-built HR, payroll and hiring platform with ATO-certified Single Touch Payroll (STP Phase 2), aimed at Australian small and medium businesses.",

  banner: {
    heading: "Employment Hero: HR, Payroll & Compliance",
    body: "Click below to go directly to Employment Hero via our affiliate link and see how the all-in-one platform fits your business.",
    buttonLabel: "Continue to Employment Hero",
  },

  eyebrow: "HR & payroll",
  atAGlance: [
    { k: "What it is", v: "All-in-one HR, payroll and employment platform" },
    { k: "Best for", v: "Australian small and medium businesses" },
    { k: "Compliance", v: "Fair Work and ATO compliant, STP Phase 2 certified" },
    { k: "Price", v: "Payroll plan $10; HR plans $10 and $14; 10-user minimum (read 30 Sep 2026)" },
  ],
  trustStrip: [
    "Australian-built for Australian employers",
    "ATO-certified Single Touch Payroll (STP Phase 2)",
    "HR, payroll, hiring and benefits in one platform",
    "Fair Work compliant",
  ],
  verdict:
    "Employment Hero is a strong fit for Australian SMEs that want HR, payroll and compliance handled in one Australian-built platform rather than stitched together. The ATO-certified payroll, Fair Work alignment and employee app cover the core obligations of employing people locally. Payroll and HR are sold as separate plans, or together in the quoted Employment Unlimited plan, so decide which you need before you book the demo.",
  verdictPoints: [
    "Australian-built and aligned to Fair Work and ATO requirements",
    "ATO-certified Single Touch Payroll (STP Phase 2) built in",
    "Covers HR, payroll, hiring and employee benefits from one login",
  ],

  hero: {
    h1Prefix: "Employment Hero (Australia):",
    h1Highlight: "all-in-one HR, payroll and compliance for Australian SMEs",
    subheading:
      "Employment Hero's Payroll plan is listed at $10 and its HR plans at $10 and $14, each with a 10-user minimum, while the all-in-one Employment Unlimited plan is quoted by sales (employmenthero.com/pricing, read 30 September 2026). It is an Australian-built platform combining HR, ATO-certified Single Touch Payroll, recruitment and employee benefits, and the demo is free.",
    trustBullets: [
      "Direct access to Employment Hero",
      "Covers what the platform does and who it suits",
      "Explains the Australian compliance angle in plain terms",
      "Independent view with a disclosed affiliate link",
      "Click through instantly, no steps required on this page",
    ],
  },

  sections: [
    {
      heading: "How much does Employment Hero cost?",
      paragraphs: [
        "Read on employmenthero.com/pricing (Australia) on 30 September 2026, Employment Hero sells payroll and HR as separate plans. The Payroll plan is listed at $10 and includes unlimited pay runs, automated tax calculations, award interpretation, payroll reporting and employee self-service. On the HR side, HR Essentials is $10 and HR Engage, which adds recruitment, expenses, performance and learning, is $14. HR Elite and Employment Unlimited, the plan that bundles payroll with every HR feature, are custom-priced by sales.",
        "Every plan carries the same condition: a minimum of 10 users, billed on the higher of the users in your agreement or your active users. The plan cards do not print a billing period beside the figure. Add-ons are priced per employee a month: rostering and time and attendance $4, managed payroll $20, HR advisory $14. Employment Hero's AI recruitment plans are separate again, from $199, and need no HR or payroll subscription. Employment Hero publishes no discount code; the free demo is the published way in.",
      ],
      hasCta: true,
      ctaText: "See Employment Hero",
    },
    {
      heading: "What is Employment Hero?",
      paragraphs: [
        "Employment Hero is an Australian-built, all-in-one HR, payroll and employment platform. In one system it brings together HR and people operations, payroll, hiring, and employee benefits, so an employer can manage the whole employment lifecycle in one place rather than across several disconnected tools.",
        "The payroll side is ATO-certified for Single Touch Payroll (STP Phase 2), which is the reporting standard Australian employers are required to meet. On the HR side it includes AI recruitment and applicant tracking to help manage hiring, plus employee benefits and earned wage access, and an employee app that gives staff a single place to view payslips, request leave and access their information.",
        "The through-line is that it is designed for Australian employers specifically. Being built locally, it is aligned to Fair Work and ATO requirements rather than adapted from an overseas product.",
      ],
    },
    {
      heading: "Who Employment Hero is best for",
      paragraphs: [
        "Employment Hero is best for Australian small and medium businesses. If you employ people in Australia and want HR, payroll and compliance handled together, the platform is built for exactly that situation and headcount range.",
        "It suits businesses that are outgrowing spreadsheets and manual payroll, or that are juggling separate tools for hiring, HR records and pay. Consolidating those into one compliant platform reduces the risk of things falling through the gaps, particularly around payroll reporting and Fair Work obligations.",
        "It is less relevant to businesses without Australian employees, since the core value is the local compliance and payroll fit. The company reports that more than 350,000 businesses use its platform, which speaks to broad adoption among employers in its target markets.",
      ],
    },
    {
      heading: "Compliance, payroll and the employee app",
      paragraphs: [
        "Compliance is the reason many Australian employers look at Employment Hero. Payroll is ATO-certified for Single Touch Payroll (STP Phase 2), and the platform is built to align with Fair Work requirements, which takes some of the manual burden and risk out of paying and managing staff correctly.",
        "The employee app is the day-to-day touchpoint for staff. It gives employees a single place to view payslips, request leave, and access their details, which reduces back-and-forth for managers and HR. Employee benefits and earned wage access sit alongside this, adding value for staff on top of the core admin.",
        "On the hiring side, AI recruitment and applicant tracking help manage candidates through the process, so recruitment lives in the same system as the HR records those hires eventually become part of.",
      ],
    },
    {
      heading: "What are the alternatives to Employment Hero?",
      paragraphs: [
        "The first question is whether you need a separate payroll system at all. Xero and MYOB both offer payroll inside their accounting software, so a small business already on one of them may only need HR tools on top. Employment Hero earns its place when you want payroll, HR records, onboarding and hiring in one Australian-built system rather than spread across the accounting package and several add-ons.",
        "If what you actually need is documented processes and staff training rather than payroll, Trainual is a different kind of tool: it holds SOPs, onboarding and training, and does not run pay. Both are compared by job on our HR and payroll hub.",
      ],
    },
  ],

  steps: [
    {
      num: "01",
      heading: "Click through to Employment Hero",
      body: "Use any button on this page to go directly to Employment Hero via our affiliate link.",
    },
    {
      num: "02",
      heading: "Identify what you need",
      body: "Decide which parts matter most: HR, payroll, hiring, or benefits. This shapes the plan and quote.",
    },
    {
      num: "03",
      heading: "Request a quote",
      body: "Payroll and HR are separate plans with a 10-user minimum, and Employment Unlimited bundles both on a quote, so book the demo with your headcount and the modules you want.",
    },
    {
      num: "04",
      heading: "Set up HR and payroll",
      body: "Onboard your team, connect payroll with STP Phase 2 reporting, and roll out the employee app to staff.",
    },
  ],

  whyUseThis: [
    "Direct access to Employment Hero via our affiliate link",
    "Explains what the platform is and what it covers",
    "Covers who it suits: Australian SMEs",
    "States which plan includes payroll",
    "Describes the Australian compliance and payroll fit in plain terms",
  ],

  faqs: [
    {
      q: "Is there an Employment Hero discount code?",
      a: "No. There is no Employment Hero discount code to find: Employment Hero does not publish one and Refer Labs does not have one. Its published way in is a free demo, which you can book through the link on this page.",
    },
    {
      q: "What is Employment Hero?",
      a: "Employment Hero is an Australian-built, all-in-one HR, payroll and employment platform. It combines HR and people operations, ATO-certified Single Touch Payroll (STP Phase 2), AI recruitment and applicant tracking, employee benefits and earned wage access, and an employee app. It is designed for Australian employers and aligned to Fair Work and ATO requirements.",
    },
    {
      q: "Is Employment Hero good for Australian businesses?",
      a: "Yes. Employment Hero is Australian-built and designed for Australian employers, with ATO-certified Single Touch Payroll (STP Phase 2) and alignment to Fair Work requirements. That local compliance fit is the main reason Australian small and medium businesses choose it over products adapted from overseas.",
    },
    {
      q: "Does Employment Hero handle payroll and STP?",
      a: "Yes. Employment Hero's payroll is ATO-certified for Single Touch Payroll (STP Phase 2), which is the reporting standard Australian employers are required to meet. It is built to reduce the manual burden and compliance risk of paying and reporting on staff.",
    },
    {
      q: "Who is Employment Hero best for?",
      a: "Employment Hero is best for Australian small and medium businesses that want HR, payroll and compliance handled together in one platform. It suits employers outgrowing spreadsheets or juggling separate tools for hiring, HR records and pay. It is less relevant to businesses without Australian employees.",
    },
    {
      q: "How many businesses use Employment Hero?",
      a: "The company reports that more than 350,000 businesses use its platform. This is a vendor-reported figure, and it points to broad adoption among employers in its target markets. The best way to judge fit is to request a quote and see how the modules map to your own business.",
    },
  ],

  breadcrumb: [
    { label: "Refer Labs", href: "/" },
    { label: "Guides", href: "/guides" },
    { label: "Employment Hero" },
  ],

  relatedLinks: [
    {
      href: "/compare/hr-payroll",
      label: "HR & payroll tools compared",
      desc: "Employment Hero and Trainual sorted by the job each one does.",
    },
    {
      href: "/trainual",
      label: "Trainual",
      desc: "SOPs, onboarding and staff training in one place. It does not run payroll.",
    },
    {
      href: "/best-ai-sales-tools",
      label: "Best AI Sales Tools 2026",
      desc: "GoHighLevel vs AiSDR compared: all-in-one platform versus AI outbound SDR for building pipeline.",
    },
    {
      href: "/gohighlevel",
      label: "GoHighLevel Review",
      desc: "The AI-powered all-in-one platform that combines CRM, marketing automation, funnels and sales pipelines.",
    },
    {
      href: "/for-business",
      label: "For Business: Partner With Refer Labs",
      desc: "Growth services and get-featured partnerships for businesses.",
    },
    {
      href: "/guides",
      label: "All Guides & Comparisons",
      desc: "Independent comparison guides across tools, health, and business categories.",
    },
  ],

  ctas: {
    primary: "See Employment Hero",
    secondary: "Continue to Employment Hero",
    midHeading: "Ready to Handle HR and Payroll in One Place?",
    midBody:
      "Click below to go directly to Employment Hero via our affiliate link. See how the Australian-built platform covers HR, payroll, hiring and compliance, then request a quote for your business.",
    midButton: "Book an Employment Hero demo",
    bottomHeading: "See Employment Hero for Your Business",
    bottomBody:
      "Click below to be taken to Employment Hero. Explore the platform and request pricing scoped to your headcount and the modules you need.",
    bottomButton: "Continue to Employment Hero",
  },

  disclaimer:
    "You will be taken to the Employment Hero site. This page is operated by Refer Labs and contains a disclosed affiliate link. Plan prices were read on employmenthero.com/pricing on 30 September 2026, carry a 10-user minimum and can change; view the latest pricing on Employment Hero's own site. Information is general in nature.",
};
