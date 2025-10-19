export interface LoginRequestDTO {
    /**
     * User's email address (used as username in OAuth2 flow).
     */
    username: string;

    /**
     * User's password.
     */
    password: string;

    /**
     * OAuth2 grant type. Defaults to "password" for password flow.
     */
    grant_type?: string;

    /**
     * OAuth2 scope. Optional space-separated list of scopes.
     */
    scope?: string;

    /**
     * OAuth2 client ID. Optional.
     */
    client_id?: string;

    /**
     * OAuth2 client secret. Optional.
     */
    client_secret?: string;
}
