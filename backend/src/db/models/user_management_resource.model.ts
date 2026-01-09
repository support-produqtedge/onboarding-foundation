import { DataTypes, Sequelize } from "sequelize";

const UserMgtPermissionSchema = (sequelize: Sequelize) => {
  const UserMgtPermission = sequelize.define<any, any>(
    "UserMgtPermission",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        allowNull: false
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      view: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      write: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      statusChange: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, {
      tableName: 'userMgtPermission',
      timestamps: true
    }
  );

  return UserMgtPermission;
}

export default UserMgtPermissionSchema;
