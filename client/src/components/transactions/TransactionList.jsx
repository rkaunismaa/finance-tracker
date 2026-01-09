import { Edit, Trash2 } from 'lucide-react';
import { Card, Button, Badge, EmptyState, LoadingSpinner } from '../common/index.js';
import { formatCurrency, formatDate } from '../../utils/format.js';
import { getIcon } from '../../utils/icons.js';

function TransactionRow({ transaction, onEdit, onDelete }) {
  const Icon = getIcon(transaction.category_icon);
  const isIncome = transaction.type === 'income';

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${transaction.category_color}20` }}
          >
            <Icon
              className="w-5 h-5"
              style={{ color: transaction.category_color }}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {transaction.description || transaction.category_name}
            </p>
            <p className="text-xs text-gray-500">{transaction.category_name}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <Badge variant={isIncome ? 'success' : 'danger'}>
          {isIncome ? 'Income' : 'Expense'}
        </Badge>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">
        {formatDate(transaction.date)}
      </td>
      <td className="px-6 py-4">
        <span
          className={`text-sm font-semibold ${
            isIncome ? 'text-income-dark' : 'text-expense-dark'
          }`}
        >
          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(transaction)}
            className="p-1.5"
          >
            <Edit className="w-4 h-4 text-gray-500" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(transaction)}
            className="p-1.5"
          >
            <Trash2 className="w-4 h-4 text-gray-500" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

function TransactionList({ transactions, isLoading, onEdit, onDelete, onAdd }) {
  if (isLoading) {
    return (
      <Card padding={false}>
        <LoadingSpinner.Overlay message="Loading transactions..." />
      </Card>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <Card>
        <EmptyState
          title="No transactions found"
          description="Start tracking your income and expenses by adding your first transaction."
          actionLabel="Add Transaction"
          onAction={onAdd}
        />
      </Card>
    );
  }

  return (
    <Card padding={false}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default TransactionList;
