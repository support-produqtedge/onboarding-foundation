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
      verification_status: {
        type: DataTypes.BOOLEAN
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
        beforeValidate: async (superAdmin) => {
          if (superAdmin.password) {
            superAdmin.password_digest = await bcrypt.hash(
              superAdmin.password,
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
