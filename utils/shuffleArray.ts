/**
 * Shuffles an array randomly without mutating the original.
 * Uses the Fisher–Yates (Knuth) shuffle algorithm.
 *
 * @template T Type of array elements
 * @param {T[]} array The input array to shuffle
 * @returns {T[]} A new array with the same elements in random order
 *
 * @example
 * const original = [1, 2, 3, 4];
 * const shuffled = shuffleArray(original);
 * // original remains unchanged
 */

export function shuffleArray<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}