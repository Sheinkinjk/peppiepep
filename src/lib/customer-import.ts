import { nanoid } from "nanoid";

import type { Database } from "@/types/supabase";

type RawCustomerRow = Record<string, string | null | undefined>;

type BuildCustomerOptions = {
  businessId: string;
  status?: Database["public"]["Tables"]["customers"]["Insert"]["status"];
  referralCodeFactory?: () => string;
};

const NAME_KEYWORDS = [
  "fullname",
  "contactname",
  "clientname",
  "ambassadorname",
  "preferredname",
  "name",
];
const FIRST_NAME_KEYWORDS = ["firstname", "givenname", "first"];
const LAST_NAME_KEYWORDS = ["lastname", "surname", "last"];
const PHONE_KEYWORDS = [
  "phonenumber",
  "phone",
  "mobile",
  "cell",
  "cellphone",
  "contactnumber",
  "telephone",
  "tel",
  "whatsapp",
];
const EMAIL_KEYWORDS = [
  "emailaddress",
  "primaryemail",
  "contactemail",
  "email",
  "mail",
];

function normalizeKey(key: string) {
  return key.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getFirstFilledValue(
  row: RawCustomerRow,
  keywords: string[],
  options?: { disallowTokens?: string[] },
): string | null {
  const disallowTokens = options?.disallowTokens ?? [];
  const entries = Object.entries(row);
  for (const keyword of keywords) {
    for (const [header, value] of entries) {
      if (!value) continue;
      const trimmed = String(value).trim();
      if (!trimmed) continue;
      const normalizedHeader = normalizeKey(header);
      if (disallowTokens.some((token) => normalizedHeader.includes(token))) {
        continue;
      }
      if (
        normalizedHeader === keyword ||
        normalizedHeader.includes(keyword)
      ) {
        return trimmed;
      }
    }
  }
  return null;
}

/**
 * Normalize spreadsheet rows exported from CSV/Excel uploads into customer inserts.
 * Filters out rows without any useful contact information.
 */
export function buildCustomersFromRows(
  rows: RawCustomerRow[],
  { businessId, status = "pending", referralCodeFactory }: BuildCustomerOptions,
): Database["public"]["Tables"]["customers"]["Insert"][] {
  const fallbackReferralCode = () => nanoid(12);
  const preferredReferralCode = referralCodeFactory ?? fallbackReferralCode;
  const usedCodes = new Set<string>();

  const getUniqueReferralCode = () => {
    for (let attempt = 0; attempt < 20; attempt += 1) {
      const code = preferredReferralCode();
      if (!usedCodes.has(code)) {
        usedCodes.add(code);
        return code;
      }
    }

    for (let attempt = 0; attempt < 50; attempt += 1) {
      const code = fallbackReferralCode();
      if (!usedCodes.has(code)) {
        usedCodes.add(code);
        return code;
      }
    }

    throw new Error("Unable to generate unique referral codes for import batch.");
  };

  const normalizedRows: Database["public"]["Tables"]["customers"]["Insert"][] = [];

  for (const row of rows) {
    let name = getFirstFilledValue(row, NAME_KEYWORDS, {
      disallowTokens: ["first", "last"],
    });
    const phone = getFirstFilledValue(row, PHONE_KEYWORDS);
    const email = getFirstFilledValue(row, EMAIL_KEYWORDS);

    if (!name) {
      const firstName = getFirstFilledValue(row, FIRST_NAME_KEYWORDS);
      const lastName = getFirstFilledValue(row, LAST_NAME_KEYWORDS);
      if (firstName || lastName) {
        name = [firstName, lastName].filter(Boolean).join(" ").trim();
      }
    }

    if (!name && !phone && !email) {
      continue;
    }

    normalizedRows.push({
      business_id: businessId,
      name: name || null,
      phone: phone || null,
      email: email || null,
      referral_code: getUniqueReferralCode(),
      status,
    });
  }

  return normalizedRows;
}
