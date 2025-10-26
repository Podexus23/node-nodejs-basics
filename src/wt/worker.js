import { isMainThread, parentPort } from "node:worker_threads";

// n should be received from main thread
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  if (!isMainThread) {
    parentPort.once("message", (msg) => {
      try {
        const random = Math.random();
        if (random < 0.5) throw new Error("Insane error");

        const fiboAnswer = nthFibonacci(msg.num);
        parentPort.postMessage(fiboAnswer);
      } catch (error) {
        parentPort.postMessage(null);
      }
    });
  }
};

sendResult();
