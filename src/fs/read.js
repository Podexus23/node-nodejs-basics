import { fileURLToPath } from "url";
import fs from "fs/promises";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const read = async () => {
  const filePath = resolve(__dirname, "files", "fileToRead.txt");

  try {
    const file = await fs.readFile(filePath, { encoding: "utf-8" });
    console.log(file);
  } catch (err) {
    if (err.code === "ENOENT") throw new Error("FS operation failed");
    throw err;
  }
};

await read();
