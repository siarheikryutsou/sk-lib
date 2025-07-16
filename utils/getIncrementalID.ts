/**
 * Generates a unique incremental string-based ID prefixed with "iid-".
 *
 * Useful for cases where you need predictable, unique IDs within the current runtime.
 *
 * @returns {string} A unique incremental ID, e.g., "iid-1", "iid-2", etc.
 *
 * @example
 * const id = getIncrementalID(); // "iid-3"
 */

let currentIncrementalID:number = 0;

export const getIncrementalID = (): string => {
    return "iid-" + (++currentIncrementalID);
}