import { useId, type ReactNode } from "react";

/**
 * THE OBJECT SET. One drawn object per hub, the thing a reader of that hub
 * actually handles: the bathroom scale, the comb, the pet's tag, the panel and
 * the sun, the wall battery, the browser, the dropper bottle.
 *
 * Drawing rules, so the set reads as one hand:
 *   1. Head-on or top-down only. No perspective, no isometric, no characters.
 *   2. Flat fills from the illustration palette below. No outlines around a
 *      silhouette; lines are for detail inside it (ticks, seams, grid).
 *   3. One hard shadow, offset down-right, never blurred.
 *   4. Built on a 48-unit square with a 4-unit margin, corners 2 to 8 units.
 *   5. Saffron never appears in an object: it belongs to figures we checked.
 *
 * Palette (hybrid.css, all derived from the settled tokens):
 *   --il-deep   teal-deep    structure, the darkest part of an object
 *   --il-mid    teal-mid     the object's body
 *   --il-bright teal-bright  the working part: pads, charge, sand, sun
 *   --il-soft   teal-soft    secondary surfaces
 *   --il-face   white        screens, dials, labels
 *   --il-shadow              teal-deep mixed into the ground it sits on
 */

export type ObjectKind =
  | "scale" | "comb" | "tag" | "solar" | "battery" | "power" | "browser"
  | "envelope" | "bottle" | "pillow" | "pulse" | "hourglass" | "lens"
  | "checklist" | "document" | "balance"
  | "phone" | "clinic" | "calculator" | "offer"
  | "funnel" | "send" | "badge" | "card" | "chip" | "thermo";

const D = "var(--il-deep)", M = "var(--il-mid)", B = "var(--il-bright)", S = "var(--il-soft)", F = "var(--il-face)";

const ART: Record<ObjectKind, ReactNode> = {
  /* weight loss: a bathroom scale from above */
  scale: (
    <>
      <rect x="7" y="5" width="34" height="38" rx="8" fill={D} />
      <rect x="9" y="7" width="30" height="34" rx="6.5" fill={M} />
      <rect x="14.5" y="10.5" width="19" height="9.5" rx="2.5" fill={F} />
      {[17.5, 20.75, 24, 27.25, 30.5].map((x) => (
        <line key={x} x1={x} y1="12.3" x2={x} y2={x === 24 ? 14.6 : 13.6} stroke={D} strokeWidth="0.8" />
      ))}
      <line x1="24" y1="18.6" x2="27.6" y2="13.4" stroke={D} strokeWidth="1.2" strokeLinecap="round" />
      <rect x="12.5" y="24" width="9.5" height="13.5" rx="4.5" fill={B} />
      <rect x="26" y="24" width="9.5" height="13.5" rx="4.5" fill={B} />
      {[28, 30.75, 33.5].map((y) => (
        <g key={y} stroke={M} strokeWidth="0.7">
          <line x1="15" y1={y} x2="19.5" y2={y} /><line x1="28.5" y1={y} x2="33" y2={y} />
        </g>
      ))}
    </>
  ),
  /* hair loss: a comb through three strands */
  comb: (
    <>
      <path d="M3 33 C 13 26, 22 40, 45 29" stroke={D} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M3 37.5 C 14 31, 23 44, 45 34" stroke={B} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <g transform="rotate(-12 24 24)">
        <rect x="5" y="13" width="38" height="7.5" rx="2.2" fill={M} />
        {Array.from({ length: 6 }, (_, i) => (
          <rect key={`c${i}`} x={7.2 + i * 3.1} y="19.5" width="1.8" height="12.5" rx="0.9" fill={M} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={`f${i}`} x={26 + i * 2.1} y="19.5" width="1.05" height="10" rx="0.5" fill={M} />
        ))}
        <line x1="8" y1="15.6" x2="40" y2="15.6" stroke={B} strokeWidth="0.8" strokeLinecap="round" />
      </g>
    </>
  ),
  /* pets: the ID tag on its ring */
  tag: (
    <>
      <circle cx="24" cy="9.5" r="4.6" stroke={D} strokeWidth="1.7" fill="none" />
      <circle cx="24" cy="28.5" r="15" fill={B} />
      <circle cx="24" cy="28.5" r="12.2" stroke={F} strokeWidth="0.8" fill="none" />
      <circle cx="24" cy="16.6" r="1.5" fill={D} />
      <ellipse cx="24" cy="32.6" rx="4.9" ry="4" fill={F} />
      {[[18.4, 27], [22, 24], [26, 24], [29.6, 27]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="1.95" fill={F} />)}
    </>
  ),
  /* solar and energy: a panel under the sun */
  solar: (
    <>
      <circle cx="36" cy="11" r="5.6" fill={B} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4, c = Math.cos(a), s = Math.sin(a);
        return <line key={i} x1={36 + c * 8} y1={11 + s * 8} x2={36 + c * 10.2} y2={11 + s * 10.2} stroke={B} strokeWidth="1.3" strokeLinecap="round" />;
      })}
      <rect x="20.8" y="40" width="2.4" height="5" fill={D} />
      <polygon points="4,41 11.5,21 37,21 29.5,41" fill={D} />
      <g stroke={M} strokeWidth="0.9">
        <line x1="20" y1="21" x2="12.5" y2="41" /><line x1="28.5" y1="21" x2="21" y2="41" />
        <line x1="7.75" y1="31" x2="33.25" y2="31" />
      </g>
      <line x1="11.5" y1="21" x2="37" y2="21" stroke={B} strokeWidth="1" />
    </>
  ),
  /* home batteries: the wall unit, three bars charged */
  battery: (
    <>
      <rect x="13" y="4" width="22" height="39" rx="4" fill={M} />
      <rect x="16" y="9" width="16" height="31" rx="2.5" fill={F} />
      {[34, 28, 22].map((y) => <rect key={y} x="18.5" y={y} width="11" height="4.2" rx="1" fill={B} />)}
      <rect x="18.9" y="16.4" width="10.2" height="3.4" rx="0.8" fill="none" stroke={M} strokeWidth="0.8" />
      <circle cx="24" cy="6.6" r="0.9" fill={B} />
      <rect x="15" y="43" width="18" height="1.8" rx="0.9" fill={D} />
    </>
  ),
  /* portable power: the carry-handle station */
  power: (
    <>
      <path d="M15.5 16 V11.5 a3 3 0 0 1 3 -3 h11 a3 3 0 0 1 3 3 V16" stroke={D} strokeWidth="2.4" fill="none" />
      <rect x="5" y="15" width="38" height="26" rx="4.5" fill={M} />
      <rect x="9" y="19.5" width="15" height="9.5" rx="1.5" fill={F} />
      <rect x="11" y="22" width="8" height="4.5" rx="0.8" fill={B} />
      <circle cx="31" cy="24.2" r="2.7" fill={D} />
      <circle cx="37.5" cy="24.2" r="2.7" fill={D} />
      <rect x="9" y="33" width="6" height="3" rx="0.8" fill={D} />
      <rect x="17" y="33" width="6" height="3" rx="0.8" fill={D} />
      <rect x="28.5" y="33.3" width="11" height="2.4" rx="1.2" fill={B} />
      <rect x="8" y="41" width="5" height="2" rx="1" fill={D} />
      <rect x="35" y="41" width="5" height="2" rx="1" fill={D} />
    </>
  ),
  /* business software: a browser, a rising chart, the cursor */
  browser: (
    <>
      <rect x="4" y="7" width="40" height="32" rx="3" fill={D} />
      <rect x="5.6" y="12.6" width="36.8" height="24.8" rx="1.6" fill={F} />
      {[8.6, 12, 15.4].map((x) => <circle key={x} cx={x} cy="9.9" r="1.05" fill={B} />)}
      <rect x="10" y="26" width="5" height="7" rx="0.8" fill={S} />
      <rect x="17" y="22" width="5" height="11" rx="0.8" fill={M} />
      <rect x="24" y="17" width="5" height="16" rx="0.8" fill={B} />
      <line x1="9" y1="33.6" x2="31" y2="33.6" stroke={D} strokeWidth="0.8" />
      <polygon points="32,25 32,38 35.2,35 37.6,40.4 39.9,39.4 37.5,34 41.8,34" fill={D} stroke={F} strokeWidth="0.9" strokeLinejoin="round" />
    </>
  ),
  /* newsletter and creator tools: a letter half out of its envelope */
  envelope: (
    <>
      <rect x="11.5" y="5" width="25" height="24" rx="1.5" fill={F} />
      <rect x="15.5" y="9.5" width="17" height="1.8" rx="0.9" fill={M} />
      <rect x="15.5" y="13.8" width="12" height="1.8" rx="0.9" fill={S} />
      <rect x="15.5" y="18.1" width="14.5" height="1.8" rx="0.9" fill={S} />
      <rect x="5" y="18" width="38" height="25" rx="2.5" fill={M} />
      <path d="M5.8 19.4 L24 32 L42.2 19.4" stroke={D} strokeWidth="1.3" fill="none" strokeLinejoin="round" />
      <path d="M6 42 L18.5 30.5 M42 42 L29.5 30.5" stroke={D} strokeWidth="0.8" />
    </>
  ),
  /* health and beauty: the dropper bottle */
  bottle: (
    <>
      <rect x="19" y="3" width="10" height="10.5" rx="4.6" fill={D} />
      <rect x="17" y="12.5" width="14" height="5.5" rx="1.2" fill={M} />
      <rect x="11.5" y="17.5" width="25" height="27" rx="5.5" fill={B} />
      <rect x="14.5" y="27" width="19" height="11" rx="1.2" fill={F} />
      <rect x="17.5" y="30.5" width="13" height="1.4" rx="0.7" fill={M} />
      <rect x="17.5" y="33.6" width="8" height="1.4" rx="0.7" fill={S} />
      <rect x="14.5" y="20.5" width="2.2" height="4.5" rx="1.1" fill={F} />
    </>
  ),
  /* sleep: the pillow under a crescent */
  pillow: (
    <>
      <path d="M34.5 3.5 A 8 8 0 1 0 43.5 13.8 A 6.4 6.4 0 0 1 34.5 3.5 Z" fill={B} />
      <path d="M5 28 Q5 20.5 12 21 H36 Q43 20.5 43 28 V37 Q43 44.5 36 44 H12 Q5 44.5 5 37 Z" fill={F} />
      <path d="M9 28.5 Q9 25 12.5 25 H35.5 Q39 25 39 28.5 V36.5 Q39 40 35.5 40 H12.5 Q9 40 9 36.5 Z"
        stroke={M} strokeWidth="0.8" strokeDasharray="1.6 1.6" fill="none" />
      <rect x="5" y="30.5" width="38" height="2" fill={S} />
    </>
  ),
  /* men's health: the pulse trace on a chart card */
  pulse: (
    <>
      <rect x="5" y="8" width="38" height="32" rx="3" fill={F} />
      <rect x="5" y="8" width="38" height="6.5" rx="3" fill={M} />
      <rect x="5" y="11" width="38" height="3.5" fill={M} />
      <path d="M12 18.6 C 9.5 16.9, 10 14.9, 12 15.9 C 14 14.9, 14.5 16.9, 12 18.6 Z" fill={F} transform="translate(-2 -6.5)" />
      <polyline points="8,29 15,29 18,21.5 22.5,35.5 26.5,24 29.5,29 40,29" stroke={B} strokeWidth="1.9" fill="none" strokeLinejoin="round" strokeLinecap="round" />
    </>
  ),
  /* longevity: the hourglass */
  hourglass: (
    <>
      <path d="M16 9 H32 C32 18, 26 21, 26 24 C26 27, 32 30, 32 39 H16 C16 30, 22 27, 22 24 C22 21, 16 18, 16 9 Z" fill={F} />
      <path d="M18.6 13 H29.4 C28.4 17.6, 25 20, 24 22.2 C23 20, 19.6 17.6, 18.6 13 Z" fill={B} />
      <path d="M17.2 39 C17.8 34, 21 31.4, 24 31 C27 31.4, 30.2 34, 30.8 39 Z" fill={B} />
      <line x1="24" y1="22" x2="24" y2="31" stroke={B} strokeWidth="0.8" />
      <rect x="10.5" y="4.5" width="27" height="4.5" rx="1.5" fill={D} />
      <rect x="10.5" y="39" width="27" height="4.5" rx="1.5" fill={D} />
      <rect x="12" y="9" width="2" height="30" fill={M} />
      <rect x="34" y="9" width="2" height="30" fill={M} />
    </>
  ),
  /* how we compare: the lens over a price tag */
  lens: (
    <>
      <g transform="rotate(-18 20 22)">
        <path d="M6 14 H27 L34 22 L27 30 H6 Z" fill={S} />
        <circle cx="28.5" cy="22" r="1.6" fill={F} />
        <rect x="9.5" y="18.5" width="11" height="1.8" rx="0.9" fill={M} />
        <rect x="9.5" y="23" width="7" height="1.8" rx="0.9" fill={M} />
      </g>
      <rect x="33" y="33" width="4.2" height="13" rx="2.1" fill={D} transform="rotate(-45 35.1 39.5)" />
      <circle cx="26" cy="29" r="10" fill={F} fillOpacity="0.55" stroke={D} strokeWidth="2.6" />
    </>
  ),
  /* how we compare, step 2: the same checklist for every provider */
  checklist: (
    <>
      <rect x="9" y="7" width="30" height="38" rx="3" fill={M} />
      <rect x="12" y="11.5" width="24" height="30" rx="1.5" fill={F} />
      <rect x="18" y="4" width="12" height="6.5" rx="2" fill={D} />
      {[18.5, 26, 33.5].map((y) => (
        <g key={y}>
          <rect x="15" y={y - 2.6} width="5.2" height="5.2" rx="1" fill={B} />
          <path d={`M16.2 ${y} L17.5 ${y + 1.3} L19.1 ${y - 1.2}`} stroke={F} strokeWidth="1.1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="23" y={y - 0.9} width={y === 26 ? 8 : 10.5} height="1.8" rx="0.9" fill={S} />
        </g>
      ))}
    </>
  ),
  /* how we compare, step 3: the page, and the pen that wrote it */
  document: (
    <>
      <polygon points="8,4 29,4 37,12 37,44 8,44" fill={F} />
      <polygon points="29,4 29,12 37,12" fill={S} />
      <rect x="12.5" y="17" width="17" height="2" rx="1" fill={M} />
      {[[22.5, 20], [27.5, 16], [32.5, 19], [37.5, 11]].map(([y, w]) => <rect key={y} x="12.5" y={y} width={w} height="1.8" rx="0.9" fill={S} />)}
      <g transform="rotate(32 38 30)">
        <rect x="35.2" y="13" width="5.6" height="23" rx="1.2" fill={B} />
        <rect x="35.2" y="13" width="5.6" height="4.5" rx="1.2" fill={D} />
        <polygon points="35.2,36 40.8,36 38,41.5" fill={D} />
      </g>
    </>
  ),
  /* how we compare, step 4: level, because position cannot be bought */
  balance: (
    <>
      <rect x="23" y="8" width="2" height="33" fill={D} />
      <rect x="14" y="40" width="20" height="4" rx="1.5" fill={D} />
      <rect x="6" y="11" width="36" height="2.2" rx="1.1" fill={M} />
      <circle cx="24" cy="8.4" r="2.8" fill={B} />
      <g stroke={M} strokeWidth="0.8">
        <line x1="8.5" y1="13" x2="4.5" y2="26" /><line x1="8.5" y1="13" x2="12.5" y2="26" />
        <line x1="39.5" y1="13" x2="35.5" y2="26" /><line x1="39.5" y1="13" x2="43.5" y2="26" />
      </g>
      <path d="M3 26 H14 A5.5 4 0 0 1 3 26 Z" fill={B} />
      <path d="M34 26 H45 A5.5 4 0 0 1 34 26 Z" fill={B} />
    </>
  ),
  /* telehealth: the phone the consult happens on */
  phone: (
    <>
      <rect x="13" y="3" width="22" height="42" rx="4" fill={D} />
      <rect x="15.5" y="7" width="17" height="31.5" rx="1.5" fill={F} />
      <rect x="17.5" y="11" width="10" height="5" rx="2" fill={S} />
      <rect x="20.5" y="19" width="10" height="5" rx="2" fill={B} />
      <rect x="17.5" y="27" width="8" height="5" rx="2" fill={S} />
      <rect x="21" y="41" width="6" height="1.4" rx="0.7" fill={F} />
    </>
  ),
  /* your GP: the clinic, with the cross on its roof */
  clinic: (
    <>
      <rect x="8" y="18" width="32" height="25" fill={M} />
      <polygon points="5,19.5 24,7 43,19.5" fill={D} />
      <rect x="20" y="31" width="8" height="12" fill={D} />
      <rect x="11.5" y="23.5" width="6" height="5" rx="0.6" fill={F} />
      <rect x="30.5" y="23.5" width="6" height="5" rx="0.6" fill={F} />
      <circle cx="24" cy="15.4" r="4.3" fill={B} />
      <rect x="23" y="12.6" width="2" height="5.6" rx="0.4" fill={F} />
      <rect x="21.2" y="14.4" width="5.6" height="2" rx="0.4" fill={F} />
      <rect x="4" y="43" width="40" height="1.8" rx="0.9" fill={D} />
    </>
  ),
  /* cost guides and calculators */
  calculator: (
    <>
      <rect x="10" y="4" width="28" height="40" rx="3" fill={D} />
      <rect x="13.5" y="8" width="21" height="8.5" rx="1" fill={F} />
      <rect x="24" y="11" width="8" height="2.4" rx="1.2" fill={M} />
      {[0, 1, 2].map((c) => [0, 1, 2, 3].map((r) => (
        <rect key={`${c}${r}`} x={13.5 + c * 7.4} y={20 + r * 5.8} width="5.8" height="4.4" rx="0.9"
          fill={c === 2 && r === 3 ? B : c === 2 ? M : S} />
      )))}
    </>
  ),
  /* an offer: the swing tag, with a percent sign on it */
  offer: (
    <>
      <g transform="rotate(-20 24 24)">
        <path d="M10 13 H30 L39 24 L30 35 H10 Z" fill={B} />
        <circle cx="31.5" cy="24" r="2" fill={F} />
        <circle cx="16" cy="19.5" r="2.1" fill={F} />
        <circle cx="23" cy="28.5" r="2.1" fill={F} />
        <rect x="18.6" y="16" width="1.8" height="16" rx="0.9" fill={F} transform="rotate(35 19.5 24)" />
      </g>
      <path d="M36 12 C 40 8, 44 10, 43 15" stroke={D} strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </>
  ),
  /* sales and CRM: the pipeline narrowing to what closes */
  funnel: (
    <>
      <polygon points="5,8 43,8 30,25 18,25" fill={M} />
      <rect x="5" y="8" width="38" height="4" fill={D} />
      <rect x="19" y="25" width="10" height="13" fill={D} />
      <rect x="21" y="38" width="6" height="5" rx="1" fill={B} />
      <circle cx="16" cy="15.5" r="2" fill={F} />
      <circle cx="24" cy="17" r="2" fill={F} />
      <circle cx="32" cy="15.5" r="2" fill={F} />
      <circle cx="24" cy="22" r="1.8" fill={B} />
    </>
  ),
  /* outreach: the message on its way */
  send: (
    <>
      <polygon points="4,24 44,6 30,42 23,29" fill={M} />
      <polygon points="23,29 44,6 26,35" fill={D} />
      <polygon points="23,29 30,42 26,35" fill={D} />
      <path d="M4 40 C 10 36, 12 44, 18 40" stroke={B} strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </>
  ),
  /* HR and payroll: the staff badge on its lanyard */
  badge: (
    <>
      <path d="M17 4 L24 14 L31 4" stroke={D} strokeWidth="2.2" fill="none" strokeLinejoin="round" />
      <rect x="21" y="12" width="6" height="5" rx="1" fill={D} />
      <rect x="10" y="16" width="28" height="28" rx="3" fill={F} />
      <rect x="10" y="16" width="28" height="7" rx="3" fill={M} />
      <rect x="10" y="20" width="28" height="3" fill={M} />
      <rect x="15" y="27" width="9" height="11" rx="1.5" fill={B} />
      <rect x="27" y="28" width="7" height="1.8" rx="0.9" fill={M} />
      <rect x="27" y="32" width="6" height="1.8" rx="0.9" fill={S} />
      <rect x="27" y="36" width="5" height="1.8" rx="0.9" fill={S} />
    </>
  ),
  /* payments and bookkeeping: the card */
  card: (
    <>
      <rect x="4" y="11" width="40" height="27" rx="3" fill={M} />
      <rect x="4" y="16" width="40" height="5" fill={D} />
      <rect x="8.5" y="25" width="8" height="6" rx="1" fill={B} />
      <rect x="24" y="30.5" width="15" height="2" rx="1" fill={F} />
      <rect x="30" y="25.5" width="9" height="2" rx="1" fill={S} />
    </>
  ),
  /* AI tools: the chip */
  chip: (
    <>
      {[14, 20, 26, 32].map((v) => (
        <g key={v} fill={D}>
          <rect x={v - 1} y="4" width="2" height="6" rx="1" /><rect x={v - 1} y="38" width="2" height="6" rx="1" />
          <rect x="4" y={v - 1} width="6" height="2" rx="1" /><rect x="38" y={v - 1} width="6" height="2" rx="1" />
        </g>
      ))}
      <rect x="9" y="9" width="30" height="30" rx="3" fill={M} />
      <rect x="15" y="15" width="18" height="18" rx="2" fill={D} />
      <circle cx="24" cy="24" r="4.2" fill={B} />
      <circle cx="12.5" cy="12.5" r="1.3" fill={F} />
    </>
  ),
  /* recovery: the thermometer, hot at the bulb and cold up the scale */
  thermo: (
    <>
      <rect x="19" y="4" width="10" height="30" rx="5" fill={F} />
      <circle cx="24" cy="36" r="8" fill={M} />
      <rect x="22" y="14" width="4" height="22" rx="2" fill={M} />
      {[10, 15, 20, 25].map((y) => <rect key={y} x="31" y={y} width={y % 10 === 0 ? 7 : 4.5} height="1.6" rx="0.8" fill={D} />)}
      <circle cx="21" cy="33.5" r="1.8" fill={B} />
    </>
  ),
};

/**
 * One object, drawn at any size. `size` is the rendered box in px; the art is
 * the same drawing from 18px to 120px, so a hub looks like itself everywhere.
 */
export function HubObject({ kind, size = 48, label, className }: {
  kind: ObjectKind; size?: number; label?: string; className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const shadow = size >= 32;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className ?? "hy-obj"}
      role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {shadow && (
        <defs>
          <filter id={`s${id}`} x="-10%" y="-10%" width="130%" height="130%">
            <feOffset in="SourceAlpha" dx="1.6" dy="1.8" result="o" />
            <feFlood style={{ floodColor: "var(--il-shadow)" }} />
            <feComposite in2="o" operator="in" result="sh" />
            <feMerge><feMergeNode in="sh" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
      )}
      <g filter={shadow ? `url(#s${id})` : undefined}>{ART[kind]}</g>
    </svg>
  );
}
