import { fileURLToPath } from "url";
import { writeFile } from "fs/promises";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const filePath = resolve(__dirname, "files", "fresh.txt");
  const fileData = `I am fresh and young`;

  try {
    await writeFile(filePath, fileData, { flag: "wx" });
  } catch (err) {
    if (err.code === "EEXIST") throw new Error("FS operation failed");
    throw err;
  }
};

await create();
