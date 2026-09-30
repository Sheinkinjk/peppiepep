/**
 * The federal battery discount step-down, stated once and dated (30 Sep 2026).
 *
 * Source: DCCEEW, Cheaper Home Batteries Program, Table 1 "Changes to the STC
 * Factor to 2030", read 30 Sep 2026: 6.8 for May to December 2026, 5.7 for
 * January to June 2027. The same page: "The discount that you are entitled to is
 * determined by the STC Factor on the date the battery is installed."
 *
 * The percentage is derived, never typed. Renders nothing from the step date on;
 * pages are statically built, so the next deploy after 1 Jan 2027 removes it (and
 * this component should then move to the July 2027 step, 5.2). Solar Victoria
 * bars implying government endorsement: this states the schedule, nothing more.
 */
const SOURCE = "https://www.dcceew.gov.au/energy/programs/cheaper-home-batteries";
const FACTOR_NOW = 6.8;
const FACTOR_NEXT = 5.7;
const STEP_DATE = new Date("2027-01-01T00:00:00+11:00");
const LESS_PCT = Math.round((1 - FACTOR_NEXT / FACTOR_NOW) * 100);

export default function BatteryDeadlineNote({ className = "", tone = "light" }: { className?: string; tone?: "light" | "tinted" }) {
  if (Date.now() >= STEP_DATE.getTime()) return null;
  return (
    <p
      className={`${tone === "tinted" ? "text-[#14120f]" : "text-[#56504a]"} text-[13px] leading-relaxed ${className}`}
      data-battery-deadline
    >
      <span className="font-semibold text-[#14120f]">The federal discount steps down on 1 January 2027.</span> It is set by
      the date your battery is installed, and installs from 1 January get about {LESS_PCT}% less per kWh than installs
      before it (certificate factor {FACTOR_NOW} falling to {FACTOR_NEXT}).{" "}
      <a href={SOURCE} target="_blank" rel="noopener" className="underline decoration-[#ded8cd] underline-offset-2 hover:text-[#14120f]">
        Energy department schedule
      </a>
      , read 30 September 2026.
    </p>
  );
}
