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
     * Authentication token endpoint
     */
    authTokenEndpoint: import.meta.env.VITE_AUTH_TOKEN_ENDPOINT || '/api/auth/token',

    /**
     * Redirect URL after successful login.
     * Use different port for authenticated app.
     */
    redirectAfterLogin: import.meta.env.VITE_REDIRECT_AFTER_LOGIN || 'http://localhost:3000',
} as const;
