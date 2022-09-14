export const mockWorker = () => {
  const postMessage = jest.fn();
  const onmessage = jest.fn();
  const createObjectURL = jest.fn();

  class Worker {
    onmessage: any;
    url: any;
    constructor(stringUrl: any) {
      this.url = stringUrl;
    }

    postMessage(msg: any) {
      postMessage();
      onmessage();
      this.onmessage(msg);
    }
    onmessageerror() {}
    terminate() {}
    addEventListener() {}
    removeEventListener() {}
    dispatchEvent() {
      return true;
    }
    onerror() {}
  }

  window.Worker = Worker;
  window.URL.createObjectURL = createObjectURL;

  return {
    postMessage,
    onmessage,
    createObjectURL,
  };
};
