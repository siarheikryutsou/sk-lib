/**
 * Removes all characters except a single leading plus (+) and digits.
 * If multiple plus signs are present, keeps only the first one (if at the start).
 *
 * @param raw - Raw input string to normalize.
 * @returns A string containing only digits and at most one leading '+'.
 *
 * @example
 * normalizePhoneInput("++12 34-56") // "+123456"
 * normalizePhoneInput("00 123 456") // "00123456"
 */
function normalizePhoneInput(raw: string): string {
    const s = (raw ?? "").trim().replace(/[^\d+]/g, "");
    return s.replace(/(?!^)\+/g, "");
}

/**
 * Converts common international dialing prefix (00) to '+'.
 * Leaves other formats untouched.
 *
 * @param raw - Raw phone string.
 * @returns Normalized candidate string, still requires validation.
 *
 * @example
 * toE164Candidate("003412345678") // "+3412345678"
 * toE164Candidate("+3412345678") // "+3412345678"
 */
function toE164Candidate(raw: string): string {
    const s = normalizePhoneInput(raw);
    if (s.startsWith("00")) return "+" + s.slice(2);
    return s;
}

/**
 * Checks if the given phone string strictly matches E.164 format.
 *
 * E.164 format rules:
 * - Must start with '+'
 * - Must be followed by 8–15 digits
 * - First digit after '+' must be 1–9
 *
 * @param phone - Phone number string to check.
 * @returns True if valid E.164, false otherwise.
 */
function isE164(phone: string): boolean {
    return /^\+[1-9]\d{7,14}$/.test(phone);
}

/**
 * Checks if the number of digits in a string falls within the given range.
 * Ignores any non-digit characters.
 *
 * @param raw - Raw phone string.
 * @param min - Minimum allowed digits (default 6).
 * @param max - Maximum allowed digits (default 15).
 * @returns True if digit count is within range, false otherwise.
 */
function hasDigitsInRange(raw: string, min = 6, max = 15): boolean {
    const onlyDigits = (raw ?? "").replace(/\D/g, "");
    return onlyDigits.length >= min && onlyDigits.length <= max;
}

function normalizeInput(value: string): string {
    return (value ?? "").trim();
}

/**
 * Validates a phone number string using either strict E.164 format or a loose digit-count check.
 *
 * @param value - Phone number to validate.
 * @param format - Validation mode: `"e164"` (strict) or `"loose"` (digit count only).
 * @param allowEmpty - Whether empty/whitespace strings should be considered valid (default true).
 * @param looseRange - Optional { min, max } for `"loose"` format (defaults: min=6, max=15).
 * @returns True if valid according to chosen format, false otherwise.
 *
 * @example
 * validatePhone("+34123456789") // true
 * validatePhone("0034123456789") // true
 * validatePhone("12345", "loose") // false
 */
export function validatePhone(
    value: string,
    format: "e164" | "loose" = "e164",
    allowEmpty: boolean = true,
    looseRange?: { min?: number; max?: number }
): boolean {
    const input = normalizeInput(value);
    if (!input) return allowEmpty;

    if (format === "loose") {
        const min = Math.max(0, looseRange?.min ?? 6);
        const max = Math.max(min, looseRange?.max ?? 15);
        return hasDigitsInRange(input, min, max);
    }

    // e164
    const candidate = toE164Candidate(input);
    return isE164(candidate);
}

/**
 * Attempts to normalize a phone number to E.164 format.
 *
 * @param value - Phone number to normalize.
 * @returns E.164 formatted string if valid, otherwise null.
 *
 * @example
 * toE164OrNull("0034123456789") // "+34123456789"
 * toE164OrNull("+34123456789") // "+34123456789"
 * toE164OrNull("12345") // null
 */
export function toE164OrNull(value: string): string | null {
    const input = normalizeInput(value);
    if (!input) return null;
    const candidate = toE164Candidate(input);
    return isE164(candidate) ? candidate : null;
}