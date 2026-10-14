import fs from "node:fs";
import path from "node:path";

export default function readFiles(filepath) {
  const dirname = process.cwd();
  const file1 = path.resolve(dirname, filepath);
  const readFile1 = fs.readFileSync(file1, "utf8");
  if (path.extname(filepath) === ".json") {
    const data = JSON.parse(readFile1);
    return data;
  } else {
    throw new Error("Incorrect format!");
  }
}
