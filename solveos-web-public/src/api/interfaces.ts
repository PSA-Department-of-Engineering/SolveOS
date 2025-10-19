import type { LoginResponseDTO } from './models/LoginResponseDTO';
import type { UserDTO } from './models/UserDTO';

export interface IAuthenticationClient {
    login(email: string, password: string): Promise<LoginResponseDTO>;
    getCurrentUser(): Promise<UserDTO>;
}
