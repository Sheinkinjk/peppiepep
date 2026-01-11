/**
 * Standardized Phone Number Validation
 *
 * Uses libphonenumber-js for robust international phone number validation.
 * Provides consistent validation across all forms and API routes.
 */

import { parsePhoneNumber, type CountryCode } from 'libphonenumber-js';

export interface PhoneValidationResult {
  isValid: boolean;
  formatted?: string;
  country?: string;
  error?: string;
}

/**
 * Validate and format a phone number
 *
 * @param phoneNumber - The phone number to validate
 * @param defaultCountry - Default country code (default: 'AU')
 * @returns Validation result with formatted number if valid
 */
export function validatePhoneNumber(
  phoneNumber: string,
  defaultCountry: CountryCode = 'AU'
): PhoneValidationResult {
  // Clean input
  const cleaned = phoneNumber.trim();

  if (!cleaned) {
    return {
      isValid: false,
      error: 'Phone number is required'
    };
  }

  try {
    // Parse phone number
    const parsed = parsePhoneNumber(cleaned, defaultCountry);

    // Check if valid
    if (!parsed || !parsed.isValid()) {
      return {
        isValid: false,
        error: 'Invalid phone number format'
      };
    }

    // Return valid result with formatted number
    return {
      isValid: true,
      formatted: parsed.formatInternational(),
      country: parsed.country
    };
  } catch (error) {
    // Parsing failed - try basic validation as fallback
    const basicPattern = /^\+?[1-9]\d{7,14}$/;
    if (basicPattern.test(cleaned.replace(/[\s\-\(\)]/g, ''))) {
      return {
        isValid: true,
        formatted: cleaned
      };
    }

    return {
      isValid: false,
      error: 'Invalid phone number format'
    };
  }
}

/**
 * Normalize phone number to E.164 format for storage
 *
 * @param phoneNumber - The phone number to normalize
 * @param defaultCountry - Default country code (default: 'AU')
 * @returns Normalized phone number or null if invalid
 */
export function normalizePhoneNumber(
  phoneNumber: string,
  defaultCountry: CountryCode = 'AU'
): string | null {
  try {
    const parsed = parsePhoneNumber(phoneNumber, defaultCountry);
    return parsed?.isValid() ? parsed.format('E.164') : null;
  } catch {
    // Fallback normalization for invalid numbers
    return phoneNumber.replace(/[\s\-\(\)]/g, '');
  }
}

/**
 * Check if phone number is mobile
 *
 * @param phoneNumber - The phone number to check
 * @param defaultCountry - Default country code (default: 'AU')
 * @returns True if mobile number, false otherwise
 */
export function isMobileNumber(
  phoneNumber: string,
  defaultCountry: CountryCode = 'AU'
): boolean {
  try {
    const parsed = parsePhoneNumber(phoneNumber, defaultCountry);
    return parsed?.getType() === 'MOBILE';
  } catch {
    return false;
  }
}

/**
 * Format phone number for display
 *
 * @param phoneNumber - The phone number to format
 * @param format - Format type ('international' | 'national' | 'e164')
 * @param defaultCountry - Default country code (default: 'AU')
 * @returns Formatted phone number
 */
export function formatPhoneNumber(
  phoneNumber: string,
  format: 'international' | 'national' | 'e164' = 'international',
  defaultCountry: CountryCode = 'AU'
): string {
  try {
    const parsed = parsePhoneNumber(phoneNumber, defaultCountry);
    if (!parsed) return phoneNumber;

    switch (format) {
      case 'international':
        return parsed.formatInternational();
      case 'national':
        return parsed.formatNational();
      case 'e164':
        return parsed.format('E.164');
      default:
        return phoneNumber;
    }
  } catch {
    return phoneNumber;
  }
}
