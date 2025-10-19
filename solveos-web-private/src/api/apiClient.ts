import { config } from "../config/appConfig";
import { handleApiError } from "./errors";

export interface ApiClientConfig {
    baseUrl: string;
    headers?: Record<string, string>;
}

export function getHeaders(): Record<string, string> {
    return {
        "Content-Type": "application/json",
    };
}

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
            // Handle 401 Unauthorized - redirect to login before throwing
            if (response.status === 401) {
                console.error("Authentication failed, redirecting to login...");
                window.location.href = config.loginPageUrl;
            }
            // Throws proper error type based on status code
            await handleApiError(response, endpoint);
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
