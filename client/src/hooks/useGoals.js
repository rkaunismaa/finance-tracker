import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal,
} from '../services/goalsService.js';

export const GOALS_QUERY_KEY = ['goals'];

/**
 * Hook to fetch all goals with optional status filter
 * @param {Object} filters - Optional filters (status: 'active' | 'completed' | 'archived')
 * @returns {Object} React Query result with goals data
 */
export function useGoals(filters = {}) {
  return useQuery({
    queryKey: [...GOALS_QUERY_KEY, filters],
    queryFn: async () => {
      const response = await getGoals(filters);
      return response.data;
    },
  });
}

/**
 * Hook to fetch a single goal by ID
 * @param {number} id - Goal ID
 * @returns {Object} React Query result with goal data
 */
export function useGoal(id) {
  return useQuery({
    queryKey: [...GOALS_QUERY_KEY, id],
    queryFn: async () => {
      const response = await getGoal(id);
      return response.data;
    },
    enabled: !!id,
  });
}

/**
 * Hook to create a new savings goal
 * @returns {Object} React Query mutation result
 */
export function useCreateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
    },
  });
}

/**
 * Hook to update an existing goal
 * @returns {Object} React Query mutation result
 */
export function useUpdateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateGoal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
    },
  });
}

/**
 * Hook to delete a goal
 * @returns {Object} React Query mutation result
 */
export function useDeleteGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
    },
  });
}

/**
 * Calculate progress percentage for a goal
 * @param {Object} goal - Goal object
 * @returns {number} Progress percentage (0-100)
 */
export function calculateGoalProgress(goal) {
  if (!goal || !goal.target_amount) return 0;
  const progress = (goal.current_amount / goal.target_amount) * 100;
  return Math.min(Math.round(progress), 100);
}
