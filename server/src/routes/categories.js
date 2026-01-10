import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { idParam, typeQuery } from '../middleware/validators.js';
import * as controller from '../controllers/categoryController.js';

const router = Router();

// GET /api/categories - List all categories (optional ?type=income|expense)
router.get('/', typeQuery(), validate, controller.getAllCategories);

// GET /api/categories/:id - Get single category
router.get('/:id', idParam(), validate, controller.getCategoryById);

// PUT /api/categories/:id - Update category (budget)
router.put(
  '/:id',
  [
    idParam(),
    body('monthly_budget')
      .optional({ nullable: true })
      .isFloat({ min: 0 })
      .withMessage('Monthly budget must be a positive number or null'),
  ],
  validate,
  controller.updateCategory
);

export default router;
