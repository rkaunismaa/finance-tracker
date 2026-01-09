import api from './api.js';
import { API_ENDPOINTS } from '../utils/constants.js';

/**
 * Get all categories
 * @returns {Promise<Object>} Categories data with { data: Category[] }
 */
export async function getCategories() {
  return api.get(API_ENDPOINTS.CATEGORIES);
}

/**
 * Get single category by ID
 * @param {number} id - Category ID
 * @returns {Promise<Object>} Category data with { data: Category }
 */
export async function getCategory(id) {
  return api.get(`${API_ENDPOINTS.CATEGORIES}/${id}`);
}
