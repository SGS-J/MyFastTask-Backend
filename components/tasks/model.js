import taskDao from "./DAO";

export default {
  createTask(task) {
    return taskDao.createTask(task);
  },
  getAllTasks(username) {
    return taskDao.getAllTasks(username);
  },
  getTasksMade(userEmail) {
    return taskDao.getTasksMade(userEmail);
  },
  deleteTask(id) {
    return taskDao.deleteTask(id);
  },
  updateTask(id, task) {
    return taskDao.updateTask(id, task);
  },
};
