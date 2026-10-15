import gendiff from "../src/gendiffile.js";
import path from "path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const meta = fileURLToPath(import.meta.url);
const dirname = path.dirname(meta);
const file1 = path.join(dirname, "../__fixtures__", "testfile1.json");
const file2 = path.join(dirname, "../__fixtures__", "testfile2.json");

test("gendiff", () => {
  expect(gendiff(file1, file2)).toBe(
    `{\n   - host: hexlet.io\n   + timeout: 20\n}`,
  );
});
