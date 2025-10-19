import type { LoginResponseDTO } from './models/LoginResponseDTO';
import type { UserDTO } from './models/UserDTO';

export interface IAuthenticationClient {
    /**
     * Authenticates a user with email and password.
     * @param email - User's email address
     * @param password - User's password
     * @returns Promise resolving to authentication response
     */
    login(email: string, password: string): Promise<LoginResponseDTO>;

    /**
     * Retrieves information about the currently authenticated user.
     * @returns Promise resolving to user information
     */
    getCurrentUser(): Promise<UserDTO>;
}
