/**
 * Application configuration.
 * Configure via environment variables.
 */
export const config = {
    /**
     * FastAPI backend base URL
     */
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",

    /**
     * Get current user endpoint
     */
    authMeEndpoint: import.meta.env.VITE_AUTH_ME_ENDPOINT || "/api/v1/auth/me",

    /**
     * Login page URL (public app)
     */
    loginPageUrl:
        import.meta.env.VITE_LOGIN_PAGE_URL || "http://localhost:5173",
} as const;
