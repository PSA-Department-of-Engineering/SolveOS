import { config } from "../config/appConfig";

/**
 * Base API client configuration
 */
export interface ApiClientConfig {
    baseUrl: string;
    headers?: Record<string, string>;
}

/**
 * Creates headers for API requests
 * Authentication is handled via HttpOnly cookie (solveos_token)
 */
export function getHeaders(): Record<string, string> {
    return {
        "Content-Type": "application/json",
    };
}

/**
 * Base API client
 * IMPORTANT: Uses credentials: 'include' to send HttpOnly cookies
 */
export const apiClient = {
    baseUrl: config.apiBaseUrl,

    async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const response = await fetch(url, {
            ...options,
            credentials: "include", // CRITICAL: Include cookies for authentication
            headers: {
                ...getHeaders(),
                ...options.headers,
            },
        });

        if (!response.ok) {
            // Handle 401 Unauthorized - redirect to login
            if (response.status === 401) {
                console.error("Authentication failed, redirecting to login...");
                window.location.href = config.loginPageUrl;
                throw new Error("Authentication required");
            }
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    },

    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: "GET" });
    },

    async post<T>(endpoint: string, data: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    async put<T>(endpoint: string, data: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: "PUT",
            body: JSON.stringify(data),
        });
    },

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: "DELETE" });
    },
};
