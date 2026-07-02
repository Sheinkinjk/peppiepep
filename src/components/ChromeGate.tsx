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
  "/for-business",
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
  "/comparison-website",
  // Affiliate content hub + editorial standards
  "/guides",
  "/how-we-research",
];

export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const isStandalone = STANDALONE_ROUTES.some((route) =>
    route === "/" ? pathname === "/" : pathname === route || pathname.startsWith(`${route}/`),
  );
  if (isStandalone) return null;
  return <>{children}</>;
}
