/**
 * Returns a random UUID if available via `crypto.randomUUID()`,
 * otherwise falls back to a simple random string.
 *
 * Uses lazy initialization to select the appropriate method only once.
 *
 * @returns {string} A UUID v4-like string or a fallback pseudo-random string.
 *
 * @example
 * const uuid = getRandomUUID(); // "e7f42cabc" or "cfed45e1-..."
 */

let method: () => string;

export const getRandomUUID = () => {
  if (!method) {
    method = typeof crypto.randomUUID === "function" ? crypto.randomUUID.bind(crypto) : () => Math.random().toString(36).substring(2, 11);
  }
  return method();
};