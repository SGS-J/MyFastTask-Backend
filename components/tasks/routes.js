import { Router } from "express";
import controller from "./controller";

const router = Router();

router.get('/', controller.getAllTasks)
router.get('/done', controller.getTasksMade);
router.post('/', controller.createTask)
router.patch('/:id/complete', controller.completeTask)
router.put('/:id', controller.updateTask)
router.delete('/:id', controller.removeTask)

export default router;