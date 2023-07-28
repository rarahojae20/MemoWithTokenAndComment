// app.router.ts
import { Router } from 'express';
import httpStatus from 'http-status';
import * as v1 from './api/v1.router';

export const router = Router();
export const path = '';

router.use(v1.path, v1.router);



