import { body, validationResult } from 'express-validator';
import userModel from '../../components/users/model';

export default {
   validate() {
      return [
         [
            body('username').isLength({ min: 3, max: 12 }),
            body('username').custom(async value => {
               const user = await userModel.getUserByName(value);
               if (user) throw new Error('User already in use');
               return true;
            }),
            body('password')
               .isLength({ min: 8 })
               .matches(/\d{3,}/g),
            body('conf-password').custom((value, { req }) => {
               if (value !== req.body.password)
                  throw new Error(
                     "Password confirmation doesn't match password"
                  );
               return true;
            }),
            body('birthday').isDate({
               format: "DD/MM/YYYY"
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
