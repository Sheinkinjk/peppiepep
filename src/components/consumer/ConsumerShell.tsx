import "@/app/home.css";
import "@/app/theme.css";
import "@/app/brand.css";
import { SiteFooterBar, SiteHeader } from "@/components/brand/SiteChrome";

/**
 * The consumer page shell: the same header and footer as the homepage
 * (src/components/brand/SiteChrome), around a page body that keeps its own
 * layout. The footer carries the compact newsletter signup here, because inner
 * pages have no newsletter section of their own to fall back on.
 *
 * `hideMobileSearch` is kept for the call sites that pass it; search now lives
 * in the header on every width, so it no longer changes anything.
 */
export default function ConsumerShell({
  children,
}: {
  children: React.ReactNode;
  hideMobileSearch?: boolean;
}) {
  return (
    <div className="nw-root min-h-screen">
      <SiteHeader />
      {children}
      <SiteFooterBar newsletter />
    </div>
  );
}
