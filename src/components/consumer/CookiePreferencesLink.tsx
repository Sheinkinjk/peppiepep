"use client";

import { openCookiePreferences } from "@/components/CookieConsent";

/** Footer link that reopens the cookie preferences panel, so consent can be withdrawn as easily as it was given. */
export default function CookiePreferencesLink() {
  return (
    <button onClick={openCookiePreferences} className="transition-colors hover:text-[#0a7c42]">
      Cookie Preferences
    </button>
  );
}
