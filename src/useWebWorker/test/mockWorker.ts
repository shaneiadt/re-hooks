import { vi } from "vitest";

type WorkerMessageHandler = ((event: MessageEvent<unknown>) => void) | null;

class MockWorker implements Worker {
  onmessage: WorkerMessageHandler = null;
  onmessageerror: ((this: Worker, ev: MessageEvent) => void) | null = null;
  onerror: ((this: AbstractWorker, ev: ErrorEvent) => void) | null = null;

  readonly url: string | URL;

  constructor(stringUrl: string | URL) {
    this.url = stringUrl;
  }

  postMessage(message: unknown): void {
    mockFns.postMessage();
    mockFns.onmessage();
    this.onmessage?.({ data: message } as MessageEvent<unknown>);
  }

  terminate(): void {
    // intentionally empty
  }

  addEventListener(): void {
    // intentionally empty
  }

  removeEventListener(): void {
    // intentionally empty
  }

  dispatchEvent(): boolean {
    return true;
  }
}

const mockFns = {
  postMessage: vi.fn(),
  onmessage: vi.fn(),
  createObjectURL: vi.fn<(obj: Blob | MediaSource) => string>(() => "blob:mock-worker"),
};

export const mockWorker = () => {
  globalThis.Worker = MockWorker;
  globalThis.URL.createObjectURL = mockFns.createObjectURL;

  return mockFns;
};
