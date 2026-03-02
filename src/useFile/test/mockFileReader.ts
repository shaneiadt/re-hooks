import { vi } from "vitest";

export const mockFilerReader = () => {
  const addEventListener = vi.fn();
  const readAsText = vi.fn();

  class FileReaderMock {
    DONE = FileReader.DONE;
    EMPTY = FileReader.EMPTY;
    LOADING = FileReader.LOADING;
    readyState = 0;
    error: FileReader["error"] = null;
    result: FileReader["result"] = null;
    abort = vi.fn();
    addEventListener = addEventListener;
    dispatchEvent = vi.fn();
    onabort = vi.fn();
    onerror = vi.fn();
    onload = vi.fn();
    onloadend = vi.fn();
    onloadprogress = vi.fn();
    onloadstart = vi.fn();
    onprogress = vi.fn();
    readAsArrayBuffer = vi.fn();
    readAsBinaryString = vi.fn();
    readAsDataURL = vi.fn();
    readAsText = vi.fn();
    removeEventListener = vi.fn();
  }

  Object.defineProperty(global, "FileReader", {
    configurable: true,
    value: FileReaderMock,
  });

  return {
    addEventListener,
    readAsText,
  };
};
