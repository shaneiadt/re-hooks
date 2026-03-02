import { act, renderHook, waitFor } from "@testing-library/react";

import { describe, expect, it, vi } from "vitest";
import { useClipboard } from "../useClipboard";

const fetchMock = vi.fn();
const write = vi.fn();
const ClipboardItemMock = vi.fn();
const blob = vi.fn();
const error = vi.fn();

vi.stubGlobal("fetch", fetchMock);

Object.assign(navigator, {
  clipboard: {
    write,
  },
});

Object.assign(globalThis, {
  ClipboardItem: ClipboardItemMock,
});

console.error = error;

describe(useClipboard, () => {
  it("should copy some text", async () => {
    const { result } = renderHook(() => useClipboard());

    act(() => {
      result.current.addToClipboard({ text: "copy me!" });
    });

    await waitFor(() => {
      expect(ClipboardItemMock).toHaveBeenCalled();
      expect(write).toHaveBeenCalled();
    });
  });

  it("should copy an image", async () => {
    const { result } = renderHook(() => useClipboard());

    blob.mockReturnValueOnce({ type: "some text" });
    fetchMock.mockResolvedValueOnce({
      blob,
    });

    act(() => {
      result.current.addToClipboard({ url: "https://www.fakeurl.com" });
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
      expect(blob).toHaveBeenCalled();
      expect(write).toHaveBeenCalled();
    });
  });

  it("should throw an error", async () => {
    const { result } = renderHook(() => useClipboard());

    write.mockRejectedValueOnce(new Error("foo"));

    act(() => {
      result.current.addToClipboard({ text: "texttexttext" });
    });

    await waitFor(() => {
      expect(error).toHaveBeenCalled();
    });
  });
});
