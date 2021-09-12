import validator from 'validator';
import userModel from './model';

async function validateName(name) {
    const userExists = await userModel.getUserByName(name);
    return !!(!userExists && validator.isLength(name, {min: 3, max: 12}));

}

export default {
    async validateUpdate(obj) {
        const objAdapted = Object.keys(obj).reduce((acc, key) => {
            if (key === "birthday" && obj.birthday) acc.birthday = {date: obj.birthday}
            else if (obj[key]) acc[key] = obj[key];
            return acc;
        }, {});
        const {name, gender, birthday: {date}, UIColor, avatar} = objAdapted;
        const result = [];

        name && result.push(await validateName(name));
        gender && result.push(validator.matches(gender, /male|female|/));
        date && result.push(validator.isDate(date, {
            format: "DD/MM/YYYY"
        }));
        UIColor && result.push(typeof UIColor === 'string');
        avatar && result.push(typeof avatar === 'string');

        if (result.every(value => value)) return objAdapted;
        return false;
    },
};
