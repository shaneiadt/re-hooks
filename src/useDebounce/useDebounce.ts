import { useEffect, useState } from "react";

/**
 * Returns a debounced version of a value after the specified delay.
 *
 * The returned value updates only after the input value has stopped changing
 * for the full delay duration.
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds before the debounced value updates
 * @returns The debounced value
 *
 * @example
 * ```tsx
 * const [query, setQuery] = useState("");
 * const debouncedQuery = useDebounce(query, 300);
 * ```
 */
export function useDebounce<T>(value: T, delay = 200): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
