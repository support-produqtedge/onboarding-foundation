import { DataTypes, Sequelize } from "sequelize";

const RoleSchema = (sequelize: Sequelize) => {
  const Role = sequelize.define(
    'Role',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
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
