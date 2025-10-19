import { useMemo } from 'react'
import { validateEmail } from '../utils/validation/validateEmail'
import { validatePassword } from '../utils/validation/validatePassword'

/**
 * Hook for managing login form validation state.
 * Returns validation errors and overall form validity.
 */
export function useLoginFormValidation(email: string, password: string) {
    const emailError = useMemo(() => validateEmail(email), [email])
    const passwordError = useMemo(() => validatePassword(password), [password])

    const isFormValid = !emailError && !passwordError && email.length > 0 && password.length > 0

    return {
        emailError,
        passwordError,
        isFormValid,
    }
}
