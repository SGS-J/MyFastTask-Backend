import taskDao from "./DAO";

export default {
  createTask(task) {
    return taskDao.createTask(task);
  },
  getAllTasks(userEmail) {
    return taskDao.getAllTasks(userEmail);
  },
  getTasksMade(userEmail) {
    return taskDao.getTasksMade(userEmail);
  },
  deleteTask(id) {
    return taskDao.deleteTask(id);
  },
  updateTask(id, task) {
    const taskAdapted = Object.keys(task).reduce((acc, key) => {
      if (task[key]) acc[key] = task[key];
      return acc;
    }, {});
    return taskDao.updateTask(id, taskAdapted);
  },
};
