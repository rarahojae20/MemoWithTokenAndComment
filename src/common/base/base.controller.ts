// BaseController.ts
import { Builder } from 'builder-pattern';
import { IMemo } from '../../types/memos';
import { prune } from '../../lib/utils';

export abstract class BaseController {
    protected extractBodyMemo = (body): IMemo => {
        if (!body) return {};

        const memo = Builder<IMemo>()
            .name(body.name)    
            .title(body.title)
            .content(body.content)
            .userId(body.userId) 
            .build(); 

        return prune(memo);
    }
}
