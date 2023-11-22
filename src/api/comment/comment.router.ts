import { Router } from 'express';
import { authenticateUser } from '../auth/auth.middleware';
import CommentController from './comment.controller';

export const commentRouter = Router();

commentRouter.post('/', authenticateUser, new CommentController().create);
commentRouter.delete('/:id', authenticateUser, new CommentController().delete);

export default commentRouter;
