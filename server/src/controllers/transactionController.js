import Transaction from '../models/Transaction.js';

export const getAllTransactions = (req, res, next) => {
  try {
    const filters = {
      type: req.query.type,
      category_id: req.query.category_id ? parseInt(req.query.category_id) : undefined,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      limit: req.query.limit ? parseInt(req.query.limit) : undefined,
      offset: req.query.offset ? parseInt(req.query.offset) : undefined
    };

    // Remove undefined values
    Object.keys(filters).forEach(key =>
      filters[key] === undefined && delete filters[key]
    );

    const transactions = Transaction.findAll(filters);
    res.json({ data: transactions });
  } catch (error) {
    next(error);
  }
};

export const getTransactionById = (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = Transaction.findById(id);
    res.json({ data: transaction });
  } catch (error) {
    next(error);
  }
};

export const createTransaction = (req, res, next) => {
  try {
    const { type, amount, category_id, description } = req.body;
    const date = req.body.date || new Date().toISOString().split('T')[0];

    const transaction = Transaction.create({
      type,
      amount: parseFloat(amount),
      category_id: parseInt(category_id),
      description,
      date
    });

    res.status(201).json({ data: transaction, message: 'Transaction created' });
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = {};

    if (req.body.type !== undefined) updateData.type = req.body.type;
    if (req.body.amount !== undefined) updateData.amount = parseFloat(req.body.amount);
    if (req.body.category_id !== undefined) updateData.category_id = parseInt(req.body.category_id);
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.date !== undefined) updateData.date = req.body.date;

    const transaction = Transaction.update(id, updateData);
    res.json({ data: transaction, message: 'Transaction updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = (req, res, next) => {
  try {
    const { id } = req.params;
    Transaction.deleteById(id);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    next(error);
  }
};
