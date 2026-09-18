/**
 * THE ONE PIECE OF REAL CRAFT.
 *
 * The Apollo copy says readers get "$500 off their quote, on top of the
 * federal rebate". That word "on top" is the only non-obvious claim in the
 * hero, and on the live page it is a clause a reader skims. Drawn, it becomes
 * the reason to click: two deductions applied in sequence, not one instead of
 * the other.
 *
 * HONESTY CONSTRAINT. The only figure we hold for this is $500. The rebate
 * amount varies with system size and the STC spot price, so it is drawn as an
 * unlabelled segment and the whole diagram is captioned "not to scale". A
 * proportioned bar would assert magnitudes we have not read.
 *
 * Hand decisions in here rather than defaults: the deduction segments are cut
 * from the right edge with a 6px stagger so the three stages read as one bar
 * being taken apart rather than three separate bars; the tick marks sit on the
 * baseline at the cut points; the $500 label is the only saffron on the
 * drawing because it is the only verified figure.
 */

export function Ladder() {
  return (
    <figure style={{ margin: 0 }}>
      <svg viewBox="0 0 360 230" role="img"
        aria-label="One installed quote, cut twice: first by the federal rebate, then by the $500 Refer Labs discount. Schematic, not to scale.">
        {/* ONE bar, cut twice. The earlier version drew three separate bars,
            which read as a chart. A single bar losing two pieces reads as
            something happening to your quote, which is what the copy says. */}

        {/* the quote, full width, with the two cuts marked on it */}
        <text x="0" y="14" fontSize="11.5" fill="#56504a">Your installed quote</text>
        <rect x="0" y="22" width="360" height="30" fill="#14120f" />

        {/* cut 1 — the federal rebate. Ruled off, not coloured: it is not ours. */}
        <line x1="246" y1="14" x2="246" y2="122" stroke="#14120f" strokeWidth="1" strokeDasharray="2 3" />
        <text x="252" y="72" fontSize="11" fill="#56504a">less the</text>
        <text x="252" y="86" fontSize="11" fill="#56504a">federal rebate</text>

        {/* cut 2 — the $500. Saffron, because it is the figure we read. */}
        <line x1="196" y1="92" x2="196" y2="160" stroke="#a85d09" strokeWidth="1.5" />

        {/* what is left, with the two cuts lifted off and set beside it */}
        <text x="0" y="114" fontSize="11.5" fill="#56504a">What you pay</text>
        <rect x="0" y="122" width="196" height="30" fill="#14120f" />
        <rect x="196" y="122" width="50" height="30" fill="#a85d09" />
        <rect x="246" y="122" width="114" height="30" fill="none" stroke="#ded8cd" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* the amount, sitting on its own cut, with a tick that overshoots the
            rule by 4px so the mark reads as drawn rather than snapped */}
        <line x1="196" y1="160" x2="246" y2="160" stroke="#a85d09" strokeWidth="2" />
        <line x1="196" y1="156" x2="196" y2="168" stroke="#a85d09" strokeWidth="2" />
        <line x1="246" y1="156" x2="246" y2="168" stroke="#a85d09" strokeWidth="2" />
        <text x="196" y="192" fontSize="30" fontWeight="700" fill="#a85d09"
          style={{ fontFamily: "var(--font-rd-display), sans-serif", letterSpacing: "-0.035em" }}>$500</text>
        <text x="196" y="212" fontSize="11" fill="#56504a">off, on top of the rebate</text>
      </svg>
      <figcaption className="rd-cap" style={{ marginTop: "0.7rem" }}>
        Schematic, not to scale. The rebate varies with system size; $500 is the
        figure read off Apollo&rsquo;s own page.
      </figcaption>
    </figure>
  );
}
