import { useState, useEffect } from "react";
import { AuthenticationClient } from "../api/clients/AuthenticationClient";
import type { UserDTO } from "../api/models/UserDTO";
import { config } from "../config/appConfig";
import { ApiError } from "../api/errors/index";

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
                const errorMessage = err instanceof Error
                    ? err.message
                    : "Failed to fetch user";

                setError(errorMessage);
                console.error("Failed to fetch current user:", err);

                // Handle unauthorized access - redirect to login
                if (err instanceof ApiError && err.statusCode === 401) {
                    window.location.href = config.loginPageUrl;
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // authClient is intentionally not in deps to avoid re-fetching

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
