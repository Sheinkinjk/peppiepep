"use client";

import { usePathname } from "next/navigation";
import { APOLLO_GUIDES } from "@/lib/apollo-guides";
import { HAIR_LOSS_GUIDES } from "@/lib/hair-loss-guides";

/**
 * Renders the global site chrome (header, footer, atmosphere, chatbot) on every
 * route EXCEPT standalone landing pages, which own their full layout (ConsumerShell).
 *
 * Add a path here to make it a chrome-free, standalone page. A page that renders its
 * own ConsumerShell but is NOT listed here will double-header (the old global nav
 * stacks on top). The Apollo and hair-loss registry slugs are spread in automatically
 * below, so new registry pages can never regress that way; bespoke ConsumerShell pages
 * still have to be added by hand.
 */
const STANDALONE_ROUTES = [
  // Registry-driven clusters (auto-covered, so new entries never double-header)
  ...APOLLO_GUIDES.map((g) => g.slug),
  ...HAIR_LOSS_GUIDES.map((g) => g.slug),
  // Consumer platform surfaces (own light-editorial shell)
  "/",
  "/weight-loss",
  "/hair-loss",
  // Prefix entries: the matcher below also tests `pathname.startsWith(route + "/")`,
  // so these cover every child guide in the new sections, including ones not yet
  // built. Listing the sections rather than each page is what stops the
  // double-header this file warns about from returning with the next guide.
  // Found by a sitewide sweep, not by anyone noticing: these render ConsumerShell
  // but were never registered, so the legacy header stacked on top of their own
  // nav. Three are pet money pages. Worth re-running that sweep after any new
  // ConsumerShell page rather than trusting this list to stay complete.
  "/petsonme",
  "/best-pet-insurance-australia",
  "/knose-vs-petsonme",
  "/mosh-review",
  "/weight-loss-treatment-eligibility-australia",
  "/coming-soon",
  "/affiliate-software-australia",
  "/longevity",
  "/mens-health",
  "/skin-and-beauty",
  "/sleep",
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
  "/moshy-vs-gp",
  "/moshy-alternatives",
  "/weight-loss-telehealth-men-australia",
  "/online-weight-loss-programs-australia",
  "/mens-health-telehealth-australia",
  // Comparison roundups + head-to-heads (not core business)
  "/moshy-vs-juniper",
  "/juniper",
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
  "/weight-loss-telehealth-cost-australia",
  "/online-weight-loss-doctor-australia",
  "/cheapest-weight-loss-telehealth-australia",
  "/weight-loss-cost-calculator",
  "/moshy-vs-pilot",
  "/mosh-vs-pilot",
  "/mosh-vs-dense",
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
  "/search",
  "/pet-insurance",
  "/knose",
  "/what-pet-insurance-covers-australia",
  "/about",
  "/cloudtalk",
  "/krispcall",
  "/dext",
  "/trainual",
  "/lindy",
  "/elevenlabs",
  "/wing-assistant",
  "/survicate",
  "/solar-and-energy",
  // Portable power sub-category (EcoFlow + Anker SOLIX, Aug 2026)
  "/ecoflow",
  "/anker-solix",
  "/ecoflow-vs-anker-solix",
  "/portable-power-station-australia",
  "/portable-vs-installed-home-battery-australia",
  // Apollo Energy (VIP standalone money page, own bespoke shell)
  "/apollo-energy-group",
  "/apollo-energy-review",
  "/home-battery-rebate-australia",
  "/home-battery-rebate-by-state-australia",
  "/home-battery-cost-australia",
  "/home-battery-payback-calculator",
  "/best-home-battery-australia",
  "/what-size-home-battery-do-i-need-australia",
  "/nsw-home-battery-rebate-2026",
  "/home-battery-installer-nsw",
  "/virtual-power-plant-australia",
  // Hair-loss cluster info pages (own light ConsumerShell)
  "/hair-loss-treatment-cost-australia",
  "/online-hair-loss-treatment-australia",
  "/how-to-stop-hair-loss-australia",
  "/receding-hairline-treatment-australia",
  // Business software hub (own light ConsumerShell; was double-headering)
  "/business-software",
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
  "/true-cost-of-business-loans-australia",
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
  // Weight-loss + hair bespoke pages (own ConsumerShell, not registry-driven)
  "/weight-loss-telehealth-women-australia",
  // B2B brand review pages (PremiumAffiliateLanding renders ConsumerShell; these were
  // missing and double-headering)
  "/pipedrive",
  "/capsule",
  "/nutshell",
  "/keap",
  "/activecampaign",
  "/hellobar",
  "/outgrow",
  "/flexiquiz",
  "/landingi",
  "/unbounce",
  "/beautifulai",
  "/pandadoc",
  "/blinq",
  "/best-crm-small-business-australia",
  // FAQ (migrated to ConsumerShell)
  "/faq",
  // Deals hub
  "/deals",
  // Get Featured (consumer-facing partner door; migrated to the consumer shell)
  // Prefix: covers /authors/<id> for every author in the registry.
  "/authors",
  // Found by sweeping every ConsumerShell page against this list rather than
  // by anyone noticing: all three rendered two headers and two footers.
  "/apollo-energy-group-eoi",
  "/weight-loss-guide",
  "/who-underwrites-pet-insurance-australia",
  "/data",
  "/disclaimer",
  "/partner-with-refer-labs",
  // Apollo EOI campaign landing (own dark design)
  // Lender head-to-head comparisons (prefix covers /compare-business-lenders/<slug>)
  "/compare-business-lenders",
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
