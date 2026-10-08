"use client";

import { ArrowRight } from "lucide-react";

/** Outbound link to Moshy. In preview: a confirm step before it opens. */
export function CtaLink({
  href,
  label,
  tone = "dark",
  preview,
  confirmText,
}: {
  href: string;
  label: string;
  tone?: "light" | "dark";
  preview: boolean;
  confirmText: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener"
      onClick={(e) => {
        if (preview && !window.confirm(confirmText)) e.preventDefault();
      }}
      className={`mp-btn mp-btn--${tone}`}
    >
      {label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
