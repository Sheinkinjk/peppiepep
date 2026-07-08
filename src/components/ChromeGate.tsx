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
  "/apollopeptides",
  "/ascensionpeptides",
  "/biopeptitech",
  "/carrd",
  "/durableai",
  "/butternut",
  "/swipepages",
  "/beehiiv",
  "/incomelab",
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
  "/best-peptide-supplier",
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
  "/apollo-vs-ascension",
  "/apollo-vs-biopeptitech",
  "/ascension-vs-biopeptitech",
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
  "/polymarket",
  // Affiliate content hub + editorial standards
  "/guides",
  "/how-we-research",
  // $799 Blueprint (migrated to the light ConsumerShell theme)
  "/referral-blueprint",
];

export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const isStandalone = STANDALONE_ROUTES.some((route) =>
    route === "/" ? pathname === "/" : pathname === route || pathname.startsWith(`${route}/`),
  );
  if (isStandalone) return null;
  return <>{children}</>;
}
