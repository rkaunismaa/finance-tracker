import Category from '../models/Category.js';

export const getAllCategories = (req, res, next) => {
  try {
    const { type } = req.query;
    const categories = Category.findAll({ type });
    res.json({ data: categories });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = (req, res, next) => {
  try {
    const { id } = req.params;
    const category = Category.findById(id);
    res.json({ data: category });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = (req, res, next) => {
  try {
    const { id } = req.params;
    const category = Category.update(id, req.body);
    res.json({ data: category });
  } catch (error) {
    next(error);
  }
};
