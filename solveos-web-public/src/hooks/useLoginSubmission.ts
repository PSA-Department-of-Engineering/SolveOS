import { useState } from 'react';
import { AuthenticationClient } from '../api';
import { tokenStorage } from '../utils/tokenStorage';
import { config } from '../config/appConfig';

export function useLoginSubmission() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const authClient = new AuthenticationClient(config.apiBaseUrl, config.authTokenEndpoint);

    const handleLogin = async (email: string, password: string) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await authClient.login(email, password);

            // Store tokens
            tokenStorage.setAccessToken(response.access_token);
            if (response.refresh_token) {
                tokenStorage.setRefreshToken(response.refresh_token);
            }

            console.log('Login successful:', response.user?.email);

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
