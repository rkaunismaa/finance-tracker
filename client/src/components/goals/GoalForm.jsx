import { useState, useEffect } from 'react';
import { Modal, Button, Input, Select } from '../common/index.js';
import { GOAL_STATUS } from '../../utils/constants.js';
import { formatInputDate } from '../../utils/format.js';

const colorOptions = [
  { value: '#0ea5e9', label: 'Blue' },
  { value: '#10b981', label: 'Green' },
  { value: '#8b5cf6', label: 'Purple' },
  { value: '#f59e0b', label: 'Amber' },
  { value: '#ec4899', label: 'Pink' },
  { value: '#ef4444', label: 'Red' },
  { value: '#6366f1', label: 'Indigo' },
  { value: '#14b8a6', label: 'Teal' },
];

const statusOptions = [
  { value: GOAL_STATUS.ACTIVE, label: 'Active' },
  { value: GOAL_STATUS.COMPLETED, label: 'Completed' },
  { value: GOAL_STATUS.ARCHIVED, label: 'Archived' },
];

const initialFormData = {
  name: '',
  target_amount: '',
  current_amount: '0',
  deadline: '',
  description: '',
  color: '#0ea5e9',
  status: GOAL_STATUS.ACTIVE,
};

function GoalForm({ isOpen, onClose, onSubmit, goal, isLoading }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const isEditing = !!goal;

  useEffect(() => {
    if (goal) {
      setFormData({
        name: goal.name,
        target_amount: goal.target_amount.toString(),
        current_amount: goal.current_amount.toString(),
        deadline: goal.deadline ? formatInputDate(goal.deadline) : '',
        description: goal.description || '',
        color: goal.color || '#0ea5e9',
        status: goal.status,
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [goal, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.target_amount || parseFloat(formData.target_amount) <= 0) {
      newErrors.target_amount = 'Target amount must be greater than 0';
    }
    if (parseFloat(formData.current_amount) < 0) {
      newErrors.current_amount = 'Current amount cannot be negative';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name: formData.name.trim(),
      target_amount: parseFloat(formData.target_amount),
      current_amount: parseFloat(formData.current_amount) || 0,
      deadline: formData.deadline || null,
      description: formData.description.trim() || null,
      color: formData.color,
      status: formData.status,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Goal' : 'Create New Goal'}
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            label="Goal Name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            error={errors.name}
            placeholder="e.g., Emergency Fund"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Target Amount"
              type="number"
              step="0.01"
              min="0.01"
              value={formData.target_amount}
              onChange={(e) =>
                setFormData({ ...formData, target_amount: e.target.value })
              }
              error={errors.target_amount}
              prefix="$"
              placeholder="10000"
            />

            <Input
              label="Current Amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.current_amount}
              onChange={(e) =>
                setFormData({ ...formData, current_amount: e.target.value })
              }
              error={errors.current_amount}
              prefix="$"
              placeholder="0"
            />
          </div>

          <Input
            label="Target Date (optional)"
            type="date"
            value={formData.deadline}
            onChange={(e) =>
              setFormData({ ...formData, deadline: e.target.value })
            }
          />

          <Input
            label="Description (optional)"
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="What is this goal for?"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, color: color.value })
                  }
                  className={`w-8 h-8 rounded-full transition-transform ${
                    formData.color === color.value
                      ? 'ring-2 ring-offset-2 ring-gray-400 scale-110'
                      : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.label}
                />
              ))}
            </div>
          </div>

          {isEditing && (
            <Select
              label="Status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              options={statusOptions}
            />
          )}
        </div>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            {isEditing ? 'Save Changes' : 'Create Goal'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default GoalForm;
