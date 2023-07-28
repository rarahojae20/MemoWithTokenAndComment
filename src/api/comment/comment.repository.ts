import { IComment } from '../../types/comments';
import Comment from '../../models/comments.model';

export default class CommentRepository {
  public async create(commentData: IComment): Promise<IComment> {
    return await Comment.create(commentData);
  }

  public async delete(id: number): Promise<IComment | null> {
    const comment = await Comment.findOne({ where: { id } });

    if (comment) {
      await comment.destroy();
      return comment;
    }

    return null;
  }
}
