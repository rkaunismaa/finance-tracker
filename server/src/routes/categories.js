import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { idParam, typeQuery } from '../middleware/validators.js';
import * as controller from '../controllers/categoryController.js';

const router = Router();

// GET /api/categories - List all categories (optional ?type=income|expense)
router.get('/', typeQuery(), validate, controller.getAllCategories);

// GET /api/categories/:id - Get single category
router.get('/:id', idParam(), validate, controller.getCategoryById);

export default router;
