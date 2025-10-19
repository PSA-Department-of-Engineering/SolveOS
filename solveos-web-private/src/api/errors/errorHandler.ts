import { ApiError } from "./ApiError";

export async function handleApiError(response: Response, endpoint: string): Promise<never> {
    let message = response.statusText;

    try {
        const data = await response.json();
        message = data.detail || data.message || message;
    } catch (error) {
        console.warn(`Failed to parse error response from ${endpoint}:`, error);
    }

    throw new ApiError(message, response.status, endpoint);
}
