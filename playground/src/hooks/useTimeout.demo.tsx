import { useState } from "react";
import { useTimeout } from "use-re-hooks";

export const meta = {
  id: "useTimeout",
  title: "useTimeout",
  description: "Runs a one-shot callback after a delay while enabled.",
};

export default function UseTimeoutDemo() {
  const [seconds, setSeconds] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState("Click start to begin the timer.");

  useTimeout(
    () => {
      setIsRunning(false);
      setMessage(`Timer finished after ${seconds} second${seconds === 1 ? "" : "s"}.`);
    },
    seconds * 1000,
    isRunning,
  );

  const handleStart = () => {
    setMessage(`Timer running for ${seconds} second${seconds === 1 ? "" : "s"}...`);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMessage("Click start to begin the timer.");
  };

  return (
    <div className="demo">
      <label htmlFor="timeout-seconds">Delay in seconds</label>
      <input
        id="timeout-seconds"
        type="number"
        min={1}
        max={10}
        value={seconds}
        onChange={(event) => setSeconds(Number(event.target.value) || 1)}
      />

      <p>
        <strong>Status:</strong> {isRunning ? "Running" : "Idle"}
      </p>
      <p>
        <strong>Message:</strong> {message}
      </p>

      <div style={{ display: "flex", gap: 12 }}>
        <button type="button" onClick={handleStart} disabled={isRunning}>
          Start Timeout
        </button>
        <button type="button" onClick={handleReset}>
          Cancel
        </button>
      </div>
    </div>
  );
}
