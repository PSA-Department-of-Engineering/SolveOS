import { config } from '../config/appConfig'
import { getAuthToken } from '../utils/tokenStorage'

/**
 * Base API client configuration
 */
export interface ApiClientConfig {
    baseUrl: string
    headers?: Record<string, string>
}

/**
 * Creates authenticated headers for API requests
 */
export function getAuthHeaders(): Record<string, string> {
    const token = getAuthToken()
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    }
}

/**
 * Base API client
 */
export const apiClient = {
    baseUrl: config.apiBaseUrl,
    
    async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`
        const response = await fetch(url, {
            ...options,
            headers: {
                ...getAuthHeaders(),
                ...options.headers,
            },
        })

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`)
        }

        return response.json()
    },

    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET' })
    },

    async post<T>(endpoint: string, data: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    },

    async put<T>(endpoint: string, data: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    },

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' })
    },
}
