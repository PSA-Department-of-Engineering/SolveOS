import { useState } from 'react'
import { authenticateUser } from '../services/authentication/authenticateUser'

/**
 * Hook for managing login form submission.
 * Handles authentication API calls and loading state.
 */
export function useLoginSubmission() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleLogin = async (email: string, password: string) => {
        setIsSubmitting(true)
        try {
            await authenticateUser(email, password)
            // TODO: Handle successful login (redirect, store token, etc.)
            console.log('Login successful')
        } catch (error) {
            // TODO: Handle login error (show error message)
            console.error('Login failed:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        isSubmitting,
        handleLogin,
    }
}
