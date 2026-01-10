import { useState } from 'react';
import { DollarSign, TrendingUp, AlertTriangle, Edit } from 'lucide-react';
import { Header } from '../components/layout/index.js';
import { Card, Button, LoadingSpinner, EmptyState, Badge } from '../components/common/index.js';
import { useCategories, useUpdateCategory, filterCategoriesByType } from '../hooks/index.js';
import { useByCategory } from '../hooks/useAnalytics.js';
import { formatCurrency } from '../utils/format.js';
import { BudgetModal } from '../components/budget/index.js';

function Budget() {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: spending, isLoading: spendingLoading } = useByCategory({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split('T')[0],
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  const updateCategoryMutation = useUpdateCategory();

  const expenseCategories = filterCategoriesByType(categories, 'expense');

  const handleOpenBudgetModal = (category) => {
    setSelectedCategory(category);
    setIsBudgetModalOpen(true);
  };

  const handleCloseBudgetModal = () => {
    setSelectedCategory(null);
    setIsBudgetModalOpen(false);
  };

  const handleSaveBudget = async (budget) => {
    try {
      await updateCategoryMutation.mutateAsync({
        id: selectedCategory.id,
        data: { monthly_budget: budget },
      });
      handleCloseBudgetModal();
    } catch (error) {
      console.error('Failed to update budget:', error);
    }
  };

  // Create spending map
  const spendingMap = new Map();
  spending?.forEach((item) => {
    spendingMap.set(item.category_id, item.total);
  });

  // Calculate totals
  const totalBudget = expenseCategories?.reduce(
    (sum, cat) => sum + (cat.monthly_budget || 0),
    0
  );
  const totalSpent = expenseCategories?.reduce((sum, cat) => {
    const spent = spendingMap.get(cat.id) || 0;
    return cat.monthly_budget ? sum + spent : sum;
  }, 0);

  const getBudgetStatus = (spent, budget) => {
    if (!budget) return null;
    const percentage = (spent / budget) * 100;
    if (percentage >= 100) return 'over';
    if (percentage >= 80) return 'warning';
    return 'good';
  };

  const getBudgetColor = (status) => {
    switch (status) {
      case 'over':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  if (categoriesLoading || spendingLoading) {
    return (
      <div>
        <Header title="Budget" subtitle="Manage your spending budgets" />
        <LoadingSpinner.Overlay message="Loading budget data..." />
      </div>
    );
  }

  return (
    <div>
      <Header
        title="Budget"
        subtitle="Manage your spending budgets"
      />

      {/* Overall Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {formatCurrency(totalBudget)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {formatCurrency(totalSpent)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-expense-light dark:bg-red-900/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-expense dark:text-red-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Remaining</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {formatCurrency(totalBudget - totalSpent)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-income-light dark:bg-green-900/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-income dark:text-green-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Category Budgets */}
      {!expenseCategories || expenseCategories.length === 0 ? (
        <EmptyState
          icon={DollarSign}
          title="No categories found"
          description="Add expense categories to start tracking budgets."
        />
      ) : (
        <div className="space-y-4">
          {expenseCategories.map((category) => {
            const spent = spendingMap.get(category.id) || 0;
            const budget = category.monthly_budget;
            const status = getBudgetStatus(spent, budget);
            const percentage = budget ? Math.min((spent / budget) * 100, 100) : 0;

            return (
              <Card key={category.id}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <span style={{ color: category.color }} className="text-lg">
                        {category.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {budget
                          ? `${formatCurrency(spent)} of ${formatCurrency(budget)}`
                          : 'No budget set'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {status === 'over' && (
                      <Badge variant="danger" dot>
                        Over Budget
                      </Badge>
                    )}
                    {status === 'warning' && (
                      <Badge variant="warning" dot>
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        80% Used
                      </Badge>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenBudgetModal(category)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      {budget ? 'Edit' : 'Set Budget'}
                    </Button>
                  </div>
                </div>

                {budget && (
                  <div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getBudgetColor(status)} transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{percentage.toFixed(1)}% used</span>
                      <span>
                        {formatCurrency(Math.max(0, budget - spent))} remaining
                      </span>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      <BudgetModal
        isOpen={isBudgetModalOpen}
        onClose={handleCloseBudgetModal}
        onSave={handleSaveBudget}
        category={selectedCategory}
        isLoading={updateCategoryMutation.isPending}
      />
    </div>
  );
}

export default Budget;
