import Link from "next/link";
import { HomeLogo } from "@/components/home/HomeLogo";
import { Nav, NavRail } from "@/components/home/HomeNav";
import { HeroSearch } from "@/components/home/HomeSearch";
import { HomeNewsletter } from "@/components/home/HomeNewsletter";
import { SiteFooter } from "@/components/home/HomeSections";
import { footer } from "@/lib/home/content";
import { hybridNav } from "@/lib/home/nav";

/**
 * The site header and footer, one of each for every page: the homepage renders
 * them directly and ConsumerShell renders them around every other consumer
 * page. Each is wrapped in its own `.rd.hy` scope so the homepage stylesheet
 * styles the chrome without reaching into page content.
 */

/* The footer as the 11 Sep homepage had it, plus the three hubs that went live
   after: Health & Beauty, Sleep and Longevity. Sleep and Longevity have no
   homepage card, so the footer is what keeps a link into each on every page. */
const footerColumns = footer.columns.map((col, i) => i !== 0 ? col : {
  ...col,
  links: col.links.flatMap((l) =>
    l.href === "/hair-loss" ? [l, { label: "Health & Beauty", href: "/health-and-beauty" }]
    : l.href === "/solar-and-energy" ? [l, { label: "Sleep", href: "/sleep" }, { label: "Longevity", href: "/longevity" }]
    : [l]),
});

export function SiteHeader() {
  return (
    <div className="rd hy rd-chrome">
      <header className="rd-hd rl-own hy-hd">
        <div className="rd-w rd-hd__g">
          <Link href="/" className="hy-logo" aria-label="Refer Labs, home">
            <HomeLogo className="hy-logo__svg" />
          </Link>
          <Nav groups={hybridNav} />
          <HeroSearch />
        </div>
        <NavRail groups={hybridNav} />
      </header>
    </div>
  );
}

/** `newsletter` adds the compact signup to the footer's first column: on for
    every page except the homepage, which has its own newsletter section. */
export function SiteFooterBar({ newsletter = false }: { newsletter?: boolean }) {
  return (
    <div className="rd hy rd-chrome">
      <SiteFooter
        columns={footerColumns}
        brand={<HomeLogo className="hy-logo__svg hy-logo__svg--ft" />}
        extra={newsletter ? (
          <div className="rd-ft__news">
            <p className="rd-ft__newsk">The newsletter</p>
            <HomeNewsletter source="footer" compact />
          </div>
        ) : null}
      />
    </div>
  );
}
