import { fileURLToPath } from "url";
import fs from "fs/promises";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const list = async () => {
  const directory = resolve(__dirname, "files");
  try {
    const list = await fs.readdir(directory, { withFileTypes: true });

    console.log(
      list
        .map((e) => {
          if (e.isFile()) return `${e.name}`;
        })
        .filter(Boolean)
    );
  } catch (err) {
    if (err.code === "ENOENT") throw new Error("FS operation failed");
    throw err;
  }
};

await list();
