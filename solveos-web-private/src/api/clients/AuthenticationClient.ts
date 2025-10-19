import { config } from "../../config/appConfig";
import type { UserDTO } from "../models/UserDTO";

/**
 * Authentication client for the private/authenticated application
 */
export class AuthenticationClient {
    private readonly baseUrl: string;
    private readonly meEndpoint: string;

    constructor(baseUrl?: string, meEndpoint?: string) {
        this.baseUrl = baseUrl || config.apiBaseUrl;
        this.meEndpoint = meEndpoint || config.authMeEndpoint;
    }

    /**
     * Retrieves information about the currently authenticated user.
     * Uses HttpOnly cookie for authentication.
     * @returns Promise resolving to user information
     * @throws Error if user is not authenticated or request fails
     */
    async getCurrentUser(): Promise<UserDTO> {
        const response = await fetch(`${this.baseUrl}${this.meEndpoint}`, {
            method: "GET",
            credentials: "include", // CRITICAL: Include cookies for authentication
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                // User is not authenticated - redirect to login
                console.error("Not authenticated, redirecting to login...");
                window.location.href = config.loginPageUrl;
                throw new Error("Authentication required");
            }
            const error = await response
                .json()
                .catch(() => ({ detail: "Failed to fetch user" }));
            throw new Error(error.detail || "Failed to fetch user information");
        }

        return response.json();
    }

    /**
     * Logs out the current user.
     * Note: Should be combined with a backend logout endpoint to clear the HttpOnly cookie.
     * Currently just redirects to login page.
     */
    logout(): void {
        window.location.href = config.loginPageUrl;
    }
}
