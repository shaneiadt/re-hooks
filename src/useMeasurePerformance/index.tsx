import { useState } from 'react';

export type Entry = {
  name: string;
  func: () => void;
};

export interface useMeasurePerformanceProps {
  entries: Entry[];
}

interface Result {
  name: string;
  duration: number;
}

enum Labels {
  measurement = 'measurement',
  start = 'start',
  end = 'end',
}

export const useMeasurePerformance = ({
  entries,
}: useMeasurePerformanceProps): {
  results: Result[];
  measure: () => void;
} => {
  const [results, setResults] = useState<Result[]>([]);

  const measure = () => {
    const labels: string[] = [];
    const output: Result[] = [];

    for (const entry of entries) {
      const { name, func } = entry;

      labels.push(`${name}`);

      performance.mark(`${name}-${Labels.start}`);
      func();
      performance.mark(`${name}-${Labels.end}`);

      performance.measure(
        `${name} ${Labels.measurement}`,
        `${name}-${Labels.start}`,
        `${name}-${Labels.end}`
      );
      output.push({
        name,
        duration: performance.getEntriesByName(
          `${name} ${Labels.measurement}`
        )[0].duration,
      });
    }

    setResults(output);
  };

  return {
    results,
    measure,
  };
};
