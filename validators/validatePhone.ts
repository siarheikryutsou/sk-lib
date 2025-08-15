/**
 * Keeps only a single leading plus and digits. Removes any other characters.
 * Collapses any '+' that are not the very first character.
 */
function normalizePhoneInput(raw: string): string {
    const s = (raw ?? "").trim().replace(/[^\d+]/g, "");
    return s.replace(/(?!^)\+/g, "");
}

/**
 * Converts common international prefix to '+'.
 * - If the string starts with '00', replaces it with '+'.
 * Returns a normalized candidate; still must be validated.
 */
function toE164Candidate(raw: string): string {
    const s = normalizePhoneInput(raw);
    if (s.startsWith("00")) return "+" + s.slice(2);
    return s;
}

/**
 * Strict E.164 validation.
 * Must be: '+' followed by 8..15 digits, first digit 1..9.
 */
function isE164(phone: string): boolean {
    return /^\+[1-9]\d{7,14}$/.test(phone);
}

/**
 * Loose digit-count check ignoring any separators.
 * Returns true if the total digits count is within the range.
 */
function hasDigitsInRange(raw: string, min = 6, max = 15): boolean {
    const onlyDigits = (raw ?? "").replace(/\D/g, "");
    return onlyDigits.length >= min && onlyDigits.length <= max;
}

function normalizeInput(value: string): string {
    return (value ?? "").trim();
}


/**
 * Validates a phone string with optional format and empty-handling.
 *
 * - When format is 'e164', the value is normalized (00 -> '+') and checked strictly.
 * - When format is 'loose', common separators are allowed; only digits count is checked.
 * - If allowEmpty is true and the input is empty/whitespace, returns true.
 */
export function validatePhone(value: string, format: "e164" | "loose" = "e164", allowEmpty: boolean = true, looseRange?: { min?: number; max?: number }): boolean {
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

export function toE164OrNull(value: string): string | null {
    const input = normalizeInput(value);
    if (!input) return null;
    const candidate = toE164Candidate(input);
    return isE164(candidate) ? candidate : null;
}