import { DataTypes, Sequelize } from "sequelize";
import bcrypt from "bcrypt";

const UserSchema = (sequelize: Sequelize) => {
  const User = sequelize.define<any, any>(
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: false
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
        allowNull: false,
        field: 'password_digest'
      }
    }, {
      tableName: 'users',
      timestamps: true,
      hooks: {
        beforeValidate: async (users) => {
          if (users.password) {
            users.password_digest = await bcrypt.hash(
              users.password,
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
