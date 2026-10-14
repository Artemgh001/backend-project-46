export default function format(filestr) {
  const newArr = filestr.split("\n");
  const newStr = newArr.reduce((acc, elem) => {
    let newElem;
    if (elem === "{" || elem === "}") {
      acc.push(elem);
    } else if (elem.slice(0, 1) === "+") {
      newElem = `   ${elem}`;
      acc.push(newElem);
    } else if (elem.slice(0, 1) === "-") {
      newElem = `   ${elem}`;
      acc.push(newElem);
    } else {
      newElem = `     ${elem}`;
      acc.push(newElem);
    }
    return acc;
  }, []);
  return newStr.join("\n");
}
