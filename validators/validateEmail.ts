/**
 * Regular expression for validating email addresses.
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates if a given string is a valid email address.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} `true` if the email is valid, otherwise `false`.
 */
export function validateEmail(email: string): boolean {
    return emailRegex.test(email);
}