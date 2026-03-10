import { useState, useEffect } from "react";

export interface UseRandomNumberProps {
  min: number;
  max: number;
}

/**
 * Generates a random integer within the provided inclusive range.
 *
 * A new number is generated whenever `min` or `max` change.
 *
 * @param props - Inclusive minimum and maximum values
 * @returns The generated random value
 *
 * @example
 * ```ts
 * const { value } = useRandomNumber({ min: 1, max: 6 });
 * ```
 */
export const useRandomNumber = ({
  min,
  max,
}: Readonly<UseRandomNumberProps>) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const localMin = Math.ceil(min);
    const localMax = Math.floor(max);

    setValue(Math.floor(Math.random() * (localMax - localMin + 1)) + localMin);
  }, [min, max]);

  return {
    value,
  };
};
