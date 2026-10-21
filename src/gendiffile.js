import _ from "lodash";
import readFiles from "./readfile.js";
import { format } from "./formatters/index.js";

export default function gendiff(filepath1, filepath2, formatters) {
  const data1 = readFiles(filepath1);
  const data2 = readFiles(filepath2);
  function recurs(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const array1 = new Set(_.sortBy([...keys1, ...keys2]));
    const obj = [...array1].reduce((acc, elem) => {
      let obj3;
      if (elem in obj1 && !(elem in obj2)) {
        obj3 = { status: "removed", key: elem, value: obj1[elem] };
      } else if (!(elem in obj1) && elem in obj2) {
        obj3 = { status: "added", key: elem, value: obj2[elem] };
      } else if (elem in obj1 && elem in obj2) {
        const left = obj1[elem];
        const right = obj2[elem];
        if (
          typeof left === "object" &&
          typeof right === "object" &&
          left !== null &&
          right !== null
        ) {
          obj3 = {
            status: "nested",
            key: elem,
            children: recurs(left, right),
          };
        } else if (left === right) {
          obj3 = {
            status: "unchanged",
            key: elem,
            value: left,
          };
        } else {
          obj3 = {
            status: "updated",
            key: elem,
            value1: left,
            value2: right,
          };
        }
      }
      acc.push(obj3);
      return acc;
    }, []);
    return obj;
  }
  const rec = recurs(data1, data2);
  const itog = format(rec, formatters);
  return itog;
}
