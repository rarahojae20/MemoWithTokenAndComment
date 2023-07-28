// memo.router.ts

import { Router } from 'express';
import { authenticateUser } from '../auth/auth.middleware';
import MemoController from './memo.controller';
import * as comment from '../comment/comment.router'
import commentRouter from '../comment/comment.router'; // 수정: import 경로 추가

export const path = '/memos'; //v1.router에서 app.use에서 사용한 경로가 처음 경로이고 그 후에 memos ex)  /v1/memos, /v1/router
export const router = Router();

// Memo CRUD 라우트 설정
router.get('/', authenticateUser, new MemoController().find); // 메모 조회 (인증 필요)  
router.post('/', authenticateUser, new MemoController().create); // 메모 생성 (인증 필요)
router.put('/:id', authenticateUser, new MemoController().refreshMemo); // 메모 수정 (인증 필요)
router.delete('/:id', authenticateUser,  new MemoController().delete); // 메모 삭제 (인증 필요)

router.get('/', authenticateUser, new MemoController().find); // 메모 조회 (인증 필요)  

router.use('/:id/comments',commentRouter ); 
