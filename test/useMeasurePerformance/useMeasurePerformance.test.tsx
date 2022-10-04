import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useMeasurePerformance } from '../../src';

const entries = [
  {
    name: 'first',
    func: () => {
      const x = new Array(10000000).fill(Math.random());
      return x;
    },
  },
  {
    name: 'second',
    func: () => {
      const x = new Array(1000000).fill(Math.random());
      return x;
    },
  },
  {
    name: 'third',
    func: () => {
      const x = new Array(1000000).fill(Math.random());
      return x;
    },
  },
];

const duration = 690000;

describe(useMeasurePerformance, () => {
  beforeEach(() => {
    Object.defineProperty(window, 'performance', {
      value: {
        getEntriesByName: jest.fn().mockReturnValue([{ duration }]),
        measure: jest.fn(),
        mark: jest.fn(),
      },
    });
  });

  it('should return an array of performance measurements', () => {
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
