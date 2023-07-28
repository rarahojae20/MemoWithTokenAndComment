  import { describe, it, before } from 'mocha';
import chai from 'chai';
import chaiSubset from 'chai-subset';
import request from 'supertest';
import { app } from '../src/app';
import { env } from '../src/env';
import httpStatus from 'http-status';
import logger from 'src/lib/logger';

chai.use(chaiSubset);
const expect = chai.expect;

const responseSuccessKeys = ['code', 'message', 'result'];

describe('/v1/auth 인증 테스트', () => {
  before(async () => {
    try {
      logger.init({
        console: false,
        debug: true,
        log: true,
        error: true,
        info: true,
        fatal: true,
        sql: true,
        net: true,
      });
      logger.log(`[ ${env.mode.value} ] =========================================`);
    } catch (e) {
      console.log(e);
    }
  });

  describe('POST /v1/auth/sign-up', () => {
    it('새로운 사용자 회원가입 성공해야 함', async () => {
      const newUser = {
        email: 'test@example.com',
        password: 'testPassword',
        name: 'Test User',
      };

      const res = await request(app)
        .post('/v1/auth/sign-up')
        .send(newUser)
        .set('Accept', 'application/json');

      expect(res.status).to.equal(httpStatus.CREATED);
      expect(res.body).to.have.keys(responseSuccessKeys);
    });
  });



  describe('POST /v1/auth/log-in', () => { 
    it('회원가입 한 이메일과 비밀번호가 맞으면 로그인 성공하고 토큰을 발급 해야함', async () => {
      const newUser = {
        email: 'test@example.com',
        password: 'testPassword',
        name: 'Test User',
      };

      // 회원가입을 먼저 수행
      await request(app)
        .post('/v1/auth/sign-up')
        .send(newUser)
        .set('Accept', 'application/json');

      const loginInfo = {
        email: 'test@example.com',
        password: 'testPassword',
      };

      const res = await request(app)
        .post('/v1/auth/login')
        .send(loginInfo)
        .set('Accept', 'application/json');

      expect(res.status).to.equal(httpStatus.OK);
      expect(res.body).to.have.keys('token');
    });
  });
});
