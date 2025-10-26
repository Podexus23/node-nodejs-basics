import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createGunzip } from "zlib";

const __dirname = dirname(fileURLToPath(import.meta.url));

const decompress = async () => {
  const input = resolve(__dirname, "files", "archive.gz");
  const output = resolve(__dirname, "files", "fileToCompress.txt");
  const rs = createReadStream(input);
  const ws = createWriteStream(output);
  const gzip = createGunzip();

  try {
    await pipeline(rs, gzip, ws);
    console.log("File decompressed");
  } catch (err) {
    console.error(`Zip: pipeline failed`, err.code || err);
  }
};

await decompress();
