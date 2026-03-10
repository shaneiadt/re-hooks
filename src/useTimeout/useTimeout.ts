import { useEffect, useRef } from "react";

/**
 * Schedules a one-shot callback after a delay while enabled.
 *
 * The latest callback is always invoked without restarting the timer just
 * because the callback identity changed.
 *
 * @param callback - Function to invoke after the timeout completes
 * @param duration - Delay in milliseconds before the callback runs
 * @param enabled - Whether the timeout should be active
 *
 * @example
 * ```tsx
 * function Toast() {
 *   const [open, setOpen] = useState(true);
 *
 *   useTimeout(() => {
 *     setOpen(false);
 *   }, 3000, open);
 *
 *   return open ? <div>Saved</div> : null;
 * }
 * ```
 */
export function useTimeout(
  callback: () => void,
  duration: number,
  enabled = true,
): void {
  const latestCallback = useRef(callback);

  useEffect(() => {
    latestCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const timeout = globalThis.setTimeout(() => {
      latestCallback.current();
    }, duration);

    return () => {
      globalThis.clearTimeout(timeout);
    };
  }, [duration, enabled]);
}
