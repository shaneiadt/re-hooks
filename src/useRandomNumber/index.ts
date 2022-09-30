import { useState, useEffect } from 'react';

export interface useRandomNumberProps {
  min: number;
  max: number;
}

export const useRandomNumber = ({ min, max }: useRandomNumberProps) => {
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
