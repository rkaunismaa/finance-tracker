import SavingsGoal from '../models/SavingsGoal.js';

export const getAllGoals = (req, res, next) => {
  try {
    const { status } = req.query;
    const goals = SavingsGoal.findAll({ status });
    res.json({ data: goals });
  } catch (error) {
    next(error);
  }
};

export const getGoalById = (req, res, next) => {
  try {
    const { id } = req.params;
    const goal = SavingsGoal.findById(id);
    res.json({ data: goal });
  } catch (error) {
    next(error);
  }
};

export const createGoal = (req, res, next) => {
  try {
    const { name, target_amount, current_amount, deadline, color, description, status } = req.body;

    const goal = SavingsGoal.create({
      name,
      target_amount: parseFloat(target_amount),
      current_amount: current_amount ? parseFloat(current_amount) : undefined,
      deadline,
      color,
      description,
      status
    });

    res.status(201).json({ data: goal, message: 'Savings goal created' });
  } catch (error) {
    next(error);
  }
};

export const updateGoal = (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = {};

    if (req.body.name !== undefined) updateData.name = req.body.name;
    if (req.body.target_amount !== undefined) updateData.target_amount = parseFloat(req.body.target_amount);
    if (req.body.current_amount !== undefined) updateData.current_amount = parseFloat(req.body.current_amount);
    if (req.body.deadline !== undefined) updateData.deadline = req.body.deadline;
    if (req.body.color !== undefined) updateData.color = req.body.color;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.status !== undefined) updateData.status = req.body.status;

    const goal = SavingsGoal.update(id, updateData);
    res.json({ data: goal, message: 'Savings goal updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteGoal = (req, res, next) => {
  try {
    const { id } = req.params;
    SavingsGoal.deleteById(id);
    res.json({ message: 'Savings goal deleted successfully' });
  } catch (error) {
    next(error);
  }
};
