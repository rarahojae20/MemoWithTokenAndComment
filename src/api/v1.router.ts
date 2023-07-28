// memoapp.router.ts
import { Router } from 'express';


import * as memo from './memo/memo.router';
import * as auth from './auth/auth.router';

export const path = '/v1'; //app.router에서 router.use v1.path, v1.router를 먼저 사용해서 라우팅 경로가 /v1/memos 나 /  v1/auth가 됨
export const router = Router();

router.use(memo.path, memo.router);
router.use(auth.path, auth.router);



//app.router 에서 여기 path인 /v1먼저 쓰고 여기선 memo, auth에서 가져와서 path를 써서
//router의 경로는 localhost:3000/v1/memos
//router의 경로는 localhost:3000/v1/auth