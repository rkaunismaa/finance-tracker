import { formatDate } from './format.js';

/**
 * Convert transactions to CSV format
 * @param {Array} transactions - Array of transaction objects
 * @param {Array} categories - Array of category objects for lookup
 * @returns {string} CSV string
 */
export function transactionsToCSV(transactions, categories) {
  // Create category lookup map
  const categoryMap = new Map(
    categories?.map((cat) => [cat.id, cat.name]) || []
  );

  // CSV headers
  const headers = ['Date', 'Type', 'Category', 'Description', 'Amount'];
  const csvRows = [headers.join(',')];

  // Add transaction rows
  transactions?.forEach((transaction) => {
    const row = [
      formatDate(transaction.date, 'yyyy-MM-dd'),
      transaction.type,
      categoryMap.get(transaction.category_id) || 'Unknown',
      `"${(transaction.description || '').replace(/"/g, '""')}"`, // Escape quotes
      transaction.amount,
    ];
    csvRows.push(row.join(','));
  });

  return csvRows.join('\n');
}

/**
 * Download CSV file
 * @param {string} csvContent - CSV content string
 * @param {string} filename - Filename for download
 */
export function downloadCSV(csvContent, filename = 'transactions.csv') {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * Export transactions as CSV
 * @param {Array} transactions - Transactions to export
 * @param {Array} categories - Categories for lookup
 * @param {string} filename - Optional filename
 */
export function exportTransactionsCSV(transactions, categories, filename) {
  const csv = transactionsToCSV(transactions, categories);
  const defaultFilename = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCSV(csv, filename || defaultFilename);
}

/**
 * Convert goals to CSV format
 * @param {Array} goals - Array of goal objects
 * @returns {string} CSV string
 */
export function goalsToCSV(goals) {
  const headers = [
    'Name',
    'Target Amount',
    'Current Amount',
    'Progress %',
    'Status',
    'Deadline',
    'Color',
  ];
  const csvRows = [headers.join(',')];

  goals?.forEach((goal) => {
    const progress = ((goal.current_amount / goal.target_amount) * 100).toFixed(2);
    const row = [
      `"${(goal.name || '').replace(/"/g, '""')}"`,
      goal.target_amount,
      goal.current_amount,
      progress,
      goal.status,
      goal.deadline ? formatDate(goal.deadline, 'yyyy-MM-dd') : '',
      goal.color || '',
    ];
    csvRows.push(row.join(','));
  });

  return csvRows.join('\n');
}

/**
 * Export goals as CSV
 * @param {Array} goals - Goals to export
 * @param {string} filename - Optional filename
 */
export function exportGoalsCSV(goals, filename) {
  const csv = goalsToCSV(goals);
  const defaultFilename = `goals_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCSV(csv, filename || defaultFilename);
}
