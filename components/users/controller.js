import userModel from "./model";
import validator from "../../middleware/validator/user-validator";
import formHandler from "../../middleware/multer/index";
import passport from "passport";

export default {
  addUser: [
    formHandler.uploadFields(),
    validator.validate(),
    async (req, res) => {
      await userModel.addUser({
        email: req.body.email,
        name: req.body.username,
        password: req.body.password,
        gender: req.body.gender || "Unknown",
        birthday: { date: req.body.birthday },
        UIColor: req.body.UIColor || "DB3E00",
        avatar: req.files[0],
      });
      res.redirect("/user/login");
    },
  ],
  loginUser: [
    passport.authenticate("login", { failureRedirect: "/user/login" }),
    (req, res) => {
      req.app.locals.userLogged = req.body.email;
      res.redirect(`/user/${req.body.email}/me`);
    },
  ],
  logoutUser(req, res) {
    req.app.locals.userLogged = "";
    req.logout();
    res.redirect("/user/login");
  },
  async getUser(req, res) {
    if (req.params.userEmail === req.app.locals.userLogged) {
      const user = await userModel.getUserByEmail(req.params.userEmail);
      await res.json({
        name: user.name,
        avatar: {
          imgName: user.avatar.originalname,
          buffer: user.avatar.buffer,
        },
        UIColor: user.UIColor,
      });
    } else {
      res.redirect(`/user/${req.app.locals.userLogged}/me`);
    }
  },
  updateUser: [
    formHandler.uploadFields(),
    async (req, res) => {
      const { name, gender, birthday, UIColor, avatar } = req.body;
      const ok = await userModel.updateUser(req.app.locals.userLogged, {
        name,
        gender,
        birthday,
        UIColor,
        avatar,
      });
      if (ok) {
        if (name) req.app.locals.userLogged = name;
        res.json({ message: "You've updated your data!" });
      } else res.status(400).end();
    },
  ],
  confirmUnauthentication(req, res, next) {
    if (req.isAuthenticated())
      res.redirect(`/user/${req.app.locals.userLogged}/me`);
    else res.end();
  },
  verifyAuthentication(req, res, next) {
    req.isAuthenticated() ? next() : res.redirect("/user/login");
  },
};
