import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { Card } from '../common/index.js';
import { formatCurrency } from '../../utils/format.js';

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
        <p className="text-sm font-medium text-gray-900">{data.category_name}</p>
        <p className="text-sm text-gray-600">
          {formatCurrency(data.total)} ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
}

function CustomLegend({ payload }) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      {payload?.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-xs">
          <span
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-600 truncate">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

function CategoryBreakdown({ data, type = 'expense', isLoading }) {
  if (isLoading) {
    return (
      <Card>
        <Card.Header>
          <Card.Title>
            {type === 'expense' ? 'Spending' : 'Income'} by Category
          </Card.Title>
        </Card.Header>
        <div className="h-64 animate-pulse bg-gray-100 rounded-lg" />
      </Card>
    );
  }

  const filteredData = data?.filter((item) => item.type === type) || [];
  const total = filteredData.reduce((sum, item) => sum + item.total, 0);

  const chartData = filteredData.map((item) => ({
    ...item,
    percentage: total > 0 ? Math.round((item.total / total) * 100) : 0,
  }));

  if (chartData.length === 0) {
    return (
      <Card>
        <Card.Header>
          <Card.Title>
            {type === 'expense' ? 'Spending' : 'Income'} by Category
          </Card.Title>
        </Card.Header>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No {type} data available
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          {type === 'expense' ? 'Spending' : 'Income'} by Category
        </Card.Title>
        <Card.Description>
          Total: {formatCurrency(total)}
        </Card.Description>
      </Card.Header>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="total"
              nameKey="category_name"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.category_color || '#6b7280'}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default CategoryBreakdown;
