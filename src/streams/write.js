import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { createWriteStream } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const write = async () => {
  const filePath = resolve(__dirname, "files", "fileToWrite.txt");
  const rs = createWriteStream(filePath, { encoding: "utf-8" });
  process.stdin.pipe(rs);
};

await write();
