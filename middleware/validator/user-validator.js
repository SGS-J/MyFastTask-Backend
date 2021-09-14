import { body, validationResult } from "express-validator";
import userModel from "../../components/users/model";
import moment from "moment";

export default {
  validate() {
    return [
      (req, res, next) => {
        const date = req.body.birthday;
        req.body.birthday = moment(date).format("DD/MM/YYYY");
        next();
      },
      [
        body("email").isEmail(),
        body("email").custom(async (value) => {
          const user = await userModel.getUserByEmail(value);
          if (user) throw new Error("Email already in use");
          return true;
        }),
        body("username").isLength({ min: 3, max: 12 }),
        body("password").matches(/^(?=.*\w)(?=.*(\d{3,}))[\w\d]{8,}$/),
        body("conf-password").custom((value, { req }) => {
          if (value !== req.body.password)
            throw new Error("Password confirmation doesn't match password");
          return true;
        }),
        body("birthday").isDate({
          format: "DD/MM/YYYY",
        }),
      ],
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        } else {
          next();
        }
      },
    ];
  },
};
