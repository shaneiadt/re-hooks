import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { useSlugify } from '../../src';

describe(useSlugify, () => {
  it('should slugify text correctly', async () => {
    const { result } = renderHook(() => useSlugify());

    expect(Object.keys(result.current.slugs)).toHaveLength(0);

    const slugifiedText: Record<string, string> = {
      'first text to be slugified': 'first-text-to-be-slugified',
      'įť bë tiḿë to dáñcë': 'it-be-time-to-dance',
      'double--dashed string': 'double-dashed-string',
      '-trim dash from start': 'trim-dash-from-start',
      'trim dash from end-': 'trim-dash-from-end',
      'get_rid $of n/on w\\rd chars': 'get-rid-of-n-on-wrd-chars',
      'replace & with and': 'replace-and-with-and',
    };

    const slugKeys: string[] = Object.keys(slugifiedText);

    let slugifyResult = '';

    for (const [key, value] of Object.entries(slugifiedText)) {
      act(() => {
        slugifyResult = result.current.slugify(key);
      });

      expect(slugifyResult).toEqual(value);
    }

    expect(Object.keys(result.current.slugs)).toEqual(
      expect.arrayContaining(slugKeys)
    );
  });
});
