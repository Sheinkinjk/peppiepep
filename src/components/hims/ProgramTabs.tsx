"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { TabsBoot } from "@/lib/hims/tabs-boot";

export type ProgramTab = { id: string; label: string };

/**
 * The /hims-vs-mosh program selector (1 Oct 2026).
 *
 * Every panel is rendered on the server and arrives in the HTML, so search and
 * answer engines read all three. Which one shows is decided in three layers:
 *  1. No JavaScript: nothing hides anything. All panels show, stacked, and the
 *     tabs are plain links that jump to each panel.
 *  2. Before hydration: TabsBoot (src/lib/hims/tabs-boot.tsx) sets data-hvm-tab on the wrapper
 *     from the URL hash (default: the first tab), and the CSS hides the other
 *     panels. It runs as the HTML is parsed, so there is no flash of all three.
 *  3. After hydration: React owns the state, sets `hidden` on inactive panels,
 *     keeps the wrapper attribute in step, and writes the hash with replaceState
 *     so each panel can be linked to without the page jumping.
 */
export function ProgramTabs({ tabs, panels, label }: { tabs: ProgramTab[]; panels: ReactNode[]; label: string }) {
  const ids = tabs.map((t) => t.id);
  const idsKey = ids.join("|");
  const [active, setActive] = useState(ids[0]);
  const [ready, setReady] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const valid = idsKey.split("|");
    const fromHash = () => {
      const h = decodeURIComponent(window.location.hash.slice(1));
      if (valid.includes(h)) setActive(h);
    };
    fromHash();
    setReady(true);
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [idsKey]);

  useEffect(() => {
    wrapper.current?.setAttribute("data-hvm-tab", active);
  }, [active]);

  function select(id: string, focus = false) {
    setActive(id);
    if (window.location.hash !== `#${id}`) window.history.replaceState(null, "", `#${id}`);
    if (focus) tabRefs.current[ids.indexOf(id)]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const i = ids.indexOf(active);
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % ids.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + ids.length) % ids.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = ids.length - 1;
    if (next < 0) return;
    e.preventDefault();
    select(ids[next], true);
  }

  return (
    <div ref={wrapper} suppressHydrationWarning>
      <TabsBoot ids={ids} />
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="grid grid-cols-3 gap-1 rounded-2xl border border-[#ded8cd] bg-[#f1ede4] p-1 sm:inline-grid sm:auto-cols-fr"
      >
        {tabs.map((t, i) => {
          const selected = active === t.id;
          return (
            <a
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`tab-${t.id}`}
              href={`#${t.id}`}
              role="tab"
              aria-selected={selected}
              aria-controls={t.id}
              tabIndex={selected ? 0 : -1}
              data-hvm-tab-btn={t.id}
              onClick={(e) => {
                e.preventDefault();
                select(t.id);
              }}
              className="flex min-h-[48px] items-center justify-center rounded-xl border border-transparent px-3 py-2 text-center text-[14px] font-semibold leading-tight text-[#14120f] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007a95] sm:px-6 sm:text-[15px]"
            >
              {t.label}
            </a>
          );
        })}
      </div>

      {panels.map((panel, i) => {
        const id = tabs[i].id;
        return (
          <div
            key={id}
            id={id}
            role="tabpanel"
            aria-labelledby={`tab-${id}`}
            tabIndex={0}
            hidden={ready && active !== id}
            data-hvm-panel={id}
            className="scroll-mt-24 rounded-xl pt-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#007a95]"
          >
            {panel}
          </div>
        );
      })}
    </div>
  );
}
