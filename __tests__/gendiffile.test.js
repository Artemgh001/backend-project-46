import gendiff from "../src/gendiffile.js";
import readFiles from "../src/readfile.js";
import stylish from "../src/formatters/stylish.js";
import path from "path";
import fs from "node:fs";
import { expect, test } from "vitest";

const getFixturePath = (filename) =>
  path.join(import.meta.dirname, "..", "__fixtures__", filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), "utf-8").replace(/\r\n/g, "\n");

test("gendiff", () => {
  expect(
    gendiff(
      getFixturePath("testfile1.json"),
      getFixturePath("testfile2.json"),
      "stylish",
    ),
  ).toBe(readFile("fileresult.txt"));
});

test("readfile", () => {
  expect(() => readFiles(getFixturePath("file3.js"))).toThrow(Error);
});

test("stylish", () => {
  const obj = [{ status: "added", key: "settings", value: {} }];
  const otv = `{\n  + settings: {}\n}`;
  expect(stylish(obj)).toBe(otv);
});

test("json", () => {
  expect(
    gendiff(
      getFixturePath("testfile1.json"),
      getFixturePath("testfile2.json"),
      "json",
    ),
  ).toBe(readFile("fileresultjson.txt"));
});

test("plain", () => {
  expect(
    gendiff(
      getFixturePath("testfile1.json"),
      getFixturePath("testfile2.json"),
      "plain",
    ),
  ).toBe(readFile("fileresultplain.txt"));
});

test("yml", () => {
  expect(
    gendiff(
      getFixturePath("filetestyml1.yml"),
      getFixturePath("filetestyml2.yml"),
    ),
  ).toBe(readFile("fileresultyml.txt"));
});
