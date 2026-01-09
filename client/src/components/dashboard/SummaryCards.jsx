import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Card } from '../common/index.js';
import { formatCurrency } from '../../utils/format.js';

function SummaryCard({ title, amount, icon: Icon, variant }) {
  const variants = {
    income: {
      iconBg: 'bg-income-light',
      iconColor: 'text-income-dark',
      amountColor: 'text-income-dark',
    },
    expense: {
      iconBg: 'bg-expense-light',
      iconColor: 'text-expense-dark',
      amountColor: 'text-expense-dark',
    },
    balance: {
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-700',
      amountColor: amount >= 0 ? 'text-income-dark' : 'text-expense-dark',
    },
  };

  const styles = variants[variant] || variants.balance;

  return (
    <Card className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg ${styles.iconBg} flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${styles.iconColor}`} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`text-2xl font-bold ${styles.amountColor}`}>
          {formatCurrency(amount)}
        </p>
      </div>
    </Card>
  );
}

function SummaryCards({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gray-200" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2" />
                <div className="h-6 bg-gray-200 rounded w-32" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const { total_income = 0, total_expenses = 0, balance = 0 } = data || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard
        title="Total Income"
        amount={total_income}
        icon={TrendingUp}
        variant="income"
      />
      <SummaryCard
        title="Total Expenses"
        amount={total_expenses}
        icon={TrendingDown}
        variant="expense"
      />
      <SummaryCard
        title="Balance"
        amount={balance}
        icon={Wallet}
        variant="balance"
      />
    </div>
  );
}

export default SummaryCards;
