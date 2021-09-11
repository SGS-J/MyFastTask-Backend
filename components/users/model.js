import userDao from './DAO';
import userDto from "./DTO";

export default {
   addUser(user) {
      return userDao.addUser(user);
   },
   getUserById(id) {
      return userDao.getUserById(id);
   },
   getUserByName(username) {
      return userDao.getUserByName(username);
   },
   async updateUser(username, dataToUpdate) {
      const userUpdated = await userDto.validateUpdate(dataToUpdate); 
      if(!userUpdated) return false;
      return userDao.updateUser(username, userUpdated);
   },
};
