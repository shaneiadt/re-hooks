import { renderHook } from '@testing-library/react';
import { EllipsisPosition, useEllipsis } from '../../src';

describe(useEllipsis, () => {
  it('should ellipsis from the end', () => {
    const { result } = renderHook(() => useEllipsis({ length: 5 }));

    expect(result.current.ellipsis('mock text')).toEqual('mo...');
    expect(result.current.ellipsis('mock text', { char: '*' })).toEqual(
      'mo***'
    );
    expect(
      result.current.ellipsis('mock text', { char: '*', length: 10, count: 4 })
    ).toEqual('mock text');
  });
  it('should ellipsis with different options provided', () => {
    const { result } = renderHook(() =>
      useEllipsis({ length: 10, count: 4, char: '*' })
    );

    expect(
      result.current.ellipsis('mock text phrase', {
        char: '*',
        length: 10,
        count: 4,
      })
    ).toEqual('mock t****');
  });
  it('should ellipsis from the middle', () => {
    const { result } = renderHook(() => useEllipsis({ length: 15 }));

    expect(
      result.current.ellipsis('mock text to be ellipsised from the middle', {
        position: EllipsisPosition.MIDDLE,
      })
    ).toEqual('mock t...middle');

    expect(
      result.current.ellipsis('mock text to be ellipsised from the middle', {
        length: 16,
        position: EllipsisPosition.MIDDLE,
      })
    ).toEqual('mock te...middle');
  });
  it('should ellipsis from the start', () => {
    const { result } = renderHook(() =>
      useEllipsis({ length: 8, position: EllipsisPosition.START })
    );

    expect(result.current.ellipsis('mock text')).toEqual('... text');
    expect(
      result.current.ellipsis('another one to ellipsis from the start', {
        length: 12,
      })
    ).toEqual('...the start');
  });
});
