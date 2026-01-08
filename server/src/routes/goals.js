import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { idParam, statusQuery, statusBody, dateBody } from '../middleware/validators.js';
import * as controller from '../controllers/goalController.js';

const router = Router();

// GET /api/goals - List all goals (optional ?status=active|completed|archived)
router.get('/', statusQuery(), validate, controller.getAllGoals);

// GET /api/goals/:id - Get single goal
router.get('/:id', idParam(), validate, controller.getGoalById);

// POST /api/goals - Create new goal
router.post(
  '/',
  body('name').notEmpty().isString().trim().isLength({ max: 200 }).withMessage('Name is required and must be 200 characters or less'),
  body('target_amount').isFloat({ min: 0.01 }).withMessage('Target amount must be positive'),
  body('current_amount').optional().isFloat({ min: 0 }).withMessage('Current amount must be non-negative'),
  dateBody('deadline').optional(),
  body('color').optional().isString().trim(),
  body('description').optional().isString().trim().isLength({ max: 500 }).withMessage('Description must be 500 characters or less'),
  statusBody(),
  validate,
  controller.createGoal
);

// PUT /api/goals/:id - Update goal
router.put(
  '/:id',
  idParam(),
  body('name').optional().isString().trim().isLength({ max: 200 }).withMessage('Name must be 200 characters or less'),
  body('target_amount').optional().isFloat({ min: 0.01 }).withMessage('Target amount must be positive'),
  body('current_amount').optional().isFloat({ min: 0 }).withMessage('Current amount must be non-negative'),
  dateBody('deadline').optional(),
  body('color').optional().isString().trim(),
  body('description').optional().isString().trim().isLength({ max: 500 }).withMessage('Description must be 500 characters or less'),
  statusBody(),
  validate,
  controller.updateGoal
);

// DELETE /api/goals/:id - Delete goal
router.delete('/:id', idParam(), validate, controller.deleteGoal);

export default router;
