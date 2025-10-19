import { config } from '../config/appConfig'

/**
 * Stores authentication token in localStorage
 */
export function setAuthToken(token: string): void {
    localStorage.setItem(config.authTokenKey, token)
}

/**
 * Retrieves authentication token from localStorage
 */
export function getAuthToken(): string | null {
    return localStorage.getItem(config.authTokenKey)
}

/**
 * Removes authentication token from localStorage
 */
export function clearAuthToken(): void {
    localStorage.removeItem(config.authTokenKey)
}

/**
 * Checks if user is authenticated
 */
export function isAuthenticated(): boolean {
    return getAuthToken() !== null
}
