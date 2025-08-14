/**
 * Validates if a string is a well-formed URL and (optionally) checks its protocol.
 *
 * - Accepts allowed protocols without colon (e.g., "https", "http") or with it ("https:", "http:").
 * - Comparison is case-insensitive.
 * - If `validProtocols` is not provided or empty, any protocol is allowed.
 *
 * @param {string} urlString - The URL string to validate.
 * @param {(string | `${string}:`)[]=} [validProtocols] - Optional list of allowed protocols.
 * @returns {boolean} `true` if the URL is valid and matches allowed protocols (if specified), otherwise `false`.
 */

export function validateURL(urlString: string, validProtocols?: (string | `${string}:`)[]): boolean {
    const input = urlString?.trim();
    if (!input) return false;

    try {
        const url = new URL(input);

        if (!Array.isArray(validProtocols) || !validProtocols.length) return true;

        const allowed = new Set(
            validProtocols.map(p => {
                const lower = p.toLowerCase();
                return lower.endsWith(":") ? lower : `${lower}:`;
            }),
        );

        return allowed.has(url.protocol.toLowerCase());
    } catch {
        return false;
    }
}
