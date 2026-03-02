import { beforeEach, describe, expect, it, vi } from "vitest";
import readAsText from "./readAsText";

class FileReaderMock {
  DONE = FileReader.DONE;
  EMPTY = FileReader.EMPTY;
  LOADING = FileReader.LOADING;
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
  const fileReader = new FileReaderMock();
  vi.spyOn(globalThis, "FileReader").mockImplementation(() => fileReader);

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
