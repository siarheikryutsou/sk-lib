/**
 * Removes a trailing decimal separator (dot or comma) from a numeric string.
 *
 * @param value - Numeric string to process
 * @returns String without trailing decimal separator
 */

export function removeTrailingDecimal(value: string): string {
    return value.replace(/[.,]$/, "");
}