import validator from 'validator';
import userModel from './model';

async function validateName(name) {
   const userExists = await userModel.getUserByName(name);
   if (!userExists && validator.isLength(name, { min: 3, max: 12 }))
      return true;
   return false;
}

export default {
   async validateUpdate(obj) {
      const objAdapted = Object.keys(obj).reduce((acc, key) => {
         if (obj[key]) acc[key] = obj[key];
         return acc;
      }, {});
      const { name, gender, birthday, UIColor, avatar } = objAdapted;
      const result = [];

      name && result.push(await validateName(name));
      gender && result.push(validator.matches(gender, /Male|Female/));
      birthday && result.push(validator.isDate(birthday));
      UIColor && result.push(typeof UIColor === 'string');
      avatar && result.push(typeof avatar === 'string');

      if (result.every(value => value)) return objAdapted;
      return false;
   },
};
