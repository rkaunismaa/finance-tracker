import { useQuery } from '@tanstack/react-query';
import { getCategories, getCategory } from '../services/categoriesService.js';

export const CATEGORIES_QUERY_KEY = ['categories'];

/**
 * Hook to fetch all categories
 * @returns {Object} React Query result with categories data
 */
export function useCategories() {
  return useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: async () => {
      const response = await getCategories();
      return response.data;
    },
  });
}

/**
 * Hook to fetch a single category by ID
 * @param {number} id - Category ID
 * @returns {Object} React Query result with category data
 */
export function useCategory(id) {
  return useQuery({
    queryKey: [...CATEGORIES_QUERY_KEY, id],
    queryFn: async () => {
      const response = await getCategory(id);
      return response.data;
    },
    enabled: !!id,
  });
}

/**
 * Helper to get categories filtered by type
 * @param {Array} categories - All categories
 * @param {string} type - 'income' or 'expense'
 * @returns {Array} Filtered categories
 */
export function filterCategoriesByType(categories, type) {
  if (!categories) return [];
  return categories.filter((cat) => cat.type === type);
}
