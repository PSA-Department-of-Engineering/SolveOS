export const config = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    authMeEndpoint: import.meta.env.VITE_AUTH_ME_ENDPOINT,
    loginPageUrl: import.meta.env.VITE_LOGIN_PAGE_URL,
} as const;
