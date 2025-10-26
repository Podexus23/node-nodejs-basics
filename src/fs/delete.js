import { fileURLToPath } from "url";
import fs from "fs/promises";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const remove = async () => {
  const fileToRemove = resolve(__dirname, "files", "fileToRemove.txt");

  try {
    await fs.rm(fileToRemove);
    console.log("file deleted");
  } catch (err) {
    if (err.code === "ENOENT") throw new Error("FS operation failed");
    throw err;
  }
};

await remove();
