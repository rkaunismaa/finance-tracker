import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, Button, EmptyState } from '../common/index.js';
import { formatCurrency, formatDate } from '../../utils/format.js';
import { getIcon } from '../../utils/icons.js';

function TransactionItem({ transaction }) {
  const Icon = getIcon(transaction.category_icon);
  const isIncome = transaction.type === 'income';

  return (
    <div className="flex items-center gap-4 py-3">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${transaction.category_color}20` }}
      >
        <Icon
          className="w-5 h-5"
          style={{ color: transaction.category_color }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {transaction.description || transaction.category_name}
        </p>
        <p className="text-xs text-gray-500">
          {transaction.category_name} &middot; {formatDate(transaction.date)}
        </p>
      </div>
      <span
        className={`text-sm font-semibold ${
          isIncome ? 'text-income-dark' : 'text-expense-dark'
        }`}
      >
        {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
      </span>
    </div>
  );
}

function RecentTransactions({ transactions, isLoading }) {
  if (isLoading) {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Recent Transactions</Card.Title>
        </Card.Header>
        <div className="space-y-3 animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 py-3">
              <div className="w-10 h-10 rounded-lg bg-gray-200" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-24" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-20" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const recentTransactions = transactions?.slice(0, 5) || [];

  return (
    <Card>
      <Card.Header className="flex items-center justify-between">
        <Card.Title>Recent Transactions</Card.Title>
        <Link to="/transactions">
          <Button variant="ghost" size="sm" className="text-primary-600">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </Card.Header>

      {recentTransactions.length === 0 ? (
        <EmptyState
          title="No transactions yet"
          description="Start tracking your income and expenses"
        />
      ) : (
        <div className="divide-y divide-gray-100">
          {recentTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </Card>
  );
}

export default RecentTransactions;
