"use client";

import { useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchEntries } from "@/lib/search-index";

/**
 * Site search, in the header's right-hand slot. Uses the same static index as the
 * live SiteSearch (src/lib/search-index.ts), so every result is a real page.
 *
 * ARIA combobox pattern: arrow keys move through results, Enter opens the
 * active one (or the best match), Escape closes. Nothing is fetched.
 */
export function HeroSearch() {
  // Enter submits the form: the best match, or /guides when nothing matches.
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  const results = useMemo(() => searchEntries(q, 6), [q]);
  const show = open && q.trim().length > 0;

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <form className="hy-search" role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const pick = results[active] ?? results[0];
        go(pick ? pick.href : "/guides");
      }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}>
      <label htmlFor={`${id}-q`} className="rd-sr">Search Refer Labs</label>
      <svg className="hy-search__i" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <line x1="13" y1="13" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <input ref={input} id={`${id}-q`} className="hy-search__in" type="search" autoComplete="off"
        placeholder="Search Refer Labs"
        role="combobox" aria-expanded={show} aria-controls={`${id}-lb`} aria-autocomplete="list"
        aria-activedescendant={show && active >= 0 ? `${id}-o${active}` : undefined}
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(-1); }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (!show) return;
          if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
          if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(-1, a - 1)); }
          if (e.key === "Escape") { setOpen(false); setActive(-1); }
        }} />

      {show && (
        <ul id={`${id}-lb`} role="listbox" className="hy-search__lb" aria-label="Results">
          {results.length === 0 && <li className="hy-search__none">No match. Try a provider name, like Moshy or Knose.</li>}
          {results.map((r, i) => (
            <li key={r.href} id={`${id}-o${i}`} role="option" aria-selected={i === active}
              className={i === active ? "hy-search__o is-on" : "hy-search__o"}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => { e.preventDefault(); go(r.href); }}>
              <span className="hy-search__t">{r.title}</span>
              <span className="hy-search__c">{r.category}</span>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
