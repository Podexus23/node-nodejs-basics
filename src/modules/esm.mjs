import { sep, dirname } from "node:path";
import { release, version } from "node:os";
import { createServer as createServerHttp } from "node:http";
import { createRequire } from "node:module";
import { fileURLToPath } from "url";
import "./files/c.cjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

const random = Math.random();

// const unknownObject =
//   random > 0.5 ? require("./files/a.json") : require("./files/b.json");

const unknownObject =
  random > 0.5
    ? (await import("./files/a.json", { with: { type: "json" } })).default
    : (await import("./files/b.json", { with: { type: "json" } })).default;

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export default {
  unknownObject,
  myServer,
};
