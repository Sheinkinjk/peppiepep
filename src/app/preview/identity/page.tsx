import type { Metadata } from "next";
import "../home.css";
import "./identity.css";
import {
  GaugeMark, GaugeLockup, GaugeRule, GaugeReading, GaugeEmpty, GaugeOG,
  StepMark, StepLockup, StepRule, StepReading, StepEmpty, StepOG,
  PunchMark, PunchLockup, PunchRule, PunchReading, PunchEmpty, PunchOG,
} from "@/components/preview/Marks";
import { formatReading, oldestReadingISO } from "@/lib/preview/data";

export const metadata: Metadata = {
  title: "Identity, three signature concepts",
  robots: { index: false, follow: false },
};

const READ = oldestReadingISO ? formatReading(oldestReadingISO) : "17 August 2026";

type Concept = {
  id: string;
  name: string;
  idea: string;
  dated: string;
  Mark: typeof GaugeMark;
  Lockup: () => React.JSX.Element;
  Rule: () => React.JSX.Element;
  Reading: (p: { date: string }) => React.JSX.Element;
  Empty: () => React.JSX.Element;
  OG: () => React.JSX.Element;
  scale: [string, string][];
  distinct: string;
  bad: string;
};

const CONCEPTS: Concept[] = [
  {
    id: "A",
    name: "The Gauge",
    idea:
      "A graduated scale where one graduation is extended and solid: the value we read. Everything else on the scale is a date we did not read.",
    dated:
      "An instrument shows you the value and the scale it sits on at the same time. The extended graduation is the reading; its position among the others is when. A price with no scale behind it is a claim, and a scale with nothing extended is a page nobody has checked.",
    Mark: GaugeMark,
    Lockup: GaugeLockup,
    Rule: GaugeRule,
    Reading: GaugeReading,
    Empty: GaugeEmpty,
    OG: GaugeOG,
    scale: [
      ["Monogram 16px", "Spine plus three graduations. Five muddy, so the small form drops two and thickens the rest."],
      ["Wordmark", "The reading graduation runs out of the mark and continues under the word as a rule."],
      ["Section marker", "A hairline rule with one thickened segment, positioned over the column that matters."],
      ["Illustration", "Each category is a different instrument: cover levels, kWh, mg, price bands. Same grammar, six dials."],
      ["Empty state", "The scale with no graduation extended. Says nothing read yet without a cartoon."],
      ["Favicon", "Spine and three marks. Survives 16px because it is four rectangles."],
      ["OG image", "The gauge runs down the left edge full-bleed, headline right, the date at the extended mark."],
    ],
    distinct:
      "None of the five references uses a measuring instrument. NerdWallet is folded paper planes, CTM is a mascot, Finder is rounded-app blue, Canstar is literally stars, Bankrate is navy typography. A graduated scale is in none of their vocabularies, and it is also not in the banned set: it is not a magnifier, a tick, a balance, a shield, a tag or a bubble.",
    bad:
      "Three horizontal bars is the hamburger menu, and evenly spaced bars of equal weight is an audio equaliser or a bar chart. If the graduations lose their unequal lengths, or the spine is dropped, it stops being an instrument and becomes UI furniture. It also dies if the extended graduation is not obviously longer than every other, because then the mark says nothing was read.",
  },
  {
    id: "B",
    name: "The Step",
    idea:
      "A value line that holds flat and steps exactly once, at the moment we read it. The riser carries the accent; the flats do not.",
    dated:
      "A price does not drift. It holds, then changes, and the only reason anyone knows it changed is that someone looked on a given day. The riser is that day. This is the only one of the three where the date is the subject of the drawing rather than a label attached to it.",
    Mark: StepMark,
    Lockup: StepLockup,
    Rule: StepRule,
    Reading: StepReading,
    Empty: StepEmpty,
    OG: StepOG,
    scale: [
      ["Monogram 16px", "Three strokes. The most legible of the three at small size because it is the least dense."],
      ["Wordmark", "The step is the baseline: Refer sits on the upper flat, Labs on the lower. The word cannot be typeset without the mark."],
      ["Section marker", "A divider that steps where the section changes weight, instead of a rule that says nothing."],
      ["Illustration", "Each category is a profile: how the number moves when you read it. Excess against premium, kWh against rebate."],
      ["Empty state", "A dashed flat line with no riser. Nothing has been read."],
      ["Favicon", "Clean at 16px, but the least distinctive of the three in a crowded tab strip."],
      ["OG image", "The step runs edge to edge behind the headline, the riser landing under the date."],
    ],
    distinct:
      "No reference uses a step. The hazard is the category next door rather than these five: fintech has drawn rising lines for a decade. What separates this is that it drops rather than rises, has no arrowhead, steps exactly once instead of tracing a series, and colours the riser rather than the line.",
    bad:
      "Add an arrowhead and it is every startup logo since 2015. Make it rise and it becomes a growth chart, which is a claim we cannot evidence. Give it three or four steps and it turns into a sparkline, at which point it is data visualisation rather than a mark. Round the corner and it goes soft and generic.",
  },
  {
    id: "C",
    name: "The Punch",
    idea:
      "A stub with a hole punched through it. The punch is physical evidence that somebody checked, and its position says which row was read.",
    dated:
      "A conductor punches a ticket, a tally is cut, a card is holed. The mark is the residue of an act performed once, at a time, by a person, and it cannot be forged by restating it. That is closer to what this site actually does than any drawn line.",
    Mark: PunchMark,
    Lockup: PunchLockup,
    Rule: PunchRule,
    Reading: PunchReading,
    Empty: PunchEmpty,
    OG: PunchOG,
    scale: [
      ["Monogram 16px", "A stub and one hole. The heaviest and most visible of the three at small size."],
      ["Wordmark", "The punch is the word space: Refer, hole, Labs."],
      ["Section marker", "A rule interrupted by a punch at the point of emphasis."],
      ["Illustration", "Punches through a field of green: six categories, six punch positions, one grammar."],
      ["Empty state", "An unpunched stub, dashed. Nothing checked yet."],
      ["Favicon", "The strongest of the three at 16px, because it is a solid shape with a hole rather than an assembly of strokes."],
      ["OG image", "A full-bleed punched stub in gold on the field, headline right."],
    ],
    distinct:
      "It is the only one of the three that subtracts instead of drawing, which means the card system can inherit it as a notch rather than have the mark applied on top. That is the difference between an identity a page has and a logo a page carries. None of the five references cuts anything out of anything.",
    bad:
      "Centre the hole and it is a donut, a record button, or a camera aperture. Make the stub a perfect square and it reads as a generic app tile. Add perforation dots down one edge and it becomes a cinema-ticket cliche, which is decoration rather than evidence. Punch more than one hole at small size and it turns to mush.",
  },
];

export default function IdentityPage() {
  return (
    <div className="rl-h rl-i">
      <header className="rl-i-top">
        <div className="rl-i-wrap">
          <h1>Three signature concepts</h1>
          <p>
            Each derives from the one thing this site owns that no competitor
            has: we read the provider&rsquo;s own page on a date and publish
            that date. Comparison is not ownable, because all five references
            compare. The evidence of a reading is. Oldest reading currently in
            the table: <code>{READ}</code>. Nothing here has been applied to a
            page yet.
          </p>
        </div>
      </header>

      <div className="rl-i-wrap">
        <div className="rl-i-cols">
          {CONCEPTS.map((c) => {
            const { Mark, Lockup, Rule, Reading, Empty, OG } = c;
            return (
              <section className="rl-i-col" key={c.id}>
                <div className="rl-i-col__h">
                  <p className="rl-i-col__k">Concept {c.id}</p>
                  <h2 className="rl-i-col__n">{c.name}</h2>
                  <p className="rl-i-col__i">{c.idea}</p>
                </div>

                <div className="rl-i-block">
                  <h3>Three sizes</h3>
                  <div className="rl-i-sizes">
                    <div className="rl-i-sz rl-i-sz--tiny">
                      <div><Mark size={16} title={`${c.name} at 16px`} /></div>
                      <span>16px</span>
                    </div>
                    <div className="rl-i-sz">
                      <Mark size={48} title={`${c.name} at 48px`} />
                      <span>48px</span>
                    </div>
                    <div className="rl-i-sz">
                      <Mark size={112} title={`${c.name} at 112px`} />
                      <span>112px</span>
                    </div>
                  </div>
                  <div className="rl-i-onfield">
                    <Mark size={40} onField title={`${c.name} on the field colour`} />
                    <Mark size={16} onField title={`${c.name} on the field colour, small`} />
                  </div>
                </div>

                <div className="rl-i-block">
                  <h3>Lockup</h3>
                  <Lockup />
                </div>

                <div className="rl-i-block">
                  <h3>Section marker</h3>
                  <Rule />
                </div>

                <div className="rl-i-block">
                  <h3>The reading object</h3>
                  <Reading date={READ} />
                </div>

                <div className="rl-i-block">
                  <h3>Empty state</h3>
                  <Empty />
                </div>

                <div className="rl-i-block">
                  <h3>Favicon at tab size</h3>
                  <div className="rl-i-tabs">
                    <span className="rl-i-tab">
                      <Mark size={16} title="favicon" />
                      <span>Compare pet insurance</span>
                    </span>
                    <span className="rl-i-tab">
                      <Mark size={16} title="favicon" />
                      <span>Refer Labs</span>
                    </span>
                  </div>
                </div>

                <div className="rl-i-block">
                  <h3>OG template</h3>
                  <OG />
                </div>

                <div className="rl-i-block">
                  <h3>How it expresses the dated reading</h3>
                  <p>{c.dated}</p>
                </div>

                <div className="rl-i-block">
                  <h3>How it scales</h3>
                  <table className="rl-i-scale">
                    <tbody>
                      {c.scale.map(([k, v]) => (
                        <tr key={k}>
                          <th scope="row">{k}</th>
                          <td>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rl-i-block">
                  <h3>Why it is not any of the five</h3>
                  <p>{c.distinct}</p>
                </div>

                <div className="rl-i-block rl-i-bad">
                  <h3>If executed badly</h3>
                  <p>{c.bad}</p>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
