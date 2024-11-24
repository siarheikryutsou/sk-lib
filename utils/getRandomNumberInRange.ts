/**
 * Generates a random number within the specified range.
 * @param min - The lower boundary of the range.
 * @param max - The upper boundary of the range.
 * @param roundMethod - Optional function to round the result (e.g., Math.round, Math.floor, Math.ceil).
 * @returns A random number within the range [min, max].
 */

export function getRandomNumberInRange(min: number, max: number, roundMethod?: (value: number) => number): number {
    if (min > max) {
        throw new Error("min must be less than or equal to max");
    }

    if (min === max) return min;

    const result = Math.random() * (max - min) + min;
    return typeof roundMethod === "function" ? roundMethod(result) : result;
}