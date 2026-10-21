import stylish from "./stylish.js";
import { plain } from "./plain.js";
import jsonFormat from "./json.js";

const formatters = {
  stylish,
  plain,
  json: jsonFormat,
};

export function format(rec, format = "stylish") {
  const func = formatters[format];
  return func(rec);
}
