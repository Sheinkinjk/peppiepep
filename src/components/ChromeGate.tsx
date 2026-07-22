"use client";

import { usePathname } from "next/navigation";

/**
 * Renders the global site chrome (header, footer, atmosphere, chatbot) on every
 * route EXCEPT standalone landing pages, which own their full layout.
 *
 * Add a path here to make it a chrome-free, standalone page.
 */
const STANDALONE_ROUTES = [
  // Consumer platform surfaces (own light-editorial shell)
  "/",
  "/weight-loss",
  "/hair-loss",
  "/for-business",
  "/compare",
  // Brand / affiliate review pages
  "/moshy",
  "/moshhair",
  "/dense",
  "/carrd",
  "/durableai",
  "/butternut",
  "/swipepages",
  "/beehiiv",
  // Moshy funnel pages
  "/moshy-review",
  "/moshy-eligibility",
  "/getmoshy",
  "/moshy-vs-gp",
  "/moshy-alternatives",
  "/weight-loss-telehealth-men-australia",
  "/online-weight-loss-programs-australia",
  "/mens-health-telehealth-australia",
  // Comparison roundups + head-to-heads (not core business)
  "/moshy-vs-juniper",
  "/carrd-vs-durable",
  "/best-weight-loss-telehealth-australia",
  "/best-hair-loss-treatment-australia",
  "/best-website-builder",
  "/best-newsletter-platform",
  // AI sales & automation + HR (affiliate review pages)
  "/aisdr",
  "/gohighlevel",
  "/employmenthero",
  "/replyio",
  "/fullenrich",
  "/best-ai-sales-tools",
  // Email / e-commerce / landing pages / affiliate software (new this release)
  "/brevo",
  "/alidrop",
  "/leadpages",
  "/superfiliate",
  // Weight-loss cluster (own light shell)
  "/glp-1-weight-loss-australia",
  "/weight-loss-injections-australia",
  "/weight-loss-telehealth-cost-australia",
  "/online-weight-loss-doctor-australia",
  "/cheapest-weight-loss-telehealth-australia",
  "/weight-loss-cost-calculator",
  "/moshy-vs-pilot",
  "/mosh-vs-pilot",
  "/mosh-vs-dense",
  "/juniper-alternatives",
  // Website-builder + peptide head-to-heads
  "/carrd-vs-butternut",
  "/durable-vs-butternut",
  // Affiliate-marketing guides
  "/affiliate-programs-australia",
  "/high-paying-affiliate-programs",
  "/recurring-affiliate-programs",
  "/how-to-start-affiliate-marketing-australia",
  "/affiliate-earnings-calculator",
  "/website-builder-quiz",
  "/weight-loss-quiz",
  "/ai-sales-tools-quiz",
  "/hair-loss-quiz",
  "/newsletter-platform-quiz",
  // Polymarket guide cluster (prefix covers all /polymarket/* pages)
  // Affiliate content hub + editorial standards
  "/guides",
  "/how-we-research",
  "/about",
  "/cloudtalk",
  "/krispcall",
  "/dext",
  "/trainual",
  "/lindy",
  "/elevenlabs",
  "/wing-assistant",
  "/survicate",
  // Apollo Energy (VIP standalone money page, own bespoke shell)
  "/apollo-energy",
  "/apollo-energy-review",
  "/home-battery-rebate-australia",
  "/home-battery-cost-australia",
  "/home-battery-payback-calculator",
  // Hair-loss cluster info pages (own light ConsumerShell)
  "/finasteride-australia",
  "/minoxidil-australia",
  "/hair-loss-treatment-cost-australia",
  "/finasteride-vs-minoxidil-australia",
  "/online-hair-loss-treatment-australia",
  "/how-long-does-finasteride-take-to-work-australia",
  "/how-to-stop-hair-loss-australia",
  // Business software hub (own light ConsumerShell; was double-headering)
  "/business-software",
  // $799 Blueprint (migrated to the light ConsumerShell theme)
  "/referral-blueprint",
  // Legal + contact (migrated to the consumer shell so the footer doesn't jump themes)
  "/privacy",
  "/terms",
  "/contact",
  // Business lending (own light ConsumerShell; prefix covers /business-loans/<lender>[/review])
  "/business-loans",
  "/business-loan-calculator",
  "/what-a-business-loan-actually-costs",
  "/equipment-finance-instant-asset-write-off",
  "/how-we-make-money",
  // Business-lending intent + explainer pages (top-level slugs, own ConsumerShell)
  "/unsecured-business-loans-australia",
  "/business-loans-bad-credit-australia",
  "/fast-business-loans-australia",
  "/small-business-loans-australia",
  "/business-line-of-credit-australia",
  "/working-capital-loans-australia",
  "/low-doc-business-loans-australia",
  "/startup-business-loans-australia",
  "/business-loans-sole-traders-australia",
  "/business-loans-hospitality-australia",
  "/secured-vs-unsecured-business-loans",
  "/how-to-get-a-business-loan-australia",
  "/business-loan-eligibility-australia",
  // Lead admin (internal; renders its own minimal chrome, not the public shell)
  "/admin",
];

export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const isStandalone = STANDALONE_ROUTES.some((route) =>
    route === "/" ? pathname === "/" : pathname === route || pathname.startsWith(`${route}/`),
  );
  if (isStandalone) return null;
  return <>{children}</>;
}
