import { fileURLToPath } from "url";
import fs from "fs/promises";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const rename = async () => {
  const oldName = resolve(__dirname, "files", "wrongFilename.txt");
  const newName = resolve(__dirname, "files", "properFilename.md");

  try {
    const oldExists = await fs
      .stat(oldName)
      .then(() => true)
      .catch(() => false);
    const newExists = await fs
      .stat(newName)
      .then(() => true)
      .catch(() => false);

    if (!oldExists || newExists) {
      throw new Error("FS operation failed");
    }

    await fs.rename(oldName, newName);
  } catch (error) {
    throw error;
  }
};

await rename();
