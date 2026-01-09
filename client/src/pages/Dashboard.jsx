import { Header } from '../components/layout/index.js';
import { SummaryCards, RecentTransactions, GoalsOverview } from '../components/dashboard/index.js';
import { TrendsChart, CategoryBreakdown } from '../components/charts/index.js';
import { useSummary, useByCategory, useTrends } from '../hooks/useAnalytics.js';
import { useTransactions } from '../hooks/useTransactions.js';
import { useGoals } from '../hooks/useGoals.js';

function Dashboard() {
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
      />

      <div className="space-y-6">
        <SummaryCards data={summary} isLoading={summaryLoading} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendsChart data={trends} isLoading={trendsLoading} />
          <CategoryBreakdown data={byCategory} type="expense" isLoading={categoryLoading} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTransactions transactions={transactions} isLoading={transactionsLoading} />
          <GoalsOverview goals={goals} isLoading={goalsLoading} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
