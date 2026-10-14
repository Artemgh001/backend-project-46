import _ from "lodash";
import readFiles from "./readfile.js";
import format from "./formatfile.js";

export default function gendiff(filepath1, filepath2) {
  const data1 = readFiles(filepath1);
  const data2 = readFiles(filepath2);
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const array1 = _.sortBy([...keys1, ...keys2]);
  const array = new Set(array1);
  const newObj = [...array].reduce((acc, elem) => {
    let str;
    if (elem in data1 && !(elem in data2)) {
      str = `- ${elem}: ${data1[elem]}`;
      acc.push(str);
    } else if (!(elem in data1) && elem in data2) {
      str = `+ ${elem}: ${data2[elem]}`;
      acc.push(str);
    } else if (elem in data1 && elem in data2) {
      if (data1[elem] === data2[elem]) {
        str = `${elem}: ${data2[elem]}`;
        acc.push(str);
      } else {
        str = `- ${elem}: ${data1[elem]}`;
        const wStr = `+ ${elem}: ${data2[elem]}`;
        acc.push(str, wStr);
      }
    }
    return acc;
  }, []);
  newObj.unshift("{");
  newObj.push("}");
  const stratStr = newObj.join("\n");
  const endStr = format(stratStr);
  return endStr;
}
