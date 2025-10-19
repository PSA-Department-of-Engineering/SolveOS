/**
 * Order status types
 */
export type OrderStatus = 'RECEIVED' | 'IN_PROGRESS' | 'READY' | 'DELIVERED'

/**
 * Service status types
 */
export type ServiceStatus = 'RECEIVED' | 'IN_PROGRESS' | 'READY' | 'DELIVERED'

/**
 * Order interface
 */
export interface Order {
    id: string
    customerId: string
    customerName: string
    status: OrderStatus
    totalPrice: number
    createdAt: string
    updatedAt: string
    items: OrderItem[]
}

/**
 * Order item interface
 */
export interface OrderItem {
    id: string
    orderId: string
    name: string
    status: ServiceStatus
    services: Service[]
    totalPrice: number
}

/**
 * Service interface
 */
export interface Service {
    id: string
    name: string
    price: number
    duration: number
}

/**
 * Customer interface
 */
export interface Customer {
    id: string
    name: string
    nif: string
    phone: string
    email: string
    notes?: string
    createdAt: string
}

/**
 * Create order request
 */
export interface CreateOrderRequest {
    customerId: string
    items: CreateOrderItemRequest[]
}

/**
 * Create order item request
 */
export interface CreateOrderItemRequest {
    name: string
    serviceIds: string[]
}

/**
 * Update order status request
 */
export interface UpdateOrderStatusRequest {
    status: OrderStatus
}

/**
 * Metric data interface
 */
export interface MetricData {
    label: string
    value: number
    change?: number
}
