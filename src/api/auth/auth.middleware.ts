// auth.middleware.ts

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import User from '../../models/users.model';

const jwtSecretKey = 'secretekey';

interface AuthenticatedRequest extends Request {
  token?: string;
}

// 인증 미들웨어
export const authenticateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => { //토큰
  try {
    const { authorization } = req.headers; //authorization은 http요청중 인증정보를 전달할수있는 자체 헤더
    if (!authorization || !authorization.startsWith('Bearer ')) {
      res.status(httpStatus.UNAUTHORIZED).json({ error: '인증에 실패했습니다.' });
      return;
    }
    const token = authorization.slice(7); // 'Bearer ' 다음에 오는 토큰 값을 추출
    // 토큰검증.
    jwt.verify(token, jwtSecretKey, async (error: any, decoded: any) => {
      if (error) {
        res.status(httpStatus.UNAUTHORIZED).json({ error: '인증실패.' });  //401
        return;
      }
        if (!decoded.id) {
        res.status(httpStatus.UNAUTHORIZED).json({ error: 'id없음.' });
        return;
      }
      const { id } = decoded; // 디코딩된 토큰에서 사용자 id를 추출합니다.
      const user = await User.findByPk(id);
      if (!user) {
        res.status(httpStatus.UNAUTHORIZED).json({ error: '인증에 실패했습니다.' });
        return;
      }
      req.token = token; // 인증에 성공하면 req 객체에 토큰을 추가합니다.
      req.user = user; // 인증된 사용자 정보를 req 객체에 추가합니다.
      next(); // 다음 미들웨어로 제어를 넘깁니다.
    });''
  } catch (error) {
    console.error('Error while authenticating user:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: '인증에 실패했습니다.' });
  }
};
