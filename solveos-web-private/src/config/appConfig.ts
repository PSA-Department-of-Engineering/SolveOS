/**
 * Application configuration.
 * Configure via environment variables.
 */
export const config = {
    /**
     * FastAPI backend base URL
     */
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',

    /**
     * Authentication token storage key
     */
    authTokenKey: import.meta.env.VITE_AUTH_TOKEN_KEY || 'solveos_auth_token',

    /**
     * Login page URL (public app)
     */
    loginPageUrl: import.meta.env.VITE_LOGIN_PAGE_URL || 'http://localhost:5173',
} as const
