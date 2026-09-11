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
      <svg viewBox="0 0 360 196" role="img"
        aria-label="A quote, reduced first by the federal rebate and then by the $500 Refer Labs discount. Schematic, not to scale.">
        {/* stage 1: the quote, whole */}
        <text x="0" y="16" fontSize="11.5" fill="#766f66">Installed quote</text>
        <rect x="0" y="24" width="360" height="26" fill="#14120f" />

        {/* stage 2: the federal rebate comes off */}
        <text x="0" y="80" fontSize="11.5" fill="#766f66">After the federal rebate</text>
        <rect x="0" y="88" width="246" height="26" fill="#14120f" />
        <rect x="246" y="88" width="114" height="26" fill="none" stroke="#ded8cd" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="252" y="105" fontSize="10.5" fill="#766f66">rebate</text>

        {/* stage 3: the $500, applied on top */}
        <text x="0" y="144" fontSize="11.5" fill="#766f66">After the Refer Labs discount</text>
        <rect x="0" y="152" width="196" height="26" fill="#14120f" />
        <rect x="196" y="152" width="50" height="26" fill="#a85d09" />
        <rect x="246" y="152" width="114" height="26" fill="none" stroke="#ded8cd" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="200" y="169" fontSize="11.5" fill="#f7f4ee" fontWeight="700"
          style={{ fontFamily: "var(--font-rd-display), sans-serif", letterSpacing: "-0.02em" }}>$500</text>

        {/* the cut line: where the second deduction begins, carried down */}
        <line x1="246" y1="50" x2="246" y2="152" stroke="#ded8cd" strokeWidth="1" />
        <line x1="196" y1="114" x2="196" y2="152" stroke="#a85d09" strokeWidth="1" />
      </svg>
      <figcaption className="rd-cap" style={{ marginTop: "0.7rem" }}>
        Schematic, not to scale. The rebate varies with system size; $500 is the
        figure read off Apollo&rsquo;s own page.
      </figcaption>
    </figure>
  );
}
