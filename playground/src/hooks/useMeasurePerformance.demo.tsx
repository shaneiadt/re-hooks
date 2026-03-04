import { useMemo, useState } from "react";
import { useMeasurePerformance } from "use-re-hooks";

export const meta = {
  id: "useMeasurePerformance",
  title: "useMeasurePerformance",
  description: "Measures sync function runtimes with the Performance API.",
};

const runLoop = (iterations: number) => {
  let value = 0;
  for (let i = 0; i < iterations; i += 1) {
    value += i % 10;
  }
  return value;
};

export default function UseMeasurePerformanceDemo() {
  const [size, setSize] = useState(200000);

  const entries = useMemo(
    () => [
      { name: "small", func: () => runLoop(Math.floor(size / 4)) },
      { name: "medium", func: () => runLoop(Math.floor(size / 2)) },
      { name: "large", func: () => runLoop(size) },
    ],
    [size],
  );

  const { measure, results } = useMeasurePerformance({ entries });

  return (
    <div className="demo">
      <label htmlFor="perf-size">Iteration size</label>
      <input
        id="perf-size"
        type="number"
        min={1000}
        step={1000}
        value={size}
        onChange={(event) => setSize(Number(event.target.value))}
      />

      <button type="button" onClick={measure}>
        Measure
      </button>

      {results.length === 0 ? (
        <p>No measurements yet.</p>
      ) : (
        results.map((entry) => (
          <p key={entry.name}>
            <strong>{entry.name}:</strong>{" "}
            <code>{entry.duration.toFixed(3)} ms</code>
          </p>
        ))
      )}
    </div>
  );
}
