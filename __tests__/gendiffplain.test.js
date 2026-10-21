import gendiff from "../src/gendiffile.js";
import readFiles from "../src/readfile.js";
import path from "path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const meta = fileURLToPath(import.meta.url);
const dirname = path.dirname(meta);
const file1 = path.join(dirname, "../__fixtures__", "testfile1.json");
const file2 = path.join(dirname, "../__fixtures__", "testfile2.json");
const file3 = path.join(dirname, "../__fixtures__", "file3.js");
const file4 = path.join(dirname, "../__fixtures__", "fileresultplain.txt");
const data = fs.readFileSync(file4, "utf8").replace(/\r\n/g, "\n");
test("gendiff", () => {
  expect(gendiff(file1, file2, "plain")).toBe(data);
});

test("readfile", () => {
  expect(() => readFiles(file3)).toThrowError(Error);
});
