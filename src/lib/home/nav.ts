/**
 * The header groups as they stand on `main` today (src/lib/nav.ts), in the
 * shape the preview Nav takes. live-home.ts was inventoried on 11 September,
 * before Health & Beauty joined the header third on 16 September, so this is
 * read from main rather than from that snapshot. Labels and notes verbatim.
 */
import type { NavGroup } from "@/lib/home/content";

export const hybridNav: NavGroup[] = [
  {
    label: "Weight Loss", href: "/weight-loss",
    items: [
      { href: "/moshy", label: "Moshy", blurb: "How the program works, plus $120 off your first order" },
      { href: "/juniper", label: "Juniper", blurb: "Built for women, with a free first consultation" },
      { href: "/best-weight-loss-telehealth-australia", label: "Compare all providers", blurb: "Pricing, eligibility and who each suits" },
      { href: "/weight-loss-quiz", label: "Which pathway fits you?", blurb: "A 60-second match, no sign-up" },
    ],
  },
  {
    label: "Hair Loss", href: "/hair-loss",
    items: [
      { href: "/moshhair", label: "Mosh", blurb: "How it works, plus 55% off your first order" },
      { href: "/best-hair-loss-treatment-australia", label: "Compare all options", blurb: "Clinical telehealth vs topical products" },
      { href: "/hair-loss-treatment-cost-australia", label: "What treatment costs", blurb: "What you pay and what is included" },
      { href: "/hair-loss-quiz", label: "Which option fits you?", blurb: "A 30-second match" },
    ],
  },
  {
    label: "Health & Beauty", href: "/health-and-beauty",
    items: [
      { href: "/health-and-beauty", label: "Start here", blurb: "Every guide, and what each one decides" },
      { href: "/optislim", label: "OptiSlim", blurb: "Meal replacements, priced per meal" },
      { href: "/foreo", label: "Foreo", blurb: "LED and cleansing devices, in Australian dollars" },
      { href: "/edible-beauty", label: "Edible Beauty", blurb: "Australian natural skincare" },
      { href: "/aussie-health-products", label: "Aussie Health Products", blurb: "Australian health and skincare retailer" },
      { href: "/health-and-beauty/skincare-quiz", label: "Which routine fits you?", blurb: "A short match, no health questions" },
    ],
  },
  {
    label: "Solar & Energy", href: "/solar-and-energy",
    items: [
      { href: "/solar-and-energy", label: "Start here", blurb: "Every energy guide, and what each one decides" },
      { href: "/apollo-energy-group", label: "Home Batteries", blurb: "Apollo Energy Group, sized to your usage" },
      { href: "/home-battery-rebate-australia", label: "Battery Rebate 2026", blurb: "What the federal rebate pays" },
      { href: "/home-battery-payback-calculator", label: "Payback Calculator", blurb: "Estimate your saving and payback period" },
      { href: "/home-battery-cost-australia", label: "What a Battery Costs", blurb: "Installed price ranges and realistic payback" },
      { href: "/portable-power-station-australia", label: "Portable Power", blurb: "EcoFlow and Anker SOLIX, priced per watt-hour" },
    ],
  },
  {
    label: "Business Software", href: "/business-software",
    items: [
      { href: "/business-software", label: "Business Software", blurb: "CRM, email, AI and website tools, compared" },
      { href: "/best-ai-sales-tools", label: "Sales, CRM & Outreach", blurb: "GoHighLevel, Pipedrive, Reply.io" },
      { href: "/affiliate-programs-australia", label: "Affiliate Programs", blurb: "The best programs to join in 2026" },
      { href: "/for-business", label: "Partner with us", blurb: "Get discovered, generate leads, build distribution" },
    ],
  },
];
