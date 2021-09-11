import passport from "passport";
import userModel from "../../components/users/model";

passport.serializeUser(function (user, done) {
   done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
   try {
      const user = await userModel.getUserById(id);
      done(null, user);
   } catch (error) {
      return done(error);
   }
});