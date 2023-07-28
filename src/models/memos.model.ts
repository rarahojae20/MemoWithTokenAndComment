//memos.model.ts
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import User from './users.model'; // Import the User model
import Comment from './comments.model';


export interface MemoAttributes {
  id: number;
  name: string;
  title: string;
  content: string;
  userId: number; 
}

export type MemosPk = "id";
export type MemosId = Memo[MemosPk];
export type MemoOptionalAttributes = 'id' | 'name' | 'title' | 'content' | 'userId';
export type MemoCreationAttributes = Optional<MemoAttributes, MemoOptionalAttributes>;

export class Memo extends Model<MemoAttributes, MemoCreationAttributes> implements MemoAttributes {
  public id!: number;
  public name!: string;
  public title!: string;
  public content!: string;
  public userId!: number;

  // public static associate(models: any) {
  //   Memo.belongsTo(models.User, {
  //     foreignKey: 'userId',
  //     as: 'user',
  //   });

  //    Memo.hasMany(models.Comment, {
  //     foreignKey: 'memoId',
  //     as: 'memo',
  //   });

  // }

  public static initModel(sequelize: Sequelize.Sequelize): typeof Memo {
    return Memo.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'MemoModel',
        timestamps: false,
      }
    );
  }
}

export default Memo;
