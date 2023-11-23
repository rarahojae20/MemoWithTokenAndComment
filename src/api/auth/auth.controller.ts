//auth.controller.ts
import { Request, Response } from 'express';
import { Result } from '../../common/result';
import httpStatus from 'http-status';
import User from '../../models/users.model';
import jwt from 'jsonwebtoken';

const jwtSecretKey = 'secretekey';

const generateToken = (user: any) => { //login 함수에서 user를 받음
  return jwt.sign({ id: user.id, email: user.email }, jwtSecretKey, { expiresIn: '1h' }); //id와 email을 받아서 토큰 발급 1시간동안 유효
};

export default class AuthController {
  public signUp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, name } = req.body;
      const user = await User.create({ email, password, name }); 
      const result = Result.ok(user).toJson();
      res.status(httpStatus.CREATED).json(result);
    } catch (error) {
      console.error('회원가입실패:', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: '회원가입에 실패했습니다.' });
    }
  };

public login = async (req: Request, res: Response): Promise<void> => {
  try { //이메일이 없거나 비밀번호가 다르면
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) { 
      res.status(httpStatus.UNAUTHORIZED).json({ error: '해당 이메일이 없습니다.' }); // 미인증 상태
      return;
    }
    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) {
      res.status(httpStatus.UNAUTHORIZED).json({ error: '비밀번호가 다릅니다' });
      return;
    }
    const token = generateToken(user); // 토큰 발급
    res.status(httpStatus.OK).json({ token }); // 토큰을 응답에 포함하여 클라이언트로 전달
  } catch (error) {
    console.error('Error while logging in:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: '로그인에 실패했습니다.' });
  }
};
}
