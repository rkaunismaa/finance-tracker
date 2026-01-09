import { useState, useEffect } from 'react';
import { Modal, Button, Input } from '../common/index.js';
import { formatCurrency } from '../../utils/format.js';
import { calculateGoalProgress } from '../../hooks/useGoals.js';

function UpdateProgressModal({ isOpen, onClose, onSubmit, goal, isLoading }) {
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState('add'); // 'add' or 'set'
  const [error, setError] = useState('');

  useEffect(() => {
    setAmount('');
    setMode('add');
    setError('');
  }, [isOpen, goal]);

  if (!goal) return null;

  const currentProgress = calculateGoalProgress(goal);
  const remaining = goal.target_amount - goal.current_amount;

  const getNewAmount = () => {
    const numAmount = parseFloat(amount) || 0;
    return mode === 'add' ? goal.current_amount + numAmount : numAmount;
  };

  const newTotal = getNewAmount();
  const newProgress = Math.min(
    Math.round((newTotal / goal.target_amount) * 100),
    100
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (!amount || numAmount < 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (mode === 'set' && numAmount > goal.target_amount) {
      setError('Amount cannot exceed target');
      return;
    }

    onSubmit({
      current_amount: Math.min(newTotal, goal.target_amount),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Progress" size="sm">
      <form onSubmit={handleSubmit}>
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
          <p className="text-sm text-gray-500">
            {formatCurrency(goal.current_amount)} of{' '}
            {formatCurrency(goal.target_amount)}
          </p>
          <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${currentProgress}%`,
                backgroundColor: goal.color || '#0ea5e9',
              }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setMode('add')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                mode === 'add'
                  ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                  : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              Add to current
            </button>
            <button
              type="button"
              onClick={() => setMode('set')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                mode === 'set'
                  ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                  : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              Set new amount
            </button>
          </div>

          <Input
            label={mode === 'add' ? 'Amount to Add' : 'New Current Amount'}
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError('');
            }}
            error={error}
            prefix="$"
            placeholder="0.00"
            helperText={
              mode === 'add'
                ? `${formatCurrency(remaining)} remaining to reach goal`
                : `Current: ${formatCurrency(goal.current_amount)}`
            }
          />

          {amount && !error && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">New total:</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(Math.min(newTotal, goal.target_amount))}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">New progress:</span>
                <span
                  className="font-medium"
                  style={{ color: goal.color || '#0ea5e9' }}
                >
                  {newProgress}%
                </span>
              </div>
            </div>
          )}
        </div>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            Update Progress
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default UpdateProgressModal;
