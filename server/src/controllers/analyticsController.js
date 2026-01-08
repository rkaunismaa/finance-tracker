import Analytics from '../models/Analytics.js';

export const getSummary = (req, res, next) => {
  try {
    const filters = {
      startDate: req.query.startDate,
      endDate: req.query.endDate
    };

    // Remove undefined values
    Object.keys(filters).forEach(key =>
      filters[key] === undefined && delete filters[key]
    );

    const summary = Analytics.getSummary(filters);
    res.json({ data: summary });
  } catch (error) {
    next(error);
  }
};

export const getByCategory = (req, res, next) => {
  try {
    const filters = {
      startDate: req.query.startDate,
      endDate: req.query.endDate
    };

    // Remove undefined values
    Object.keys(filters).forEach(key =>
      filters[key] === undefined && delete filters[key]
    );

    const categoryBreakdown = Analytics.getByCategory(filters);
    res.json({ data: categoryBreakdown });
  } catch (error) {
    next(error);
  }
};

export const getTrends = (req, res, next) => {
  try {
    const filters = {
      startDate: req.query.startDate,
      endDate: req.query.endDate
    };

    // Remove undefined values
    Object.keys(filters).forEach(key =>
      filters[key] === undefined && delete filters[key]
    );

    const trends = Analytics.getTrends(filters);
    res.json({ data: trends });
  } catch (error) {
    next(error);
  }
};
