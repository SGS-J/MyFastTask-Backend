import taskDao from './DAO';

export default {
   createTask(task) {
      return taskDao.createTask(task);
   },
   getAllTasks(username) {
      return taskDao.getAllTasks(username);
   },
   getTasksMade(username) {
      return taskDao.getTasksMade(username);
   },
   deleteTask(id) {
      return taskDao.deleteTask(id);
   },
   updateTask(id, task) {
      return taskDao.updateTask(id, task);
   },
};
