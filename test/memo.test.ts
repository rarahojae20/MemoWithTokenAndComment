import { describe, it, before, beforeEach } from 'mocha';
import chai from 'chai';
import chaiSubset from 'chai-subset';
import chaiLike from 'chai-like';
import chaiThings from 'chai-things';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import cache from 'memory-cache';
import path from 'path';
import ApiCodes from '../src/lib/api.codes';
import ApiMessages from '../src/lib/api.messages';
import MemoRepository from "../src/api/memo/memo.repository"; // Import the MemoRepository
import { app } from '../src/app';
import { env } from '../src/env';
import httpStatus from 'http-status';
import logger from 'src/lib/logger';
import User from '../src/models/users.model'; // Import User model
import Memo from '../src/models/memos.model'; // Import Memo model


chai.use(chaiSubset);
chai.use(chaiLike);
chai.use(chaiThings);

const expect = chai.expect;

const responseSuccessKeys = ['code', 'message', 'result'];

describe(`/v1/memos API Test`, async () => {
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

  describe(`메모 생성`, () => {
    
    let userToken: string; 
    
    before(async () => {
      // 회원 로그인
      
      const userCredentials = {
        email: 'raraaa',
        password: 'hoo',
      };
  
      const loginRes = await request(app)
        .post('/v1/auth/login')
        .set('Accept', 'application/json')
        .send(userCredentials);

       userToken = loginRes.body.token; // 회원 로그인 후 발급된 토큰 저장
    });
  
    it(`토큰을 받아와서 정상 동작할 경우에`, async () => {
      const newMemo = {
        name: 'namee',
        title: 'titlee',
        content: 'conteent'
      };
  
      const res = await request(app)
        .post('/v1/memos')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userToken}`) // 토큰을 Authorization 헤더에 포함하여 보냄
        .send(newMemo); // newMemo를 send() 메서드의 인자로 넣음
  
      expect(res.body).to.have.keys(responseSuccessKeys);
      expect(res.body.code).to.equal(ApiCodes.OK);
    });
  });

  describe('메모 조회', () => {
    let userToken: string; 
    
    before(async () => {
      // 회원 로그인
      
      const userCredentials = {
        email: 'raraaa',
        password: 'hoo',
      };
  
      const loginRes = await request(app)
        .post('/v1/auth/login')
        .set('Accept', 'application/json')
        .send(userCredentials);

       userToken = loginRes.body.token; // 회원 로그인 후 발급된 토큰 저장
    });

    it('모든 메모 조회 시 성공해야 함', async () => {
      // 가상의 메모 데이터 생성
      const memoData = [
        {
          name: 'Memo1',
          title: 'Test Memo 1',
          content: 'This is a test memo 1',
          userId: 168, // 이 값을 수정해야 사용자에 따라 테스트할 수 있습니다.
        },
       
        // 더 많은 가상의 메모 데이터를 추가할 수 있습니다.
      ];

      // 가상의 메모 데이터를 데이터베이스에 삽입합니다.
      await Memo.bulkCreate(memoData);

      // 모든 메모를 조회합니다.
      const res = await request(app)
        .get('/v1/memos')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).to.equal(httpStatus.OK);  
    expect(res.body).to.be.an('object');
    

    //   expect(res.body).to.be.an('array').that.includes.something.like({ name: 'Memo1' });
    })
})
})











//   describe(`메모 조회`, () => {
//     beforeEach(async () => { // 수정된 부분
//       // 메모를 생성하고 생성된 메모의 ID를 얻어옴
//       const res = await request(app)
//         .post('/v1/memos')
//         .set('Accept', 'application/json')
//         .send({
//           name: faker.random.words(1),
//           title: faker.random.words(5),
//           content: faker.random.words(100),
//         });
//       const memoId = res.body.result.id;

//       // 생성한 메모를 캐시에 저장
//       cache.put(`memo_${memoId}`, {
//         id: memoId,
//         name: res.body.result.name,
//         title: res.body.result.title,
//         content: res.body.result.content,
//         userId: res.body.result.userId,
//       });
//     });

//     it(`정상 동작 시`, async () => {
//       const res = await request(app)
//         .get('/v1/memos')
//         .set('Accept', 'application/json');

//       expect(res.body).to.have.keys(responseSuccessKeys);
//       expect(res.body.code).to.equal(ApiCodes.OK);
//       expect(res.body.message).to.equal(ApiMessages.OK);
//       expect(res.body.result).to.be.a('object');
//       expect(res.body.result.memos).to.be.a('array');
//     });
//   });
