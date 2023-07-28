// custom.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Replace 'any' with the type of user object if you have one defined
    }
  }
}
