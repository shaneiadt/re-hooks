import { beforeEach, describe, expect, it, vi } from "vitest";
import readAsText from "./readAsText";

const NativeFileReader = globalThis.FileReader;

class FileReaderMock {
  DONE = NativeFileReader.DONE;
  EMPTY = NativeFileReader.EMPTY;
  LOADING = NativeFileReader.LOADING;
  readyState: 0 | 1 | 2 = 0;
  error: FileReader["error"] = null;
  result: FileReader["result"] = null;
  abort = vi.fn();
  addEventListener = vi.fn();
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

describe("readAsText()", () => {
  const file = new File([new ArrayBuffer(1)], "file.jpg");
  let fileReader: FileReaderMock;

  beforeEach(() => {
    fileReader = new FileReaderMock();
    vi.stubGlobal(
      "FileReader",
      class {
        constructor() {
          return fileReader;
        }
      } as unknown as typeof FileReader,
    );
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should resolve file as data URL", async () => {
    fileReader.result = "file content";
    fileReader.addEventListener.mockImplementation((_, fn) => fn());

    const content = await readAsText(file);

    expect(content).toBe("file content");
    expect(fileReader.readAsText).toHaveBeenCalledTimes(1);
    expect(fileReader.readAsText).toHaveBeenCalledWith(file);
  });
});
