import fs from "node:fs";
import path from "node:path";
import parsers from "./parsers.js";

export default function readFiles(filepath) {
  const dirname = process.cwd();
  const file1 = path.resolve(dirname, "__fixtures__", filepath);
  const readFile1 = fs.readFileSync(file1, "utf8");
  return parsers(readFile1, file1);
}
