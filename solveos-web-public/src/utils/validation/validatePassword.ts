export function validatePassword(password: string): string {
    if (!password) {
        return ''
    }

    if (password.length < 8) {
        return 'Password must be at least 8 characters'
    }

    return ''
}
