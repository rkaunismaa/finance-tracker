import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card } from '../common/index.js';
import { formatCurrency } from '../../utils/format.js';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
        <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

function TrendsChart({ data, isLoading }) {
  if (isLoading) {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Monthly Trends</Card.Title>
        </Card.Header>
        <div className="h-80 animate-pulse bg-gray-100 rounded-lg" />
      </Card>
    );
  }

  const chartData = data?.map((item) => ({
    month: item.month,
    Income: item.income,
    Expenses: item.expenses,
    Net: item.net,
  })) || [];

  if (chartData.length === 0) {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Monthly Trends</Card.Title>
        </Card.Header>
        <div className="h-80 flex items-center justify-center text-gray-500">
          No trend data available
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>Monthly Trends</Card.Title>
        <Card.Description>Income vs expenses over time</Card.Description>
      </Card.Header>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="Income"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Expenses"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: '#ef4444', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default TrendsChart;
