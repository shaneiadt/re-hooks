import { renderHook } from '@testing-library/react';

import { useCompose } from '../../src';

describe(useCompose, () => {
  it('should render the correct number result', () => {
    const fn1 = (arg: any) => 4 + arg;
    const fn2 = (arg: any) => 2 + arg;
    const fn3 = () => 10;

    let initialProps = [fn1, fn2, fn3];

    const { result, rerender } = renderHook(() =>
      useCompose<number>(initialProps)
    );

    expect(result.current.result).toEqual(16);

    initialProps = [fn1, fn3];

    rerender();

    expect(result.current.result).toEqual(14);
  });

  it('should render the correct string result', () => {
    const fn3 = () => 'first';
    const fn2 = (arg: any) => arg + ' second';
    const fn1 = (arg: any) => arg + ' third';

    let initialProps = [fn1, fn2, fn3];

    const { result, rerender } = renderHook(() =>
      useCompose<string>(initialProps)
    );

    expect(result.current.result).toEqual('first second third');

    initialProps = [fn1, fn3];

    rerender();

    expect(result.current.result).toEqual('first third');
  });
});
