import validator from "validator";
import { format } from "morgan";

export default {
  async validateUpdate(obj) {
    const objAdapted = Object.keys(obj).reduce((acc, key) => {
      if (key === "birthday" && obj.birthday)
        acc.birthday = { date: obj.birthday };
      else if (obj[key]) acc[key] = obj[key];
      return acc;
    }, {});
    const {
      name,
      gender,
      birthday: { date },
      UIColor,
      avatar,
    } = objAdapted;
    const result = [];

    name && result.push(!!name);
    gender && result.push(validator.matches(gender, /male|female|/));
    date &&
      result.push(
        validator.isDate(date, {
          format: "DD/MM/YYYY",
        })
      );
    UIColor && result.push(typeof UIColor === "string");
    avatar && result.push(typeof avatar === "string");

    if (result.every((value) => value)) return objAdapted;
    return false;
  },
};
