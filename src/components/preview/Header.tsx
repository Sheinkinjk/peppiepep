import Link from "next/link";
import { liveCategories } from "@/lib/preview/data";

/**
 * Preview header. Five live categories only.
 *
 * Coming-soon categories are deliberately absent: an entry point the reader
 * cannot use is not an entry point. Plain links, no mega-menu, because no
 * category here has enough sub-pages to earn one.
 */
export function PreviewHeader() {
  return (
    <header className="rl-header">
      <div className="rl-header__inner">
        <Link href="/preview" className="rl-wordmark">
          Refer Labs
        </Link>
        <nav className="rl-nav" aria-label="Categories">
          {liveCategories.map((c) => (
            <Link key={c.href} href={c.href}>
              {c.label}
            </Link>
          ))}
        </nav>
        <div className="rl-nav-right">
          <Link href="/deals">Deals</Link>
          <Link href="/for-business">For business</Link>
        </div>
      </div>
    </header>
  );
}
