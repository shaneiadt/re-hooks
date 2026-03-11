import { renderHook } from "@testing-library/react";

import { useCompose } from "../useCompose";
import { describe, expect, it } from "vitest";

describe(useCompose, () => {
  it("should render the correct number result", () => {
    const fn1 = (arg: number | null) => 4 + Number(arg);
    const fn2 = (arg: number | null) => 2 + Number(arg);
    const fn3 = () => 10;

    let initialProps = [fn1, fn2, fn3];

    const { result, rerender } = renderHook(() =>
      useCompose<number>(initialProps),
    );

    expect(result.current.result).toEqual(16);

    initialProps = [fn1, fn3];

    rerender();

    expect(result.current.result).toEqual(14);
  });

  it("should render the correct string result", () => {
    const fn3 = () => "first";
    const fn2 = (arg: string | null) => arg + " second";
    const fn1 = (arg: string | null) => arg + " third";

    let initialProps = [fn1, fn2, fn3];

    const { result, rerender } = renderHook(() =>
      useCompose<string>(initialProps),
    );

    expect(result.current.result).toEqual("first second third");

    initialProps = [fn1, fn3];

    rerender();

    expect(result.current.result).toEqual("first third");
  });
});
