import React, { useRef } from 'react';
import user from '@testing-library/user-event';
import { render, waitFor } from '@testing-library/react';
import * as ReadFileAsText from './readAsText';

import { useFile } from '../../src';

import { mockFilerReader } from './mockFileReader';

const current = document.createElement('input');
current.type = 'file';

jest.mock('react', () => {
  const originReact = jest.requireActual('react');
  const mUseRef = () => current;
  return {
    ...originReact,
    useRef: mUseRef,
  };
});

interface Props {
  callback: (fileReader: FileReader) => void;
}

const HookTesterWithCallback = ({ callback }: Props) => {
  const ref = useRef(null);
  useFile(ref, callback);

  return <></>;
};

const HookTesterWithoutCallback = () => {
  const [output, setOutput] = React.useState('');
  const ref = useRef(null);
  const { fileReader } = useFile(ref);

  fileReader.addEventListener('load', () => {
    setOutput('BOOM');
  });

  return (
    <>
      <div className="output">{JSON.stringify(output)}</div>
    </>
  );
};

describe('useFile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('with callback', () => {
    it('should invoke the callback fn when a file is uploaded', () => {
      const callback = jest.fn();
      render(<HookTesterWithCallback callback={callback} />);

      const file = new File([new ArrayBuffer(1)], 'file.jpg');

      const readFileMock = jest
        .spyOn(ReadFileAsText, 'default')
        .mockResolvedValue('image content');

      user.upload(current, file);

      waitFor(() => {
        expect(readFileMock).toHaveBeenCalledTimes(1);
        expect(readFileMock).toHaveBeenCalledWith(file);
        expect(callback).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('without callback', () => {
    it('should invoke the callback fn when a file is uploaded', () => {
      const { addEventListener } = mockFilerReader();
      render(<HookTesterWithoutCallback />);

      const file = new File([new ArrayBuffer(1)], 'img.jpg');

      const readFileMock = jest
        .spyOn(ReadFileAsText, 'default')
        .mockResolvedValue('content');

      user.upload(current, file);

      waitFor(() => {
        expect(readFileMock).toHaveBeenCalledTimes(1);
        expect(readFileMock).toHaveBeenCalledWith(file);
        expect(addEventListener).toHaveBeenCalledTimes(1);
      });
    });
  });
});
