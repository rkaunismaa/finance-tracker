import { format, parseISO } from 'date-fns';

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(date, formatStr = 'MMM dd, yyyy') {
  if (typeof date === 'string') {
    return format(parseISO(date), formatStr);
  }
  return format(date, formatStr);
}

export function formatMonthYear(date) {
  return formatDate(date, 'MMMM yyyy');
}

export function formatInputDate(date) {
  // Returns YYYY-MM-DD for input[type="date"]
  if (typeof date === 'string') {
    return date.split('T')[0];
  }
  return format(date, 'yyyy-MM-dd');
}
