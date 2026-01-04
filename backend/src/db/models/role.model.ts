import { DataTypes, Sequelize } from "sequelize";
import { IRole } from "../interfaces/role.interface";

const RoleSchema = (sequelize: Sequelize) => {
  const Role = sequelize.define<any, IRole>(
    'Role',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      company_id: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      assignedUserIds: {
        type: DataTypes.JSON,
        allowNull: true,

        get() {
          const rawValue = this.getDataValue('assignedUserIds');
          return rawValue ? JSON.parse(rawValue) : []
        },

        set(value) {
          this.setDataValue('assignedUserIds', JSON.stringify(value));
        }
      }
    },
    {
      tableName: 'roles',
      timestamps: true
    }
  );

  return Role;
};

export default RoleSchema;
