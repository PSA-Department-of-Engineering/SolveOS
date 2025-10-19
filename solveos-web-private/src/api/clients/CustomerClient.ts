import { apiClient } from "../apiClient";
import type { Customer } from "../interfaces";

/**
 * Create customer request
 */
export interface CreateCustomerRequest {
    name: string;
    nif: string;
    phone: string;
    email: string;
    notes?: string;
}

/**
 * Update customer request
 */
export interface UpdateCustomerRequest {
    name?: string;
    nif?: string;
    phone?: string;
    email?: string;
    notes?: string;
}

/**
 * Customer API client
 */
export const CustomerClient = {
    /**
     * Fetches all customers
     */
    async getAll(): Promise<Customer[]> {
        return apiClient.get<Customer[]>("/api/customers");
    },

    /**
     * Fetches a single customer by ID
     */
    async getById(id: string): Promise<Customer> {
        return apiClient.get<Customer>(`/api/customers/${id}`);
    },

    /**
     * Searches customers by query
     */
    async search(query: string): Promise<Customer[]> {
        return apiClient.get<Customer[]>(
            `/api/customers/search?q=${encodeURIComponent(query)}`,
        );
    },

    /**
     * Creates a new customer
     */
    async create(data: CreateCustomerRequest): Promise<Customer> {
        return apiClient.post<Customer>("/api/customers", data);
    },

    /**
     * Updates a customer
     */
    async update(id: string, data: UpdateCustomerRequest): Promise<Customer> {
        return apiClient.put<Customer>(`/api/customers/${id}`, data);
    },

    /**
     * Soft deletes a customer (anonymizes data)
     */
    async delete(id: string): Promise<void> {
        return apiClient.delete<void>(`/api/customers/${id}`);
    },
};
