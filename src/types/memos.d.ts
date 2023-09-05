//import { LargeNumberLike } from "crypto";
//import addSeconds from "date-fns/addSeconds";

export interface IMemo {
    id?: number;
    name?: string;
    title?: string;
    content?: string;
    userId?: number; // Usermodel의 id foriegn key
}

