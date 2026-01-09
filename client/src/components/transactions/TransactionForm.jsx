import { useState, useEffect } from 'react';
import { Modal, Button, Input, Select } from '../common/index.js';
import { TRANSACTION_TYPES } from '../../utils/constants.js';
import { formatInputDate } from '../../utils/format.js';

const initialFormData = {
  type: TRANSACTION_TYPES.EXPENSE,
  amount: '',
  category_id: '',
  description: '',
  date: formatInputDate(new Date()),
};

function TransactionForm({
  isOpen,
  onClose,
  onSubmit,
  transaction,
  categories,
  isLoading,
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const isEditing = !!transaction;

  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type,
        amount: transaction.amount.toString(),
        category_id: transaction.category_id.toString(),
        description: transaction.description || '',
        date: formatInputDate(transaction.date),
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [transaction, isOpen]);

  const filteredCategories =
    categories?.filter((cat) => cat.type === formData.type) || [];

  const categoryOptions = filteredCategories.map((cat) => ({
    value: cat.id.toString(),
    label: cat.name,
  }));

  const validate = () => {
    const newErrors = {};
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    if (!formData.category_id) {
      newErrors.category_id = 'Please select a category';
    }
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      type: formData.type,
      amount: parseFloat(formData.amount),
      category_id: parseInt(formData.category_id),
      description: formData.description.trim(),
      date: formData.date,
    });
  };

  const handleTypeChange = (newType) => {
    setFormData({
      ...formData,
      type: newType,
      category_id: '', // Reset category when type changes
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Transaction' : 'Add Transaction'}
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleTypeChange(TRANSACTION_TYPES.EXPENSE)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  formData.type === TRANSACTION_TYPES.EXPENSE
                    ? 'bg-expense-light text-expense-dark border-2 border-expense'
                    : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange(TRANSACTION_TYPES.INCOME)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  formData.type === TRANSACTION_TYPES.INCOME
                    ? 'bg-income-light text-income-dark border-2 border-income'
                    : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                Income
              </button>
            </div>
          </div>

          <Input
            label="Amount"
            type="number"
            step="0.01"
            min="0.01"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            error={errors.amount}
            prefix="$"
            placeholder="0.00"
          />

          <Select
            label="Category"
            value={formData.category_id}
            onChange={(e) =>
              setFormData({ ...formData, category_id: e.target.value })
            }
            options={categoryOptions}
            error={errors.category_id}
            placeholder="Select a category"
          />

          <Input
            label="Description (optional)"
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Add a note..."
          />

          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            error={errors.date}
          />
        </div>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            {isEditing ? 'Save Changes' : 'Add Transaction'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default TransactionForm;
