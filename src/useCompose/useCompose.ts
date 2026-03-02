import { useEffect, useState } from 'react';

export const useCompose = <T,>(fns: ((arg: T | null) => T | null)[]) => {
  const [result, setResult] = useState<T | null>(null);

  useEffect(() => {
    setResult(fns.reduceRight((cur: T | null, fn) => fn(cur), null));
  }, [fns]);

  return {
    result,
  };
};
