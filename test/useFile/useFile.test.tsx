import user from '@testing-library/user-event';
import { fireEvent, renderHook, waitFor } from '@testing-library/react';
import * as ReadFileAsText from './readAsText';

import { useFile } from '../../src';
import { act } from 'react-dom/test-utils';

describe('useFile', () => {
  it('should add an on change event listener', () => {
    const addEventListener = jest.fn();
    const current = document.createElement('input');
    current.type = 'file';
    current.addEventListener = addEventListener;
    const ref = { current };
    renderHook(() => useFile(ref));

    expect(addEventListener).toHaveBeenCalled();
  });

  it('should read a file', () => {
    const current = document.createElement('input');
    current.type = 'file';
    const ref = { current };
    renderHook(() => useFile(ref));

    const file = new File([new ArrayBuffer(1)], 'file.jpg');

    const readFileMock = jest
      .spyOn(ReadFileAsText, 'default')
      .mockResolvedValue('image content');

    user.upload(current, file);

    waitFor(() => {
      expect(readFileMock).toHaveBeenCalledTimes(1);
      expect(readFileMock).toHaveBeenCalledWith(file);
    });
  });

  it('should return an instanceof FileReader', async () => {
    const current = document.createElement('input');
    current.type = 'file';
    const ref = { current };
    const callback = jest.fn();

    const { result } = renderHook(() => useFile(ref, callback));

    const file = new File([new ArrayBuffer(1)], 'file.jpg');

    act(() => {
      fireEvent.change(current, {
        target: { files: [file] },
      });
    });

    await waitFor(() => {
      expect(result.current.fileReader).toBeInstanceOf(FileReader);
    });
  });

  it('should invoke file reader on change', async () => {
    const mockCurrent = document.createElement('input');
    mockCurrent.type = 'file';
    const mockAddEventListener = jest.fn();
    mockCurrent.addEventListener = mockAddEventListener;
    const ref = { current: mockCurrent };

    renderHook(() => useFile(ref));

    const file = new File([new ArrayBuffer(1)], 'file.jpg');

    act(() => {
      fireEvent.change(mockCurrent, {
        target: { files: [file] },
      });
    });

    await waitFor(() => {
      expect(mockAddEventListener).toHaveBeenCalledTimes(1);
    });
  });
});
