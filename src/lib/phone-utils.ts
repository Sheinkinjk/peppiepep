/**
 * Phone number utilities for normalizing and validating phone numbers
 * Supports Australian and US phone numbers
 */

/**
 * Normalize a phone number to E.164 format
 * E.164 format: +[country code][number] (e.g., +61412345678 for Australia)
 *
 * @param phone - Raw phone number string
 * @param defaultCountry - Default country code ('AU' or 'US')
 * @returns Normalized phone number in E.164 format or null if invalid
 */
export function normalizePhoneNumber(phone: string | null, defaultCountry: 'AU' | 'US' = 'AU'): string | null {
  if (!phone) return null;

  // Remove all non-numeric characters except +
  let cleaned = phone.replace(/[^\d+]/g, '');

  // If already has country code, return as-is
  if (cleaned.startsWith('+')) {
    // Validate length (AU: +61 + 9 digits = 12, US: +1 + 10 digits = 12)
    if (cleaned.length >= 11 && cleaned.length <= 15) {
      return cleaned;
    }
    return null;
  }

  // Remove leading 0 if present (common in Australian numbers)
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }

  // Add country code based on default
  if (defaultCountry === 'AU') {
    // Australian mobile: 9 digits starting with 4
    // Australian landline: 9 digits starting with 2, 3, 7, 8
    if (cleaned.length === 9) {
      return `+61${cleaned}`;
    }
    // Handle 10-digit format (with leading 0 removed)
    if (cleaned.length === 10 && cleaned.startsWith('0')) {
      return `+61${cleaned.substring(1)}`;
    }
  } else if (defaultCountry === 'US') {
    // US numbers: 10 digits
    if (cleaned.length === 10) {
      return `+1${cleaned}`;
    }
    // Handle 11-digit format with leading 1
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+${cleaned}`;
    }
  }

  return null;
}

/**
 * Validate if a phone number is in valid E.164 format
 */
export function isValidE164(phone: string | null): boolean {
  if (!phone) return false;

  // E.164 format: + followed by 1-15 digits
  const e164Regex = /^\+[1-9]\d{1,14}$/;
  return e164Regex.test(phone);
}

/**
 * Format phone number for display
 * Converts E.164 to readable format
 *
 * @param phone - Phone number in E.164 format
 * @returns Formatted phone number for display
 */
export function formatPhoneForDisplay(phone: string | null): string {
  if (!phone) return '';

  // Australian numbers: +61 4XX XXX XXX
  if (phone.startsWith('+61')) {
    const number = phone.substring(3); // Remove +61
    if (number.length === 9 && number.startsWith('4')) {
      return `0${number.substring(0, 3)} ${number.substring(3, 6)} ${number.substring(6)}`;
    }
    return `0${number}`;
  }

  // US numbers: +1 (XXX) XXX-XXXX
  if (phone.startsWith('+1')) {
    const number = phone.substring(2); // Remove +1
    if (number.length === 10) {
      return `(${number.substring(0, 3)}) ${number.substring(3, 6)}-${number.substring(6)}`;
    }
    return number;
  }

  return phone;
}

/**
 * Detect country from phone number
 */
export function detectCountryFromPhone(phone: string | null): 'AU' | 'US' | 'UNKNOWN' {
  if (!phone) return 'UNKNOWN';

  if (phone.startsWith('+61')) return 'AU';
  if (phone.startsWith('+1')) return 'US';

  // Try to detect from format
  const cleaned = phone.replace(/[^\d]/g, '');
  if (cleaned.startsWith('04') || (cleaned.startsWith('4') && cleaned.length === 9)) {
    return 'AU';
  }
  if (cleaned.length === 10 || (cleaned.length === 11 && cleaned.startsWith('1'))) {
    return 'US';
  }

  return 'UNKNOWN';
}

/**
 * Batch normalize phone numbers for campaign sending
 */
export function normalizePhoneNumbers(phones: string[], defaultCountry: 'AU' | 'US' = 'AU'): {
  valid: Array<{ original: string; normalized: string }>;
  invalid: string[];
} {
  const valid: Array<{ original: string; normalized: string }> = [];
  const invalid: string[] = [];

  for (const phone of phones) {
    const normalized = normalizePhoneNumber(phone, defaultCountry);
    if (normalized && isValidE164(normalized)) {
      valid.push({ original: phone, normalized });
    } else {
      invalid.push(phone);
    }
  }

  return { valid, invalid };
}
