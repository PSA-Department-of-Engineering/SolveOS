import { apiClient } from "../apiClient";
import type { MetricData } from "../interfaces";

/**
 * Report data interface
 */
export interface ReportData {
    dailyMetrics: MetricData[];
    weeklyMetrics: MetricData[];
    revenueData: RevenueData[];
}

/**
 * Revenue data interface
 */
export interface RevenueData {
    date: string;
    revenue: number;
    orderCount: number;
}

/**
 * Reports API client
 */
export const ReportsClient = {
    /**
     * Fetches dashboard metrics
     */
    async getDashboardMetrics(): Promise<MetricData[]> {
        return apiClient.get<MetricData[]>("/api/reports/dashboard");
    },

    /**
     * Fetches daily report data
     */
    async getDailyReport(date: string): Promise<ReportData> {
        return apiClient.get<ReportData>(`/api/reports/daily?date=${date}`);
    },

    /**
     * Fetches weekly report data
     */
    async getWeeklyReport(startDate: string): Promise<ReportData> {
        return apiClient.get<ReportData>(
            `/api/reports/weekly?start=${startDate}`,
        );
    },

    /**
     * Fetches revenue summary
     */
    async getRevenueSummary(
        startDate: string,
        endDate: string,
    ): Promise<RevenueData[]> {
        return apiClient.get<RevenueData[]>(
            `/api/reports/revenue?start=${startDate}&end=${endDate}`,
        );
    },
};
