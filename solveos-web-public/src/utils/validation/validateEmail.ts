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
