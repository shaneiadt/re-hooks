import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { useClipboard } from '../../src';

const fetchMock = jest.fn();
const write = jest.fn();
const ClipboardItemMock = jest.fn();
const blob = jest.fn();
const error = jest.fn();

global.fetch = fetchMock;

Object.assign(navigator, {
  clipboard: {
    write,
  },
});

Object.assign(window, {
  ClipboardItem: ClipboardItemMock,
});

console.error = error;

describe(useClipboard, () => {
  it('should copy some text', async () => {
    const { result } = renderHook(() => useClipboard());

    act(() => {
      result.current.addToClipboard({ text: 'copy me!' });
    });

    await waitFor(() => {
      expect(ClipboardItemMock).toHaveBeenCalled();
      expect(write).toHaveBeenCalled();
    });
  });

  it('should copy an image', async () => {
    const { result } = renderHook(() => useClipboard());

    blob.mockReturnValueOnce({ type: 'some text' });
    fetchMock.mockResolvedValueOnce({
      blob,
    });

    act(() => {
      result.current.addToClipboard({ url: 'https://www.fakeurl.com' });
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
      expect(blob).toHaveBeenCalled();
      expect(write).toHaveBeenCalled();
    });
  });

  it('should throw an error', async () => {
    const { result } = renderHook(() => useClipboard());

    write.mockRejectedValueOnce(new Error('foo'));

    act(() => {
      result.current.addToClipboard({ text: 'texttexttext' });
    });

    await waitFor(() => {
      expect(error).toHaveBeenCalled();
    });
  });
});
