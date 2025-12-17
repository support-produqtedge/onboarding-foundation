import { DataTypes, Sequelize } from "sequelize";
import bcrypt from "bcrypt";

const AdminSchema = (sequelize: Sequelize) => {
  const Admin = sequelize.define<any, any>(
    'Admin',
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
      role: {
        type: DataTypes.UUID
      },
      verification_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      status: {
        type: DataTypes.STRING
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
      tableName: 'admins',
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

  return Admin;
};

export default AdminSchema;
