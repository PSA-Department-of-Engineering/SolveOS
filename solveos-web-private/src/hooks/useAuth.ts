import { useState, useEffect } from "react";
import { AuthenticationClient } from "../api/clients/AuthenticationClient";
import type { UserDTO } from "../api/models/UserDTO";

/**
 * Hook to fetch and manage the current authenticated user.
 * Automatically redirects to login page if user is not authenticated.
 */
export function useAuth() {
    const [user, setUser] = useState<UserDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const authClient = new AuthenticationClient();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const userData = await authClient.getCurrentUser();
                setUser(userData);
                setError(null);
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "Failed to fetch user";
                setError(errorMessage);
                console.error("Failed to fetch current user:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    const logout = () => {
        authClient.logout();
    };

    return {
        user,
        loading,
        error,
        logout,
    };
}
