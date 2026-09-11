/**
 * Phase 4 Part 1. Three candidate signature marks.
 *
 * Every one derives from the same sentence, which is the only thing this site
 * owns that no competitor has: we read the provider's own page on a date and
 * publish that date. Not "we compare" — Finder, Canstar, CTM, NerdWallet and
 * Bankrate all compare. The evidence of a reading, timestamped.
 *
 * Each mark ships two geometries, not one scaled geometry. Below ~20px the
 * detailed form muddies, so `Mark({ size })` switches to a form drawn for that
 * size: fewer elements, thicker strokes, wider gaps. A mark that only works
 * when it is large is a logo, not an identity.
 *
 * Colour comes from the approved tokens: --field #0d4735, --action #0e7c5a,
 * --gold #8f6a1c / --gold-field #f2c14e. Nothing here introduces a new hue.
 */

type MarkProps = {
  size?: number;
  /** Render on a dark ground: the field-coloured parts invert to white. */
  onField?: boolean;
  title?: string;
};

const ID = { n: 0 };
function uid(p: string) {
  ID.n += 1;
  return `${p}${ID.n}`;
}

/* ========================================================================
   A. THE GAUGE
   A graduated scale where one graduation is extended and solid: the value we
   read. Every other graduation is a date we did not read, or have not read
   yet. Reading a price is taking a measurement off an instrument, and an
   instrument shows you both the value and the scale it sits on.
   ======================================================================== */

export function GaugeMark({ size = 48, onField = false, title }: MarkProps) {
  const spine = onField ? "#ffffff" : "#0d4735";
  const minor = onField ? "rgba(255,255,255,0.38)" : "rgba(13,71,53,0.32)";
  const read = onField ? "#f2c14e" : "#0e7c5a";

  if (size <= 20) {
    /* Small form: spine plus three graduations. Five muddied at 16px, and the
       hazard for any stack of horizontal bars is that it reads as a hamburger
       menu, so the spine is mandatory and the lengths stay unequal. */
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" role="img" aria-label={title ?? "Gauge mark"}>
        {title ? <title>{title}</title> : null}
        <rect x="2" y="1.6" width="1.7" height="12.8" fill={spine} />
        <rect x="3.7" y="3.6" width="3.2" height="1.5" fill={minor} />
        <rect x="3.7" y="7.1" width="10.3" height="2.2" fill={read} />
        <rect x="3.7" y="11" width="3.2" height="1.5" fill={minor} />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" role="img" aria-label={title ?? "Gauge mark"}>
      {title ? <title>{title}</title> : null}
      <rect x="4" y="2.5" width="2.2" height="27" fill={spine} />
      <rect x="6.2" y="5.6" width="5.6" height="1.9" fill={minor} />
      <rect x="6.2" y="10.3" width="5.6" height="1.9" fill={minor} />
      <rect x="6.2" y="14.4" width="21.4" height="3.6" fill={read} />
      <rect x="6.2" y="20.5" width="5.6" height="1.9" fill={minor} />
      <rect x="6.2" y="25.2" width="5.6" height="1.9" fill={minor} />
    </svg>
  );
}

/* ========================================================================
   B. THE STEP
   A value line that holds flat and steps exactly once, at the moment we read
   it. A price does not drift; it holds, then changes, and the only reason we
   know it changed is that someone looked on a given day. The riser IS the
   dated reading, which is why it carries the accent and the flats do not.
   ======================================================================== */

export function StepMark({ size = 48, onField = false, title }: MarkProps) {
  const flat = onField ? "#ffffff" : "#0d4735";
  const riser = onField ? "#f2c14e" : "#8f6a1c";

  if (size <= 20) {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" role="img" aria-label={title ?? "Step mark"}>
        {title ? <title>{title}</title> : null}
        <path d="M1.4 5.4 H7.3" stroke={flat} strokeWidth="2.1" />
        <path d="M7.3 3.8 V12.2" stroke={riser} strokeWidth="2.4" />
        <path d="M7.3 10.6 H14.6" stroke={flat} strokeWidth="2.1" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" role="img" aria-label={title ?? "Step mark"}>
      {title ? <title>{title}</title> : null}
      {/* The riser overshoots both flats. That is deliberate: an overshoot
          reads as a tick placed ON the line, which is what a reading is. Flush
          joins would read as a chart, and a chart with an arrowhead would read
          as every fintech logo drawn since 2015. There is no arrowhead. */}
      <path d="M2.6 10.6 H13.4" stroke={flat} strokeWidth="3.1" />
      <path d="M13.4 7.4 V24.6" stroke={riser} strokeWidth="3.5" />
      <path d="M13.4 21.4 H29.4" stroke={flat} strokeWidth="3.1" />
    </svg>
  );
}

/* ========================================================================
   C. THE PUNCH
   A stub with a hole punched through it. The punch is physical evidence that
   someone checked: a conductor's ticket, a punched card, a tally. Its vertical
   position says which row was read. Alone among the three it subtracts rather
   than draws, which means the whole card system can inherit it as a notch
   rather than having the mark applied on top of it.
   ======================================================================== */

export function PunchMark({ size = 48, onField = false, title }: MarkProps) {
  const body = onField ? "#ffffff" : "#0d4735";
  const rows = onField ? "rgba(13,71,53,0.30)" : "rgba(255,255,255,0.30)";
  const m = uid("pm");

  if (size <= 20) {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" role="img" aria-label={title ?? "Punch mark"}>
        {title ? <title>{title}</title> : null}
        <mask id={m}>
          <rect x="0" y="0" width="16" height="16" fill="#000" />
          <rect x="1.9" y="2.6" width="12.2" height="10.8" rx="1.1" fill="#fff" />
          <circle cx="1.9" cy="8" r="2.4" fill="#000" />
        </mask>
        <rect x="0" y="0" width="16" height="16" fill={body} mask={`url(#${m})`} />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" role="img" aria-label={title ?? "Punch mark"}>
      {title ? <title>{title}</title> : null}
      <mask id={m}>
        <rect x="0" y="0" width="32" height="32" fill="#000" />
        <rect x="2.6" y="5.4" width="26.8" height="21.2" rx="2.2" fill="#fff" />
        {/* The punch BITES THE EDGE rather than sitting inside the stub. Inside,
            with rows beside it, this drew a smartphone on the portrait aspect
            and an ID card on the landscape one: a circle with lines next to it
            is the profile pattern in every UI kit. A bite is a validated
            ticket, and it is also the only version that can subtract from a
            real card edge rather than being printed on top of one. */}
        <circle cx="2.6" cy="16" r="4.6" fill="#000" />
      </mask>
      <rect x="0" y="0" width="32" height="32" fill={body} mask={`url(#${m})`} />
      {/* the rows: entries on the stub, the bite marks which one was read */}
      <rect x="9.4" y="10.2" width="15.6" height="2" rx="1" fill={rows} />
      <rect x="9.4" y="15" width="15.6" height="2" rx="1" fill={rows} />
      <rect x="9.4" y="19.8" width="9.8" height="2" rx="1" fill={rows} />
    </svg>
  );
}

/* ========================================================================
   Lockups. Sketches only: Part 2A draws real letterforms. What each one is
   testing here is whether the mark can join the word rather than sit beside
   it, which is the difference between an identity and a logo with a wordmark
   next to it.
   ======================================================================== */

export function GaugeLockup() {
  return (
    <div className="rl-i-lock">
      <GaugeMark size={44} />
      <div className="rl-i-lock__w">
        <span className="rl-i-wm">Refer Labs</span>
        {/* the reading graduation continues out of the mark and under the word */}
        <span className="rl-i-lock__rule" aria-hidden="true">
          <i style={{ width: "38%" }} />
        </span>
      </div>
    </div>
  );
}

export function StepLockup() {
  /* The step is the baseline. "Refer" sits on the upper flat and "Labs" on the
     lower, so the word cannot be typeset without the mark. */
  return (
    <div className="rl-i-lock rl-i-lock--step">
      <span className="rl-i-wm rl-i-wm--hi">Refer</span>
      <span className="rl-i-wm rl-i-wm--lo">Labs</span>
      <svg className="rl-i-lock__step" viewBox="0 0 200 54" preserveAspectRatio="none" aria-hidden="true">
        <path d="M2 16 H92" stroke="#0d4735" strokeWidth="3.2" />
        <path d="M92 12 V46" stroke="#8f6a1c" strokeWidth="3.6" />
        <path d="M92 42 H198" stroke="#0d4735" strokeWidth="3.2" />
      </svg>
    </div>
  );
}

export function PunchLockup() {
  return (
    <div className="rl-i-lock">
      <PunchMark size={44} />
      <span className="rl-i-wm">
        Refer<span className="rl-i-punch" aria-hidden="true" />Labs
      </span>
    </div>
  );
}

/* ========================================================================
   Section markers. Phase 1 found every reference separates sections with a
   rule or a ground change; none of them makes the rule say anything. Each of
   these does: the emphasis lands where the content matters.
   ======================================================================== */

export function GaugeRule() {
  return (
    <span className="rl-i-rule" aria-hidden="true">
      <i className="rl-i-rule__hair" />
      <i className="rl-i-rule__mark" />
    </span>
  );
}

export function StepRule() {
  return (
    <svg className="rl-i-steprule" viewBox="0 0 600 14" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 4 H210" stroke="#e1e8e4" strokeWidth="2" />
      <path d="M210 2 V12" stroke="#0e7c5a" strokeWidth="2.6" />
      <path d="M210 10 H600" stroke="#e1e8e4" strokeWidth="2" />
    </svg>
  );
}

export function PunchRule() {
  return (
    <span className="rl-i-punchrule" aria-hidden="true">
      <i />
      <b />
      <i />
    </span>
  );
}

/* ========================================================================
   The reading object. The illustration probe: what a verified price looks
   like as artwork rather than as UI. This is the thing that replaces the
   photograph we do not have, so it has to carry a hero at 1440px.
   ======================================================================== */

export function GaugeReading({ date }: { date: string }) {
  const rows = [0, 1, 2, 3, 4, 5, 6];
  return (
    <figure className="rl-i-art">
      <svg viewBox="0 0 372 200" role="img" aria-label={`A gauge with the reading taken on ${date}`}>
        <rect x="0" y="0" width="372" height="200" fill="#f4f7f5" />
        <rect x="34" y="18" width="3.4" height="164" fill="#0d4735" />
        {rows.map((r) => {
          const y = 28 + r * 24;
          const isRead = r === 3;
          return isRead ? (
            <g key={r}>
              <rect x="37" y={y - 3} width="196" height="7" fill="#0e7c5a" />
              <circle cx="233" cy={y + 0.5} r="7" fill="#0e7c5a" />
            </g>
          ) : (
            <rect key={r} x="37" y={y} width={r % 2 ? 18 : 30} height="3" fill="rgba(13,71,53,0.26)" />
          );
        })}
        <text x="252" y="105" fontSize="13" fill="#5a6b65" fontWeight="600">{date}</text>
        <text x="252" y="122" fontSize="11" fill="#5a6b65">read here</text>
      </svg>
    </figure>
  );
}

export function StepReading({ date }: { date: string }) {
  return (
    <figure className="rl-i-art">
      <svg viewBox="0 0 360 200" role="img" aria-label={`A price holding flat, then stepping on ${date}`}>
        <rect x="0" y="0" width="360" height="200" fill="#f4f7f5" />
        <path d="M18 62 H150" stroke="#0d4735" strokeWidth="5" />
        <path d="M150 54 V142" stroke="#8f6a1c" strokeWidth="5.6" />
        <path d="M150 134 H342" stroke="#0d4735" strokeWidth="5" />
        <circle cx="150" cy="98" r="8.5" fill="#8f6a1c" />
        <circle cx="150" cy="98" r="3.2" fill="#f4f7f5" />
        <text x="20" y="46" fontSize="12" fill="#5a6b65">listed</text>
        <text x="164" y="94" fontSize="13" fill="#8f6a1c" fontWeight="700">{date}</text>
        <text x="164" y="110" fontSize="11" fill="#5a6b65">the day we read it</text>
        <text x="252" y="162" fontSize="12" fill="#5a6b65">what you pay</text>
      </svg>
    </figure>
  );
}

export function PunchReading({ date }: { date: string }) {
  const m = uid("pr");
  return (
    <figure className="rl-i-art">
      <svg viewBox="0 0 320 200" role="img" aria-label={`A stub punched on ${date}`}>
        <rect x="0" y="0" width="320" height="200" fill="#f4f7f5" />
        <mask id={m}>
          <rect x="0" y="0" width="320" height="200" fill="#000" />
          <rect x="26" y="34" width="168" height="132" rx="9" fill="#fff" />
          <circle cx="26" cy="100" r="20" fill="#000" />
        </mask>
        <rect x="0" y="0" width="320" height="200" fill="#0d4735" mask={`url(#${m})`} />
        <rect x="44" y="76" width="132" height="8" rx="4" fill="rgba(255,255,255,0.34)" />
        <rect x="44" y="100" width="132" height="8" rx="4" fill="rgba(255,255,255,0.34)" />
        <rect x="44" y="124" width="84" height="8" rx="4" fill="rgba(255,255,255,0.34)" />
        <path d="M2 100 H16" stroke="#0e7c5a" strokeWidth="3" />
        <text x="212" y="40" fontSize="13" fill="#0d4735" fontWeight="700">{date}</text>
        <text x="212" y="62" fontSize="11" fill="#5a6b65">the day the stub</text>
        <text x="212" y="78" fontSize="11" fill="#5a6b65">was punched</text>
      </svg>
    </figure>
  );
}

/* ========================================================================
   Empty states. The test that separates a system from a logo: can the same
   geometry say "nothing here yet" without a sad face or a cardboard box.
   In all three the answer is the mark with its reading removed.
   ======================================================================== */

export function GaugeEmpty() {
  return (
    <div className="rl-i-empty">
      <svg viewBox="0 0 120 96" aria-hidden="true">
        <rect x="26" y="10" width="2.6" height="76" fill="rgba(13,71,53,0.34)" />
        {[0, 1, 2, 3, 4].map((r) => (
          <rect key={r} x="28.6" y={18 + r * 16} width="14" height="2.6" fill="rgba(13,71,53,0.22)" />
        ))}
      </svg>
      <p>No graduation extended. Nothing in this category has been read yet.</p>
    </div>
  );
}

export function StepEmpty() {
  return (
    <div className="rl-i-empty">
      <svg viewBox="0 0 120 96" aria-hidden="true">
        <path d="M12 48 H108" stroke="rgba(13,71,53,0.30)" strokeWidth="3.4" strokeDasharray="7 7" />
      </svg>
      <p>A flat line and no riser. Nothing in this category has been read yet.</p>
    </div>
  );
}

export function PunchEmpty() {
  return (
    <div className="rl-i-empty">
      <svg viewBox="0 0 120 96" aria-hidden="true">
        <rect x="26" y="24" width="68" height="48" rx="5" fill="none"
          stroke="rgba(13,71,53,0.32)" strokeWidth="2.4" strokeDasharray="6 6" />
      </svg>
      <p>An unpunched stub. Nothing in this category has been read yet.</p>
    </div>
  );
}

/* ========================================================================
   OG template probes, at the real 1200x630 ratio.
   ======================================================================== */

export function GaugeOG() {
  return (
    <svg className="rl-i-og" viewBox="0 0 1200 630" role="img" aria-label="OG template, gauge">
      <rect width="1200" height="630" fill="#0d4735" />
      <rect x="96" y="88" width="9" height="454" fill="#ffffff" />
      {[0, 1, 2, 3, 4, 5].map((r) => {
        const y = 130 + r * 74;
        return r === 2 ? (
          <rect key={r} x="105" y={y - 10} width="392" height="22" fill="#f2c14e" />
        ) : (
          <rect key={r} x="105" y={y} width={r % 2 ? 44 : 72} height="9" fill="rgba(255,255,255,0.34)" />
        );
      })}
      <text x="560" y="266" fontSize="60" fontWeight="700" fill="#ffffff">Pet insurance</text>
      <text x="560" y="336" fontSize="30" fill="rgba(255,255,255,0.82)">8 offers, read on the provider&rsquo;s own page</text>
      <text x="560" y="392" fontSize="30" fontWeight="700" fill="#f2c14e">17 August 2026</text>
    </svg>
  );
}

export function StepOG() {
  return (
    <svg className="rl-i-og" viewBox="0 0 1200 630" role="img" aria-label="OG template, step">
      <rect width="1200" height="630" fill="#0d4735" />
      <path d="M0 214 H470" stroke="rgba(255,255,255,0.9)" strokeWidth="14" />
      <path d="M470 190 V450" stroke="#f2c14e" strokeWidth="16" />
      <path d="M470 426 H1200" stroke="rgba(255,255,255,0.9)" strokeWidth="14" />
      <circle cx="470" cy="320" r="26" fill="#f2c14e" />
      <circle cx="470" cy="320" r="10" fill="#0d4735" />
      <text x="96" y="150" fontSize="58" fontWeight="700" fill="#ffffff">Pet insurance</text>
      <text x="520" y="312" fontSize="30" fontWeight="700" fill="#f2c14e">17 August 2026</text>
      <text x="520" y="356" fontSize="26" fill="rgba(255,255,255,0.8)">the day we read it</text>
      <text x="96" y="556" fontSize="26" fill="rgba(255,255,255,0.8)">Refer Labs</text>
    </svg>
  );
}

export function PunchOG() {
  const m = uid("pog");
  return (
    <svg className="rl-i-og" viewBox="0 0 1200 630" role="img" aria-label="OG template, punch">
      <rect width="1200" height="630" fill="#0d4735" />
      <mask id={m}>
        <rect width="1200" height="630" fill="#000" />
        <rect x="88" y="96" width="300" height="438" rx="22" fill="#fff" />
        <circle cx="88" cy="315" r="52" fill="#000" />
      </mask>
      <rect width="1200" height="630" fill="#f2c14e" mask={`url(#${m})`} />
      <rect x="128" y="252" width="222" height="20" rx="9" fill="rgba(13,71,53,0.42)" />
      <rect x="128" y="306" width="222" height="20" rx="9" fill="rgba(13,71,53,0.42)" />
      <rect x="128" y="360" width="142" height="20" rx="9" fill="rgba(13,71,53,0.42)" />
      <text x="452" y="272" fontSize="60" fontWeight="700" fill="#ffffff">Pet insurance</text>
      <text x="452" y="340" fontSize="30" fill="rgba(255,255,255,0.82)">8 offers, read on the provider&rsquo;s own page</text>
      <text x="452" y="396" fontSize="30" fontWeight="700" fill="#f2c14e">17 August 2026</text>
    </svg>
  );
}
