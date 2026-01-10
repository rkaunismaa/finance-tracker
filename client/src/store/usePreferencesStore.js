import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePreferencesStore = create(
  persist(
    (set) => ({
      // Theme
      theme: 'light', // 'light' | 'dark'
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

      // Currency
      currency: 'USD',
      setCurrency: (currency) => set({ currency }),

      // Date format
      dateFormat: 'MMM dd, yyyy', // 'MMM dd, yyyy' | 'dd/MM/yyyy' | 'MM/dd/yyyy' | 'yyyy-MM-dd'
      setDateFormat: (dateFormat) => set({ dateFormat }),

      // Number format
      numberFormat: 'en-US', // 'en-US' | 'en-GB' | 'de-DE' | 'fr-FR'
      setNumberFormat: (numberFormat) => set({ numberFormat }),

      // Dashboard preferences
      dashboardLayout: {
        showSummary: true,
        showTrends: true,
        showCategoryBreakdown: true,
        showRecentTransactions: true,
        showGoals: true,
      },
      setDashboardLayout: (layout) =>
        set((state) => ({
          dashboardLayout: { ...state.dashboardLayout, ...layout },
        })),

      // Pagination preferences
      transactionsPerPage: 10,
      setTransactionsPerPage: (count) => set({ transactionsPerPage: count }),

      // Reset to defaults
      resetPreferences: () =>
        set({
          theme: 'light',
          currency: 'USD',
          dateFormat: 'MMM dd, yyyy',
          numberFormat: 'en-US',
          dashboardLayout: {
            showSummary: true,
            showTrends: true,
            showCategoryBreakdown: true,
            showRecentTransactions: true,
            showGoals: true,
          },
          transactionsPerPage: 10,
        }),
    }),
    {
      name: 'finance-tracker-preferences',
    }
  )
);

export default usePreferencesStore;
