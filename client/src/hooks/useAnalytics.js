import { useQuery } from '@tanstack/react-query';
import {
  getSummary,
  getByCategory,
  getTrends,
} from '../services/analyticsService.js';

export const ANALYTICS_QUERY_KEY = ['analytics'];

/**
 * Hook to fetch financial summary (total income, expenses, balance)
 * @param {Object} filters - Optional date filters (startDate, endDate)
 * @returns {Object} React Query result with summary data
 */
export function useSummary(filters = {}) {
  return useQuery({
    queryKey: [...ANALYTICS_QUERY_KEY, 'summary', filters],
    queryFn: async () => {
      const response = await getSummary(filters);
      return response.data;
    },
  });
}

/**
 * Hook to fetch spending/income breakdown by category
 * @param {Object} filters - Optional date filters (startDate, endDate)
 * @returns {Object} React Query result with category breakdown data
 */
export function useByCategory(filters = {}) {
  return useQuery({
    queryKey: [...ANALYTICS_QUERY_KEY, 'byCategory', filters],
    queryFn: async () => {
      const response = await getByCategory(filters);
      return response.data;
    },
  });
}

/**
 * Hook to fetch monthly trends (income, expenses, net by month)
 * @param {Object} filters - Optional date filters (startDate, endDate)
 * @returns {Object} React Query result with trends data
 */
export function useTrends(filters = {}) {
  return useQuery({
    queryKey: [...ANALYTICS_QUERY_KEY, 'trends', filters],
    queryFn: async () => {
      const response = await getTrends(filters);
      return response.data;
    },
  });
}
