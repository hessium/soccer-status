import format from "date-fns/format";
import { parse } from "query-string";

export const getDate = (date) => format(date, "yyyy-MM-dd");

export const getQuery = (route) => {
  const qs = route.split("?")[1];
  return qs ? parse(qs, { arrayFormat: "comma" }) : {};
};

export const formatData = (data, constant) => {
  let sortedArea = [];
  constant.map((area) => {
    let internalArr = [];
    let obj = {};
    data.map((elem) => {
      if (elem.area.name === area) {
        internalArr.push(elem);
        return true;
      } else {
        return false;
      }
    });
    if (internalArr.length > 0) {
      obj[area] = internalArr;
      sortedArea.push(obj);
    }
    return obj;
  });
  return sortedArea;
};
