import { renderHook } from "@testing-library/react";

import { usePipe } from "../usePipe";
import { describe, expect, it } from "vitest";

describe(usePipe, () => {
  it("should render the correct number result", () => {
    const fn1 = () => 4;
    const fn2 = (arg: number | null) => 2 + Number(arg);
    const fn3 = (arg: number | null) => 10 + Number(arg);

    let initialProps = [fn1, fn2, fn3];

    const { result, rerender } = renderHook(() =>
      usePipe<number>(initialProps),
    );

    expect(result.current.result).toEqual(16);

    initialProps = [fn1, fn3];

    rerender();

    expect(result.current.result).toEqual(14);
  });

  it("should render the correct string result", () => {
    const fn1 = () => "first";
    const fn2 = (arg: string | null) => arg + " second";
    const fn3 = (arg: string | null) => arg + " third";

    let initialProps = [fn1, fn2, fn3];

    const { result, rerender } = renderHook(() =>
      usePipe<string>(initialProps),
    );

    expect(result.current.result).toEqual("first second third");

    initialProps = [fn1, fn3];

    rerender();

    expect(result.current.result).toEqual("first third");
  });
});
