import { useEffect, useState } from "react";

export type Work = () => (this: Window, e: MessageEvent) => void;

export enum STATUS {
  IDLE = "IDLE",
  SUCCESS = "SUCCESS",
  UNSUPPORTED = "UNSUPPORTED",
  ERROR = "ERROR",
  PROCESSING = "PROCESSING",
}

const fnToworkerURL = (fn: Function) => {
  const blob = new Blob([`(${fn.toString()})()`], {
    type: "text/javascript",
  });

  return URL.createObjectURL(blob);
};

/**
 * Creates a Web Worker from a function and exposes helpers for posting data
 * and replacing the worker action.
 *
 * @param action - Function used to bootstrap the worker
 * @returns Worker messaging helpers, latest result, and worker status
 *
 * @example
 * ```ts
 * const { postMessage, result, status } = useWebWorker<number, number>(() => {
 *   self.onmessage = (event) => {
 *     self.postMessage(event.data * 2);
 *   };
 * });
 * ```
 */
export const useWebWorker = <T, K>(
  action: () => void,
): {
  postMessage: (arg: T) => void;
  result: K | undefined;
  status: { status: STATUS; error?: ErrorEvent };
  updateAction: (userAction: () => void) => void;
} => {
  const [result, setResult] = useState<K>();
  const [status, setStatus] = useState<{ status: STATUS; error?: ErrorEvent }>({
    status: STATUS.IDLE,
  });
  const [instance, setInstance] = useState<Worker>();

  useEffect(() => {
    if (!globalThis.Worker) return setStatus({ status: STATUS.UNSUPPORTED });

    setEventListeners(new Worker(fnToworkerURL(action)));
  }, [action]);

  const setEventListeners = (instance: Worker) => {
    setStatus({ status: STATUS.IDLE });
    setResult(undefined);

    instance.onmessage = ({ data }) => {
      setStatus({ status: STATUS.SUCCESS });
      if (data) {
        setResult(data);
      }
    };

    instance.onerror = (error) => {
      setStatus({ status: STATUS.ERROR, error });
    };

    setInstance(() => instance);
  };

  const postMessage = (arg: T) => {
    setStatus({ status: STATUS.PROCESSING });
    instance?.postMessage(arg);
  };

  const updateAction = (newAction: () => void) => {
    setEventListeners(new Worker(fnToworkerURL(newAction)));
  };

  return { postMessage, result, status, updateAction };
};
