//memo.controllet.ts
import { Request, Response } from 'express';
import MemoService from './memo.service';
import httpStatus from 'http-status';
import logger from '../../lib/logger';
import { Result } from '../../common/result';
import { IMemo } from '../../types/memos';
import { BaseController } from '../../common/base/base.controller'; // Import BaseController

export default class MemoController extends BaseController {
 
  public find = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user.id;     //미들웨어에서 req.user = user; // 인증된 사용자 정보를 req 객체에 추가
      const result = await new MemoService().findAll(userId); 
      const response = Result.ok(result).toJson(); //ok인 경우 status와 result의 결과값까지반환

      logger.res(httpStatus.OK, response, req); //loger 의 res 함수에는 code, response, request가잇음
      res.status(httpStatus.OK).json(response);
    } catch (error) {
      console.error('메모못찾음:', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: '서버에러' });
    }
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      // const userID = req.user.id;
      const data: IMemo = this.extractBodyMemo(req.body); //extractBodyMemo없이 req.body값을 받으려면 const { name, title, content } = req.body; 
      // const data: IMemo = { name , title, content };  
      data.userId = req.user.id; //미들웨어에서 authorization으로 디코딩됨 next하기전

      const result = await new MemoService().create(data);
      const response = Result.ok(result).toJson();
      // Result의 ok사인과 toJson없이 받으려면 
      // const response = JSON.stringify(result); 

      logger.res(httpStatus.OK, response, req);
      res.status(httpStatus.OK).json(response);
    } catch (error) {
      console.error('메모생성실패:', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: '서버에러' });
    }
  };



  public refreshMemo = async (req: Request, res: Response): Promise<void> => {
    try {
      const newData: IMemo = this.extractBodyMemo(req.body); //id값을 포함한 name title content가 같이 들어옴
      
      const { id } = req.params;
      // const  id  = newData.id 다른방법1
      // newData.id = Number(newData.id); 다른방법2

      newData.id = Number(id);

      newData.userId = req.user.id;
      const result = await new MemoService().refreshMemo( newData );
      const response = Result.ok(result).toJson();

      logger.res(httpStatus.OK, response, req);
      res.status(httpStatus.OK).json(response);
    } catch (error) {
      console.error('메모업데이트실패:', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: '서버에러' });
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await new MemoService().deleteMemo(Number(id));

      if (!result) {
        const response = Result.fail('메모가없음').toJson();
        logger.res(httpStatus.NOT_FOUND, response, req);
        res.status(httpStatus.NOT_FOUND).json(response);
        return;
      }

      const response = Result.ok(result).toJson();
      logger.res(httpStatus.OK, response, req);
      res.status(httpStatus.OK).json(response);
    } catch (error) {
      console.error('메모삭제실패:', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: '서버에러' });
    }
  };
}
