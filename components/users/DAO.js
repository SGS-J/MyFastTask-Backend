import UserCollection from '../../services/mongoDb/schemas/User.schema';

export default {
   async addUser(user) {
      await new UserCollection(user).save().catch(() => false);
   },
   async getUserById(id) {
      return await UserCollection.findById(id).catch(() => false);
   },
   async getUserByName(username) {
      return await UserCollection.findOne({ name: username }).catch(
         () => false
      );
   },
   async updateUser(username, user) {
      return await UserCollection.findOneAndUpdate(
         { name: username },
         user
      ).catch(() => false);
   },
   async getUserTasksMade(username) {
      return await this.getUserByName(username).catch(() => false).tasksMade;
   },
};
