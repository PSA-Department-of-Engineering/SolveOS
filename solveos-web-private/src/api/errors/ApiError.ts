export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly endpoint: string;

    constructor(message: string, statusCode: number, endpoint: string) {
        super(message);
        this.name = "ApiError";
        this.statusCode = statusCode;
        this.endpoint = endpoint;
    }
}
