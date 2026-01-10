import { useState } from 'react';
import { Plus, Target, Download } from 'lucide-react';
import { Header } from '../components/layout/index.js';
import { Button, EmptyState, LoadingSpinner, Select } from '../components/common/index.js';
import { GoalCard, GoalForm, UpdateProgressModal } from '../components/goals/index.js';
import { DeleteConfirmation } from '../components/transactions/index.js';
import {
  useGoals,
  useCreateGoal,
  useUpdateGoal,
  useDeleteGoal,
} from '../hooks/useGoals.js';
import { GOAL_STATUS } from '../utils/constants.js';
import { exportGoalsCSV } from '../utils/export.js';

const statusFilters = [
  { value: '', label: 'All Goals' },
  { value: GOAL_STATUS.ACTIVE, label: 'Active' },
  { value: GOAL_STATUS.COMPLETED, label: 'Completed' },
  { value: GOAL_STATUS.ARCHIVED, label: 'Archived' },
];

function Goals() {
  const [statusFilter, setStatusFilter] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const filters = statusFilter ? { status: statusFilter } : {};
  const { data: goals, isLoading } = useGoals(filters);

  const createMutation = useCreateGoal();
  const updateMutation = useUpdateGoal();
  const deleteMutation = useDeleteGoal();

  const handleOpenCreate = () => {
    setSelectedGoal(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (goal) => {
    setSelectedGoal(goal);
    setIsFormOpen(true);
  };

  const handleOpenProgress = (goal) => {
    setSelectedGoal(goal);
    setIsProgressOpen(true);
  };

  const handleOpenDelete = (goal) => {
    setSelectedGoal(goal);
    setIsDeleteOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedGoal(null);
  };

  const handleCloseProgress = () => {
    setIsProgressOpen(false);
    setSelectedGoal(null);
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
    setSelectedGoal(null);
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedGoal) {
        await updateMutation.mutateAsync({
          id: selectedGoal.id,
          data,
        });
      } else {
        await createMutation.mutateAsync(data);
      }
      handleCloseForm();
    } catch (error) {
      console.error('Failed to save goal:', error);
    }
  };

  const handleUpdateProgress = async (data) => {
    try {
      await updateMutation.mutateAsync({
        id: selectedGoal.id,
        data,
      });
      handleCloseProgress();
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(selectedGoal.id);
      handleCloseDelete();
    } catch (error) {
      console.error('Failed to delete goal:', error);
    }
  };

  const isMutating =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const handleExport = () => {
    exportGoalsCSV(goals);
  };

  if (isLoading) {
    return (
      <div>
        <Header
          title="Savings Goals"
          subtitle="Track progress toward your financial goals"
        />
        <LoadingSpinner.Overlay message="Loading goals..." />
      </div>
    );
  }

  return (
    <div>
      <Header
        title="Savings Goals"
        subtitle="Track progress toward your financial goals"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={handleOpenCreate}>
              <Plus className="w-4 h-4 mr-2" />
              New Goal
            </Button>
          </div>
        }
      />

      <div className="mb-6">
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={statusFilters.slice(1)}
          placeholder="All Goals"
          className="w-48"
        />
      </div>

      {!goals || goals.length === 0 ? (
        <EmptyState
          icon={Target}
          title="No goals yet"
          description="Create your first savings goal to start tracking your progress."
          actionLabel="Create Goal"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
              onUpdateProgress={handleOpenProgress}
            />
          ))}
        </div>
      )}

      <GoalForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        goal={selectedGoal}
        isLoading={isMutating}
      />

      <UpdateProgressModal
        isOpen={isProgressOpen}
        onClose={handleCloseProgress}
        onSubmit={handleUpdateProgress}
        goal={selectedGoal}
        isLoading={updateMutation.isPending}
      />

      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={handleCloseDelete}
        onConfirm={handleDelete}
        item={selectedGoal}
        itemType="goal"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}

export default Goals;
