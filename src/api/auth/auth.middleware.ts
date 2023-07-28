// auth.middleware.ts

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import User from '../../models/users.model';
import bcrypt from 'bcrypt';

// JWT 시크릿 키 설정
const jwtSecretKey = 'secretekey';

// Request 타입에 token 속성 추가
interface AuthenticatedRequest extends Request {
  token?: string;
}

// 인증 미들웨어
export const authenticateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => { //토큰
  try {
    const { authorization } = req.headers; //authorization은 http요청중 인증정보를 전달할수있는 자체 헤더

    // authorization헤더에 Bearer 토큰값 HTTP 요청에 인증 정보를 담는 표준 헤더 
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

      // 해당 id를 가진 사용자를 데이터베이스에서 찾습니다.
      const user = await User.findByPk(id);

      if (!user) {
        res.status(httpStatus.UNAUTHORIZED).json({ error: '인증에 실패했습니다.' });
        return;
      }

      // 인증 성공
      req.token = token; // 인증에 성공하면 req 객체에 토큰을 추가합니다.
      req.user = user; // 인증된 사용자 정보를 req 객체에 추가합니다.
      next(); // 다음 미들웨어로 제어를 넘깁니다.
    });''
  } catch (error) {
    console.error('Error while authenticating user:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: '인증에 실패했습니다.' });
  }
};
