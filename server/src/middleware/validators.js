import { body, param, query } from 'express-validator';

// Reusable validators for common fields

export const idParam = () =>
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer');

export const typeQuery = () =>
  query('type').optional().isIn(['income', 'expense']).withMessage('Type must be income or expense');

export const typeBody = () =>
  body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense');

export const amountBody = () =>
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be positive');

export const categoryIdBody = () =>
  body('category_id').isInt({ min: 1 }).withMessage('Category ID must be a positive integer');

export const descriptionBody = () =>
  body('description').optional().isString().trim().isLength({ max: 500 }).withMessage('Description must be 500 characters or less');

export const dateBody = (field = 'date') =>
  body(field).matches(/^\d{4}-\d{2}-\d{2}$/).withMessage(`${field} must be in YYYY-MM-DD format`);

export const dateQuery = (field) =>
  query(field).optional().matches(/^\d{4}-\d{2}-\d{2}$/).withMessage(`${field} must be in YYYY-MM-DD format`);

export const statusQuery = () =>
  query('status').optional().isIn(['active', 'completed', 'archived']).withMessage('Status must be active, completed, or archived');

export const statusBody = () =>
  body('status').optional().isIn(['active', 'completed', 'archived']).withMessage('Status must be active, completed, or archived');

export const paginationQuery = () => [
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('offset').optional().isInt({ min: 0 }).withMessage('Offset must be non-negative')
];
