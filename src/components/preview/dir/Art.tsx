/**
 * Drawn artwork for the five homepage directions.
 *
 * We hold no photography and none is arriving, so every direction draws its own
 * way out rather than reserving a grey box. Five directions, five drawing
 * styles, and the style is part of the direction rather than a shared icon set
 * recoloured five times:
 *
 *   D1 Engraved    parallel hairline hatching, one solid rule. Ledger/banknote.
 *   D2 Instrument  solid chunky geometry with a bite taken out. Machined.
 *   D3 Contour     one stroke weight, open forms, editorial spot drawing.
 *   D4 Specimen    hairline, mostly empty, a single form per category.
 *   D5 Signal      two flat shapes deliberately misregistered, offset-print.
 *
 * Six category markers each, because six categories carry a verified offer.
 * The forms are abstract but not arbitrary: each one draws the shape of the
 * decision in that category, and none is a face, a blob or a line icon.
 */

export type CatKey =
  | "weight-loss" | "hair-loss" | "pets"
  | "home-batteries" | "landing-pages" | "creator-growth";

export const CAT_ORDER: CatKey[] = [
  "weight-loss", "hair-loss", "pets", "home-batteries", "landing-pages", "creator-growth",
];

/** Maps the category label offers.ts uses onto a marker key. */
export function catKey(label: string): CatKey {
  const k = label.toLowerCase().replace(/\s+/g, "-");
  return (CAT_ORDER as string[]).includes(k) ? (k as CatKey) : "landing-pages";
}

type AProps = { cat: CatKey; size?: number; ink?: string; accent?: string };

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/* =========================================================================
   D1  ENGRAVED
   Hatching carries the form; one solid rule carries the reading. The denser
   the hatch, the more of the decision sits in that part of the drawing.
   ========================================================================= */

export function EngravedMarker({ cat, size = 48, ink = "#1B2027", accent = "#9B2C2C" }: AProps) {
  const hatch = (x: number, y: number, w: number, rows: number, step = 3) =>
    range(rows).map((i) => (
      <line key={i} x1={x} y1={y + i * step} x2={x + w} y2={y + i * step} stroke={ink} strokeWidth="0.85" opacity="0.75" />
    ));

  const art: Record<CatKey, React.ReactNode> = {
    /* a descending stack: the number that has to come down */
    "weight-loss": (<>
      {hatch(8, 10, 32, 4)}{hatch(8, 24, 22, 3)}{hatch(8, 35, 12, 2)}
      <line x1="8" y1="41.5" x2="40" y2="41.5" stroke={accent} strokeWidth="2.2" />
    </>),
    /* dense to sparse: coverage thinning across a field */
    "hair-loss": (<>
      {range(9).map((i) => (
        <line key={i} x1={8 + i * 4} y1="10" x2={8 + i * 4} y2={38} stroke={ink}
          strokeWidth="0.85" opacity={0.9 - i * 0.09} />
      ))}
      <line x1="8" y1="41.5" x2="24" y2="41.5" stroke={accent} strokeWidth="2.2" />
    </>),
    /* a ring and the gap inside it: what is covered, and the excess that is not */
    pets: (<>
      <circle cx="24" cy="23" r="14" fill="none" stroke={ink} strokeWidth="0.9" />
      <circle cx="24" cy="23" r="9" fill="none" stroke={ink} strokeWidth="0.9" opacity="0.6" />
      {range(6).map((i) => (
        <line key={i} x1="24" y1="23" x2={24 + 14 * Math.cos((i * 60 - 90) * Math.PI / 180)}
          y2={23 + 14 * Math.sin((i * 60 - 90) * Math.PI / 180)} stroke={ink} strokeWidth="0.85" opacity="0.5" />
      ))}
      <path d="M24 9 A14 14 0 0 1 36.1 30" fill="none" stroke={accent} strokeWidth="2.2" />
    </>),
    /* a cell: stacked plates and a terminal */
    "home-batteries": (<>
      <rect x="12" y="9" width="24" height="30" fill="none" stroke={ink} strokeWidth="0.9" />
      <rect x="20" y="5" width="8" height="4" fill={ink} />
      {hatch(14, 13, 20, 6, 3.2)}
      <line x1="14" y1="34" x2="34" y2="34" stroke={accent} strokeWidth="2.2" />
    </>),
    /* a page divided: the fold where the decision sits */
    "landing-pages": (<>
      <rect x="10" y="8" width="28" height="32" fill="none" stroke={ink} strokeWidth="0.9" />
      {hatch(13, 12, 10, 5, 2.6)}
      {hatch(27, 12, 8, 3, 2.6)}
      <line x1="24" y1="8" x2="24" y2="40" stroke={ink} strokeWidth="0.9" opacity="0.55" />
      <line x1="13" y1="35" x2="35" y2="35" stroke={accent} strokeWidth="2.2" />
    </>),
    /* a fan out from one point */
    "creator-growth": (<>
      {range(7).map((i) => (
        <line key={i} x1="11" y1="38" x2={11 + 30 * Math.cos((-70 + i * 11) * Math.PI / 180)}
          y2={38 + 30 * Math.sin((-70 + i * 11) * Math.PI / 180)} stroke={ink} strokeWidth="0.85" opacity="0.8" />
      ))}
      <circle cx="11" cy="38" r="2.4" fill={accent} />
    </>),
  };

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">{art[cat]}</svg>
  );
}

export function EngravedProof({ date, ink = "#EFE9DD", accent = "#D4756B" }: { date: string; ink?: string; accent?: string }) {
  return (
    <svg viewBox="0 0 420 560" className="dir-art" role="img" aria-label={`A ledger column with the reading taken on ${date}`}>
      {range(27).map((i) => (
        <line key={i} x1="0" y1={14 + i * 20} x2="420" y2={14 + i * 20} stroke={ink} strokeWidth="0.6" opacity="0.24" />
      ))}
      {range(29).map((i) => (
        <line key={i} x1={i * 14.8} y1="10" x2={i * 14.8} y2="550" stroke={ink} strokeWidth="0.5" opacity="0.1" />
      ))}
      {/* the eight entries, the fourth extended: the one being read */}
      {range(8).map((i) => (
        <rect key={i} x="12" y={196 + i * 20} width={i === 3 ? 396 : 60 + (i % 4) * 52}
          height="9" fill={i === 3 ? accent : ink} opacity={i === 3 ? 0.92 : 0.2} />
      ))}
      <text x="12" y="186" fontSize="11" fill={ink} opacity="0.66" letterSpacing="0.12em">THE READING</text>
      <text x="12" y="286" fontSize="15" fill={ink} fontWeight="600">{date}</text>
    </svg>
  );
}

export function EngravedEmpty({ ink = "#EFE9DD" }: { ink?: string }) {
  return (
    <svg viewBox="0 0 160 80" className="dir-empty" aria-hidden="true">
      {range(5).map((i) => (
        <line key={i} x1="8" y1={16 + i * 12} x2="152" y2={16 + i * 12} stroke={ink} strokeWidth="0.6" opacity="0.3" />
      ))}
    </svg>
  );
}

/* =========================================================================
   D2  INSTRUMENT
   Solid machined geometry. Every marker is a control you could imagine
   gripping, with a bite cut out of it so it reads as an object, not an icon.
   ========================================================================= */

export function InstrumentMarker({ cat, size = 48, ink = "#0B1F6B", accent = "#1B3FD8" }: AProps) {
  const art: Record<CatKey, React.ReactNode> = {
    "weight-loss": (<>
      <rect x="7" y="8" width="34" height="9" rx="4.5" fill={ink} />
      <rect x="7" y="20" width="24" height="9" rx="4.5" fill={accent} />
      <rect x="7" y="32" width="14" height="9" rx="4.5" fill={ink} opacity="0.42" />
    </>),
    "hair-loss": (<>
      {range(5).map((i) => (
        <rect key={i} x={8 + i * 7} y={10} width="4.4" height={30 - i * 5} rx="2.2"
          fill={i === 1 ? accent : ink} opacity={i === 1 ? 1 : 0.86 - i * 0.14} />
      ))}
    </>),
    pets: (<>
      <path d="M24 6 A18 18 0 1 1 23.9 6 Z" fill={ink} />
      <path d="M24 6 A18 18 0 0 1 42 24 L24 24 Z" fill={accent} />
      <circle cx="24" cy="24" r="7" fill="#ffffff" />
    </>),
    "home-batteries": (<>
      <rect x="10" y="10" width="28" height="30" rx="4" fill={ink} />
      <rect x="19" y="5" width="10" height="5" rx="2" fill={ink} />
      <rect x="15" y="26" width="18" height="9" rx="3" fill={accent} />
      <rect x="15" y="15" width="18" height="6" rx="3" fill="#ffffff" opacity="0.34" />
    </>),
    "landing-pages": (<>
      <rect x="8" y="9" width="32" height="30" rx="4" fill={ink} />
      <rect x="13" y="14" width="22" height="7" rx="3" fill="#ffffff" opacity="0.4" />
      <rect x="13" y="25" width="13" height="8" rx="4" fill={accent} />
    </>),
    "creator-growth": (<>
      <circle cx="14" cy="34" r="7" fill={ink} />
      <circle cx="28" cy="22" r="9" fill={accent} />
      <circle cx="39" cy="12" r="5" fill={ink} opacity="0.5" />
    </>),
  };
  return <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">{art[cat]}</svg>;
}

export function InstrumentProof({ date, ink = "#0B1F6B", accent = "#1B3FD8" }: { date: string; ink?: string; accent?: string }) {
  return (
    <svg viewBox="0 0 420 190" className="dir-art" role="img" aria-label={`A dial reading taken on ${date}`}>
      <rect x="0" y="0" width="420" height="190" rx="14" fill="#ffffff" />
      {range(8).map((i) => (
        <rect key={i} x={26 + i * 46} y={150 - i * 8} width="28" height={i * 8 + 18} rx="6"
          fill={i === 5 ? accent : ink} opacity={i === 5 ? 1 : 0.16 + i * 0.03} />
      ))}
      <rect x="26" y="26" width="150" height="10" rx="5" fill={ink} opacity="0.16" />
      <text x="26" y="62" fontSize="15" fontWeight="700" fill={accent}>{date}</text>
    </svg>
  );
}

export function InstrumentEmpty({ ink = "#0B1F6B" }: { ink?: string }) {
  return (
    <svg viewBox="0 0 160 80" className="dir-empty" aria-hidden="true">
      {range(4).map((i) => (
        <rect key={i} x={16 + i * 34} y="30" width="22" height="22" rx="7" fill={ink} opacity="0.13" />
      ))}
    </svg>
  );
}

/* =========================================================================
   D3  CONTOUR
   One stroke weight throughout, forms left open. A drawn spot, not an icon.
   ========================================================================= */

export function ContourMarker({ cat, size = 48, ink = "#191612", accent = "#4A2D8C" }: AProps) {
  const S = { fill: "none", stroke: ink, strokeWidth: 1.4, strokeLinecap: "round" as const };
  const art: Record<CatKey, React.ReactNode> = {
    "weight-loss": (<>
      <path d="M9 14 C20 10 30 18 40 12" {...S} />
      <path d="M9 24 C19 21 27 27 34 23" {...S} />
      <path d="M9 34 C16 32 21 36 26 34" {...S} stroke={accent} strokeWidth="2" />
    </>),
    "hair-loss": (<>
      {range(7).map((i) => (
        <path key={i} d={`M${10 + i * 5} 38 C${10 + i * 5} ${28 - i}, ${14 + i * 5} ${24 - i * 1.5}, ${12 + i * 5} ${12 + i * 3}`}
          {...S} stroke={i === 0 ? accent : ink} strokeWidth={i === 0 ? 2 : 1.4} />
      ))}
    </>),
    pets: (<>
      <path d="M10 26 C10 14 38 14 38 26 C38 36 30 40 24 40 C18 40 10 36 10 26" {...S} />
      <path d="M17 22 C17 17 31 17 31 22" {...S} stroke={accent} strokeWidth="2" />
    </>),
    "home-batteries": (<>
      <path d="M13 12 L35 12 L35 40 L13 40 Z" {...S} />
      <path d="M21 8 L27 8" {...S} />
      <path d="M18 30 L26 20 L23 28 L30 26" {...S} stroke={accent} strokeWidth="2" />
    </>),
    "landing-pages": (<>
      <path d="M11 10 L37 10 L37 39 L11 39 Z" {...S} />
      <path d="M16 18 L32 18 M16 24 L27 24" {...S} />
      <path d="M16 31 L24 31" {...S} stroke={accent} strokeWidth="2" />
    </>),
    "creator-growth": (<>
      <path d="M12 37 C18 24 30 20 38 11" {...S} />
      <path d="M12 37 C20 32 27 33 34 26" {...S} opacity="0.6" />
      <circle cx="38" cy="11" r="3.2" fill={accent} />
    </>),
  };
  return <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">{art[cat]}</svg>;
}

export function ContourProof({ date, ink = "#191612", accent = "#4A2D8C" }: { date: string; ink?: string; accent?: string }) {
  return (
    <svg viewBox="0 0 420 200" className="dir-art" role="img" aria-label={`A page read on ${date}`}>
      <path d="M30 24 L250 24 L250 178 L30 178 Z" fill="none" stroke={ink} strokeWidth="1.4" />
      {range(7).map((i) => (
        <path key={i} d={`M48 ${52 + i * 17} L${i === 3 ? 214 : 150 + (i % 3) * 30} ${52 + i * 17}`}
          fill="none" stroke={i === 3 ? accent : ink} strokeWidth={i === 3 ? 2.6 : 1.1} opacity={i === 3 ? 1 : 0.45} />
      ))}
      <path d="M250 103 L318 103" fill="none" stroke={accent} strokeWidth="1.4" strokeDasharray="4 5" />
      <text x="326" y="99" fontSize="14" fontWeight="600" fill={ink}>{date}</text>
      <text x="326" y="118" fontSize="11" fill={ink} opacity="0.6">the line we read</text>
    </svg>
  );
}

export function ContourEmpty({ ink = "#191612" }: { ink?: string }) {
  return (
    <svg viewBox="0 0 160 80" className="dir-empty" aria-hidden="true">
      <path d="M42 18 L118 18 L118 62 L42 62 Z" fill="none" stroke={ink} strokeWidth="1.3" opacity="0.35" />
    </svg>
  );
}

/* =========================================================================
   D4  SPECIMEN
   One hairline form per category, mostly air. Nothing decorative survives.
   ========================================================================= */

export function SpecimenMarker({ cat, size = 48, ink = "#1A1A17", accent = "#1A1A17" }: AProps) {
  const S = { fill: "none", stroke: ink, strokeWidth: 0.9 };
  const art: Record<CatKey, React.ReactNode> = {
    "weight-loss": <><line x1="10" y1="16" x2="38" y2="16" {...S} /><line x1="10" y1="32" x2="24" y2="32" stroke={accent} strokeWidth="1.8" /></>,
    "hair-loss": <>{range(4).map((i) => <line key={i} x1={12 + i * 8} y1="12" x2={12 + i * 8} y2={36 - i * 6} {...S} />)}</>,
    pets: <><circle cx="24" cy="24" r="13" {...S} /><circle cx="24" cy="24" r="2.6" fill={accent} /></>,
    "home-batteries": <><rect x="15" y="12" width="18" height="24" {...S} /><line x1="15" y1="30" x2="33" y2="30" stroke={accent} strokeWidth="1.8" /></>,
    "landing-pages": <><rect x="13" y="11" width="22" height="26" {...S} /><line x1="13" y1="20" x2="35" y2="20" {...S} /></>,
    "creator-growth": <><line x1="12" y1="36" x2="36" y2="12" {...S} /><circle cx="36" cy="12" r="2.6" fill={accent} /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">{art[cat]}</svg>;
}

export function SpecimenProof({ date, ink = "#1A1A17" }: { date: string; ink?: string }) {
  return (
    <svg viewBox="0 0 420 150" className="dir-art" role="img" aria-label={`A single reading, ${date}`}>
      <line x1="0" y1="75" x2="420" y2="75" stroke={ink} strokeWidth="0.7" opacity="0.28" />
      <line x1="268" y1="52" x2="268" y2="98" stroke={ink} strokeWidth="1.6" />
      <text x="268" y="42" fontSize="11" fill={ink} opacity="0.66" letterSpacing="0.1em">{date.toUpperCase()}</text>
    </svg>
  );
}

export function SpecimenEmpty({ ink = "#1A1A17" }: { ink?: string }) {
  return (
    <svg viewBox="0 0 160 60" className="dir-empty" aria-hidden="true">
      <line x1="16" y1="30" x2="144" y2="30" stroke={ink} strokeWidth="0.7" opacity="0.3" />
    </svg>
  );
}

/* =========================================================================
   D5  SIGNAL
   Two flat shapes misregistered by a few pixels, the way a two-colour press
   drifts. The accent sits behind and never lines up.
   ========================================================================= */

export function SignalMarker({ cat, size = 48, ink = "#14120F", accent = "#EA4C1D" }: AProps) {
  const off = 3.2;
  const shape: Record<CatKey, (f: string, dx: number, dy: number) => React.ReactNode> = {
    "weight-loss": (f, dx, dy) => (<>
      <rect x={9 + dx} y={11 + dy} width="30" height="7" fill={f} />
      <rect x={9 + dx} y={22 + dy} width="20" height="7" fill={f} />
      <rect x={9 + dx} y={33 + dy} width="10" height="7" fill={f} />
    </>),
    "hair-loss": (f, dx, dy) => (<>
      {range(4).map((i) => <rect key={i} x={10 + i * 9 + dx} y={12 + dy} width="5" height={28 - i * 6} fill={f} />)}
    </>),
    pets: (f, dx, dy) => <circle cx={24 + dx} cy={24 + dy} r="15" fill={f} />,
    "home-batteries": (f, dx, dy) => <rect x={12 + dx} y={10 + dy} width="24" height="28" fill={f} />,
    "landing-pages": (f, dx, dy) => (<>
      <rect x={10 + dx} y={10 + dy} width="28" height="12" fill={f} />
      <rect x={10 + dx} y={26 + dy} width="17" height="12" fill={f} />
    </>),
    "creator-growth": (f, dx, dy) => (
      <path d={`M${11 + dx} ${39 + dy} L${25 + dx} ${13 + dy} L${39 + dx} ${39 + dy} Z`} fill={f} />
    ),
  };
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      {shape[cat](accent, off, off)}
      {shape[cat](ink, 0, 0)}
    </svg>
  );
}

export function SignalProof({ date, ink = "#14120F", accent = "#EA4C1D" }: { date: string; ink?: string; accent?: string }) {
  return (
    <svg viewBox="0 0 560 180" className="dir-art" role="img" aria-label={`Read on ${date}`}>
      {/* the accent plate sits behind and off-register, the way a two-colour
          press drifts. It must never overlap the type on the ink plate. */}
      <rect x="34" y="34" width="330" height="96" fill={accent} />
      <rect x="26" y="26" width="330" height="96" fill={ink} />
      <text x="48" y="68" fontSize="14" fill="#ffffff" opacity="0.7" letterSpacing="0.16em">READ ON</text>
      <text x="48" y="106" fontSize="32" fontWeight="700" fill="#ffffff">{date}</text>
      <rect x="388" y="26" width="16" height="104" fill={accent} />
      <rect x="418" y="26" width="16" height="104" fill={ink} opacity="0.28" />
    </svg>
  );
}

export function SignalEmpty({ ink = "#14120F", accent = "#EA4C1D" }: { ink?: string; accent?: string }) {
  return (
    <svg viewBox="0 0 160 70" className="dir-empty" aria-hidden="true">
      <rect x="42" y="22" width="80" height="30" fill={accent} opacity="0.3" />
      <rect x="36" y="16" width="80" height="30" fill="none" stroke={ink} strokeWidth="2" opacity="0.45" />
    </svg>
  );
}
