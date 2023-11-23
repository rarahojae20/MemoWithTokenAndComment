// user.model.ts
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  name: string;
}

export type UserPk = 'id';
export type UserId = User[UserPk];
export type UserOptionalAttributes = 'id' | 'email' | 'password' | 'name';
export type UserCreationAttributes = Optional<UserAttributes, UserOptionalAttributes>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public name!: string;

  
  public checkPassword = async (password: string): Promise<boolean> => {
    return bcrypt.compare(password, this.password);
  };

  public static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'UserModel',
        timestamps: false,
        hooks: {
            beforeCreate: async (user: User) => {
              const saltRounds = 10;
              const hashedPassword = await bcrypt.hash(user.password, saltRounds);
              user.password = hashedPassword;
  
      }}}
    );
  }
  }

export default User; 
