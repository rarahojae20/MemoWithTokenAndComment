import { Router } from 'express';
import { authenticateUser } from '../auth/auth.middleware';
import CommentController from './comment.controller';

export const commentRouter = Router();

commentRouter.post('/', authenticateUser, new CommentController().create);
// commentRouter.get('/', authenticateUser, new CommentController().findAll);
// commentRouter.get('/:commentId', authenticateUser, new CommentController().findOne);
// commentRouter.put('/:commentId', authenticateUser, new CommentController().update);
commentRouter.delete('/:id', authenticateUser, new CommentController().delete);



export default commentRouter;