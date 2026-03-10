import { useEffect, useState } from 'react';

/**
 * Composes functions from right to left and stores the latest computed result.
 *
 * Each function receives the previous function's output, starting from `null`.
 *
 * @param fns - Functions to compose from right to left
 * @returns The composed result
 *
 * @example
 * ```ts
 * const { result } = useCompose<number>([
 *   (value) => (value ?? 0) + 1,
 *   () => 10,
 * ]);
 * ```
 */
export const useCompose = <T,>(fns: ((arg: T | null) => T | null)[]) => {
  const [result, setResult] = useState<T | null>(null);

  useEffect(() => {
    setResult(fns.reduceRight((cur: T | null, fn) => fn(cur), null));
  }, [fns]);

  return {
    result,
  };
};
