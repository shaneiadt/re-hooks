import { act, cleanup, fireEvent, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useFile } from "../useFile";

describe("useFile", () => {
  afterEach(() => {
    cleanup();
  });

  it("should add an on change event listener", () => {
    const addEventListener = vi.fn();
    const current = document.createElement("input");
    current.type = "file";
    current.addEventListener = addEventListener;
    const ref = { current } as const;
    renderHook(() => useFile(ref));

    expect(addEventListener).toHaveBeenCalledTimes(1);
    expect(addEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });

  it("should invoke callback with file text when a file is selected", async () => {
    const current = document.createElement("input");
    current.type = "file";
    const ref = { current } as const;
    const callback = vi.fn();

    renderHook(() => useFile(ref, callback));

    const file = {
      text: vi.fn().mockResolvedValue("image content"),
    } as unknown as File;

    act(() => {
      fireEvent.change(current, {
        target: { files: [file] },
      });
    });

    await waitFor(() => {
      expect(file.text).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith("image content");
    });
  });

  it("should not invoke callback when no file is selected", async () => {
    const current = document.createElement("input");
    current.type = "file";
    const ref = { current } as const;
    const callback = vi.fn();

    renderHook(() => useFile(ref, callback));

    act(() => {
      fireEvent.change(current, {
        target: { files: [] },
      });
    });

    await waitFor(() => {
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
