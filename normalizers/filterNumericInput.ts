/**
 * Filters a numeric input string to allow only digits and (optionally) a decimal separator.
 *
 * - Removes all characters except digits, dots (`.`), and commas (`,`).
 * - Converts commas to dots for consistency.
 * - Keeps only the first decimal separator (dot).
 * - Optionally limits the number of decimal places.
 * - If the value starts with a dot, automatically prepends a `0`.
 *
 * @param value - The raw input string to filter.
 * @param options - Optional filtering settings.
 * @param options.allowDecimal - Whether to allow decimal separators. Defaults to `true`.
 * @param options.maxDecimals - Maximum number of digits after the decimal separator (unlimited if omitted).
 * @returns The filtered numeric string.
 *
 * @example
 * filterNumericInput("12,345"); // "12.345"
 * filterNumericInput("12.3456", { maxDecimals: 2 }); // "12.34"
 * filterNumericInput(".5"); // "0.5"
 * filterNumericInput("abc123"); // "123"
 */
export function filterNumericInput(
    value: string,
    options: { allowDecimal?: boolean; maxDecimals?: number } = {},
): string {
    const { allowDecimal = true, maxDecimals } = options;

    // Remove everything except digits, dot, and comma
    let filtered = value.replace(/[^\d.,]/g, "");

    // Normalize commas to dots
    filtered = filtered.replace(/,/g, ".");

    if (!allowDecimal) {
        // Remove all dots if decimals are not allowed
        return filtered.replace(/\./g, "");
    }

    // Keep only the first dot: split and join parts
    const parts = filtered.split(".");
    if (parts.length > 2) {
        filtered = `${parts.shift()}.${parts.join("")}`;
    }

    // Prepend "0" if starting with a dot (".5" → "0.5")
    if (filtered.startsWith(".")) {
        filtered = "0" + filtered;
    }

    // Limit decimal places if specified
    if (maxDecimals != null) {
        const [intPart, decPart] = filtered.split(".");
        if (decPart) {
            filtered = `${intPart}.${decPart.slice(0, maxDecimals)}`;
        }
    }

    return filtered;
}
