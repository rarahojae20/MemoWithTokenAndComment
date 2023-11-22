// memo.repository.ts

import { IMemo } from '../../types/memos';
import Memo from '../../models/memos.model';
import Comment from '../../models/comments.model'; // 댓글 모델을 임포트해줍니다.


export default class MemoRepository {
  public async findAll(userId: number): Promise<IMemo[]> {
    return await Memo.findAll({
      where: {
        userId,
      },
      attributes: ['id', 'name', 'title', 'content', 'userId'],
      include: [      // left join 
      {
        model: Comment, // 댓글 모델과의 연결 설정
        as: 'comments', // 댓글 모델과의 관계 이름이 'comments'인 경우 설정
        attributes: ['id', 'content',  'memoId', 'userId'], // 필요한 댓글 속성들만 선택해서 가져옵니다.
      },
      ],
    });
  }

  public async update( newMemoData: IMemo): Promise<IMemo | null> {
    const memo = await Memo.findOne({ where: { id: newMemoData.id } });
    if (memo) {
      const { id, ...updateData } = newMemoData;
      await memo.update(updateData);
      return memo;
    }
    return null;
  }
  
  public async create(memoData: IMemo) {
    return await Memo.create( memoData );
  }

  public async delete( id: number): Promise<IMemo | null> {
    const memo = await Memo.findOne({ where: { id } } );
    if (memo) {
      await memo.destroy();
      return memo;
    }
    return null;
  }
  
    // public async findOne(userId: number, id: number) {
  //   return Memo.findOne({
  //     where: { id, userId },
  //     attributes: ['id', 'name', 'title', 'content', 'userId'],
  //   });
  // }
}
