import { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';
import { Modal, Input, Button } from '../common/index.js';

function BudgetModal({ isOpen, onClose, onSave, category, isLoading }) {
  const [budget, setBudget] = useState('');

  useEffect(() => {
    if (category) {
      setBudget(category.monthly_budget?.toString() || '');
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const budgetValue = budget === '' ? null : parseFloat(budget);
    onSave(budgetValue);
  };

  const handleRemove = () => {
    onSave(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Set Budget for ${category?.name}`}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            label="Monthly Budget"
            type="number"
            step="0.01"
            min="0"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter monthly budget amount"
            prefix={<DollarSign className="w-4 h-4" />}
            required={false}
          />

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Set a monthly spending limit for this category. Leave empty to remove the budget.
          </p>
        </div>

        <Modal.Footer>
          {category?.monthly_budget && (
            <Button
              type="button"
              variant="danger"
              onClick={handleRemove}
              disabled={isLoading}
            >
              Remove Budget
            </Button>
          )}
          <div className="flex gap-2 ml-auto">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Budget'}
            </Button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default BudgetModal;
