import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useDebounce } from "../useDebounce";

describe("useDebounce", () => {
  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("a", 200));
    expect(result.current).toBe("a");
  });

  it("updates after delay", () => {
    vi.useFakeTimers();
    try {
      let value = "a";
      const { result, rerender } = renderHook(() => useDebounce(value, 200));

      value = "b";
      rerender();
      expect(result.current).toBe("a");

      act(() => {
        vi.advanceTimersByTime(200);
      });
      expect(result.current).toBe("b");
    } finally {
      vi.useRealTimers();
    }
  });
});
