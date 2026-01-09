import { DataTypes, Sequelize } from "sequelize";

const RoleMgtPermissionSchema = (sequelize: Sequelize) => {
  const RoleMgtPermission = sequelize.define<any, any>(
    "RoleMgtPermission",
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
      tableName: 'roleMgtPermission',
      timestamps: true
    }
  );

  return RoleMgtPermission;
}

export default RoleMgtPermissionSchema;
