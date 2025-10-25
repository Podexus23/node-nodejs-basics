import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { createReadStream } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const read = async () => {
  const filePath = resolve(__dirname, "files", "fileToRead.txt");
  const rs = createReadStream(filePath, { encoding: "utf-8" });

  rs.pipe(process.stdout);

  rs.on("end", () => {
    process.stdout.write("\n");
  });
};

await read();
