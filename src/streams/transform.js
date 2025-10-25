import { Transform } from "stream";
import { pipeline } from "stream/promises";

class Reverse extends Transform {
  constructor(options = {}) {
    super({ ...options, decodeStrings: false });
  }

  _transform(chunk, _encoding, callback) {
    const reversed =
      Array.from(String(chunk)).slice(0, -1).reverse().join("") + "\n";
    callback(null, reversed);
  }
}

const transform = async () => {
  if (process.stdin.setEncoding) process.stdin.setEncoding("utf8");

  await pipeline(process.stdin, new Reverse(), process.stdout);
};

await transform();
