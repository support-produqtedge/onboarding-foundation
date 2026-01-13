import { DataTypes, Sequelize, STRING } from "sequelize";
import bcrypt from "bcrypt";
import { IUser } from "../interfaces/user.interface";

const UserSchema = (sequelize: Sequelize) => {
  const User = sequelize.define<any, IUser>(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      companyId: {
        type: DataTypes.UUID,
        allowNull: true
      },
      nin: {
        type: DataTypes.STRING,
        allowNull: true
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      verification_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      password: {
        type: DataTypes.VIRTUAL,
        allowNull: true
      },
      password_digest: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'password_digest'
      },
    }, {
      tableName: 'users',
      timestamps: true,
      hooks: {
        beforeValidate: async (user) => {
          if (user.password) {
            user.password_digest = await bcrypt.hash(
              user.password,
              10
            )
          }
        }
      }
    }
  );

  return User;
};

export default UserSchema;
