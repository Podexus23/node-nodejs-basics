import { fileURLToPath } from "url";
import { cp, stat } from "fs/promises";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  try {
    const src = await stat(filesDir)
      .then(() => true)
      .catch(() => false);
    const dest = await stat(filesCopyDir)
      .then(() => true)
      .catch(() => false);

    if (!src || dest) throw new Error("FS operation failed");
    await cp(filesDir, filesCopyDir, { recursive: true });
  } catch (err) {
    throw err;
  }
};

await copy();
