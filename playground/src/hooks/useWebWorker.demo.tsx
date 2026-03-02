import { useMemo, useState } from "react";
import { STATUS, useWebWorker } from "use-re-hooks";

export const meta = {
  id: "useWebWorker",
  title: "useWebWorker",
  description: "Runs heavy work in a Web Worker and reports status changes.",
};

const fibonacciJob = () =>
  (onmessage = (event) => {
    const input = Number(event.data) || 0;
    let prev = 0;
    let curr = 1;

    if (input <= 0) {
      postMessage(0);
      return;
    }

    for (let i = 2; i <= input; i += 1) {
      const next = prev + curr;
      prev = curr;
      curr = next;
    }

    postMessage(input === 1 ? 1 : curr);
  });

export default function UseWebWorkerDemo() {
  const [input, setInput] = useState(40);
  const action = useMemo(() => fibonacciJob, []);
  const { postMessage, result, status, updateAction } = useWebWorker<
    number,
    number
  >(action);

  const unsupported = status.status === STATUS.UNSUPPORTED;

  return (
    <div className="demo">
      <label htmlFor="worker-input">Fibonacci input (n)</label>
      <input
        id="worker-input"
        type="number"
        min={0}
        max={90}
        value={input}
        onChange={(event) => setInput(Number(event.target.value))}
      />

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => postMessage(input)}
          disabled={unsupported}
        >
          Run Worker
        </button>
        <button type="button" onClick={() => updateAction(fibonacciJob)}>
          Reset Worker
        </button>
      </div>

      <p>
        <strong>Status:</strong> <code>{status.status}</code>
      </p>

      {status.status === STATUS.ERROR ? (
        <p>
          <strong>Error:</strong> <code>{status.error?.message || "unknown"}</code>
        </p>
      ) : null}

      {unsupported ? (
        <p>
          <strong>Note:</strong> This environment does not support Web Workers.
        </p>
      ) : (
        <p>
          <strong>Result:</strong>{" "}
          <code>{typeof result === "number" ? result : "(no result yet)"}</code>
        </p>
      )}
    </div>
  );
}
