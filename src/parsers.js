import path from "node:path";
import { load } from "js-yaml";

export default function parsers(filepath, file) {
  if (path.extname(file) === ".json") {
    const data = JSON.parse(filepath);
    return data;
  } else if (path.extname(file) === ".yaml" || path.extname(file) === ".yml") {
    const data2 = load(filepath);
    return data2;
  } else {
    throw new Error("Incorrect format!");
  }
}
