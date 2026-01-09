import api from './api.js';
import { API_ENDPOINTS } from '../utils/constants.js';

/**
 * Get all savings goals with optional status filter
 * @param {Object} filters - Optional filters (status: 'active' | 'completed' | 'archived')
 * @returns {Promise<Object>} Goals data with { data: Goal[] }
 */
export async function getGoals(filters = {}) {
  const params = new URLSearchParams();
  if (filters.status) {
    params.append('status', filters.status);
  }
  const queryString = params.toString();
  const url = queryString
    ? `${API_ENDPOINTS.GOALS}?${queryString}`
    : API_ENDPOINTS.GOALS;
  return api.get(url);
}

/**
 * Get single goal by ID
 * @param {number} id - Goal ID
 * @returns {Promise<Object>} Goal data with { data: Goal }
 */
export async function getGoal(id) {
  return api.get(`${API_ENDPOINTS.GOALS}/${id}`);
}

/**
 * Create new savings goal
 * @param {Object} data - Goal data (name, target_amount, current_amount, deadline, color, description, status)
 * @returns {Promise<Object>} Created goal with { data: Goal, message }
 */
export async function createGoal(data) {
  return api.post(API_ENDPOINTS.GOALS, data);
}

/**
 * Update existing goal
 * @param {number} id - Goal ID
 * @param {Object} data - Updated goal data
 * @returns {Promise<Object>} Updated goal with { data: Goal, message }
 */
export async function updateGoal(id, data) {
  return api.put(`${API_ENDPOINTS.GOALS}/${id}`, data);
}

/**
 * Delete goal
 * @param {number} id - Goal ID
 * @returns {Promise<Object>} Success message with { message }
 */
export async function deleteGoal(id) {
  return api.delete(`${API_ENDPOINTS.GOALS}/${id}`);
}
