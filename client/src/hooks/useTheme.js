import { useEffect } from 'react';
import usePreferencesStore from '../store/usePreferencesStore.js';

export function useTheme() {
  const { theme, setTheme, toggleTheme } = usePreferencesStore((state) => ({
    theme: state.theme,
    setTheme: state.setTheme,
    toggleTheme: state.toggleTheme,
  }));

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return { theme, setTheme, toggleTheme };
}

export default useTheme;
