export function plain(array, parentPath = "") {
  function type(value) {
    if (typeof value === "object" && value !== null) {
      return "[complex value]";
    } else if (typeof value === "string") {
      return `'${value}'`;
    } else {
      return `${value}`;
    }
  }
  const newStr = array
    .map((elem) => {
      let acc = "";
      let propertyPath;
      if (parentPath.length === 0) {
        propertyPath = elem.key;
      } else {
        propertyPath = `${parentPath}.${elem.key}`;
      }
      if (elem.status === "added") {
        acc += `Property '${propertyPath}' was added with value: ${type(elem.value)}`;
      } else if (elem.status === "removed") {
        acc += `Property '${propertyPath}' was removed`;
      } else if (elem.status === "unchanged") {
        acc += ``;
      } else if (elem.status === "nested") {
        acc += `${plain(elem.children, propertyPath)}`;
      } else if (elem.status === "updated") {
        acc += `Property '${propertyPath}' was updated. From ${type(elem.value1)} to ${type(elem.value2)}`;
      }
      return acc;
    })
    .filter((item) => item.length != 0)
    .join("\n");
  return newStr;
}
