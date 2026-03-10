import { useEffect, useState } from 'react';

/**
 * Pipes functions from left to right and stores the latest computed result.
 *
 * Each function receives the previous function's output, starting from `null`.
 *
 * @param fns - Functions to pipe from left to right
 * @returns The piped result
 *
 * @example
 * ```ts
 * const { result } = usePipe<number>([
 *   () => 10,
 *   (value) => (value ?? 0) + 2,
 * ]);
 * ```
 */
export const usePipe = <T,>(fns: ((arg: T | null) => T | null)[]) => {
  const [result, setResult] = useState<T | null>(null);

  useEffect(() => {
    setResult(fns.reduce((cur: T | null, fn) => fn(cur), null));
  }, [fns]);

  return {
    result,
  };
};
