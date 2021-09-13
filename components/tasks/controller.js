import taskModel from "./model";

export default {
  async createTask(req, res) {
    const { title, description } = req.body;
    if (!title) {
      res.status(400).json({ message: "Task needs a title at least" });
    } else {
      const id = await taskModel.createTask({
        title,
        description,
        belongTo: req.app.locals.userLogged,
      });
      res.json({ id, title, description });
    }
  },
  async getAllTasks(req, res) {
    const tasks = await taskModel.getAllTasks(req.app.locals.userLogged);
    if (tasks.length > 0) res.json(tasks);
    else res.json({ message: "There are not tasks yet..." });
  },
  async getTasksMade(req, res) {
    const tasksMade = await taskModel.getTasksMade(req.app.locals.userLogged);
    if (tasksMade.length > 0) res.json(tasksMade);
    else res.json({ message: "You haven't finished a task yet." });
  },
  async completeTask(req, res) {
    await taskModel.updateTask(req.params.id, { finished: true });
    res.json({ message: "Good job!" });
  },
  async removeTask(req, res) {
    await taskModel.deleteTask(req.params.id);
    res.send("Task deleted!");
  },
  async updateTask(req, res) {
    const { title, description } = req.body;
    await taskModel.updateTask(req.params.id, {
      title,
      description,
    });
    res.send("Task updated!");
  },
};
