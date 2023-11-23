import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as requestIp from 'request-ip';
import tracer from 'cls-rtracer';

import * as Api from './app.router';

import logger from './lib/logger';
import { version } from '../package.json';
import * as mysql from './lib/mysql';

export const app = express();

// Body-parser 미들웨어 사용
app.use(bodyParser.json());
app.use(express.json());

// cls-rtracer 미들웨어 사용
app.use(tracer.expressMiddleware());

// CORS 설정
app.use(cors());

// request-ip 미들웨어 사용
app.use(requestIp.mw());

// cookie-parser 미들웨어 사용
app.use(cookieParser());

// Api Router 등록
app.use(Api.path, Api.router);

const port = 3000; // 원하는 포트번호로 변경 가능

app.listen(port, async () => {
  // 로깅 설정 초기화
  logger.init({
    log: true,
    sql: true,
    error: true,
    console: true, // 콘솔 로깅 활성화
  });

  // MySQL 연결
  await mysql.connect();

  console.log('Server is running on port', port);
});
