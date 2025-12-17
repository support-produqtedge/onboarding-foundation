import { DataTypes, Sequelize } from "sequelize";
import bcrypt from "bcrypt";

const SuperAdminSchema = (sequelize: Sequelize) => {
  const SuperAdmin = sequelize.define<any, any>(
    'SuperAdmin',
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
      tableName: 'superAdmin',
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

  return SuperAdmin;
};

export default SuperAdminSchema;
