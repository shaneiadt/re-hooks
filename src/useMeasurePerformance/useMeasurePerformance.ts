import { useState } from "react";

export type Entry = {
  name: string;
  func: () => void;
};

export interface UseMeasurePerformanceProps {
  entries: Entry[];
}

interface Result {
  name: string;
  duration: number;
}

enum Labels {
  measurement = "measurement",
  start = "start",
  end = "end",
}

/**
 * Measures how long a set of synchronous functions take to execute.
 *
 * Calling `measure` runs each entry, records browser performance marks, and
 * stores the measured durations in state.
 *
 * @param props - Entries to measure
 * @returns Measurement results and a trigger function
 *
 * @example
 * ```ts
 * const { results, measure } = useMeasurePerformance({
 *   entries: [{ name: "task", func: () => heavyWork() }],
 * });
 * ```
 */
export const useMeasurePerformance = ({
  entries,
}: Readonly<UseMeasurePerformanceProps>): {
  results: Result[];
  measure: () => void;
} => {
  const [results, setResults] = useState<Result[]>([]);

  const measure = () => {
    const output: Result[] = [];

    for (const entry of entries) {
      const { name, func } = entry;

      performance.mark(`${name}-${Labels.start}`);
      func();
      performance.mark(`${name}-${Labels.end}`);

      performance.measure(
        `${name} ${Labels.measurement}`,
        `${name}-${Labels.start}`,
        `${name}-${Labels.end}`,
      );
      output.push({
        name,
        duration: performance.getEntriesByName(
          `${name} ${Labels.measurement}`,
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
