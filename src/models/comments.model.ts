// comments.model.ts

import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import  Memo  from './memos.model'; // Import the Memo model

export interface CommentAttributes {
  id: number;
  memoId: number;
  content: string;
  userId: number;
}

export type CommentsPk = 'id';
export type CommentsId = Comment[CommentsPk];
export type CommentOptionalAttributes = 'id' | 'memoId' | 'content' | 'userId';
export type CommentCreationAttributes = Optional<CommentAttributes, CommentOptionalAttributes>;

export class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  public id!: number;
  public memoId!: number;
  public content!: string;
  public userId!: number;

  // public static associate(models: any) {
    
  //   Comment.belongsTo(models.Memo, {
  //     foreignKey: 'memoId',
  //     as: 'memo',
  //   });
  

  //   Comment.belongsTo(models.User, {
  //     foreignKey: 'userId',
  //     as: 'user',
  //   });
  // }
  

  public static initModel(sequelize: Sequelize.Sequelize): typeof Comment {
    return Comment.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        memoId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: 'CommentModel',
        timestamps: false,
      }
    );
  }
}

export default Comment;
