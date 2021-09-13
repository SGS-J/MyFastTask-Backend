import UserCollection from "../../services/mongoDb/schemas/User.schema";

export default {
  async addUser(user) {
    await new UserCollection(user).save().catch(() => false);
  },
  async getUserById(id) {
    return await UserCollection.findById(id).catch(() => false);
  },
  async getUserByEmail(email) {
    return await UserCollection.findOne({ email: email }).catch(() => false);
  },
  async updateUser(userEmail, user) {
    return await UserCollection.findOneAndUpdate(
      { email: userEmail },
      user
    ).catch(() => false);
  },
  async getUserTasksMade(email) {
    return await this.getUserByEmail(email).catch(() => false).tasksMade;
  },
};
