export const useColor = () => {
  const getRandomColor = () => {
    return (
      '#' + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, '0')
    );
  };

  const fadeColor = (col: string, amt: number) => {
    const min = Math.min,
      max = Math.max;
    const num = parseInt(col.replace(/#/g, ''), 16);
    const r = min(255, max((num >> 16) + amt, 0));
    const g = min(255, max((num & 0x0000ff) + amt, 0));
    const b = min(255, max(((num >> 8) & 0x00ff) + amt, 0));

    return '#' + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
  };

  const hexToRgb = (
    hex: string
  ): { r: number; g: number; b: number } | null => {
    const match = hex.replace(/#/, '').match(/.{1,2}/g);
    if (!match) return null;
    return {
      r: parseInt(match[0], 16),
      g: parseInt(match[1], 16),
      b: parseInt(match[2], 16),
    };
  };

  const rgbToHex = (r: number, g: number, b: number) =>
    '#' +
    [r, g, b]
      .map(x => {
        return x.toString(16).padStart(2, '0');
      })
      .join('');

  return { getRandomColor, fadeColor, hexToRgb, rgbToHex };
};
