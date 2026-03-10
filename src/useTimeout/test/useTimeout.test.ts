import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useTimeout } from "../useTimeout";

describe("useTimeout", () => {
  it("fires the callback after the configured delay", () => {
    vi.useFakeTimers();

    try {
      const callback = vi.fn();

      renderHook(() => useTimeout(callback, 200, true));

      expect(callback).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(199);
      });

      expect(callback).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(1);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });

  it("does not schedule the callback when disabled", () => {
    vi.useFakeTimers();

    try {
      const callback = vi.fn();

      renderHook(() => useTimeout(callback, 200, false));

      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(callback).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });

  it("clears the timeout on unmount", () => {
    vi.useFakeTimers();

    try {
      const callback = vi.fn();
      const clearTimeoutSpy = vi.spyOn(globalThis, "clearTimeout");
      const { unmount } = renderHook(() => useTimeout(callback, 200, true));

      unmount();

      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(callback).not.toHaveBeenCalled();
      expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
    } finally {
      vi.restoreAllMocks();
      vi.useRealTimers();
    }
  });

  it("reschedules the timeout when the duration changes", () => {
    vi.useFakeTimers();

    try {
      const callback = vi.fn();

      const { rerender } = renderHook(
        ({ duration }) => useTimeout(callback, duration, true),
        {
          initialProps: { duration: 200 },
        },
      );

      act(() => {
        vi.advanceTimersByTime(100);
      });

      rerender({ duration: 300 });

      act(() => {
        vi.advanceTimersByTime(199);
      });

      expect(callback).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(101);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });

  it("uses the latest callback without restarting the timer", () => {
    vi.useFakeTimers();

    try {
      const firstCallback = vi.fn();
      const secondCallback = vi.fn();

      const { rerender } = renderHook(
        ({ callback }) => useTimeout(callback, 200, true),
        {
          initialProps: { callback: firstCallback },
        },
      );

      act(() => {
        vi.advanceTimersByTime(100);
      });

      rerender({ callback: secondCallback });

      act(() => {
        vi.advanceTimersByTime(99);
      });

      expect(firstCallback).not.toHaveBeenCalled();
      expect(secondCallback).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(1);
      });

      expect(firstCallback).not.toHaveBeenCalled();
      expect(secondCallback).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });
});
