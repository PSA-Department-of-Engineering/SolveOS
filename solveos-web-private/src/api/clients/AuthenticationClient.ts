import { config } from "../../config/appConfig";
import type { UserDTO } from "../models/UserDTO";
import { handleApiError } from "../errors";

export class AuthenticationClient {
    private readonly baseUrl: string;
    private readonly meEndpoint: string;

    constructor(baseUrl?: string, meEndpoint?: string) {
        this.baseUrl = baseUrl || config.apiBaseUrl;
        this.meEndpoint = meEndpoint || config.authMeEndpoint;
    }

    async getCurrentUser(): Promise<UserDTO> {
        const response = await fetch(`${this.baseUrl}${this.meEndpoint}`, {
            method: "GET",
            credentials: "include", // CRITICAL: Include cookies for authentication
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            await handleApiError(response, this.meEndpoint);
        }

        return response.json();
    }

    // TODO: Currently just redirects to login page, missing logout implementation
    logout(): void {
        window.location.href = config.loginPageUrl;
    }
}
