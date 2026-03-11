import { Work } from "../useWebWorker";

export const job1: Work = () =>
  // your function must define an onmessage function and if you wish to interact with the data an Event object is passed in as an argument

  (onmessage = (e) => {
    // timeout is used here to simulate network or high CPU load

    setTimeout(() => {
      // the below will take a number from the Event object and run the fibonacci sequence returning the result

      const nbr = e.data;
      let n1 = 0;
      let n2 = 1;
      let somme;

      for (let i = 2; i <= nbr; i++) {
        somme = n1 + n2;

        n1 = n2;

        n2 = somme;
      }

      const result = nbr ? n2 : n1;

      // passing messages back to your main thread can be done using the postMessage function

      postMessage(result);
    }, 2000);
  });

export const job2: Work = () =>
  // your function must define an onmessage function and if you wish to interact with the data an Event object is passed in as an argument

  (onmessage = () => {
    postMessage("BOOM");
  });
