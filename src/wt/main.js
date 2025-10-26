import { availableParallelism } from "os";
import { isMainThread, Worker } from "worker_threads";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const createWorkers = (number) => {
  const workersPool = [];
  for (let i = 0; i < number; i++) {
    const worker = new Worker(resolve(__dirname, "worker.js"));
    workersPool.push(worker);
  }
  return workersPool;
};

const createPromiseQueue = (workers, startCount) => {
  const promisePool = [];
  let counter = startCount;
  workers.forEach((worker) => {
    const promiseWorker = new Promise((res, rej) => {
      worker.postMessage({ num: counter });

      worker.once("message", (msg) => {
        if (msg) {
          res({ status: "resolved", data: msg });
        } else {
          rej({ status: "error", data: null });
        }
      });
    });
    counter++;
    promisePool.push(promiseWorker);
  });
  return promisePool;
};

const performCalculations = async () => {
  if (!isMainThread) {
    console.log("bye bye driver");
    process.exit(1);
  }
  const workers = availableParallelism();
  const workersPool = createWorkers(workers);
  const workerResults = createPromiseQueue(workersPool, 10);

  const result = (await Promise.allSettled(workerResults)).map((e) => {
    if (e.status === "fulfilled") return e.value;
    return e.reason;
  });

  console.log(result);
};

await performCalculations();
