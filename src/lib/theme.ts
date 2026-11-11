import { useEffect } from 'react';
import { useStoredState } from './storage';

export type ThemeChoice = 'system' | 'light' | 'dark';

// Must match the key read by the pre-paint script in index.html.
export const THEME_KEY = 're:theme';

const order: ThemeChoice[] = ['system', 'light', 'dark'];

export function useTheme() {
  const [choice, setChoice] = useStoredState<ThemeChoice>(THEME_KEY, 'system');

  useEffect(() => {
    const root = document.documentElement;
    if (choice === 'system') delete root.dataset.theme;
    else root.dataset.theme = choice;
  }, [choice]);

  const next = order[(order.indexOf(choice) + 1) % order.length] ?? 'system';
  return { choice, cycle: () => setChoice(next), next };
}
