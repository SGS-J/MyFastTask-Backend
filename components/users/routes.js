import { Router } from 'express';
import controller from './controller';

const router = Router();

router.all(
   /^\/\w{3,}\/(tasks\/*|update|logout)$/gi,
   controller.verifyAuthentication
);
router.get('/:username/me', controller.getUser);
router.get(/^\/(login|register)$/, controller.confirmUnauthentication);
router.patch('/:username/update', controller.updateUser);
router.post('/register', ...controller.addUser);
router.post('/login', ...controller.loginUser);
router.post('/logout', controller.logoutUser);

export default router;
