import { act, renderHook } from '@testing-library/react';

import { useColor } from '../../src';

describe(useColor, () => {
  it('should produce a random hex color', () => {
    const { result } = renderHook(() => useColor());

    let randomColor = '';

    act(() => {
      randomColor = result.current.getRandomColor();
    });

    expect(randomColor).toMatch(/^#?([a-f0-9]{6}|[a-f0-9]{3})$/);
  });

  it('should produce a faded color', () => {
    const { result } = renderHook(() => useColor());

    let initialColor = '';
    let fadedColor = '';

    act(() => {
      initialColor = result.current.getRandomColor();
      fadedColor = result.current.fadeColor(initialColor, 1);
    });

    expect(initialColor).toMatch(/^#?([a-f0-9]{6}|[a-f0-9]{3})$/);
    expect(fadedColor).toMatch(/^#?([a-f0-9]{6}|[a-f0-9]{3})$/);
  });

  it('should convert a hex to rgb & rgb to hex', () => {
    const { result } = renderHook(() => useColor());

    let hex = '';
    let rgbToHex = '';
    let hexToRgb: { r: number; g: number; b: number } | null = null;
    let nullResult: { r: number; g: number; b: number } | null = null;

    act(() => {
      hex = result.current.getRandomColor();
      hexToRgb = result.current.hexToRgb(hex);
      nullResult = result.current.hexToRgb('');
    });

    expect(nullResult).toBeNull();

    if (hexToRgb) {
      expect(Object.keys(hexToRgb)).toEqual(
        expect.arrayContaining(['r', 'g', 'b'])
      );

      act(() => {
        const r = hexToRgb?.r || 0;
        const g = hexToRgb?.g || 0;
        const b = hexToRgb?.b || 0;

        rgbToHex = result.current.rgbToHex(r, g, b);
      });

      expect(rgbToHex).toMatch(/^#?([a-f0-9]{6}|[a-f0-9]{3})$/);
    }
  });
});
