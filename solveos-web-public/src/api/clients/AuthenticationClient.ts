import type { IAuthenticationClient } from '../interfaces';
import type { LoginResponseDTO } from '../models/LoginResponseDTO';
import type { UserDTO } from '../models/UserDTO';

export class AuthenticationClient implements IAuthenticationClient {
    private readonly baseUrl: string;
    private readonly loginEndpoint: string;
    private readonly meEndpoint: string;

    constructor(
        baseUrl?: string,
        loginEndpoint: string = '/api/v1/auth/login',
        meEndpoint: string = '/api/v1/auth/me'
    ) {
        this.baseUrl = baseUrl || import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
        this.loginEndpoint = loginEndpoint;
        this.meEndpoint = meEndpoint;
    }

    async login(email: string, password: string): Promise<LoginResponseDTO> {
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);
        formData.append('grant_type', 'password');

        const response = await fetch(`${this.baseUrl}${this.loginEndpoint}`, {
            method: 'POST',
            credentials: 'include', // Important: Include cookies for HttpOnly cookie
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ detail: 'Authentication failed' }));
            throw new Error(error.detail || 'Authentication failed');
        }

        return response.json();
    }

    async getCurrentUser(): Promise<UserDTO> {
        const response = await fetch(`${this.baseUrl}${this.meEndpoint}`, {
            method: 'GET',
            credentials: 'include', // Important: Include cookies for authentication
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ detail: 'Failed to fetch user' }));
            throw new Error(error.detail || 'Failed to fetch user information');
        }

        return response.json();
    }
}
