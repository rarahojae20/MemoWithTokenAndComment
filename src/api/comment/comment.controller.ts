import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Result } from 'common/result';
import CommentService from './comment.service';
import { IComment } from 'types/comments';
import logger from 'lib/logger';
import { resolve } from 'path';

export default class CommentController {
  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { content, memoId} = req.body;
      const userId = req.user.id;
      const data: IComment = { userId, content , memoId}; //UserId는 memoFind에서 leftJoin으로 댓글까지 찾을수 있음.
      const comment = await new CommentService().create(data);
      const response = Result.ok(comment).toJson();
      res.status(httpStatus.CREATED).json(response);
    } catch (error) {
      console.error('Error while creating comment:', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create comment.' });
    }
  };

  public delete = async (req:Request, res:Response) :Promise<void> =>{
    try {
        const { id } = req.params;
        const result = await new CommentService().delete(Number(id));
        const response = Result.ok(result).toJson();
        logger.res(httpStatus.OK, response, req);
        response.message = '삭제되었습니다';
        res.status(httpStatus.OK).json(response);
    }
   catch(error){
    console.error('error', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'servererrro'})
  }

}
}
