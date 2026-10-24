import gendiff from "../src/gendiffile.js";
import readFiles from "../src/readfile.js";
import path from "path";
import fs from "node:fs";
import { expect, test } from "vitest";

const getFixturePath = (filename) =>
  path.join(import.meta.dirname, "..", "__fixtures__", filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), "utf-8").replace(/\r\n/g, "\n");

const cases = [
  { format: "stylish", result: "fileresult.txt" },
  { format: "json", result: "fileresultjson.txt" },
  { format: "plain", result: "fileresultplain.txt" },
];
test.each(cases)("formats", ({ format, result }) => {
  expect(
    gendiff(
      getFixturePath("testfile1.json"),
      getFixturePath("testfile2.json"),
      format,
    ),
  ).toBe(readFile(result));
});

test("readfile", () => {
  expect(() => readFiles(getFixturePath("file3.js"))).toThrow(Error);
});

test("yml", () => {
  expect(
    gendiff(
      getFixturePath("filetestyml1.yml"),
      getFixturePath("filetestyml2.yml"),
    ),
  ).toBe(readFile("fileresultyml.txt"));
});
