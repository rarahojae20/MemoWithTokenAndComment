import { Router } from 'express';
import AuthController from './auth.controller';

export const path = '/auth';
export const router = Router();

router.post('/sign-up', new AuthController().signUp);
router.post('/login', new AuthController().login); 

export default router;
