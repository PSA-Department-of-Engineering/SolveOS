/**
 * Validates an email address format.
 * Returns an error message if invalid, empty string if valid.
 */
export function validateEmail(email: string): string {
    if (!email) {
        return ''
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address'
    }

    return ''
}
