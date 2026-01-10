import { Moon, Sun, DollarSign, Calendar, Globe, RotateCcw, Download } from 'lucide-react';
import { Header } from '../components/layout/index.js';
import { Card, Button, Select } from '../components/common/index.js';
import usePreferencesStore from '../store/usePreferencesStore.js';
import useTheme from '../hooks/useTheme.js';
import {
  CURRENCY_OPTIONS,
  DATE_FORMAT_OPTIONS,
  NUMBER_FORMAT_OPTIONS,
} from '../utils/formatWithPreferences.js';

function Settings() {
  const {
    currency,
    setCurrency,
    dateFormat,
    setDateFormat,
    numberFormat,
    setNumberFormat,
    transactionsPerPage,
    setTransactionsPerPage,
    resetPreferences,
  } = usePreferencesStore();

  const { theme, toggleTheme } = useTheme();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all preferences to defaults?')) {
      resetPreferences();
    }
  };

  return (
    <div>
      <Header
        title="Settings"
        subtitle="Manage your application preferences"
        actions={
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
        }
      />

      <div className="space-y-6">
        {/* Appearance */}
        <Card>
          <Card.Header>
            <Card.Title>Appearance</Card.Title>
            <Card.Description>
              Customize how the application looks
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? (
                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white">
                      Theme
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Choose light or dark mode
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={toggleTheme}
                  className="min-w-[120px]"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-4 h-4 mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 mr-2" />
                      Dark Mode
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Regional Settings */}
        <Card>
          <Card.Header>
            <Card.Title>Regional Settings</Card.Title>
            <Card.Description>
              Configure currency, date, and number formats
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-6">
              {/* Currency */}
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Currency
                  </label>
                  <Select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    options={CURRENCY_OPTIONS}
                    className="max-w-xs"
                  />
                </div>
              </div>

              {/* Date Format */}
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Date Format
                  </label>
                  <Select
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    options={DATE_FORMAT_OPTIONS}
                    className="max-w-xs"
                  />
                </div>
              </div>

              {/* Number Format */}
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Number Format
                  </label>
                  <Select
                    value={numberFormat}
                    onChange={(e) => setNumberFormat(e.target.value)}
                    options={NUMBER_FORMAT_OPTIONS}
                    className="max-w-xs"
                  />
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Display Preferences */}
        <Card>
          <Card.Header>
            <Card.Title>Display Preferences</Card.Title>
            <Card.Description>
              Customize how data is displayed
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Transactions per page
                </label>
                <Select
                  value={transactionsPerPage}
                  onChange={(e) => setTransactionsPerPage(Number(e.target.value))}
                  options={[
                    { value: 5, label: '5' },
                    { value: 10, label: '10' },
                    { value: 25, label: '25' },
                    { value: 50, label: '50' },
                    { value: 100, label: '100' },
                  ]}
                  className="max-w-xs"
                />
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Data Management */}
        <Card>
          <Card.Header>
            <Card.Title>Data Management</Card.Title>
            <Card.Description>
              Export your financial data
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">
                    Export Transactions
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Download all your transactions as CSV
                  </p>
                </div>
                <Button variant="outline" onClick={() => window.dispatchEvent(new CustomEvent('export-csv'))}>
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

export default Settings;
