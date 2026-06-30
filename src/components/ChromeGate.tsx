"use client";

import { usePathname } from "next/navigation";

/**
 * Renders the global site chrome (header, footer, atmosphere, chatbot) on every
 * route EXCEPT standalone landing pages, which own their full layout.
 *
 * Add a path here to make it a chrome-free, standalone page.
 */
const STANDALONE_ROUTES = ["/moshy"];

export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const isStandalone = STANDALONE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  if (isStandalone) return null;
  return <>{children}</>;
}
