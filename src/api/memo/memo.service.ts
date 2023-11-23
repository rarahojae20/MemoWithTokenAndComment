//memo.service.ts

import { IMemo } from '../../types/memos';
import MemoRepository from './memo.repository';

export default class MemoService {
  public findAll = async (userId :number): Promise<IMemo[]> => {
    const memos = await new MemoRepository().findAll(userId);
    return memos; 
  };

  public create = async (memoData: IMemo): Promise<IMemo> => {
    const result = await new MemoRepository().create(memoData);
    return result;
  };

  public refreshMemo = async (newMemoData: IMemo): Promise<IMemo | null> => {
    const result = await new MemoRepository().update( newMemoData );
    return result;
  };

  public deleteMemo =   async (id: number): Promise<IMemo | null> => {
    const result = await new MemoRepository().delete(id);
    return result;
  };
}
