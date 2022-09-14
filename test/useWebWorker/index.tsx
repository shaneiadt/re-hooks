import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { useWebWorker } from '../../src';
import { job1, job2 } from './job';

type PostMessageArgumentType = number;
type ResultType = number;

export const WorkerApp = () => {
  const { postMessage, result, status, updateAction } = useWebWorker<
    PostMessageArgumentType,
    ResultType
  >(job1);

  return (
    <>
      <p>Result: {JSON.stringify(result)}</p>
      <p>Status: {JSON.stringify(status)}</p>

      <button onClick={() => updateAction(job1)}>Set Job 1</button>
      <button onClick={() => postMessage(58)}>Send Job 1</button>
      <br />
      <br />
      <button onClick={() => updateAction(job2)}>Set Job 2</button>
      <button onClick={() => postMessage(58)}>Send Job 2</button>
    </>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<WorkerApp />);
}
