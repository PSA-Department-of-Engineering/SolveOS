import { apiClient } from "../apiClient";
import type { Service } from "../interfaces";

/**
 * Create service request
 */
export interface CreateServiceRequest {
    name: string;
    price: number;
    duration: number;
}

/**
 * Update service request
 */
export interface UpdateServiceRequest {
    name?: string;
    price?: number;
    duration?: number;
}

/**
 * Service API client
 */
export const ServiceClient = {
    /**
     * Fetches all services
     */
    async getAll(): Promise<Service[]> {
        return apiClient.get<Service[]>("/api/services");
    },

    /**
     * Fetches a single service by ID
     */
    async getById(id: string): Promise<Service> {
        return apiClient.get<Service>(`/api/services/${id}`);
    },

    /**
     * Creates a new service
     */
    async create(data: CreateServiceRequest): Promise<Service> {
        return apiClient.post<Service>("/api/services", data);
    },

    /**
     * Updates a service
     */
    async update(id: string, data: UpdateServiceRequest): Promise<Service> {
        return apiClient.put<Service>(`/api/services/${id}`, data);
    },

    /**
     * Deletes a service
     */
    async delete(id: string): Promise<void> {
        return apiClient.delete<void>(`/api/services/${id}`);
    },
};
