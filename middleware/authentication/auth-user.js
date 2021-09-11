import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import userModel from '../../components/users/model';
import { matchPassword } from '../../services/utils/encrypt';

passport.use(
   'login',
   new LocalStrategy(
      async (username, password, done) => {
         try {
            const user = await userModel.getUserByName(username);
            if (!user) return done(null, false);
            if (!matchPassword(password, user.password))
               return done(null, false);
            return done(null, user);
         } catch (error) {
            return done(error);
         }
      }
   )
);
