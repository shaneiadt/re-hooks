import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { useClipboard } from '../../src';

const HookTester = () => {
  const { addToClipboard } = useClipboard();

  return (
    <>
      <button onClick={() => addToClipboard({ text: 'COPY THIS PLEASE' })}>
        Copy Text
      </button>
      <button
        onClick={() =>
          addToClipboard({
            url:
              // 'https://thumbs.dreamstime.com/z/copy-paste-words-keyboard-buttons-95050609.jpg',
              'https://thumbs.dreamstime.com/z/copy-paste-written-blackboard-handwritten-school-41904059.jpg',
          })
        }
      >
        Copy Image
      </button>
    </>
  );
};

const fetchMock = jest.fn();
const write = jest.fn();
const blob = jest.fn();

global.fetch = fetchMock;

Object.assign(navigator, {
  clipboard: {
    write,
  },
});

describe(useClipboard, () => {
  it('should fetch & copy an image', () => {
    const user = userEvent.setup();
    const { getByText } = render(<HookTester />);

    const copyImageBtn = getByText(/copy image/i);

    fetchMock.mockResolvedValueOnce({
      blob,
    });

    user.click(copyImageBtn);

    waitFor(() => {
      expect(blob).toHaveBeenCalled();
      expect(fetchMock).toHaveBeenCalled();
      expect(write).toHaveBeenCalled();
    });
  });

  it('should copy some text', () => {
    const user = userEvent.setup();
    const { getByText } = render(<HookTester />);

    const copyTextBtn = getByText(/copy text/i);

    user.click(copyTextBtn);

    waitFor(() => {
      expect(write).toBeCalled();
    });
  });

  it('should throw an error', () => {
    const user = userEvent.setup();
    const { getByText } = render(<HookTester />);

    const copyTextBtn = getByText(/copy text/i);

    fetchMock.mockRejectedValueOnce(new Error('error'));

    user.click(copyTextBtn);

    waitFor(() => {
      expect(blob).not.toHaveBeenCalled();
      expect(fetchMock).not.toHaveBeenCalled();
      expect(write).not.toHaveBeenCalled();
    });
  });
});
