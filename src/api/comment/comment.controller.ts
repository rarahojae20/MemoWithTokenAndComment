import { Request, Response } from 'express';
import httpStatus from 'http-status';
//import { Result } from 'src/common/result';
import { Result } from 'common/result';
import CommentService from './comment.service';
//import { IComment } from 'src/types/comments';
import { IComment } from 'types/comments';
import logger from 'lib/logger';
import { resolve } from 'path';

export default class CommentController {
  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id, content, memoId} = req.body;
    //   const memoId = Number(req.params.Id); // 이것은 댓글이 생성될 메모의 id

    const userId = req.user.id;

      const data: IComment = { id, content , memoId , userId};


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
