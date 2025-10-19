export interface LoginResponseDTO {
    /**
     * JWT access token for authenticating subsequent requests.
     */
    access_token: string;

    /**
     * Token type, typically "bearer" for JWT tokens.
     */
    token_type: string;
}
