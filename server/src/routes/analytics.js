import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { dateQuery } from '../middleware/validators.js';
import * as controller from '../controllers/analyticsController.js';

const router = Router();

// GET /api/analytics/summary - Get summary (total income, expenses, balance)
router.get(
  '/summary',
  dateQuery('startDate'),
  dateQuery('endDate'),
  validate,
  controller.getSummary
);

// GET /api/analytics/by-category - Get breakdown by category
router.get(
  '/by-category',
  dateQuery('startDate'),
  dateQuery('endDate'),
  validate,
  controller.getByCategory
);

// GET /api/analytics/trends - Get monthly trends
router.get(
  '/trends',
  dateQuery('startDate'),
  dateQuery('endDate'),
  validate,
  controller.getTrends
);

export default router;
