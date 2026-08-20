"use client";

import PreferenceQuiz, { type QuizQuestion, type QuizResult } from "@/components/consumer/PreferenceQuiz";

/**
 * Deliberately asks about ATTITUDE and BUDGET, never symptoms or risk factors.
 * Asking about family history would make this a risk assessment, which is a
 * clinician's job and edges toward regulated territory. Every outcome routes to
 * a GP conversation rather than to a provider.
 */
const QUESTIONS: QuizQuestion[] = [
  {
    key: "trigger",
    q: "What has you thinking about screening?",
    options: [
      { value: "curious", label: "General curiosity about my health" },
      { value: "prompted", label: "Something I read or someone I know" },
      { value: "doctor", label: "A doctor has suggested investigating something" },
    ],
  },
  {
    key: "uncertain",
    q: "If a scan found something small and uncertain, how would you handle it?",
    options: [
      { value: "calm", label: "I'd follow the advice and not dwell on it" },
      { value: "anxious", label: "I'd find the waiting difficult" },
      { value: "unsure", label: "Honestly, I don't know" },
    ],
  },
  {
    key: "budget",
    q: "Is the cost significant for you?",
    options: [
      { value: "yes", label: "Yes, it's a real expense" },
      { value: "some", label: "Manageable but not trivial" },
      { value: "no", label: "Not a factor" },
    ],
  },
  {
    key: "gp",
    q: "Have you discussed it with a GP?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "Not yet" },
    ],
  },
];

function resolve(a: Record<string, string>): QuizResult {
  if (a.trigger === "doctor") {
    return {
      title: "You're on a clinical pathway, which is a different thing entirely",
      body: "If a doctor has suggested investigating something specific, that is not consumer screening, and a Medicare rebate may apply where the imaging is clinically indicated. Go back to them rather than buying a private screen: the targeted investigation they have in mind is usually both more useful and cheaper than a broad scan you arrange yourself.",
      next: [
        { href: "/longevity/diagnostics/whole-body-mri-australia-cost", label: "Why the rebate distinction matters" },
      ],
    };
  }
  if (a.gp === "no") {
    return {
      title: "Talk to a GP before you book anything",
      body: "Not as a gatekeeping step, but because your actual risk profile decides whether any of this is worth doing, and a comparison site cannot know it. Some people have a history that genuinely warrants investigation, in which case there may be a clinically indicated pathway that attracts a rebate. Most people who feel well and have no risk factors get less from a broad scan than the marketing implies.",
      next: [
        { href: "/longevity/diagnostics/whole-body-mri-australia-cost", label: "The case against screening the well" },
        { href: "/longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia", label: "How the services differ" },
      ],
    };
  }
  if (a.uncertain === "anxious" || a.uncertain === "unsure") {
    return {
      title: "Weigh the uncertainty seriously before you book",
      body: "Detailed scans of healthy people frequently find something of unclear significance, and once found it usually cannot be ignored. That means repeat imaging, specialist appointments and often months of not knowing. If waiting would be genuinely hard for you, that is not a small consideration, and it is the part the marketing leaves out.",
      next: [
        { href: "/longevity/diagnostics/whole-body-mri-australia-cost", label: "The incidental-finding cascade" },
        { href: "/longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia", label: "Questions to ask a provider" },
      ],
    };
  }
  if (a.budget === "yes") {
    return {
      title: "The subsidised programs first, then decide",
      body: "If cost is a real factor, the national screening programs you are eligible for are evidence-based and free or subsidised, and they are the highest-value screening available to you. Private broad screening is expensive and its benefit for people without symptoms is contested. Do the funded ones before spending on the unfunded ones.",
      next: [
        { href: "/longevity/diagnostics/whole-body-mri-australia-cost", label: "Why there is no rebate" },
        { href: "/longevity/diagnostics/biological-age-testing-australia", label: "What is better validated" },
      ],
    };
  }
  return {
    title: "Ask each provider the same five questions",
    body: "You have discussed it, you can absorb the cost, and you would handle an uncertain result. That makes this a question of choosing well rather than whether to proceed. The variables that matter are what each service measures, whether a doctor interprets it, and what happens after a finding, which is where the total cost can grow.",
    next: [
      { href: "/longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia", label: "The five questions" },
      { href: "/longevity/diagnostics/whole-body-mri-australia-cost", label: "What the total can include" },
    ],
  };
}

export default function ScreeningQuizClient() {
  return (
    <PreferenceQuiz
      questions={QUESTIONS}
      resolve={resolve}
      source="health-screening-quiz"
      captureLabel="Want to know when we've compared providers in this category?"
      captureNote="One email when diagnostics goes live. We do not record your answers against your address."
      disclaimer="This quiz asks about cost and how you would handle an uncertain result. It collects no symptoms, no history and no health data, makes no assessment of your risk, and is general information rather than medical advice. Whether screening is appropriate for you is a conversation for a practitioner who knows your history."
    />
  );
}
