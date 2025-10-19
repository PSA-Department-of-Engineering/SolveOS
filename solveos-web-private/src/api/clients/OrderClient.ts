import { apiClient } from '../apiClient'
import type { Order, CreateOrderRequest, UpdateOrderStatusRequest } from '../interfaces'

/**
 * Order API client
 */
export const OrderClient = {
    /**
     * Fetches all orders
     */
    async getAll(): Promise<Order[]> {
        return apiClient.get<Order[]>('/api/orders')
    },

    /**
     * Fetches a single order by ID
     */
    async getById(id: string): Promise<Order> {
        return apiClient.get<Order>(`/api/orders/${id}`)
    },

    /**
     * Creates a new order
     */
    async create(data: CreateOrderRequest): Promise<Order> {
        return apiClient.post<Order>('/api/orders', data)
    },

    /**
     * Updates order status
     */
    async updateStatus(id: string, data: UpdateOrderStatusRequest): Promise<Order> {
        return apiClient.put<Order>(`/api/orders/${id}/status`, data)
    },

    /**
     * Deletes an order
     */
    async delete(id: string): Promise<void> {
        return apiClient.delete<void>(`/api/orders/${id}`)
    },
}
