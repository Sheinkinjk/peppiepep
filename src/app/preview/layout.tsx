import type { Metadata } from "next";
import "./preview.css";
import { PreviewTools } from "@/components/preview/PreviewTools";

/**
 * Layout for the design-preview routes.
 *
 * The root layout still wraps these pages and renders the global chrome around
 * them, because ChromeGate decides that from a hard-coded route list this brief
 * forbids editing. `preview.css` suppresses that chrome with :has(), and because
 * this stylesheet is only loaded under /preview, nothing else on the site is
 * affected.
 */

/* Public Sans moved to ./legacy-font and imported by the three routes that
   render it. Loading it here preloaded 26KB on every preview route, including
   the ones that never paint a glyph with it. */

/* The display face is loaded per variant, in each variant's own page, so a
   reader on A never downloads B's grotesque and vice versa. */

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="rl-preview"
    >
      <PreviewTools />
      {children}
    </div>
  );
}
