export const config = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    authLoginEndpoint: import.meta.env.VITE_AUTH_LOGIN_ENDPOINT,
    authMeEndpoint: import.meta.env.VITE_AUTH_ME_ENDPOINT,
    redirectAfterLogin: import.meta.env.VITE_REDIRECT_AFTER_LOGIN,
} as const;
