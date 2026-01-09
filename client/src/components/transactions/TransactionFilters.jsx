import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button, Select, Input } from '../common/index.js';
import { TRANSACTION_TYPES } from '../../utils/constants.js';

function TransactionFilters({ filters, onFilterChange, categories }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const typeOptions = [
    { value: TRANSACTION_TYPES.INCOME, label: 'Income' },
    { value: TRANSACTION_TYPES.EXPENSE, label: 'Expense' },
  ];

  const categoryOptions =
    categories?.map((cat) => ({
      value: cat.id.toString(),
      label: cat.name,
    })) || [];

  const hasActiveFilters =
    filters.type || filters.category_id || filters.startDate || filters.endDate;

  const handleClearFilters = () => {
    onFilterChange({
      type: '',
      category_id: '',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-primary-500" />
          )}
        </button>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            <X className="w-4 h-4 mr-1" />
            Clear filters
          </Button>
        )}
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select
            label="Type"
            value={filters.type}
            onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
            options={typeOptions}
            placeholder="All types"
          />
          <Select
            label="Category"
            value={filters.category_id}
            onChange={(e) =>
              onFilterChange({ ...filters, category_id: e.target.value })
            }
            options={categoryOptions}
            placeholder="All categories"
          />
          <Input
            type="date"
            label="Start Date"
            value={filters.startDate}
            onChange={(e) =>
              onFilterChange({ ...filters, startDate: e.target.value })
            }
          />
          <Input
            type="date"
            label="End Date"
            value={filters.endDate}
            onChange={(e) =>
              onFilterChange({ ...filters, endDate: e.target.value })
            }
          />
        </div>
      )}
    </div>
  );
}

export default TransactionFilters;
