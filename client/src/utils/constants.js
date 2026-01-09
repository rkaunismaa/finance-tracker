// API Endpoints
export const API_ENDPOINTS = {
  CATEGORIES: '/api/categories',
  TRANSACTIONS: '/api/transactions',
  GOALS: '/api/goals',
  ANALYTICS: {
    SUMMARY: '/api/analytics/summary',
    BY_CATEGORY: '/api/analytics/by-category',
    TRENDS: '/api/analytics/trends',
  },
};

// Transaction Types
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

// Goal Status
export const GOAL_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
};

// Category Types (matches backend)
export const CATEGORY_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

// Modal Types
export const MODAL_TYPES = {
  CREATE_TRANSACTION: 'createTransaction',
  EDIT_TRANSACTION: 'editTransaction',
  DELETE_TRANSACTION: 'deleteTransaction',
  CREATE_GOAL: 'createGoal',
  EDIT_GOAL: 'editGoal',
  UPDATE_GOAL_PROGRESS: 'updateGoalProgress',
  DELETE_GOAL: 'deleteGoal',
};

// Date Range Presets
export const DATE_RANGES = {
  LAST_7_DAYS: 7,
  LAST_30_DAYS: 30,
  LAST_3_MONTHS: 90,
  LAST_6_MONTHS: 180,
  LAST_YEAR: 365,
};
