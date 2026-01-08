import { Router } from 'express';
import { query } from 'express-validator';
import { validate } from '../middleware/validate.js';
import {
  idParam,
  typeQuery,
  typeBody,
  amountBody,
  categoryIdBody,
  descriptionBody,
  dateBody,
  dateQuery,
  paginationQuery
} from '../middleware/validators.js';
import * as controller from '../controllers/transactionController.js';

const router = Router();

// GET /api/transactions - List all transactions with optional filters
router.get(
  '/',
  typeQuery(),
  query('category_id').optional().isInt({ min: 1 }).withMessage('Category ID must be a positive integer'),
  dateQuery('startDate'),
  dateQuery('endDate'),
  ...paginationQuery(),
  validate,
  controller.getAllTransactions
);

// GET /api/transactions/:id - Get single transaction
router.get('/:id', idParam(), validate, controller.getTransactionById);

// POST /api/transactions - Create new transaction
router.post(
  '/',
  typeBody(),
  amountBody(),
  categoryIdBody(),
  descriptionBody(),
  dateBody('date').optional(),
  validate,
  controller.createTransaction
);

// PUT /api/transactions/:id - Update transaction
router.put(
  '/:id',
  idParam(),
  typeBody().optional(),
  amountBody().optional(),
  categoryIdBody().optional(),
  descriptionBody(),
  dateBody('date').optional(),
  validate,
  controller.updateTransaction
);

// DELETE /api/transactions/:id - Delete transaction
router.delete('/:id', idParam(), validate, controller.deleteTransaction);

export default router;
