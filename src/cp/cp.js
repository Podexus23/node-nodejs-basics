/**
 * cp.js - implement function spawnChildProcess that receives array of arguments args and creates child process from file script.js, passing these args to it. 
 * This function should create IPC-channel between stdin and stdout of master process and child process:
child process stdin should receive input from master process stdin
child process stdout should send data to master process stdout
 */

import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));

const spawnChildProcess = async (args) => {
  const scriptPath = resolve(__dirname, "files", "script.js");
  const script = spawn(process.execPath, [scriptPath, ...args], {
    stdio: ["pipe", "pipe", "inherit"],
  });

  //sends input to child process
  process.stdin.pipe(script.stdin).on("error", (err) => {
    console.error("pipe stdin → child.stdin failed:", err);
  });

  //gets data from child process
  script.stdout.pipe(process.stdout).on("error", (err) => {
    console.error("pipe child.stdout → stdout failed:", err);
  });

  script.on("exit", () => {
    console.log("bye bye driver");
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(["oneArg", "secondArg", "and some more"]);
