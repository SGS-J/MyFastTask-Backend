import TaskCollection from '../../services/mongoDb/schemas/Task.schema';

export default {
   async createTask(task) {
      try {
         return (await new TaskCollection(task).save()).id;
      } catch (error) {
         return false;
      }
   },
   async getAllTasks(username) {
      return await TaskCollection.find({ belongTo: username })
         .sort({ creationDate: -1 })
         .catch(() => false);
   },
   async getTasksMade(username) {
      return await TaskCollection.find({ belongTo: username, finished: true })
         .sort({ creationDate: -1 })
         .catch(() => false);
   },
   async deleteTask(id) {
      return await TaskCollection.findByIdAndDelete(id).catch(() => false);
   },
   async updateTask(id, task) {
      return await TaskCollection.findByIdAndUpdate(id, task).catch(
         () => false
      );
   },
};
