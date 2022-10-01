import { useEffect, useState } from 'react';

export const usePipe = <T,>(fns: ((arg: T | null) => T | null)[]) => {
  const [result, setResult] = useState<T | null>(null);

  useEffect(() => {
    setResult(fns.reduce((cur: T | null, fn) => fn(cur), null));
  }, [fns]);

  return {
    result,
  };
};
