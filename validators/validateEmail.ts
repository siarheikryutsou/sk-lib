/**
 * Validates if a given string is a valid email address.
 *
 * The function uses a basic regular expression to check if the input string
 * follows the general structure of an email: `something@something.something`.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} `true` if the email is valid, otherwise `false`.
 */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): boolean {
    return emailRegex.test(email);
}