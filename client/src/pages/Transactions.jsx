import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Header } from '../components/layout/index.js';
import { Button } from '../components/common/index.js';
import {
  TransactionFilters,
  TransactionList,
  TransactionForm,
  DeleteConfirmation,
} from '../components/transactions/index.js';
import {
  useTransactions,
  useCreateTransaction,
  useUpdateTransaction,
  useDeleteTransaction,
} from '../hooks/useTransactions.js';
import { useCategories } from '../hooks/useCategories.js';

function Transactions() {
  const [filters, setFilters] = useState({
    type: '',
    category_id: '',
    startDate: '',
    endDate: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const { data: transactions, isLoading } = useTransactions(filters);
  const { data: categories } = useCategories();

  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();
  const deleteMutation = useDeleteTransaction();

  const handleOpenCreate = () => {
    setSelectedTransaction(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedTransaction(null);
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
    setSelectedTransaction(null);
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedTransaction) {
        await updateMutation.mutateAsync({
          id: selectedTransaction.id,
          data,
        });
      } else {
        await createMutation.mutateAsync(data);
      }
      handleCloseForm();
    } catch (error) {
      console.error('Failed to save transaction:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(selectedTransaction.id);
      handleCloseDelete();
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  const isMutating =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  return (
    <div>
      <Header
        title="Transactions"
        subtitle="Track your income and expenses"
        actions={
          <Button onClick={handleOpenCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        }
      />

      <TransactionFilters
        filters={filters}
        onFilterChange={setFilters}
        categories={categories}
      />

      <TransactionList
        transactions={transactions}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        onAdd={handleOpenCreate}
      />

      <TransactionForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        transaction={selectedTransaction}
        categories={categories}
        isLoading={isMutating}
      />

      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={handleCloseDelete}
        onConfirm={handleDelete}
        item={selectedTransaction}
        itemType="transaction"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}

export default Transactions;
