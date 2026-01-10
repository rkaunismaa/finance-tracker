import { format, parseISO } from 'date-fns';
import usePreferencesStore from '../store/usePreferencesStore.js';

/**
 * Format currency using user preferences
 * @param {number} amount - Amount to format
 * @param {string} [currency] - Currency code (uses preference if not provided)
 * @param {string} [locale] - Locale code (uses preference if not provided)
 * @returns {string} Formatted currency string
 */
export function formatCurrencyWithPreferences(amount, currency, locale) {
  const prefs = usePreferencesStore.getState();
  const currencyCode = currency || prefs.currency;
  const localeCode = locale || prefs.numberFormat;

  return new Intl.NumberFormat(localeCode, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

/**
 * Format date using user preferences
 * @param {Date|string} date - Date to format
 * @param {string} [formatStr] - Format string (uses preference if not provided)
 * @returns {string} Formatted date string
 */
export function formatDateWithPreferences(date, formatStr) {
  const prefs = usePreferencesStore.getState();
  const dateFormatStr = formatStr || prefs.dateFormat;

  if (typeof date === 'string') {
    return format(parseISO(date), dateFormatStr);
  }
  return format(date, dateFormatStr);
}

/**
 * Get available currency options
 */
export const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'US Dollar ($)', symbol: '$' },
  { value: 'EUR', label: 'Euro (€)', symbol: '€' },
  { value: 'GBP', label: 'British Pound (£)', symbol: '£' },
  { value: 'JPY', label: 'Japanese Yen (¥)', symbol: '¥' },
  { value: 'CAD', label: 'Canadian Dollar (C$)', symbol: 'C$' },
  { value: 'AUD', label: 'Australian Dollar (A$)', symbol: 'A$' },
  { value: 'CHF', label: 'Swiss Franc (CHF)', symbol: 'CHF' },
  { value: 'CNY', label: 'Chinese Yuan (¥)', symbol: '¥' },
  { value: 'INR', label: 'Indian Rupee (₹)', symbol: '₹' },
];

/**
 * Get available date format options
 */
export const DATE_FORMAT_OPTIONS = [
  { value: 'MMM dd, yyyy', label: 'Jan 01, 2024', example: 'Jan 01, 2024' },
  { value: 'dd/MM/yyyy', label: '01/01/2024', example: '01/01/2024' },
  { value: 'MM/dd/yyyy', label: '01/01/2024 (US)', example: '01/01/2024' },
  { value: 'yyyy-MM-dd', label: '2024-01-01 (ISO)', example: '2024-01-01' },
  { value: 'MMMM dd, yyyy', label: 'January 01, 2024', example: 'January 01, 2024' },
];

/**
 * Get available number format options
 */
export const NUMBER_FORMAT_OPTIONS = [
  { value: 'en-US', label: 'English (US) - 1,234.56' },
  { value: 'en-GB', label: 'English (UK) - 1,234.56' },
  { value: 'de-DE', label: 'German - 1.234,56' },
  { value: 'fr-FR', label: 'French - 1 234,56' },
  { value: 'es-ES', label: 'Spanish - 1.234,56' },
];
