export default function stylish(object) {
  function tab(depth) {
    return " ".repeat(depth * 4);
  }
  function tabTwo(depth) {
    return " ".repeat(depth * 4 - 2);
  }
  function stringify(value, depth) {
    if (value === null || typeof value !== "object") {
      return String(value);
    }

    const keys = Object.keys(value);

    if (keys.length === 0) {
      return "{}";
    }

    const newObj = keys.map((elem) => {
      const val = stringify(value[elem], depth + 1);
      return `${tab(depth)}${elem}: ${val}`;
    });

    return `{\n${newObj.join("\n")}\n${tab(depth - 1)}}`;
  }
  function format(obj, depth) {
    const newObj = obj.map((elem) => {
      let acc = "";
      if (elem.status === "nested") {
        acc += `${tab(depth)}${elem.key}: {\n${format(elem.children, depth + 1)}\n${tab(depth)}}`;
      } else if (elem.status === "added") {
        acc += `${tabTwo(depth)}+ ${elem.key}: ${stringify(elem.value, depth + 1)}`;
      } else if (elem.status === "removed") {
        acc += `${tabTwo(depth)}- ${elem.key}: ${stringify(elem.value, depth + 1)}`;
      } else if (elem.status === "unchanged") {
        acc += `${tab(depth)}${elem.key}: ${stringify(elem.value, depth + 1)}`;
      } else if (elem.status === "updated") {
        acc += `${tabTwo(depth)}- ${elem.key}: ${stringify(elem.value1, depth + 1)}\n${tabTwo(depth)}+ ${elem.key}: ${stringify(elem.value2, depth + 1)}`;
      }
      return acc;
    });
    return newObj.join("\n");
  }
  let forObj = format(object, 1);
  forObj = `{\n${forObj}\n}`;
  return forObj;
}
