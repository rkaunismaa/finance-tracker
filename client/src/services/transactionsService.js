import api from './api.js';
import { API_ENDPOINTS } from '../utils/constants.js';

/**
 * Build query string from filters object
 * @param {Object} filters - Filter parameters
 * @returns {string} Query string
 */
function buildQueryString(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value);
    }
  });
  return params.toString();
}

/**
 * Get all transactions with optional filters
 * @param {Object} filters - Optional filters (type, category_id, startDate, endDate, limit, offset)
 * @returns {Promise<Object>} Transactions data with { data: Transaction[] }
 */
export async function getTransactions(filters = {}) {
  const queryString = buildQueryString(filters);
  const url = queryString
    ? `${API_ENDPOINTS.TRANSACTIONS}?${queryString}`
    : API_ENDPOINTS.TRANSACTIONS;
  return api.get(url);
}

/**
 * Get single transaction by ID
 * @param {number} id - Transaction ID
 * @returns {Promise<Object>} Transaction data with { data: Transaction }
 */
export async function getTransaction(id) {
  return api.get(`${API_ENDPOINTS.TRANSACTIONS}/${id}`);
}

/**
 * Create new transaction
 * @param {Object} data - Transaction data (type, amount, category_id, description, date)
 * @returns {Promise<Object>} Created transaction with { data: Transaction, message }
 */
export async function createTransaction(data) {
  return api.post(API_ENDPOINTS.TRANSACTIONS, data);
}

/**
 * Update existing transaction
 * @param {number} id - Transaction ID
 * @param {Object} data - Updated transaction data
 * @returns {Promise<Object>} Updated transaction with { data: Transaction, message }
 */
export async function updateTransaction(id, data) {
  return api.put(`${API_ENDPOINTS.TRANSACTIONS}/${id}`, data);
}

/**
 * Delete transaction
 * @param {number} id - Transaction ID
 * @returns {Promise<Object>} Success message with { message }
 */
export async function deleteTransaction(id) {
  return api.delete(`${API_ENDPOINTS.TRANSACTIONS}/${id}`);
}
