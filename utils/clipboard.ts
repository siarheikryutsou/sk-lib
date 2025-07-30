/**
 * Checks if the Clipboard API is supported in the current environment.
 *
 * @returns {boolean} True if supported, false otherwise.
 */
export function isClipboardSupported(): boolean {
    return !!navigator?.clipboard;
}

/**
 * Copies the given value to the clipboard using the Clipboard API.
 *
 * @async
 * @param {string | number} value - The value to copy.
 * @returns {Promise<boolean>} Resolves to true if successful, false otherwise.
 * @example
 * await copyToClipboard("Hello world");
 */
export async function copyToClipboard(value: string | number): Promise<boolean> {
    if (!isClipboardSupported()) {
        console.warn("Clipboard API is not available.");
        return false;
    }

    try {
        await navigator.clipboard.writeText(value.toString());
        return true;
    } catch (error) {
        console.error("Copy to clipboard error:", error);
        return false;
    }
}

/**
 * Reads text from the clipboard using the Clipboard API.
 *
 * @async
 * @returns {Promise<string | null>} Resolves to the clipboard contents if successful, or null if not.
 * @example
 * const text = await pasteFromClipboard();
 * console.log(text);
 */
export async function pasteFromClipboard(): Promise<string | null> {
    if (!isClipboardSupported()) {
        console.warn("Clipboard API is not available.");
        return null;
    }

    try {
        return await navigator.clipboard.readText();
    } catch (error) {
        console.error("Paste from clipboard error:", error);
        return null;
    }
}