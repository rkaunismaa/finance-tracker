import { Modal, Button } from '../common/index.js';
import usePreferencesStore from '../../store/usePreferencesStore.js';

function DashboardCustomizeModal({ isOpen, onClose }) {
  const { dashboardLayout, setDashboardLayout } = usePreferencesStore((state) => ({
    dashboardLayout: state.dashboardLayout,
    setDashboardLayout: state.setDashboardLayout,
  }));

  const toggleSection = (section) => {
    setDashboardLayout({ [section]: !dashboardLayout[section] });
  };

  const sections = [
    { key: 'showSummary', label: 'Summary Cards', description: 'Total income, expenses, and balance' },
    { key: 'showTrends', label: 'Trends Chart', description: 'Monthly income and expense trends' },
    { key: 'showCategoryBreakdown', label: 'Category Breakdown', description: 'Spending by category pie chart' },
    { key: 'showRecentTransactions', label: 'Recent Transactions', description: 'Latest 5 transactions' },
    { key: 'showGoals', label: 'Goals Overview', description: 'Active savings goals progress' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Customize Dashboard">
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Choose which sections to display on your dashboard.
        </p>

        <div className="space-y-3">
          {sections.map((section) => (
            <label
              key={section.key}
              className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <input
                type="checkbox"
                checked={dashboardLayout[section.key]}
                onChange={() => toggleSection(section.key)}
                className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white">
                  {section.label}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {section.description}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <Modal.Footer>
        <Button onClick={onClose}>Done</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DashboardCustomizeModal;
