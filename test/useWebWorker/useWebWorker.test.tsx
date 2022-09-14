import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { mockWorker } from './mockWorker';
import { WorkerApp } from '.';

const { postMessage, createObjectURL, onmessage } = mockWorker();

describe('useWebWorker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render inital status as IDLE', () => {
    const { getByText } = render(<WorkerApp />);

    expect(getByText(/IDLE/)).toBeTruthy();
  });

  it('should render with status of SUCCESS for job1', () => {
    const { getByText } = render(<WorkerApp />);

    const sendJob1Btn = getByText('Send Job 1');

    fireEvent.click(sendJob1Btn);

    expect(getByText(/SUCCESS/)).toBeTruthy();

    const setJob2Btn = getByText('Set Job 2');
    const sendJob2Btn = getByText('Send Job 2');

    fireEvent.click(setJob2Btn);

    expect(getByText(/IDLE/)).toBeTruthy();

    fireEvent.click(sendJob2Btn);

    expect(getByText(/SUCCESS/)).toBeTruthy();

    expect(postMessage).toBeCalledTimes(2);
    expect(onmessage).toBeCalledTimes(2);
    expect(createObjectURL).toBeCalledTimes(2);
  });

  it('should updateAction and render status IDLE & SUCCESS for job2', () => {
    const { getByText } = render(<WorkerApp />);

    const setJob2Btn = getByText('Set Job 2');
    const sendJob2Btn = getByText('Send Job 2');

    fireEvent.click(setJob2Btn);

    expect(getByText(/IDLE/)).toBeTruthy();

    fireEvent.click(sendJob2Btn);

    expect(getByText(/SUCCESS/)).toBeTruthy();

    expect(postMessage).toBeCalledTimes(1);
    expect(onmessage).toBeCalledTimes(1);
    expect(createObjectURL).toBeCalledTimes(2);
  });
});
