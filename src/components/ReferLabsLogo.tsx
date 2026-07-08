/**
 * Refer Labs signature lockup: the compare-bars mark (three ranked bars, top
 * pick green + ticked = independent, ranked, verified comparison) beside the
 * wordmark, "Refer" in ink and "Labs" in green. Editorial serif with a Georgia
 * fallback so it renders reliably even before the webfont loads. Used in the
 * consumer header (always on a white ground).
 */
export function ReferLabsLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 214 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Refer Labs"
    >
      {/* compare-bars tile */}
      <rect x="2" y="2" width="48" height="48" rx="12" fill="#10251b" />
      <rect x="13" y="15.5" width="26" height="5.4" rx="2.7" fill="#0a7c42" />
      <circle cx="42" cy="18.2" r="2.4" fill="#0a7c42" />
      <rect x="13" y="23.8" width="19" height="5.4" rx="2.7" fill="#ffffff" opacity="0.5" />
      <rect x="13" y="32.1" width="12.5" height="5.4" rx="2.7" fill="#ffffff" opacity="0.28" />

      {/* wordmark */}
      <text
        x="64"
        y="35"
        fontFamily="'Fraunces', Georgia, 'Times New Roman', serif"
        fontWeight="600"
        fontSize="30"
        letterSpacing="-0.5"
      >
        <tspan fill="#10251b">Refer </tspan>
        <tspan fill="#0a7c42">Labs</tspan>
      </text>
    </svg>
  );
}
