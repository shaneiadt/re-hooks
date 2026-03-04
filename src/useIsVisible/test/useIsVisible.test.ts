import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useIsVisible } from "../useIsVisible";

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  callback: IntersectionObserverCallback;
  options: IntersectionObserverInit;
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();

  constructor(
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {},
  ) {
    this.callback = callback;
    this.options = options;
    MockIntersectionObserver.instances.push(this);
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  trigger(isIntersecting: boolean) {
    const entry = { isIntersecting } as IntersectionObserverEntry;
    this.callback([entry], this as unknown as IntersectionObserver);
  }
}

describe("useIsVisible", () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal(
      "IntersectionObserver",
      MockIntersectionObserver as unknown as typeof IntersectionObserver,
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("tracks visibility changes for the observed element", () => {
    const { result } = renderHook(() => useIsVisible());
    const element = document.createElement("div");

    act(() => {
      result.current[0](element);
    });

    expect(MockIntersectionObserver.instances).toHaveLength(1);
    expect(MockIntersectionObserver.instances[0].observe).toHaveBeenCalledWith(
      element,
    );

    act(() => {
      MockIntersectionObserver.instances[0].trigger(true);
    });

    expect(result.current[1]).toBe(true);

    act(() => {
      MockIntersectionObserver.instances[0].trigger(false);
    });

    expect(result.current[1]).toBe(false);
  });

  it("recreates observer when options change", () => {
    const rootA = document.createElement("section");
    const rootB = document.createElement("article");

    const { result, rerender } = renderHook(
      ({ root, rootMargin }) => useIsVisible({ root, rootMargin }),
      {
        initialProps: {
          root: rootA,
          rootMargin: "0px",
        },
      },
    );

    const element = document.createElement("div");

    act(() => {
      result.current[0](element);
    });

    expect(MockIntersectionObserver.instances).toHaveLength(1);
    expect(MockIntersectionObserver.instances[0].options.root).toBe(rootA);
    expect(MockIntersectionObserver.instances[0].options.rootMargin).toBe(
      "0px",
    );

    rerender({ root: rootB, rootMargin: "20px" });

    expect(
      MockIntersectionObserver.instances[0].disconnect,
    ).toHaveBeenCalledTimes(1);
    expect(MockIntersectionObserver.instances).toHaveLength(2);
    expect(MockIntersectionObserver.instances[1].options.root).toBe(rootB);
    expect(MockIntersectionObserver.instances[1].options.rootMargin).toBe(
      "20px",
    );
  });

  it("sets visible to true when IntersectionObserver is unavailable", () => {
    vi.stubGlobal("IntersectionObserver", undefined);

    const { result } = renderHook(() => useIsVisible());

    act(() => {
      result.current[0](document.createElement("div"));
    });

    expect(result.current[1]).toBe(true);
  });

  it("disconnects observer on unmount", () => {
    const { result, unmount } = renderHook(() => useIsVisible());

    act(() => {
      result.current[0](document.createElement("div"));
    });

    const instance = MockIntersectionObserver.instances[0];

    unmount();

    expect(instance.disconnect).toHaveBeenCalledTimes(1);
  });
});
