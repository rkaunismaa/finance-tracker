import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../services/transactionsService.js';

export const TRANSACTIONS_QUERY_KEY = ['transactions'];

/**
 * Hook to fetch transactions with optional filters
 * @param {Object} filters - Optional filters (type, category_id, startDate, endDate, limit, offset)
 * @returns {Object} React Query result with transactions data
 */
export function useTransactions(filters = {}) {
  return useQuery({
    queryKey: [...TRANSACTIONS_QUERY_KEY, filters],
    queryFn: async () => {
      const response = await getTransactions(filters);
      return response.data;
    },
  });
}

/**
 * Hook to fetch a single transaction by ID
 * @param {number} id - Transaction ID
 * @returns {Object} React Query result with transaction data
 */
export function useTransaction(id) {
  return useQuery({
    queryKey: [...TRANSACTIONS_QUERY_KEY, id],
    queryFn: async () => {
      const response = await getTransaction(id);
      return response.data;
    },
    enabled: !!id,
  });
}

/**
 * Hook to create a new transaction
 * @returns {Object} React Query mutation result
 */
export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}

/**
 * Hook to update an existing transaction
 * @returns {Object} React Query mutation result
 */
export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}

/**
 * Hook to delete a transaction
 * @returns {Object} React Query mutation result
 */
export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}
