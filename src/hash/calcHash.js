import { createReadStream } from "node:fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { pipeline } from "node:stream/promises";
const { createHash } = await import("node:crypto");

const __dirname = dirname(fileURLToPath(import.meta.url));

const calculateHash = async () => {
  const filePath = resolve(__dirname, "files", "fileToCalculateHashFor.txt");
  const hash = createHash("sha256");
  const input = createReadStream(filePath);

  try {
    await pipeline(input, hash);
    const digest = hash.digest("hex");
    // process.stdout.write(`${digest}\n`);
    console.log(digest);
  } catch (err) {
    if (err.code === "ENOENT")
      throw new Error("Hash operation failed. File not found");
    console.error(err);
  }
};

await calculateHash();
