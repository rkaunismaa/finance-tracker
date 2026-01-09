import { AlertTriangle } from 'lucide-react';
import { Modal, Button } from '../common/index.js';
import { formatCurrency } from '../../utils/format.js';

function DeleteConfirmation({ isOpen, onClose, onConfirm, item, itemType = 'transaction', isLoading }) {
  const getDescription = () => {
    if (itemType === 'transaction' && item) {
      return `${item.description || item.category_name} - ${formatCurrency(item.amount)}`;
    }
    if (itemType === 'goal' && item) {
      return item.name;
    }
    return '';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete" size="sm">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-expense-light flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6 text-expense" />
        </div>
        <p className="text-gray-900 font-medium mb-2">
          Are you sure you want to delete this {itemType}?
        </p>
        {item && (
          <p className="text-sm text-gray-500 mb-4">{getDescription()}</p>
        )}
        <p className="text-sm text-gray-500">This action cannot be undone.</p>
      </div>

      <Modal.Footer className="justify-center">
        <Button variant="secondary" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} loading={isLoading}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmation;
