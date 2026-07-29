"use client";

import { useState } from "react";

/**
 * Brand logo with a monogram fallback. Renders /logos/<slug>.png; if that file
 * is not present yet (or fails to load), it shows a clean monogram instead, so
 * the page never displays a broken image. Drop the PNG into public/logos and it
 * appears automatically, no code change required.
 */
export default function BrandMark({
  src,
  alt,
  monogram,
  className = "",
}: {
  src: string;
  alt: string;
  monogram: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className={`flex items-center justify-center font-black text-[#0a7c42] ${className}`} aria-label={alt}>
        {monogram}
      </span>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} onError={() => setFailed(true)} className={`object-contain ${className}`} />;
}
