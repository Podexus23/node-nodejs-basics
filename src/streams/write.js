import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { createWriteStream } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const write = async () => {
  const filePath = resolve(__dirname, "files", "fileToWrite1.txt");
  const rs = createWriteStream(filePath, { encoding: "utf-8" });

  rs.on("error", (err) => {
    console.error("Streams: Write stream error", err.code || err);
  });

  process.stdin.on("error", (err) => {
    console.error("Streams: Stdin error", err);
  });

  process.stdin.pipe(rs);
};

await write();
