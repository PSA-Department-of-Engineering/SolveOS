/**
 * Token storage utility using browser's localStorage.
 * Manages authentication tokens for the application.
 */
export class TokenStorage {
    private readonly accessTokenKey = 'solveos_access_token';
    private readonly refreshTokenKey = 'solveos_refresh_token';

    setAccessToken(token: string): void {
        localStorage.setItem(this.accessTokenKey, token);
    }

    getAccessToken(): string | null {
        return localStorage.getItem(this.accessTokenKey);
    }

    setRefreshToken(token: string): void {
        localStorage.setItem(this.refreshTokenKey, token);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(this.refreshTokenKey);
    }

    clearTokens(): void {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
    }

    hasToken(): boolean {
        return this.getAccessToken() !== null;
    }
}

export const tokenStorage = new TokenStorage();
