export default function jsonFormat(object) {
  /*function format(obj) {
    const newObjJson = obj.reduce((acc, elem) => {
      if (elem.status === "nested") {
        acc[elem.key] = format(elem.children);
      } else if (
        elem.status === "added" ||
        elem.status === "removed" ||
        elem.status === "unchanged"
      ) {
        acc[elem.key] = elem.value;
      } else if (elem.status === "updated") {
        acc[elem.key] = elem.value2;
      }
      return acc;
    }, {});
    return newObjJson;
  }
  let forObj = format(object);*/
  return JSON.stringify(object, null, 2);
}
