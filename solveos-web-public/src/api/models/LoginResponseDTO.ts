import type { UserDTO } from './UserDTO';

export interface LoginResponseDTO {
    /**
     * JWT access token for authenticating subsequent requests.
     */
    access_token: string;

    /**
     * Token type, typically "bearer" for JWT tokens.
     */
    token_type: string;

    /**
     * Refresh token for obtaining new access tokens.
     */
    refresh_token?: string;

    /**
     * Token expiration time in seconds.
     */
    expires_in?: number;

    /**
     * User information associated with the authenticated session.
     */
    user?: UserDTO;
}
