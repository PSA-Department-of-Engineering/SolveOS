export function validatePassword(password: string): string {
    if (!password) {
        return ''
    }

    if (password.length < 4) {
        return 'Password must be at least 4 characters'
    }

    return ''
}
