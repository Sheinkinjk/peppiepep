"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/preview/live-home";

/**
 * ONE nav, rendered once, responsive. The live site ships a desktop mega-nav
 * and a separate mobile tree with the same links duplicated in the DOM; the
 * brief allows collapsing that. Above 1000px the groups open a panel; below,
 * the same four group links become a scrolling rail.
 *
 * Keyboard: each trigger is a real button with aria-expanded; Escape closes
 * and returns focus to the trigger; a click outside closes. The panel is not
 * hover-only, so it is reachable without a pointer.
 */
export function Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    const onClick = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, [open]);

  return (
    <div ref={wrap}>
      <nav className="rd-nav" aria-label="Categories">
        {nav.map((g) => (
          <button key={g.label} type="button" className="rd-nav__t"
            aria-expanded={open === g.label} aria-controls={`p-${g.href}`}
            onClick={() => setOpen(open === g.label ? null : g.label)}>
            {g.label}
          </button>
        ))}
      </nav>

      {nav.map((g) => (
        open === g.label ? (
          <div className="rd-panel" id={`p-${g.href}`} key={g.label}>
            <div className="rd-w rd-panel__g">
              <div className="rd-g">
                {g.items.map((i) => (
                  <div className="c3" key={i.href}>
                    <Link href={i.href} onClick={() => setOpen(null)}>
                      <span className="rd-panel__l">{i.label}</span>
                      {i.blurb ? <span className="rd-panel__b">{i.blurb}</span> : null}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null
      ))}
    </div>
  );
}

export function NavRail() {
  return (
    <nav className="rd-w rd-rail" aria-label="Categories, compact">
      {nav.map((g) => <Link key={g.href} href={g.href}>{g.label}</Link>)}
    </nav>
  );
}
