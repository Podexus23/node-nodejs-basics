import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createGzip } from "zlib";

const __dirname = dirname(fileURLToPath(import.meta.url));

const compress = async () => {
  const input = resolve(__dirname, "files", "fileToCompress.txt");
  const output = resolve(__dirname, "files", "archive.gz");
  const rs = createReadStream(input);
  const ws = createWriteStream(output);
  const gzip = createGzip();

  try {
    await pipeline(rs, gzip, ws);
    console.log("File compressed");
  } catch (err) {
    console.error(`Zip: pipeline failed`, err.code || err);
  }
};

await compress();
