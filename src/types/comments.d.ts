//comments.d.ts
import { LargeNumberLike } from "crypto";
import addSeconds from "date-fns/addSeconds";

export interface IComment { 
    id?: number;
    memoId?: number;
    content?: string;
    userId?: number;
}

