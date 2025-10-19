/**
 * User response DTO matching the backend UserResponseDTO schema.
 */
export interface UserDTO {
    /**
     * User's email address.
     */
    email: string;

    /**
     * User's full name.
     */
    full_name?: string | null;

    /**
     * Whether the user account is disabled.
     */
    disabled: boolean;
}
