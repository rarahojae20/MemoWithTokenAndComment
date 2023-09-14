import { IComment } from 'types/comments';
import CommentRepository from './comment.repository'; // CommentRepository import

export default class CommentService {
  public create = async (commentData: IComment): Promise<IComment> => {
    const result = await new CommentRepository().create(commentData); // CommentRepository의 create 메서드 사용
    return result;
  };

  public delete = async (id: number): Promise<IComment | null> => {
    const result = await new CommentRepository().delete(id); // CommentRepository의 delete 메서드 사용
    return result;
  };
}

