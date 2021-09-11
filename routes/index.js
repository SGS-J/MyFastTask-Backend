import { Router } from 'express';
import userRouter from '../components/users/routes';
import taskRouter from '../components/tasks/routes';
import homeRouter from '../components/home/routes';

const router = Router();

router.use('/user', userRouter);
router.use('/user/:username/tasks', taskRouter);
router.use('/home', homeRouter)

export default router;
