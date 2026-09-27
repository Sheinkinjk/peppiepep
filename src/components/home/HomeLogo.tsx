import { useId } from "react";

/**
 * The Refer Labs logo (src/components/ReferLabsLogo.tsx), drawn identically,
 * with gradient ids unique per instance. The shared component's fixed ids can
 * also exist inside a hidden header elsewhere in the DOM, and a gradient
 * defined inside a hidden element paints nothing.
 */
// `decorative`: inside a link that names itself with visible-hidden text. The
// svg's "REFER" and "LABS" text nodes read as "REFER\nLABS", which never matches
// an aria-label, so Lighthouse failed label-content-name-mismatch on every page
// (27 Sep 2026). Hiding the svg and naming the link with sr-only text clears it.
export function HomeLogo({ className = "", title = "Refer Labs", decorative = false }: { className?: string; title?: string; decorative?: boolean }) {
  const u = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 360 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...(decorative ? { "aria-hidden": true, focusable: "false" } : { role: "img", "aria-label": title })}
    >
      <defs>
        <linearGradient id={`fg${u}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00b7d4" />
          <stop offset="70%" stopColor="#0088a6" />
          <stop offset="100%" stopColor="#003647" />
        </linearGradient>
        <linearGradient id={`bg${u}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0cb3d1" />
          <stop offset="100%" stopColor="#008f9d" />
        </linearGradient>
      </defs>

      <rect
        x="9"
        y="9"
        width="342"
        height="242"
        rx="18"
        stroke={`url(#fg${u})`}
        strokeWidth="18"
        fill="white"
      />

      <text
        x="180"
        y="110"
        textAnchor="middle"
        fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif"
        fontWeight="700"
        fontSize="64"
        letterSpacing="2"
        fill="#003d4b"
      >
        REFER
      </text>

      <rect
        x="60"
        y="128"
        width="240"
        height="72"
        rx="10"
        fill={`url(#bg${u})`}
      />

      <text
        x="180"
        y="179"
        textAnchor="middle"
        fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif"
        fontWeight="800"
        fontSize="52"
        letterSpacing="3"
        fill="white"
      >
        LABS
      </text>
    </svg>
  );
}
