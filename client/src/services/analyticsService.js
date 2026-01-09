import api from './api.js';
import { API_ENDPOINTS } from '../utils/constants.js';

/**
 * Build query string for date filters
 * @param {Object} filters - Filter parameters (startDate, endDate)
 * @returns {string} Query string
 */
function buildQueryString(filters = {}) {
  const params = new URLSearchParams();
  if (filters.startDate) {
    params.append('startDate', filters.startDate);
  }
  if (filters.endDate) {
    params.append('endDate', filters.endDate);
  }
  return params.toString();
}

/**
 * Get financial summary (total income, expenses, balance)
 * @param {Object} filters - Optional date filters (startDate, endDate)
 * @returns {Promise<Object>} Summary data with { data: { total_income, total_expenses, balance } }
 */
export async function getSummary(filters = {}) {
  const queryString = buildQueryString(filters);
  const url = queryString
    ? `${API_ENDPOINTS.ANALYTICS.SUMMARY}?${queryString}`
    : API_ENDPOINTS.ANALYTICS.SUMMARY;
  return api.get(url);
}

/**
 * Get spending/income breakdown by category
 * @param {Object} filters - Optional date filters (startDate, endDate)
 * @returns {Promise<Object>} Category breakdown with { data: CategorySummary[] }
 */
export async function getByCategory(filters = {}) {
  const queryString = buildQueryString(filters);
  const url = queryString
    ? `${API_ENDPOINTS.ANALYTICS.BY_CATEGORY}?${queryString}`
    : API_ENDPOINTS.ANALYTICS.BY_CATEGORY;
  return api.get(url);
}

/**
 * Get monthly trends (income, expenses, net by month)
 * @param {Object} filters - Optional date filters (startDate, endDate)
 * @returns {Promise<Object>} Monthly trends with { data: MonthlyTrend[] }
 */
export async function getTrends(filters = {}) {
  const queryString = buildQueryString(filters);
  const url = queryString
    ? `${API_ENDPOINTS.ANALYTICS.TRENDS}?${queryString}`
    : API_ENDPOINTS.ANALYTICS.TRENDS;
  return api.get(url);
}
