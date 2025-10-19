import type { IAuthenticationClient } from '../interfaces';
import type { LoginRequestDTO } from '../models/LoginRequestDTO';
import type { LoginResponseDTO } from '../models/LoginResponseDTO';

export class AuthenticationClient implements IAuthenticationClient {
    private readonly baseUrl: string;
    private readonly tokenEndpoint: string;

    constructor(baseUrl?: string, tokenEndpoint: string = '/api/auth/token') {
        this.baseUrl = baseUrl || import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
        this.tokenEndpoint = tokenEndpoint;
    }

    async login(email: string, password: string): Promise<LoginResponseDTO> {
        const requestData: LoginRequestDTO = {
            username: email,
            password: password,
            grant_type: 'password',
        };

        const response = await fetch(`${this.baseUrl}${this.tokenEndpoint}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ detail: 'Authentication failed' }));
            throw new Error(error.detail || 'Authentication failed');
        }

        return response.json();
    }
}
