"use client";

import { useState } from "react";

/**
 * Lender logo with a monogram fallback.
 *
 * lenders.ts has always documented that a missing logo "falls back to a monogram",
 * but nothing implemented it: both the comparison table and the lender pages rendered
 * a bare <img>, so adding a lender before its PNG existed produced a broken-image icon
 * on a page whose whole job is looking credible. This makes the documented behaviour real,
 * so a lender can be added by config alone, which is the point of the registry.
 */
export default function LenderLogo({
  src,
  name,
  size = 28,
  className = "",
}: {
  src: string;
  name: string;
  size?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        aria-hidden="true"
        className={`inline-flex shrink-0 items-center justify-center rounded-md bg-[#e8f0ec] font-bold text-[#0a7c42] ${className}`}
        style={{ width: size, height: size, fontSize: Math.round(size * 0.42) }}
      >
        {name.trim().charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${name} logo`}
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`}
      style={{ width: size, height: size }}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
