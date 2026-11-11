import { useCallback, useMemo, useSyncExternalStore } from 'react';

// Browser storage can throw (private mode, blocked site data), so every access is guarded.
const listeners = new Set<() => void>();

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeRaw(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    // Storage is a convenience here; the page still works without it.
  }
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  window.addEventListener('storage', notify);
  return () => {
    listeners.delete(notify);
    window.removeEventListener('storage', notify);
  };
}

/**
 * State saved in localStorage. The server render and the first client render
 * both use the fallback, so hydration never mismatches.
 */
export function useStoredState<T>(
  key: string,
  fallback: T,
): [T, (next: T) => void] {
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(key),
    () => null,
  );

  const value = useMemo(() => {
    if (raw === null) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
    // The fallback is a default, not an input; only the stored value matters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw]);

  const setValue = useCallback(
    (next: T) => writeRaw(key, JSON.stringify(next)),
    [key],
  );

  return [value, setValue];
}

export function clearStored(keys: string[]) {
  keys.forEach((key) => writeRaw(key, null));
}
