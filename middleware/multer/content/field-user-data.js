import multer from "multer";

const upload = multer();
export default () => {
  return upload.any([
    "email",
    "username",
    "password",
    "conf-password",
    "birthday",
    "gender",
    "UIColor",
    "avatar",
  ]);
};
