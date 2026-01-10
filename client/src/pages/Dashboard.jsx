import { useState } from 'react';
import { Settings } from 'lucide-react';
import { Header } from '../components/layout/index.js';
import { Button } from '../components/common/index.js';
import { SummaryCards, RecentTransactions, GoalsOverview } from '../components/dashboard/index.js';
import { TrendsChart, CategoryBreakdown } from '../components/charts/index.js';
import { DashboardCustomizeModal } from '../components/dashboard/index.js';
import { useSummary, useByCategory, useTrends } from '../hooks/useAnalytics.js';
import { useTransactions } from '../hooks/useTransactions.js';
import { useGoals } from '../hooks/useGoals.js';
import usePreferencesStore from '../store/usePreferencesStore.js';

function Dashboard() {
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const dashboardLayout = usePreferencesStore((state) => state.dashboardLayout);

  const { data: summary, isLoading: summaryLoading } = useSummary();
  const { data: byCategory, isLoading: categoryLoading } = useByCategory();
  const { data: trends, isLoading: trendsLoading } = useTrends();
  const { data: transactions, isLoading: transactionsLoading } = useTransactions({ limit: 5 });
  const { data: goals, isLoading: goalsLoading } = useGoals({ status: 'active' });

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Overview of your financial health"
        actions={
          <Button variant="outline" onClick={() => setIsCustomizeOpen(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Customize
          </Button>
        }
      />

      <div className="space-y-6">
        {dashboardLayout.showSummary && (
          <SummaryCards data={summary} isLoading={summaryLoading} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dashboardLayout.showTrends && (
            <TrendsChart data={trends} isLoading={trendsLoading} />
          )}
          {dashboardLayout.showCategoryBreakdown && (
            <CategoryBreakdown data={byCategory} type="expense" isLoading={categoryLoading} />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dashboardLayout.showRecentTransactions && (
            <RecentTransactions transactions={transactions} isLoading={transactionsLoading} />
          )}
          {dashboardLayout.showGoals && (
            <GoalsOverview goals={goals} isLoading={goalsLoading} />
          )}
        </div>
      </div>

      <DashboardCustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
      />
    </div>
  );
}

export default Dashboard;
