import { Edit, Trash2, Plus, Calendar, CheckCircle } from 'lucide-react';
import { Card, Button, Badge } from '../common/index.js';
import { formatCurrency, formatDate } from '../../utils/format.js';
import { calculateGoalProgress } from '../../hooks/useGoals.js';

function GoalCard({ goal, onEdit, onDelete, onUpdateProgress }) {
  const progress = calculateGoalProgress(goal);
  const isCompleted = goal.status === 'completed';
  const isArchived = goal.status === 'archived';
  const isActive = goal.status === 'active';

  const statusConfig = {
    active: { variant: 'primary', label: 'Active' },
    completed: { variant: 'success', label: 'Completed' },
    archived: { variant: 'default', label: 'Archived' },
  };

  const status = statusConfig[goal.status] || statusConfig.active;

  return (
    <Card className={`${isArchived ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {goal.name}
            </h3>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
          {goal.description && (
            <p className="text-sm text-gray-500 line-clamp-2">
              {goal.description}
            </p>
          )}
        </div>
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${goal.color || '#0ea5e9'}20` }}
        >
          {isCompleted ? (
            <CheckCircle className="w-5 h-5" style={{ color: goal.color || '#0ea5e9' }} />
          ) : (
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: goal.color || '#0ea5e9' }}
            />
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-900">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              backgroundColor: goal.color || '#0ea5e9',
            }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-gray-500">
            {formatCurrency(goal.current_amount)}
          </span>
          <span className="text-gray-900 font-medium">
            {formatCurrency(goal.target_amount)}
          </span>
        </div>
      </div>

      {goal.deadline && (
        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
          <Calendar className="w-4 h-4" />
          <span>Target: {formatDate(goal.deadline)}</span>
        </div>
      )}

      <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
        {isActive && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onUpdateProgress(goal)}
            className="flex-1"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Progress
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(goal)}
          className="p-2"
        >
          <Edit className="w-4 h-4 text-gray-500" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(goal)}
          className="p-2"
        >
          <Trash2 className="w-4 h-4 text-gray-500" />
        </Button>
      </div>
    </Card>
  );
}

export default GoalCard;
