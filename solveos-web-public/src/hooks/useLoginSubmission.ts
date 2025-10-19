import { useState } from 'react';
import { AuthenticationClient } from '../api';
import { config } from '../config/appConfig';

export function useLoginSubmission() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const authClient = new AuthenticationClient(
        config.apiBaseUrl,
        config.authLoginEndpoint,
        config.authMeEndpoint
    );

    const handleLogin = async (email: string, password: string) => {
        setIsSubmitting(true);
        setError(null);

        try {
            await authClient.login(email, password);

            // Authentication is handled via HttpOnly cookie set by the backend
            console.log('Login successful, redirecting...');

            // Redirect to authenticated application
            window.location.href = config.redirectAfterLogin;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed';
            setError(errorMessage);
            console.error('Login failed:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        isSubmitting,
        error,
        handleLogin,
    };
}
