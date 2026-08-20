"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Check, Loader2 } from "lucide-react";

/**
 * "Which men's health route fits you?"
 *
 * The constraint here is stricter than on the skincare quiz. This asks NOTHING
 * about symptoms, conditions, history or function. Only: whether your GP bulk
 * bills, how much discretion matters, how often you would consult, and how
 * quickly you want to be seen.
 *
 * Two reasons. Collecting symptom data on a marketing page in this category
 * would be sensitive health information gathered for no clinical purpose. And a
 * tool that inferred a condition from answers would edge toward software
 * intended for diagnosis, which is a regulated medical device in Australia.
 *
 * Every outcome routes to a page about ACCESS and COST. None names a medicine,
 * and none tells anyone what is wrong with them.
 */

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Key = "bulkBilled" | "discretion" | "frequency" | "speed";
type Answers = Partial<Record<Key, string>>;

const QUESTIONS: { key: Key; q: string; options: { value: string; label: string; note?: string }[] }[] = [
  {
    key: "bulkBilled",
    q: "Does your regular GP bulk bill?",
    options: [
      { value: "yes", label: "Yes", note: "No out-of-pocket for a standard consult" },
      { value: "no", label: "No, I pay a gap" },
      { value: "unknown", label: "I don't have a regular GP" },
    ],
  },
  {
    key: "discretion",
    q: "How much does privacy matter to you here?",
    options: [
      { value: "high", label: "A lot", note: "I'd rather not discuss it in person" },
      { value: "some", label: "Somewhat" },
      { value: "low", label: "Not much", note: "Happy to raise it with a GP" },
    ],
  },
  {
    key: "frequency",
    q: "How often would you expect to consult in a year?",
    options: [
      { value: "rare", label: "Once or twice" },
      { value: "few", label: "Three or four times" },
      { value: "often", label: "Monthly, or ongoing support" },
    ],
  },
  {
    key: "speed",
    q: "How soon do you want to be seen?",
    options: [
      { value: "now", label: "As soon as possible" },
      { value: "week", label: "Within a week or two is fine" },
      { value: "flex", label: "No particular rush" },
    ],
  },
];

type Result = { title: string; body: string; next: { href: string; label: string }[] };

function resolve(a: Answers): Result {
  const cheapGp = a.bulkBilled === "yes";
  const wantsPrivacy = a.discretion === "high";
  const frequent = a.frequency === "often";

  if (cheapGp && !wantsPrivacy) {
    return {
      title: "Your GP is very likely the cheapest route",
      body: "A bulk-billed consult costs you nothing and attracts a Medicare rebate that online subscriptions generally do not. Your GP can also refer you onward, including to rebated pathways an online service cannot arrange. Start there and treat a subscription as the fallback rather than the default.",
      next: [
        { href: "/mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health", label: "The cost comparison, annualised" },
        { href: "/mens-health/erectile-dysfunction-treatment-cost-australia", label: "How the routes are priced" },
      ],
    };
  }
  if (cheapGp && wantsPrivacy) {
    return {
      title: "Weigh a free consult against not going at all",
      body: "On price a bulk-billing GP is hard to beat. But if privacy is the thing that would stop you booking, paying more for an online service that actually gets you assessed is a reasonable trade rather than a failure of budgeting. Worth knowing there is a middle option: a different GP at the same practice, or a telehealth appointment with a GP clinic.",
      next: [
        { href: "/mens-health/online-mens-health-clinics-compared", label: "What separates the online services" },
        { href: "/mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health", label: "What each route really costs" },
      ],
    };
  }
  if (frequent) {
    return {
      title: "A bundled subscription may genuinely work out cheaper",
      body: "Subscriptions look expensive against a single consult and stop looking that way once you would consult often. Since your GP does not bulk bill, the comparison is a gap fee several times a year plus anything dispensed, against a bundled monthly figure. Annualise both before deciding, and check what the subscription excludes.",
      next: [
        { href: "/mens-health/online-mens-health-clinics-compared", label: "What to check before subscribing" },
        { href: "/mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health", label: "The annual comparison" },
      ],
    };
  }
  if (a.speed === "now") {
    return {
      title: "Speed is what you're buying, so price it deliberately",
      body: "Online services are usually same or next day, and that has real value if waiting would mean not going. Just be clear that is what the premium buys: most subscriptions sit outside Medicare and charge in months you would not have consulted. Know the twelve-month figure before you enter a card.",
      next: [
        { href: "/mens-health/online-mens-health-clinics-compared", label: "Comparing the services" },
        { href: "/mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health", label: "What speed costs you" },
      ],
    };
  }
  return {
    title: "Compare on the twelve-month total, not the entry price",
    body: "With no bulk-billing GP and no urgency, this comes down to arithmetic rather than preference. Work out a year of gap-paid appointments against a year of subscription, including anything billed separately. That single number settles it more reliably than any feature comparison.",
    next: [
      { href: "/mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health", label: "The calculation, step by step" },
      { href: "/mens-health/online-mens-health-clinics-compared", label: "What separates the services" },
    ],
  };
}

export default function MensHealthQuiz() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const finished = step >= QUESTIONS.length;
  const result = finished ? resolve(answers) : null;

  function choose(key: Key, value: string) {
    setAnswers((p) => ({ ...p, [key]: value }));
    setStep((s) => s + 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
    setErr(null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailRe.test(email.trim())) {
      setErr("Enter a valid email address.");
      return;
    }
    setSending(true);
    setErr(null);
    try {
      const res = await fetch("/api/skincare-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source: "mens-health-quiz",
          // Deliberately not sending the result: it would attach an inference
          // about a sensitive category to an email address in our inbox and DB.
          company_website_confirm: honeypot,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setDone(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  if (!finished) {
    const q = QUESTIONS[step];
    return (
      <div className="rounded-2xl border border-[#e5e9e7] bg-white p-6 sm:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9aa39c]">
          Question {step + 1} of {QUESTIONS.length}
        </p>
        <h2 className="mt-3 text-xl font-bold text-[#10251b] sm:text-2xl">{q.q}</h2>
        <div className="mt-5 grid gap-2.5">
          {q.options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => choose(q.key, o.value)}
              className="group rounded-xl border border-[#e5e9e7] bg-white px-5 py-4 text-left transition-colors hover:border-[#0a7c42] hover:bg-[#f5f8f6]"
            >
              <span className="block text-[15px] font-semibold text-[#10251b] group-hover:text-[#0a7c42]">{o.label}</span>
              {o.note && <span className="mt-0.5 block text-sm text-[#6e7b74]">{o.note}</span>}
            </button>
          ))}
        </div>
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="mt-5 text-sm font-semibold text-[#6e7b74] hover:text-[#10251b]"
          >
            Back
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#0a7c42]/30 bg-[#f5f8f6] p-6 sm:p-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0a7c42]">Your result</p>
      <h2 className="mt-3 text-2xl font-bold leading-snug text-[#10251b]">{result!.title}</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">{result!.body}</p>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {result!.next.map((n) => (
          <li key={n.href}>
            <Link href={n.href} className="inline-flex items-center gap-1.5 font-semibold text-[#0a7c42] hover:underline">
              {n.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-7 border-t border-[#d9e5df] pt-6">
        {done ? (
          <p className="flex items-center gap-2 text-sm font-semibold text-[#0a7c42]">
            <Check className="h-4 w-4" aria-hidden="true" /> You&apos;re on the list. We&apos;ll email you when the
            section is live.
          </p>
        ) : (
          <form onSubmit={submit}>
            <label htmlFor="mhq-email" className="block text-sm font-semibold text-[#10251b]">
              Want to know when we&apos;ve compared providers in this category?
            </label>
            <p className="mt-1 text-sm text-[#6e7b74]">
              One email when men&apos;s health goes live. We do not record your answers against your address.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <input
                id="mhq-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="min-w-0 flex-1 rounded-xl border border-[#d9e5df] bg-white px-4 py-3 text-sm text-[#10251b] outline-none focus:border-[#0a7c42]"
              />
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />
              <button
                type="submit"
                disabled={sending}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#0a7c42] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#086536] disabled:opacity-60"
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                Notify me
              </button>
            </div>
            {err && <p className="mt-2 text-sm font-medium text-[#c0392b]">{err}</p>}
          </form>
        )}
      </div>

      <button
        type="button"
        onClick={restart}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#6e7b74] hover:text-[#10251b]"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Start again
      </button>

      <p className="mt-6 text-xs leading-relaxed text-[#6e7b74]">
        This quiz asks only about cost, privacy and how you prefer to consult. It collects no health information, makes
        no assessment of you, and is general information rather than medical advice. Anything prescription-only in
        Australia is supplied after an individual assessment by a registered practitioner.
      </p>
    </div>
  );
}
