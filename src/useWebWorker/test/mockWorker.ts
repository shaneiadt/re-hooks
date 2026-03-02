import { vi } from "vitest";

export const mockWorker = () => {
  const postMessage = vi.fn();
  const onmessage = vi.fn();
  const createObjectURL = vi.fn();

  class Worker {
    onmessage: any;
    url: any;
    constructor(stringUrl: any) {
      this.url = stringUrl;
    }

    postMessage(msg: any) {
      postMessage();
      onmessage();
      this.onmessage(msg);
    }
    onmessageerror() {
      // intentionally empty
    }
    terminate() {
      // intentionally empty
    }
    addEventListener() {
      // intentionally empty
    }
    removeEventListener() {
      // intentionally empty
    }
    dispatchEvent() {
      return true;
    }
    onerror() {
      // intentionally empty
    }
  }

  globalThis.Worker = Worker;
  globalThis.URL.createObjectURL = createObjectURL;

  return {
    postMessage,
    onmessage,
    createObjectURL,
  };
};
