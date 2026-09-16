import { JUNIPER_URL } from "./affiliate-links";

/**
 * Disclosure wording a partner requires us to publish word-for-word.
 *
 * This is different from our own affiliate disclosure. Ours we write, and we
 * can phrase it however reads best. These are contractual: the partner
 * specifies the sentence and where it has to sit, and paraphrasing it breaches
 * the agreement even when the paraphrase says the same thing.
 *
 * It lives here rather than inline on a page because the requirement follows
 * the LINK, not the page. On 16 Sep 2026 a provider comparison added a Juniper
 * link to /weight-loss and carried only our own generic earnings line, so the
 * hub earned from Juniper without the wording Juniper requires. The page that
 * had the sentence, /juniper, was not the page that gained the link.
 *
 * So: look the requirement up from the destination URL, render it next to that
 * link, and let scripts/check-required-disclosure.mjs fail the build if any
 * built page carries the URL without the sentence.
 */

export type RequiredDisclosure = {
  partner: string;
  /** The destination whose presence on a page triggers the requirement. */
  url: string;
  /**
   * The exact wording. Do not reword, abbreviate, append to, or split it.
   * Juniper's handbook offers a choice of two statements and this is the one
   * we use; if you switch to the other, switch it here so every surface moves
   * together.
   */
  text: string;
  /** Where the requirement comes from, and when we read it. */
  source: string;
};

export const REQUIRED_DISCLOSURES: RequiredDisclosure[] = [
  {
    partner: "Juniper",
    url: JUNIPER_URL,
    text: "This post contains affiliate links. If you are a new Juniper patient and make a purchase through these links, I may earn a small commission at no extra cost to you.",
    source: "Juniper affiliate handbook, read 6 August 2026",
  },
];

/** The requirement attached to an outbound link, if it has one. */
export function requiredDisclosureFor(url?: string): RequiredDisclosure | undefined {
  if (!url) return undefined;
  return REQUIRED_DISCLOSURES.find((d) => d.url === url);
}
