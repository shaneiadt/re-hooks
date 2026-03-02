import { renderHook } from "@testing-library/react";
import { useRandomNumber } from "../useRandomNumber";
import { describe, expect, it } from "vitest";

describe(useRandomNumber, () => {
  it("should generate a random number", () => {
    const intialProps = { min: 1, max: 69 };
    const { result, rerender } = renderHook(() => useRandomNumber(intialProps));

    expect(result.current.value).toBeGreaterThanOrEqual(1);
    expect(result.current.value).toBeLessThanOrEqual(69);

    intialProps.min = 100;
    intialProps.max = 500;

    rerender();

    expect(result.current.value).toBeGreaterThanOrEqual(100);
    expect(result.current.value).toBeLessThanOrEqual(500);
  });
});
