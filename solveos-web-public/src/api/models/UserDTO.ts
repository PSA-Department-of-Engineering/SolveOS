export interface UserDTO {
    /**
     * Unique user identifier.
     */
    id: string;

    /**
     * User's email address.
     */
    email: string;

    /**
     * User's full name.
     */
    name?: string;

    /**
     * User's first name.
     */
    first_name?: string;

    /**
     * User's last name.
     */
    last_name?: string;

    /**
     * User's role or permission level.
     */
    role?: string;

    /**
     * Whether the user's email is verified.
     */
    is_verified?: boolean;

    /**
     * Whether the user account is active.
     */
    is_active?: boolean;

    /**
     * Timestamp of user creation.
     */
    created_at?: string;
}
