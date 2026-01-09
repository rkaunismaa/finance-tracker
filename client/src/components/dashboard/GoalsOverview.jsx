import { Link } from 'react-router-dom';
import { ArrowRight, Target } from 'lucide-react';
import { Card, Button, EmptyState } from '../common/index.js';
import { formatCurrency } from '../../utils/format.js';
import { calculateGoalProgress } from '../../hooks/useGoals.js';

function GoalItem({ goal }) {
  const progress = calculateGoalProgress(goal);

  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-900">{goal.name}</span>
        <span className="text-xs text-gray-500">{progress}%</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            backgroundColor: goal.color || '#0ea5e9',
          }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-500">
          {formatCurrency(goal.current_amount)}
        </span>
        <span className="text-xs text-gray-500">
          {formatCurrency(goal.target_amount)}
        </span>
      </div>
    </div>
  );
}

function GoalsOverview({ goals, isLoading }) {
  if (isLoading) {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Savings Goals</Card.Title>
        </Card.Header>
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="py-3">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
              <div className="h-2 bg-gray-200 rounded w-full" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const activeGoals = goals?.filter((g) => g.status === 'active').slice(0, 3) || [];

  return (
    <Card>
      <Card.Header className="flex items-center justify-between">
        <Card.Title>Savings Goals</Card.Title>
        <Link to="/goals">
          <Button variant="ghost" size="sm" className="text-primary-600">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </Card.Header>

      {activeGoals.length === 0 ? (
        <EmptyState
          icon={Target}
          title="No active goals"
          description="Set savings goals to track your progress"
        />
      ) : (
        <div className="divide-y divide-gray-100">
          {activeGoals.map((goal) => (
            <GoalItem key={goal.id} goal={goal} />
          ))}
        </div>
      )}
    </Card>
  );
}

export default GoalsOverview;
