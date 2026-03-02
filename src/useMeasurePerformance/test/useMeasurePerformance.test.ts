import { act, renderHook } from "@testing-library/react";

import { useMeasurePerformance } from "../useMeasurePerformance";
import { beforeEach, describe, expect, it, vi } from "vitest";

const entries = [
  {
    name: "first",
    func: () => {
      const x = new Array(10000000).fill(Math.random());
      return x;
    },
  },
  {
    name: "second",
    func: () => {
      const x = new Array(1000000).fill(Math.random());
      return x;
    },
  },
  {
    name: "third",
    func: () => {
      const x = new Array(1000000).fill(Math.random());
      return x;
    },
  },
];

const duration = 690000;

describe(useMeasurePerformance, () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, "performance", {
      value: {
        getEntriesByName: vi.fn().mockReturnValue([{ duration }]),
        measure: vi.fn(),
        mark: vi.fn(),
      },
    });
  });

  it("should return an array of performance measurements", () => {
    const { result } = renderHook(() => useMeasurePerformance({ entries }));

    act(() => {
      result.current.measure();
    });

    expect(result.current.results).toHaveLength(3);
    expect(result.current.results).toEqual([
      { name: entries[0].name, duration },
      { name: entries[1].name, duration },
      { name: entries[2].name, duration },
    ]);
  });
});
