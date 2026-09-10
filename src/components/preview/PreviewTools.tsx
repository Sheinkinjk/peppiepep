"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Preview-only furniture: the "not live" banner and the A/B switcher.
 *
 * Deliberately greyscale and monospaced so it reads as tooling rather than as
 * part of either design, and positioned outside the page grid.
 *
 * The banner is fixed, so it needs a spacer of exactly its own height and the
 * sticky page header needs to park below it. Both read `--rl-banner-h`, and
 * dismissing sets that variable to zero on the wrapper so the header returns to
 * the top rather than leaving a band of dead space behind.
 */
export function PreviewTools() {
  const [dismissed, setDismissed] = useState(false);
  const anchor = useRef<HTMLSpanElement>(null);
  const pathname = usePathname() || "";

  useEffect(() => {
    const root = anchor.current?.closest(".rl-preview") as HTMLElement | null;
    if (root) root.dataset.banner = dismissed ? "off" : "on";
  }, [dismissed]);

  const variants = [
    { href: "/preview/home-a", label: "A" },
    { href: "/preview/home-b", label: "B" },
  ];

  return (
    <>
      <span ref={anchor} hidden />

      {!dismissed && (
        <>
          <div className="rl-banner" role="note">
            <span>Design preview, not live</span>
            <button
              type="button"
              className="rl-banner__dismiss"
              onClick={() => setDismissed(true)}
            >
              Dismiss
            </button>
          </div>
          <div className="rl-banner-offset" aria-hidden="true" />
        </>
      )}

      <nav className="rl-switch" aria-label="Design variant">
        <span className="rl-switch__label">variant</span>
        {variants.map((v) => (
          <Link
            key={v.href}
            href={v.href}
            aria-current={pathname === v.href ? "page" : undefined}
          >
            {v.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
