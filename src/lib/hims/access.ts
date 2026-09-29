// Access control for the Hims page set while it is awaiting Hims' written approval.
//
// HIMS_PAGES_LIVE=true   -> pages are public, indexable, in the sitemap.
// anything else          -> pages 404 unless the visitor has the preview key,
//                           and every response is noindex/nofollow.
//
// HIMS_PREVIEW_KEY must be a long random string (openssl rand -hex 16). It goes in the
// links you send to Hims: https://referlabs.com.au/hims?key=<HIMS_PREVIEW_KEY>

export const HIMS_PREVIEW_COOKIE = "rl_hims_preview";

export function himsPagesLive(): boolean {
  return process.env.HIMS_PAGES_LIVE === "true";
}

function previewKey(): string | null {
  const key = process.env.HIMS_PREVIEW_KEY ?? "";
  // Refuse short keys so a weak value can't be guessed.
  return key.length >= 24 ? key : null;
}

export function hasHimsAccess(input: { cookieValue?: string; keyParam?: string }): boolean {
  if (himsPagesLive()) return true;
  const key = previewKey();
  if (!key) return false;
  return input.cookieValue === key || input.keyParam === key;
}
