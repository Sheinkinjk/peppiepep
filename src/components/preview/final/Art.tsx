/**
 * Drawn artwork for the final build. D5's language carried over: two flat
 * shapes deliberately misregistered, the way a two-colour press drifts. The
 * accent plate sits behind and never lines up, and it never overlaps type.
 *
 * `currentColor` is not used for the accent because these render on both the
 * paper ground and the ink ground; each call site passes its pair.
 *
 * Six category markers, a proof object, an empty state and a section texture.
 * No dashed placeholder and no grey box anywhere.
 */

export type CatKey =
  | "weight-loss" | "hair-loss" | "pets"
  | "home-batteries" | "landing-pages" | "creator-growth";

export const CAT_ORDER: CatKey[] = [
  "weight-loss", "hair-loss", "pets", "home-batteries", "landing-pages", "creator-growth",
];

export function catKey(label: string): CatKey {
  const k = label.toLowerCase().replace(/\s+/g, "-");
  return (CAT_ORDER as string[]).includes(k) ? (k as CatKey) : "landing-pages";
}

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/* ---- category markers ---------------------------------------------------
   Each form draws the shape of the decision in that category. None is a face,
   a blob or a line icon. The `fx-mark-ink` class lets the category tile invert
   the ink plate on hover without touching the accent plate.
   ------------------------------------------------------------------------ */

export function Marker({ cat, size = 44 }: { cat: CatKey; size?: number }) {
  const off = 3.4;
  const shape = (fill: string, dx: number, dy: number, cls?: string) => {
    const p = { fill, className: cls };
    switch (cat) {
      case "weight-loss": /* a number that has to come down */
        return (<>
          <rect x={9 + dx} y={10 + dy} width="30" height="7" {...p} />
          <rect x={9 + dx} y={21 + dy} width="20" height="7" {...p} />
          <rect x={9 + dx} y={32 + dy} width="10" height="7" {...p} />
        </>);
      case "hair-loss": /* coverage thinning across a field */
        return <>{range(4).map((i) => (
          <rect key={i} x={10 + i * 9 + dx} y={12 + dy} width="5" height={28 - i * 6} {...p} />
        ))}</>;
      case "pets": /* what is covered, and the excess that is not */
        return (<>
          <path d={`M${24 + dx} ${9 + dy} a15 15 0 1 1 -0.1 0 z`} {...p} />
          <rect x={21 + dx} y={21 + dy} width="18" height="6" fill="none" />
        </>);
      case "home-batteries": /* a cell and its terminal */
        return (<>
          <rect x={12 + dx} y={12 + dy} width="24" height="26" {...p} />
          <rect x={19 + dx} y={7 + dy} width="10" height="5" {...p} />
        </>);
      case "landing-pages": /* a page divided where the decision sits */
        return (<>
          <rect x={10 + dx} y={10 + dy} width="28" height="12" {...p} />
          <rect x={10 + dx} y={26 + dy} width="17" height="12" {...p} />
        </>);
      case "creator-growth": /* one point, opening out */
        return <path d={`M${11 + dx} ${39 + dy} L${25 + dx} ${12 + dy} L${39 + dx} ${39 + dy} Z`} {...p} />;
    }
  };
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      {shape("var(--accent)", off, off)}
      {shape("var(--ink)", 0, 0, "fx-mark-ink")}
    </svg>
  );
}

/* ---- the proof object ---------------------------------------------------
   Runs full-bleed off the right edge of the methodology section. It is the
   only element on the page that breaks the container, and it marks the
   proposition the whole site rests on.
   ------------------------------------------------------------------------ */

export function Proof({ date, count }: { date: string; count: number }) {
  return (
    <svg viewBox="0 0 900 300" role="img"
      aria-label={`${count} offers read on the provider's own page, oldest reading ${date}`}>
      {/* The date plate sits LEFT so it stays on screen when the artwork bleeds
          past the right edge of the viewport. The entries run right and off the
          edge on purpose: the list continues past the frame. */}
      <rect x="12" y="30" width="290" height="84" fill="var(--accent)" />
      <rect x="0" y="18" width="290" height="84" fill="var(--paper)" />
      <text x="20" y="48" fontSize="13" fill="var(--ink)" opacity="0.6" letterSpacing="0.16em">READ ON</text>
      <text x="20" y="84" fontSize="30" fontWeight="700" fill="var(--ink)"
        style={{ fontFamily: "var(--font-fx-display), sans-serif", letterSpacing: "-0.03em" }}>{date}</text>

      {/* the entries. Two plates each, offset, the way a two-colour press
          drifts: an accent ghost behind a paper rule. Never a flat grey bar,
          which reads as a skeleton loader rather than as artwork. */}
      {range(count).map((i) => {
        const y = 150 + i * 19;
        const w = i === 3 ? 900 : 210 + ((i * 137) % 420);
        return (
          <g key={i}>
            <rect x="6" y={y + 4} width={w} height="9" fill="var(--accent)" opacity={i === 3 ? 0.85 : 0.3} />
            <rect x="0" y={y} width={w} height="9" fill="var(--paper)" opacity={i === 3 ? 1 : 0.24} />
          </g>
        );
      })}
      <text x="0" y="140" fontSize="12" fill="var(--paper)" opacity="0.5" letterSpacing="0.16em">
        {count} ENTRIES, ONE SHOWN
      </text>
    </svg>
  );
}

/* ---- section texture ----------------------------------------------------
   A run of misregistered rules. Decorative, but it is the same gesture as the
   markers and the proof, so it reads as the system rather than as ornament.
   ------------------------------------------------------------------------ */

export function Texture() {
  return (
    <svg viewBox="0 0 1200 26" preserveAspectRatio="none" aria-hidden="true"
      style={{ width: "100%", height: 26, display: "block" }}>
      {range(24).map((i) => (
        <g key={i}>
          <rect x={i * 50 + 6} y="10" width="34" height="6" fill="var(--accent)" opacity="0.55" />
          <rect x={i * 50} y="4" width="34" height="6" fill="var(--ink)" opacity="0.2" />
        </g>
      ))}
    </svg>
  );
}

/* ---- empty state --------------------------------------------------------
   Same grammar with the reading removed: two plates and nothing printed on
   them. It says "not checked yet" without a cartoon or a sad face.
   ------------------------------------------------------------------------ */

export function Empty() {
  return (
    <svg viewBox="0 0 200 96" aria-hidden="true">
      <rect x="36" y="30" width="120" height="46" fill="var(--accent)" opacity="0.22" />
      <rect x="26" y="20" width="120" height="46" fill="none" stroke="var(--ink)" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}
