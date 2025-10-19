import { useState, useEffect } from 'react';
import { AuthenticationClient } from '../api';
import { config } from '../config/appConfig';
import type { UserDTO } from '../api';

export function useCurrentUser() {
    const [user, setUser] = useState<UserDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const authClient = new AuthenticationClient(
        config.apiBaseUrl,
        config.authLoginEndpoint,
        config.authMeEndpoint
    );

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const userData = await authClient.getCurrentUser();
                setUser(userData);
                setError(null);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user';
                setError(errorMessage);
                console.error('Failed to fetch current user:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    return {
        user,
        loading,
        error,
    };
}
